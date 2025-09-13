import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import DeviceShowcase from './DeviceShowcase'
import { Apple, Play } from 'lucide-react'

type Props = {
  name: string
  description: string
  images?: string[],
  kind?: 'web' | 'appps' | 'other'
  business_outcome?: string,
  number?: string,
  url?: string
}

export function PortfolioCard({ name, description, images, business_outcome, kind, number, url}: Props) {
    const showStores = kind === 'appps'
    const isWeb = kind === 'web' && url

  return (
    <Card className="overflow-hidden">
      <DeviceShowcase name={name.substring(0, 10) + '...'} number={number} images={images ?? []} variant="card" />
      <CardHeader>
        <CardTitle>
          {isWeb ? (
            <a href={url} target="_blank" rel="noreferrer" className="hover:underline">{name}</a>
          ) : (
            name
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-gray-300">{description}</p>
        {business_outcome && <p className="text-xs text-gray-400">Resultado: {business_outcome}</p>}
        {showStores && (
          <div className="pt-2">
            <p className="text-xs text-gray-400 mb-2">Disponible en</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-black text-white px-3 py-1.5 text-xs shadow hover:opacity-90 transition"
                title="Abrir en App Store"
              >
                <Apple size={14} aria-hidden="true" />
                <span>App Store</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#202124] text-white px-3 py-1.5 text-xs shadow hover:opacity-90 transition"
                title="Abrir en Google Play"
              >
                <Play size={14} aria-hidden="true" />
                <span>Google Play</span>
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


