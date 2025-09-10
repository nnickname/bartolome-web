import { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Select } from './ui/select'

type Props = {
  onSubmit: (prompt: string, email?: string) => Promise<void>
  loading?: boolean
}

export function Maquetador({ onSubmit, loading }: Props) {
  const [prompt, setPrompt] = useState('')
  const [email, setEmail] = useState('')
  const [objetivo, setObjetivo] = useState('')
  const [publico, setPublico] = useState('')
  const [plataformas, setPlataformas] = useState('web')
  const [presupuesto, setPresupuesto] = useState('5k-15k')
  const [deadline, setDeadline] = useState('6-8 semanas')

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-foreground/70">Describe tu proyecto</label>
        <Textarea
          placeholder="Ej: Plataforma web para reservas con login, pasarela de pago y panel admin"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-foreground/70">Objetivo principal</label>
          <Input placeholder="Ej: aumentar conversiones 20%" value={objetivo} onChange={(e)=>setObjetivo(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-foreground/70">Público objetivo</label>
          <Input placeholder="Ej: tiendas minoristas, médicos, estudiantes..." value={publico} onChange={(e)=>setPublico(e.target.value)} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-foreground/70">Plataformas</label>
          <Select value={plataformas} onChange={(e)=>setPlataformas(e.target.value)}>
            <option value="web">Web</option>
            <option value="mobile">iOS y Android</option>
            <option value="web-mobile">Web + Móvil</option>
            <option value="integrations">Integraciones/Backoffice</option>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-foreground/70">Presupuesto estimado</label>
          <Select value={presupuesto} onChange={(e)=>setPresupuesto(e.target.value)}>
            <option value="<5k">Menos de 5k</option>
            <option value="5k-15k">5k - 15k</option>
            <option value="15k-40k">15k - 40k</option>
            <option value=">40k">Más de 40k</option>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-foreground/70">Deadline o ventana de lanzamiento</label>
          <Select value={deadline} onChange={(e)=>setDeadline(e.target.value)}>
            <option value="4-6 semanas">4 - 6 semanas</option>
            <option value="6-8 semanas">6 - 8 semanas</option>
            <option value="8-12 semanas">8 - 12 semanas</option>
            <option value=">12 semanas">Más de 12 semanas</option>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-foreground/70">Email (opcional)</label>
          <Input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <Button
        onClick={() => {
          const composed = `Proyecto: ${prompt}\nObjetivo: ${objetivo}\nPúblico: ${publico}\nPlataformas: ${plataformas}\nPresupuesto: ${presupuesto}\nDeadline: ${deadline}`
          onSubmit(composed.trim(), email.trim() || undefined)
        }}
        disabled={!prompt.trim() || loading}
      >
        {loading ? 'Generando...' : 'Generar cotización'}
      </Button>
    </div>
  )
}


