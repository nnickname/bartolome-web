import { supabase } from '@/lib/supabase'
import { QuoteResultPayload } from '@/types'

export async function generateQuote(prompt: string, email?: string): Promise<QuoteResultPayload> {
  const { data, error } = await supabase.functions.invoke('generate-quote', {
    body: { prompt, email },
  })

  if (error) {
    throw new Error(error.message || 'Error al generar la cotización')
  }

  return data as QuoteResultPayload
}

