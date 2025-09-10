import { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'

type Props = {
  onSubmit: (prompt: string, email?: string) => Promise<void>
  loading?: boolean
}

export function Maquetador({ onSubmit, loading }: Props) {
  const [prompt, setPrompt] = useState('')
  const [email, setEmail] = useState('')
  const [objetivo, setObjetivo] = useState('')
  const [publico, setPublico] = useState('')
  const [plataformas, setPlataformas] = useState('Web')
  const [presupuesto, setPresupuesto] = useState('')
  const [deadline, setDeadline] = useState('')

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
          <Input placeholder="Web / iOS / Android / Integraciones" value={plataformas} onChange={(e)=>setPlataformas(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-foreground/70">Presupuesto estimado (USD)</label>
          <Input placeholder="Ej: 5,000 - 15,000" value={presupuesto} onChange={(e)=>setPresupuesto(e.target.value)} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-foreground/70">Deadline o ventana de lanzamiento</label>
          <Input placeholder="Ej: 8 semanas / Q4 2025" value={deadline} onChange={(e)=>setDeadline(e.target.value)} />
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


