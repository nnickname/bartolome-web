import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { UIComponentDesc, QuoteResultPayload } from '@/types'

type Props = {
  data: QuoteResultPayload
  onDownloadPdf: () => Promise<void>
}

export function QuoteResult({ data, onDownloadPdf }: Props) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tu simulación de propuesta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2 md:grid-cols-4">
            <Stat label="Complejidad" value={data.parsed.complexity.toUpperCase()} />
            <Stat label="Timeline" value={data.quote.timeline} />
            <Stat label="Horas" value={String(data.quote.total_hours)} />
            <Stat label="Costo (desde)" value={`USD 499`} />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Alcance orientativo (capacidades con IA)</h4>
            <ul className="list-disc pl-5 space-y-1">
              {data.quote.scope.map((s, i) => (
                <li key={i} className="text-sm text-gray-300">{s.feature} — {s.hours}h</li>
              ))}
            </ul>
          </div>

          <Button onClick={onDownloadPdf}>Descargar propuesta (PDF)</Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Exploración de UI (wireframes + IA en la experiencia)</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {data.uiKit.map((c: UIComponentDesc, idx: number) => (
            <Card key={idx}>
              {c.image_url ? <img src={c.image_url} className="h-32 w-full object-cover" /> : <div className="h-32 bg-muted" />}
              <CardContent>
                <h4 className="font-semibold">{c.name}</h4>
                <p className="text-sm text-gray-300">{c.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="space-y-2 py-6">
          <p>Este resultado es una simulación inicial enfocada en innovación con IA. En una breve revisión afinamos alcance, riesgos y hitos. Precio desde <span className="font-semibold">USD 499</span>.</p>
        </CardContent>
      </Card>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-3 bg-card">
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  )
}


