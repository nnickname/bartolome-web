import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PhoneFrame } from '../components/AiAppPreview'
import { Button } from '../components/ui/button'

export default function Preview() {
  const navigate = useNavigate()
  const location = useLocation() as any
  const state = (location && location.state) || {}
  const {
    html,
    composedPrompt,
    objetivo,
    publico,
    kpi,
    plataformas,
    presupuesto,
    deadline,
    fuentes,
    capacidadesIA,
    integraciones,
  } = state

  return (
    <div className="px-6 md:px-10 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="text-lg font-semibold">Vista previa de tu app</div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/')}>Editar formulario</Button>
            <Button onClick={() => navigate('/', { replace: true })}>Finalizar</Button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="justify-self-center">
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
          <div className="space-y-3">
            <div>
              <div className="text-sm text-foreground/70">HTML para IA (mock)</div>
              <textarea readOnly value={html || ''} className="mt-2 w-full h-[520px] font-mono text-xs rounded-md border border-border bg-card p-3" />
            </div>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <Info label="KPI" value={kpi} />
              <Info label="Plataformas" value={plataformas} />
              <Info label="Presupuesto" value={presupuesto} />
              <Info label="Deadline" value={deadline} />
              <Info label="Fuentes" value={fuentes} />
              <Info label="IA" value={capacidadesIA} />
              <Info label="Integraciones" value={integraciones} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="text-xs text-foreground/60">{label}</div>
      <div className="text-sm text-foreground/90 mt-0.5">{value || '—'}</div>
    </div>
  )
}


