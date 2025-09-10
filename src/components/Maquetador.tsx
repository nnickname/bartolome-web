import { useMemo, useState } from 'react'
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
  const [objetivo, setObjetivo] = useState('')
  const [publico, setPublico] = useState('')
  const [plataformas, setPlataformas] = useState('web')
  const [presupuesto, setPresupuesto] = useState('5k-15k')
  const [deadline, setDeadline] = useState('6-8 semanas')
  const [email, setEmail] = useState('')

  const [step, setStep] = useState(0)
  const totalSteps = 3
  const stepsLabels = ['Proyecto', 'Objetivo y público', 'Preferencias']

  const canGoNext = useMemo(() => {
    if (step === 0) return prompt.trim().length > 0
    if (step === 1) return objetivo.trim().length > 0 && publico.trim().length > 0
    if (step === 2) return true
    return false
  }, [step, prompt, objetivo, publico])

  const composedPrompt = useMemo(() => {
    return `Proyecto: ${prompt}\nObjetivo: ${objetivo}\nPúblico: ${publico}\nPlataformas: ${plataformas}\nPresupuesto: ${presupuesto}\nDeadline: ${deadline}`.trim()
  }, [prompt, objetivo, publico, plataformas, presupuesto, deadline])

  const onNext = () => {
    if (!canGoNext || loading) return
    setStep((s) => Math.min(s + 1, totalSteps - 1))
  }

  const onBack = () => {
    if (loading) return
    setStep((s) => Math.max(s - 1, 0))
  }

  const onFinalSubmit = () => {
    if (loading) return
    onSubmit(composedPrompt, email.trim() || undefined)
  }

  const progressPct = useMemo(() => ((step + 1) / totalSteps) * 100, [step])

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-foreground/70">Paso {step + 1} de {totalSteps}</span>
          <span className="text-xs text-foreground/60">{stepsLabels[step]}</span>
        </div>
        <ol className="flex items-center gap-3">
          {stepsLabels.map((label, i) => {
            const isCompleted = i < step
            const isCurrent = i === step
            return (
              <li key={label} className="flex items-center gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <div
                    aria-current={isCurrent ? 'step' : undefined}
                    className={
                      isCompleted
                        ? 'h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs grid place-items-center'
                        : isCurrent
                        ? 'h-7 w-7 rounded-full ring-2 ring-primary/60 bg-card text-foreground text-xs grid place-items-center'
                        : 'h-7 w-7 rounded-full bg-muted text-foreground/60 text-xs grid place-items-center'
                    }
                  >
                    {i + 1}
                  </div>
                  <span className={isCurrent ? 'text-xs text-foreground' : 'text-xs text-foreground/70'}>{label}</span>
                </div>
                {i < stepsLabels.length - 1 && (
                  <div className="h-px flex-1 bg-border" />
                )}
              </li>
            )
          })}
        </ol>
        <div className="h-1 w-full bg-muted rounded-md overflow-hidden">
          <div className="h-full bg-primary transition-all" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {step === 0 && (
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm text-foreground/70">Describe tu proyecto (enfoque IA)</label>
            <Textarea
              placeholder="Ej: Asistente de ventas con IA para calificar leads y automatizar propuestas; dashboard con análisis predictivo; integración con ERP."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-foreground/70">Objetivo principal</label>
            <Input placeholder="Ej: reducir tiempos operativos 30% con agentes IA" value={objetivo} onChange={(e)=>setObjetivo(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-foreground/70">Público objetivo</label>
            <Input placeholder="Ej: equipo comercial, logística, atención al cliente" value={publico} onChange={(e)=>setPublico(e.target.value)} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
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
                <option value="<1k">Menos de 1k</option>
                <option value="1k-5k">1k - 5k</option>
                <option value="5k-15k">5k - 15k</option>
                <option value=">15k">Más de 15k</option>
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

          <div className="space-y-2">
            <label className="text-sm text-foreground/70">Resumen</label>
            <div className="text-sm whitespace-pre-wrap p-3 rounded-md border border-border bg-card">{composedPrompt}</div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <Button variant="outline" onClick={onBack} disabled={step === 0 || !!loading}>Volver</Button>
        {step < totalSteps - 1 ? (
          <Button onClick={onNext} disabled={!canGoNext || !!loading}>Siguiente</Button>
        ) : (
          <Button onClick={onFinalSubmit} disabled={!composedPrompt || !!loading}>{loading ? 'Generando...' : 'Simular propuesta'}</Button>
        )}
      </div>
    </div>
  )
}


