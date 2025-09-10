// Deno runtime (Supabase Edge Functions)
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

type Complexity = 'low' | 'medium' | 'high'

type Parsed = {
  features: string[]
  techStack: string[]
  complexity: Complexity
  deadline: string
}

type QuoteItem = { feature: string; hours: number }
type Quote = { scope: QuoteItem[]; total_hours: number; total_cost: number; timeline: string }
type UIComponentDesc = { name: string; description: string; image_url?: string }

type Payload = {
  parsed: Parsed
  quote: Quote
  uiKit: UIComponentDesc[]
  leadId?: string
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')!

const HOURLY_RATE = 50

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

async function getClient() {
  const { createClient } = await import('npm:@supabase/supabase-js@2.45.4')
  return createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } })
}

async function rateLimit(ip: string) {
  const supabase = await getClient()
  const today = new Date().toISOString().slice(0, 10)

  const { data: existing } = await supabase
    .from('rate_limits')
    .select('*')
    .eq('ip', ip)
    .eq('date', today)
    .maybeSingle()

  if (existing && existing.count >= 5) {
    return false
  }

  if (!existing) {
    await supabase.from('rate_limits').insert({ ip, date: today, count: 1 })
  } else {
    await supabase.from('rate_limits').update({ count: existing.count + 1 }).eq('id', existing.id)
  }
  return true
}

async function chat(prompt: string) {
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2
    })
  })
  if (!resp.ok) {
    throw new Error(`OpenAI error: ${resp.status} ${await resp.text()}`)
  }
  const json = await resp.json()
  const text = json.choices?.[0]?.message?.content?.trim() || ''
  return text
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const ok = await rateLimit(ip)
    if (!ok) {
      return new Response(JSON.stringify({ message: 'Rate limit: máximo 5 cotizaciones por día' }), { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const body = await req.json().catch(() => ({}))
    const userPrompt = (body?.prompt || '').toString().slice(0, 3000)
    const email = (body?.email || '').toString().slice(0, 200)

    if (!userPrompt) {
      return new Response(JSON.stringify({ message: 'Falta prompt' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const parseOut = await chat(
      `Parsea este prompt de usuario: """${userPrompt}""".
Devuelve JSON con keys exactas: features (array de strings), techStack (array de strings),
complexity (low|medium|high), deadline (string).
Solo JSON válido.`
    )
    const parsed: Parsed = JSON.parse(parseOut)

    const quoteOut = await chat(
      `Genera una cotización JSON dado complexity=${parsed.complexity} y hourly_rate=${HOURLY_RATE}.
Reglas de horas:
- low: 20-40
- medium: 50-80
- high: 80-120
Suma 20% overhead.
Devuelve JSON con: scope (array de {feature, hours}), total_hours, total_cost, timeline (string).
Las features deben alinearse a: ${JSON.stringify(parsed.features)}`
    )
    const quote: Quote = JSON.parse(quoteOut)

    const uiOut = await chat(
      `Genera un UI Kit básico para estas features: ${JSON.stringify(parsed.features)}.
Lista 5 componentes con descripciones. Devuelve JSON array de {name, description}.
No incluyas imágenes, pero puedes incluir un campo opcional image_url si lo deseas (string).`
    )
    const uiKit: UIComponentDesc[] = JSON.parse(uiOut)

    const payload: Payload = { parsed, quote, uiKit }

    const supabase = await getClient()
    const { data, error } = await supabase
      .from('leads')
      .insert({
        email: email || null,
        prompt: userPrompt,
        quote_json: payload,
        status: 'review'
      })
      .select('id')
      .single()

    if (!error) payload.leadId = data.id

    return new Response(JSON.stringify(payload), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ message: (e as Error).message || 'Error interno' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})


