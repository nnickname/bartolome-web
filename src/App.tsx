import React, { useEffect, useRef, useState } from 'react'
import { Maquetador } from './components/Maquetador'
import { QuoteResult } from './components/QuoteResult'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { generateQuote } from './api/quote'
import { supabase } from './lib/supabase'
import { QuoteResultPayload, PortfolioItem } from './types'
import { InlineWidget } from 'react-calendly'
import { generateQuotePdf } from './lib/pdf'
import { PortfolioSlider } from './components/PortfolioSlider'
import AiAppPreview from './components/AiAppPreview'
import HeroCalculator from './components/HeroCalculator'
import IADemoUpload from './components/IADemoUpload'
import KPIsLogos from './components/KPIsLogos'
import GuaranteesPRL from './components/GuaranteesPRL'


export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<QuoteResultPayload | null>(null)

  const calendlyUrl = import.meta.env.VITE_CALENDLY_URL as string
  const contactEmail = (import.meta.env.VITE_CONTACT_EMAIL as string) || 'hola@pymetech.com'
  const maquetadorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    
    ;(async () => {
      //const { data, error } = await supabase.from('portfolio').select('*').order('name', { ascending: true })
      if (true) {
        setPortfolio([
          { id: '1', name: 'MedPlus', description: 'Health-tech app, redujo tiempos de gestión 30%', image_url: 'https://nisdibzrgitfupvyhfes.supabase.co/storage/v1/object/public/event-images/1755124672134-web.png', business_outcome: '30% menos tiempo' },
          { id: '2', name: 'Betless', description: 'Plataforma de apuestas, aumentó conversiones', image_url: 'https://nisdibzrgitfupvyhfes.supabase.co/storage/v1/object/public/event-images/1755124672134-web.png', business_outcome: '↑ conversiones' },
          { id: '3', name: 'StoreFlow', description: 'Ecommerce B2B con catálogos personalizados y checkout en 1 clic', image_url: 'https://nisdibzrgitfupvyhfes.supabase.co/storage/v1/object/public/event-images/1755124672134-web.png', business_outcome: '↑ ticket medio 18%' },
          { id: '4', name: 'EduTrack', description: 'Plataforma edtech con analíticas de aprendizaje y gamificación', image_url: 'https://nisdibzrgitfupvyhfes.supabase.co/storage/v1/object/public/event-images/1755124672134-web.png', business_outcome: '↑ retención 22%' }

        ])
      } else {
        setPortfolio([] as PortfolioItem[])
      }
    })()
  }, [])

  const scrollToMaquetador = () => {
    maquetadorRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const onSubmit = async (prompt: string, email?: string) => {
    setError(null)
    setLoading(true)
    try {
      const data = await generateQuote(prompt, email)
      setResult(data)
    } catch (e: any) {
      setError(e?.message || 'Error al generar la cotización')
    } finally {
      setLoading(false)
    }
  }

  const onDownloadPdf = async () => {
    if (!result) return
    const blob = await generateQuotePdf(result, 'Prompt del usuario', undefined)
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'PymeTech-Propuesta.pdf'
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <section className="px-6 md:px-10 py-12 bg-background">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <span className="header-title">WeApps</span>
            <nav className="hidden md:flex gap-6 text-sm text-foreground/70">
              <button onClick={scrollToMaquetador} className="hover:text-foreground">Cotizar al instante</button>
              <a href="#portafolio" className="hover:text-foreground">Portafolio</a>
            </nav>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-brand animate-gradient-x">Presupuestos de obra en minutos con IA — sin sorpresas</h1>
          
          <div className="relative my-12">
            <div className="h-px w-full mt-12 mb-4 bg-border" />
            <button
              onClick={scrollToMaquetador}
              aria-label="Cotizar al instante"
              className="group absolute inset-x-0 -top-6 mx-auto h-12 w-12 rounded-full bg-foreground text-background grid place-items-center shadow-md hover:opacity-90 focus:outline-none animate-bounce"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 transition-transform group-hover:translate-y-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="pt-8 text-center">
              <button onClick={scrollToMaquetador} className="text-sm font-medium text-foreground hover:underline">Cotizar al instante</button>
            </div>
          </div>

          <HeroCalculator onPrimaryClick={scrollToMaquetador} />

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>Cómo se vería la app (mock visual)</CardTitle>
              </CardHeader>
              <CardContent>
                <AiAppPreview />
              </CardContent>
            </Card>
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>Vista previa de la cotización</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2 md:grid-cols-4">
                  <div className="rounded-lg border border-border p-3 bg-card">
                    <div className="text-xs text-gray-400">Complejidad</div>
                    <div className="text-base font-semibold">MEDIA</div>
                  </div>
                  <div className="rounded-lg border border-border p-3 bg-card">
                    <div className="text-xs text-gray-400">Timeline</div>
                    <div className="text-base font-semibold">6–8 semanas</div>
                  </div>
                  <div className="rounded-lg border border-border p-3 bg-card">
                    <div className="text-xs text-gray-400">Horas</div>
                    <div className="text-base font-semibold">32h</div>
                  </div>
                  <div className="rounded-lg border border-border p-3 bg-card">
                    <div className="text-xs text-gray-400">Costo (desde)</div>
                    <div className="text-base font-semibold">USD 499</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Alcance (ejemplo constructora)</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li className="text-sm text-gray-300">Carga de partes diarios con fotos (web/móvil) — 20h</li>
                    <li className="text-sm text-gray-300">Comparación avance vs. plan y alertas de desvío — 30h</li>
                    <li className="text-sm text-gray-300">Panel de obra con hitos y certificados — 40h</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-12 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto">
          <IADemoUpload />
        </div>
      </section>

      <KPIsLogos />

      <section id="portafolio" className="px-6 md:px-10 py-12 bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Portafolio</h2>
            <Button variant="outline" onClick={scrollToMaquetador}>Obtener cotización</Button>
          </div>
          <PortfolioSlider items={portfolio} />
        </div>
      </section>

      <GuaranteesPRL />

      <section ref={maquetadorRef} id="simulador" className="px-6 md:px-10 py-12 bg-background border-t border-border">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Contanos tu necesidad</CardTitle>
            </CardHeader>
            <CardContent>
              <Maquetador onSubmit={onSubmit} loading={loading} />
              {error && <p className="text-sm text-error mt-3">{error}</p>}
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contacto" className="px-6 md:px-10 py-16 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-muted to-transparent" />
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-semibold">¿Listo para hablar?</h2>
            <p className="text-foreground/70">Desarrollamos software a medida con IA para PYMEs en LATAM. Priorizamos rápido, entregamos en semanas y medimos impacto real en tu negocio.</p>
            <ul className="list-disc pl-5 text-foreground/70 space-y-1 text-sm">
              <li>De idea a MVP en 6–8 semanas, con foco en conversión.</li>
              <li>Integraciones con tu stack (ERP, pasarelas de pago, BI).</li>
              <li>Automatizaciones con IA para reducir costes y tiempos operativos.</li>
              <li>Acompañamiento de producto: métricas, experimentos y growth.</li>
            </ul>
            <p className="text-foreground/70 text-sm">Cuando quieras, en la tarjeta de la derecha tienes nuestro email y la agenda.</p>
          </div>
          <Card className="order-1 md:order-2">
            <CardHeader>
              <CardTitle>Contacto directo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-foreground/70">
              <div className="flex items-center justify-between">
                <span>Email</span>
                <a href={`mailto:${contactEmail}`} className="text-foreground hover:cursor-pointer">{contactEmail}</a>
              </div>
              <div className="flex items-center justify-between">
                <span>Calendly</span>
                <a href={calendlyUrl} target="_blank" rel="noreferrer" className="text-foreground hover:cursor-pointer">Abrir agenda</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {result && (
        <section className="px-6 md:px-10 py-12 border-t border-border bg-background">
          <div className="max-w-3xl mx-auto space-y-8">
            <QuoteResult data={result} onDownloadPdf={onDownloadPdf} />
            <Card>
              <CardHeader>
                <CardTitle>Agenda una llamada para priorizar</CardTitle>
              </CardHeader>
              <CardContent>
                <InlineWidget url={calendlyUrl} styles={{ height: '700px' }} />
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <footer className="px-6 md:px-10 py-12 border-t border-border text-sm bg-card">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-[1fr_auto_1fr] items-center">
          <div className="justify-self-start">
            <span className="font-semibold text-foreground">PymeTech</span>
            <p className="mt-1 text-foreground/60">© {new Date().getFullYear()} PymeTech</p>
          </div>
          <nav className="justify-self-center flex gap-6 text-foreground/70">
            <button onClick={scrollToMaquetador} className="hover:text-foreground">Formulario</button>
            <a href="#portafolio" className="hover:text-foreground">Portafolio</a>
            <a href="#contacto" className="hover:text-foreground">Contacto</a>
          </nav>
          <div className="justify-self-end text-foreground/60">Consultoría y desarrollo de software a medida con IA.</div>
        </div>
      </footer>
    </div>
  )
}

