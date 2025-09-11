import { useMemo, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Select } from './ui/select'
import { PhoneFrame } from './AiAppPreview'
import { useNavigate } from 'react-router-dom'

type Props = {
  onSubmit: (prompt: string, email?: string) => Promise<void>
  loading?: boolean
}

export function Maquetador({ onSubmit, loading }: Props) {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')
  const [objetivo, setObjetivo] = useState('')
  const [publico, setPublico] = useState('')
  const [plataformas, setPlataformas] = useState('web')
  const [presupuesto, setPresupuesto] = useState('5k-15k')
  const [deadline, setDeadline] = useState('6-8 semanas')
  const [email, setEmail] = useState('')
  const [dolor, setDolor] = useState('')
  const [kpi, setKpi] = useState('')
  const [fuentes, setFuentes] = useState('')
  const [capacidadesIA, setCapacidadesIA] = useState('')
  const [integraciones, setIntegraciones] = useState('')

  const [previewHtml, setPreviewHtml] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const [step, setStep] = useState(0)
  const totalSteps = 3
  const stepsLabels = ['Necesidad', 'Objetivo y público', 'Preferencias']

  const canGoNext = useMemo(() => {
    if (step === 0) return prompt.trim().length > 0 && dolor.trim().length > 0
    if (step === 1) return objetivo.trim().length > 0 && publico.trim().length > 0
    if (step === 2) return true
    return false
  }, [step, prompt, dolor, objetivo, publico])

  const composedPrompt = useMemo(() => {
    return (
      `Necesidad: ${prompt}\n` +
      `Dolor/Proceso a mejorar: ${dolor}\n` +
      `Objetivo: ${objetivo}\n` +
      `KPI objetivo: ${kpi}\n` +
      `Público: ${publico}\n` +
      `Plataformas: ${plataformas}\n` +
      `Presupuesto: ${presupuesto}\n` +
      `Deadline: ${deadline}\n` +
      `Fuentes de datos: ${fuentes}\n` +
      `Capacidades IA: ${capacidadesIA}\n` +
      `Integraciones: ${integraciones}`
    ).trim()
  }, [prompt, dolor, objetivo, kpi, publico, plataformas, presupuesto, deadline, fuentes, capacidadesIA, integraciones])

  const onNext = () => {
    if (!canGoNext || loading) return
    setStep((s) => Math.min(s + 1, totalSteps - 1))
  }

  const onBack = () => {
    if (loading) return
    setStep((s) => Math.max(s - 1, 0))
  }

  const onFinalSubmit = () => {
    if (loading || isGenerating) return
    setIsGenerating(true)
    setShowPreview(false)
    // Mock de 2s: generamos el HTML luego del "loading"
    setTimeout(() => {
      const element = (
        <PhoneFrame platform="ios">
          <div className="p-4">
            <div className="text-lg font-semibold truncate" title={objetivo || 'Tu app IA'}>{objetivo || 'Tu app IA'}</div>
            <div className="text-xs text-foreground/70 mt-1">Para: {publico || 'Usuarios'}</div>

            <div className="mt-5 space-y-3 text-sm">
              <div>
                <div className="text-xs text-foreground/70">Necesidad</div>
                <div className="mt-1 rounded-md border border-border bg-card px-3 py-2 text-foreground/90">{prompt || '—'}</div>
              </div>
              <div>
                <div className="text-xs text-foreground/70">Dolor / Proceso a mejorar</div>
                <div className="mt-1 rounded-md border border-border bg-card px-3 py-2 text-foreground/90">{dolor || '—'}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-foreground/70">KPI objetivo</div>
                  <div className="mt-1 rounded-md border border-border bg-card px-3 py-2 text-foreground/90">{kpi || '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-foreground/70">Plataformas</div>
                  <div className="mt-1 rounded-md border border-border bg-card px-3 py-2 text-foreground/90">{plataformas}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-foreground/70">Presupuesto</div>
                  <div className="mt-1 rounded-md border border-border bg-card px-3 py-2 text-foreground/90">{presupuesto}</div>
                </div>
                <div>
                  <div className="text-xs text-foreground/70">Deadline</div>
                  <div className="mt-1 rounded-md border border-border bg-card px-3 py-2 text-foreground/90">{deadline}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-foreground/70">Capacidades IA</div>
                <div className="mt-1 rounded-md border border-border bg-card px-3 py-2 text-foreground/90">{capacidadesIA || '—'}</div>
              </div>
              <div>
                <div className="text-xs text-foreground/70">Integraciones</div>
                <div className="mt-1 rounded-md border border-border bg-card px-3 py-2 text-foreground/90">{integraciones || '—'}</div>
              </div>
            </div>

            <button className="mt-5 w-full rounded-full bg-foreground text-background text-sm py-3 cursor-pointer transition hover:opacity-90 active:opacity-80">Acción principal</button>
          </div>
        </PhoneFrame>
      )
      const html = renderToStaticMarkup(element)
      setPreviewHtml(html)
      setIsGenerating(false)
      setShowPreview(true)
      navigate('/preview', { state: { html, composedPrompt, objetivo, publico, kpi, plataformas, presupuesto, deadline, fuentes, capacidadesIA, integraciones } })
    }, 2000)
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
            <label className="text-sm text-foreground/70">Contanos tu necesidad <span className="ml-1 text-foreground/50 cursor-help" title="Contá qué querés resolver en tu empresa. Ej: controlar el avance de obra y evitar desvíos.">?</span></label>
            <Textarea
              placeholder="Ej: Somos una constructora. Queremos una herramienta con IA para controlar el progreso de las obras (partes diarios, fotos), detectar desvíos vs. plan y avisar al equipo."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <p className="text-xs text-foreground/60">No hace falta lenguaje técnico. Contá qué tareas hoy te consumen tiempo y qué te gustaría que pase.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-foreground/70">¿Qué tarea hoy te consume tiempo o genera errores? <span className="ml-1 text-foreground/50 cursor-help" title="Ejemplos: partes diarios, copia de datos entre planillas, consolidar fotos, certificados de obra, comunicación con proveedores.">?</span></label>
            <Textarea
              placeholder="Ej: cargar partes diarios toma 2h/día; consolidar fotos y avances; controlar acopios y certificaciones; poca visibilidad de desvíos."
              value={dolor}
              onChange={(e) => setDolor(e.target.value)}
            />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-foreground/70">¿Qué querés lograr? <span className="ml-1 text-foreground/50 cursor-help" title="Ejemplos: terminar obras a tiempo, reducir desvíos, mejorar control de costos, responder más rápido.">?</span></label>
            <Input placeholder="Ej: terminar obras a tiempo, bajar desvíos 15%, evitar retrabajos" value={objetivo} onChange={(e)=>setObjetivo(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-foreground/70">¿Quiénes la van a usar? <span className="ml-1 text-foreground/50 cursor-help" title="Ejemplos: jefes de obra, capataces, oficina técnica, compras, dirección.">?</span></label>
            <Input placeholder="Ej: jefes de obra, capataces, oficina técnica, compras" value={publico} onChange={(e)=>setPublico(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-foreground/70">Si podés, ponelo en números (opcional) <span className="ml-1 text-foreground/50 cursor-help" title="Una meta en números ayuda a priorizar. Ej: -15% desvíos, +20% productividad, respuesta &lt; 2h.">?</span></label>
            <Input placeholder="Ej: -15% desvíos, +20% productividad, respuesta &lt; 2 horas" value={kpi} onChange={(e)=>setKpi(e.target.value)} />
            <p className="text-xs text-foreground/60">Si no sabés el número exacto, no pasa nada. Lo definimos juntos.</p>
          </div>
        </div>
      )}

      {step === 2 && !showPreview && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-foreground/70">Plataformas <span className="ml-1 text-foreground/50 cursor-help" title="Dónde se usaría: web, móvil o ambas.">?</span></label>
              <Select value={plataformas} onChange={(e)=>setPlataformas(e.target.value)}>
                <option value="web">Web</option>
                <option value="mobile">iOS y Android</option>
                <option value="web-mobile">Web + Móvil</option>
                <option value="integrations">Integraciones/Backoffice</option>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-foreground/70">Presupuesto estimado <span className="ml-1 text-foreground/50 cursor-help" title="No tiene que ser exacto. Sirve para dimensionar el primer paso.">?</span></label>
              <Select value={presupuesto} onChange={(e)=>setPresupuesto(e.target.value)}>
                <option value="<1k">Menos de 1k</option>
                <option value="1k-5k">1k - 5k</option>
                <option value="5k-15k">5k - 15k</option>
                <option value=">15k">Más de 15k</option>
              </Select>
              <p className="text-xs text-foreground/60">Podemos arrancar con algo chico desde USD 499 y crecer por etapas.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-foreground/70">Deadline o ventana de lanzamiento <span className="ml-1 text-foreground/50 cursor-help" title="¿Para cuándo te gustaría tener la primera versión andando?">?</span></label>
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
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-foreground/70">De dónde salen los datos hoy (opcional) <span className="ml-1 text-foreground/50 cursor-help" title="Ejemplos: partes diarios, planillas de obra, Drive, fotos, WhatsApp, sistema contable.">?</span></label>
              <Input placeholder="Ej: partes diarios, planillas, fotos, WhatsApp, sistema contable" value={fuentes} onChange={(e)=>setFuentes(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-foreground/70">Qué te imaginás que haga la IA (opcional) <span className="ml-1 text-foreground/50 cursor-help" title="Ejemplos: comparar avance vs. plan, detectar desvíos, generar recordatorios, extraer datos de planos/pliegos.">?</span></label>
              <Input placeholder="Ej: comparar avance vs plan, detectar desvíos, recordatorios, extraer datos de pliegos" value={capacidadesIA} onChange={(e)=>setCapacidadesIA(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-foreground/70">Con qué debería conectarse (opcional) <span className="ml-1 text-foreground/50 cursor-help" title="Ejemplos: WhatsApp, Drive, correo, sistema contable, Power BI.">?</span></label>
              <Input placeholder="Ej: WhatsApp, Drive, correo, sistema contable, Power BI" value={integraciones} onChange={(e)=>setIntegraciones(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-foreground/70">Resumen</label>
            <div className="text-sm whitespace-pre-wrap p-3 rounded-md border border-border bg-card">{composedPrompt}</div>
          </div>
        </div>
      )}

      {step === 2 && showPreview && (
        <div className="flex justify-center">
          <div className="max-w-xs">
            <PhoneFrame platform="ios">
              <div className="p-4">
                <div className="text-lg font-semibold truncate" title={objetivo || 'Tu app IA'}>{objetivo || 'Tu app IA'}</div>
                <div className="text-xs text-foreground/70 mt-1">Para: {publico || 'Usuarios'}</div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="rounded-xl border border-border bg-card p-3">
                    <div className="text-xs text-foreground/70">Resumen</div>
                    <div className="mt-1 text-foreground/90 whitespace-pre-wrap">{composedPrompt}</div>
                  </div>
                  <button className="w-full rounded-full bg-foreground text-background text-sm py-3 cursor-pointer transition hover:opacity-90 active:opacity-80">Comenzar</button>
                </div>
              </div>
            </PhoneFrame>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <Button variant="outline" onClick={onBack} disabled={step === 0 || !!loading}>Volver</Button>
        {step < totalSteps - 1 ? (
          <Button onClick={onNext} disabled={!canGoNext || !!loading}>Siguiente</Button>
        ) : (
          !showPreview ? (
            <Button onClick={onFinalSubmit} disabled={!composedPrompt || !!loading || isGenerating}>
              {isGenerating ? (
                <span className="inline-flex items-center">
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Generando...
                </span>
              ) : (
                'Simular propuesta'
              )}
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setShowPreview(false)}>Editar</Button>
          )
        )}
      </div>
    </div>
  )
}


