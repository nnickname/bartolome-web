import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Table, THead, TBody, TR, TH, TD } from './ui/table'

export default function IADemoUpload() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [step, setStep] = useState<number>(0)
  const [running, setRunning] = useState(false)

  const steps = [
    'Leyendo planos',
    'Extrayendo mediciones',
    'Calculando rendimientos',
    'Generando partidas',
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
      { partida: 'Movimiento de suelo', unidad: 'm³', cantidad: 1200, unitario: 18.5 },
      { partida: 'Hormigón H21', unidad: 'm³', cantidad: 850, unitario: 155 },
      { partida: 'Acero ADN 420', unidad: 'kg', cantidad: 42000, unitario: 2.1 },
      { partida: 'Mampostería hueca 18cm', unidad: 'm²', cantidad: 2600, unitario: 23 },
    ]
  ), [])

  const total = rows.reduce((acc, r) => acc + r.cantidad * r.unitario, 0)
  const fmt = (n: number) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <Card id="demo-ia" className="border-dashed">
      <CardHeader>
        <CardTitle>Demo: de planos a partidas en minutos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-[1fr_auto] gap-3 items-end">
          <div>
            <label className="text-sm text-foreground/70">Subí tus planos PDF/DWG</label>
            <div className="mt-2">
              <input type="file" accept=".pdf,.dwg" onChange={onChooseFile} />
            </div>
            {fileName && <p className="text-xs text-foreground/60 mt-1">Archivo: {fileName}</p>}
          </div>
          <Button onClick={() => { setStep(0); setRunning(true) }} disabled={!fileName || running}>Procesar con IA</Button>
        </div>

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
                    <TH>Partida</TH>
                    <TH>Unidad</TH>
                    <TH className="text-right">Cantidad</TH>
                    <TH className="text-right">Unitario</TH>
                    <TH className="text-right">Total</TH>
                  </TR>
                </THead>
                <TBody>
                  {rows.map((r, idx) => (
                    <TR key={idx}>
                      <TD>{r.partida}</TD>
                      <TD>{r.unidad}</TD>
                      <TD className="text-right">{r.cantidad.toLocaleString('es-AR')}</TD>
                      <TD className="text-right">{fmt(r.unitario)}</TD>
                      <TD className="text-right">{fmt(r.cantidad * r.unitario)}</TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground/70">Total preliminar</p>
              <div className="text-lg font-semibold">{fmt(total)}</div>
            </div>
            <p className="text-xs text-foreground/60">Puedes solicitar revisión humana para cerrar precio y alcance definitivo.</p>
          </div>
        ) : (
          <p className="text-xs text-foreground/60">Mostramos un resultado de ejemplo cuando termina el procesamiento.</p>
        )}
      </CardContent>
    </Card>
  )
}
