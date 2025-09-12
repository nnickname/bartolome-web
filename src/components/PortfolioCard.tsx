import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import DeviceShowcase from './DeviceShowcase'

type Props = {
  name: string
  description: string
  images?: string[],
  kind?: 'web' | 'appps' | 'other'
  business_outcome?: string
}

export function PortfolioCard({ name, description, images, business_outcome, kind}: Props) {
    const showStores = kind === 'appps'

  return (
    <Card className="overflow-hidden">
      <DeviceShowcase images={images ?? []} variant="card" />
      <CardHeader>
        <CardTitle>{name}</CardTitle>
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.365 1.43c.08.09.12.21.11.33a4.9 4.9 0 0 1-1.2 2.77c-.89 1.03-2.02 1.62-3.16 1.53-.1-.12-.18-.27-.24-.45a4.8 4.8 0 0 1 1.21-3.2c.9-1.05 2.19-1.79 3.18-1.98.15-.04.3.02.4.1ZM20.5 17.09c-.55 1.27-1.21 2.49-2.08 3.75-.79 1.12-1.72 2.5-3.02 2.52-1.3.03-1.72-.81-3.21-.81-1.49 0-1.95.79-3.23.84-1.28.05-2.25-1.2-3.04-2.32C4.1 19.76 3.05 17.5 3 15.39c-.04-1.21.22-2.43.79-3.49.86-1.6 2.26-2.61 3.8-2.64 1.19-.03 2.32.86 3.1.86.78 0 2.1-1.07 3.55-.91.6.03 2.28.24 3.36 1.8a6 6 0 0 0 .9 6.08Z" />
                </svg>
                <span>App Store</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#202124] text-white px-3 py-1.5 text-xs shadow hover:opacity-90 transition"
                title="Abrir en Google Play"
              >
                <svg width="14" height="14" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
                  <path d="M325.3 234.3 98.2 7.2C88.2 3.3 76.7 0 64 0 36.75 0 14.5 22.25 14.5 49.5v413c0 27.3 22.25 49.5 49.5 49.5 12.7 0 24.2-3.3 34.2-7.2l227.1-227.1-0.0-43.2z"/>
                  <path d="M361.8 270.8 317.7 256l44.1-14.8L454.1 148c5.9 9.2 9.4 20.2 9.4 32.1v151.7c0 11.9-3.5 22.9-9.4 32.1L361.8 270.8z"/>
                  <path d="M335.5 244.8 98.2 482.1c4.9 2 10.1 3.9 15.8 5.1 5.3 1.2 10.9 1.8 16.5 1.8 14.5 0 27.6-4.3 38.8-11.6l223.6-130.9-57.4-102.7z"/>
                  <path d="M98.2 7.2 335.5 244.5l57.4-102.7L169.3 10.9C158.1 3.6 145 0 130.5 0c-5.6 0-11.2.6-16.5 1.8-5.7 1.3-10.9 3.1-15.8 5.4z"/>
                </svg>
                <span>Google Play</span>
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


