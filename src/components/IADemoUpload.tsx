import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Table, THead, TBody, TR, TH, TD } from './ui/table'

export type IADemoUploadProps = {
  onPrimaryClick?: () => void
  onSecondaryHref?: string
}

export default function IADemoUpload({ onPrimaryClick, onSecondaryHref }: IADemoUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null)
  const [step, setStep] = useState<number>(0)
  const [running, setRunning] = useState(false)

  const steps = [
    'Leyendo adjuntos',
    'Extrayendo datos',
    'Generando insights',
    'Armando tablero',
  ]

  useEffect(() => {
    if (!running) return
    if (step >= steps.length) return
    const t = window.setTimeout(() => {
      setStep((s) => s + 1)
    }, 900)
    return () => window.clearTimeout(t)
  }, [running, step])

  const completed = step >= steps.length

  // Auto-iniciar el demo cuando el componente entra al viewport si aún no se subió nada
  useEffect(() => {
    if (running || fileName) return
    const el = document.getElementById('demo-ia')
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      const isVisible = entries.some((entry) => entry.isIntersecting)
      if (isVisible) {
        setFileName('Ejemplo - Partes diarios.xlsx')
        setStep(0)
        setRunning(true)
        observer.disconnect()
      }
    }, { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [running, fileName])

  const onChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      setFileName(f.name)
      setStep(0)
      setRunning(true)
    }
  }

  const rows = useMemo(() => (
    [
      { funcionalidad: 'Partes diarios centralizados', area: 'Obra', impacto: '-2h/día consolidación', estado: 'Listo' },
      { funcionalidad: 'Detección de desvíos vs. plan', area: 'Control', impacto: '-15% desviaciones', estado: 'Listo' },
      { funcionalidad: 'Certificados y hitos', area: 'Oficina técnica', impacto: '+30% velocidad', estado: 'Listo' },
      { funcionalidad: 'Integración ERP/BI', area: 'Gestión', impacto: 'Datos en tiempo real', estado: 'Opcional' },
    ]
  ), [])

  return (
    <Card id="demo-ia" className="border-dashed">
      <CardHeader>
        <CardTitle>Demo: cómo la IA acelera tus flujos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
          

        <ol className="flex items-center gap-3">
          {steps.map((label, i) => {
            const isCompleted = i < step
            const isCurrent = i === step
            const showSpinner = running && isCurrent && !completed
            return (
              <li key={label} className="flex items-center gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={
                      isCompleted
                        ? 'h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs grid place-items-center'
                        : isCurrent && !completed
                        ? 'h-7 w-7 rounded-full ring-2 ring-primary/60 bg-card text-foreground text-xs grid place-items-center'
                        : 'h-7 w-7 rounded-full bg-muted text-foreground/60 text-xs grid place-items-center'
                    }
                  >
                    {showSpinner ? <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"/> : i + 1}
                  </div>
                  <span className={isCurrent ? 'text-xs text-foreground' : 'text-xs text-foreground/70'}>{label}</span>
                </div>
                {i < steps.length - 1 && <div className="h-px flex-1 bg-border" />}
              </li>
            )
          })}
        </ol>

        {completed ? (
          <div className="space-y-3">
            <div className="text-sm text-foreground/70">Resultado preliminar</div>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table className="table-auto">
                <THead>
                  <TR>
                    <TH>Funcionalidad</TH>
                    <TH>Área</TH>
                    <TH>Impacto</TH>
                    <TH className="text-right">Estado</TH>
                  </TR>
                </THead>
                <TBody>
                  {rows.map((r, idx) => (
                    <TR key={idx}>
                      <TD>{r.funcionalidad}</TD>
                      <TD>{r.area}</TD>
                      <TD>{r.impacto}</TD>
                      <TD className="text-right">{r.estado}</TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
              <p className="text-xs text-foreground/60">¿Querés este flujo en tu empresa? Avanzá al siguiente paso.</p>
              <div className="flex gap-2">
                <Button onClick={onPrimaryClick}>Completar formulario</Button>
                {onSecondaryHref && (
                  <Button variant="outline" href={onSecondaryHref}>Agendar</Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-foreground/60">Mostramos un ejemplo de funcionalidades cuando termina el procesamiento.</p>
        )}
      </CardContent>
    </Card>
  )
}
