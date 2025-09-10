import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/table'

type Lead = {
  id: string
  email: string | null
  prompt: string
  quote_json: any
  status: 'review' | 'accepted'
  created_at: string
}

export default function Admin() {
  const [session, setSession] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!session) return
    ;(async () => {
      setLoading(true)
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
      if (!error) setLeads(data as Lead[])
      setLoading(false)
    })()
  }, [session])

  const signIn = async () => {
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const updateStatus = async (id: string, status: 'review' | 'accepted') => {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id)
    if (!error) {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    }
  }

  const sendEmail = async (lead: Lead) => {
    alert(`Enviar email manual a: ${lead.email || 'sin email'} — Estado: ${lead.status}`)
  }

  if (!session) {
    return (
      <div className="max-w-md mx-auto px-6 py-16">
        <Card>
          <CardHeader>
            <CardTitle>Admin - Iniciar sesión</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button onClick={signIn}>Entrar</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Leads</h1>
        <Button variant="outline" onClick={signOut}>Salir</Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          {loading ? (
            <div className="p-6">Cargando...</div>
          ) : (
            <Table>
              <THead>
                <TR>
                  <TH>Creado</TH>
                  <TH>Email</TH>
                  <TH>Prompt</TH>
                  <TH>Horas</TH>
                  <TH>Costo</TH>
                  <TH>Estado</TH>
                  <TH>Acciones</TH>
                </TR>
              </THead>
              <TBody>
                {leads.map(l => (
                  <TR key={l.id}>
                    <TD>{new Date(l.created_at).toLocaleString()}</TD>
                    <TD>{l.email || '-'}</TD>
                    <TD className="max-w-[320px] truncate" title={l.prompt}>{l.prompt}</TD>
                    <TD>{l.quote_json?.quote?.total_hours ?? '-'}</TD>
                    <TD>{l.quote_json?.quote?.total_cost ? `$${l.quote_json.quote.total_cost}` : '-'}</TD>
                    <TD>
                      <select
                        className="bg-background border border-border rounded-md px-2 py-1 text-sm"
                        value={l.status}
                        onChange={(e) => updateStatus(l.id, e.target.value as 'review' | 'accepted')}
                      >
                        <option value="review">review</option>
                        <option value="accepted">accepted</option>
                      </select>
                    </TD>
                    <TD>
                      <Button variant="outline" onClick={() => sendEmail(l)}>Enviar email</Button>
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


