import React, { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select } from './ui/select'

export type HeroCalculatorProps = {
  onPrimaryClick?: () => void
  onSecondaryHref?: string
}

const obraTypes = [
  { id: 'residencial', label: 'Residencial' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'retail', label: 'Retail' },
  { id: 'oficinas', label: 'Oficinas' },
]

const cityFactors: Record<string, number> = {
  default: 1,
  caba: 1.15,
  gba: 1.05,
  interior: 0.95,
}

const baseCostPerM2: Record<string, number> = {
  residencial: 750,
  industrial: 1100,
  retail: 900,
  oficinas: 950,
}

export default function HeroCalculator({ onPrimaryClick, onSecondaryHref }: HeroCalculatorProps) {
  const [obra, setObra] = useState('industrial')
  const [m2, setM2] = useState('1200')
  const [ubicacion, setUbicacion] = useState('caba')

  const { min, max } = useMemo(() => {
    const m2Num = Math.max(0, Number(m2) || 0)
    const base = baseCostPerM2[obra] ?? baseCostPerM2.residencial
    const factor = cityFactors[ubicacion] ?? cityFactors.default
    const costo = base * factor * m2Num
    return { min: Math.round(costo * 0.9), max: Math.round(costo * 1.15) }
  }, [obra, m2, ubicacion])

  const fmt = (n: number) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle>¿Qué impacto tendría tu software?</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-[2fr_1fr] items-start">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm text-foreground/70">Foco del software</label>
            <Select value={obra} onChange={(e)=>setObra(e.target.value)}>
              {obraTypes.map(t => (<option key={t.id} value={t.id}>{t.label}</option>))}
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-foreground/70">Volumen (m² o equivalencia)</label>
            <Input type="number" min={0} value={m2} onChange={(e)=>setM2(e.target.value)} placeholder="Ej: 1200" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-foreground/70">Ubicación (para contexto)</label>
            <Select value={ubicacion} onChange={(e)=>setUbicacion(e.target.value)}>
              <option value="caba">CABA</option>
              <option value="gba">GBA</option>
              <option value="interior">Interior</option>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 space-y-2">
          <div className="text-xs text-foreground/70">Ahorro/CapEx evitado estimado</div>
          <div className="text-lg font-semibold">{fmt(min / 10)} – {fmt(max / 10)}</div>
          <p className="text-xs text-foreground/60">Estimación orientativa del valor generado por automatizar y estandarizar procesos clave. Profundizamos con tu caso.</p>
          <div className="flex gap-2 pt-1">
            <Button onClick={onPrimaryClick}>Completar formulario</Button>
            {onSecondaryHref && (
              <Button variant="outline">
                <a href={onSecondaryHref}>Agendar</a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
