import React from 'react'
import { PhoneFrame } from './AiAppPreview'

type DeviceShowcaseProps = {
  images: string[]
  className?: string
  variant?: 'section' | 'card'
}

/**
 * DeviceShowcase
 * Sección con fondo gradiente que muestra screenshots dentro de un mockup de teléfono.
 * Pasá un array de imágenes (urls o imports) y se renderizan enmarcadas.
 */
export default function DeviceShowcase({ images, className, variant = 'section' }: DeviceShowcaseProps) {
  const first = images[0]
  const second = images[1] ?? images[0]

  

  return (
    <section className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600/30 via-fuchsia-500/20 to-sky-500/20 border border-border ${className ?? ''}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_10%,rgba(255,255,255,0.18),transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-14 grid gap-10 md:grid-cols-[1fr_auto] items-center">
        <div className="space-y-3">
          <h3 className="text-2xl md:text-3xl font-bold leading-tight">#1</h3>
          <p className="text-foreground/70 max-w-md">Betless</p>
        </div>
        <div className="relative h-[620px] md:h-[560px]">
          <div className="absolute right-0 top-0">
            <PhoneFrame platform="ios">
              <ScreenshotFill src={first} compensateTop />
            </PhoneFrame>
          </div>
          <div className="absolute -left-40 bottom-10 hidden md:block">
            <PhoneFrame platform="ios">
              <ScreenshotFill src={second} compensateTopSmall />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  )
}

function ScreenshotFill({ src, compensateTop, compensateTopSmall }: { src: string; compensateTop?: boolean; compensateTopSmall?: boolean }) {
  return (
    <div className={`absolute inset-0 ${compensateTop ? '-mt-8' : ''} ${compensateTopSmall ? '-mt-6' : ''}`}>
      <img src={src} alt="App screenshot" className="h-full w-full object-cover" />
    </div>
  )
}


