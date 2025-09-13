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
import SectionHeading from './components/SectionHeading'

import honek1 from './assets/portfolio/honek1.png'
import honek2 from './assets/portfolio/honek2.png'

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
          { id: '1', name: 'Betless   - Deja de jugar y apostar', description: 'Deja atrás la adicción al juego para siempre con Betless, la app de recuperación anónima número 1 en la que confían miles de personas. Libérate de las apuestas deportivas, los juegos de casino y todos los hábitos de juego con herramientas probadas y el apoyo de la comunidad.', kind: 'appps',
            images: ['https://media.discordapp.net/attachments/828663612754231312/1415891884605313176/IMG_1812.png?ex=68c4db93&is=68c38a13&hm=c4fe1e709be3b5535985116e15b02175c733c151234adab3a03f699164406fc7&=&format=webp',
              'https://media.discordapp.net/attachments/828663612754231312/1415891884949241966/IMG_1811.png?ex=68c4db93&is=68c38a13&hm=471ada336a972659244da1ec2de695a503c51d5856338aa4237fe18c45fa6f32&=&format=webp'], business_outcome: '30% menos tiempo' },
          { id: '2', name: 'Honek', description: 'App de gestión hotelera vendida en Italia: reservas, housekeeping y panel de operaciones.', kind: 'appps',
            images: [honek1, honek2], business_outcome: '↑ eficiencia operativa 20%' },
          { id: '3', name: 'Meduplus', description: 'Directorio de servicios y beneficios de salud. Búsqueda por especialidad y ciudad, filtros rápidos y fichas de clínicas con datos de contacto, mapa y acciones de un toque como llamar, email o ver detalle. Navegación inferior para explorar y guardar favoritos.', kind: 'appps', images: ['https://media.discordapp.net/attachments/828663612754231312/1416065215535124531/IMG_1817.jpg?ex=68c57d00&is=68c42b80&hm=ed6b6e1f9929ae44da15dcb64d7e939fe4b98d6d16c40e0f439d83406869134f&=&format=webp',
                'https://media.discordapp.net/attachments/828663612754231312/1416065216529170562/IMG_1816.jpg?ex=68c57d00&is=68c42b80&hm=07b24548aa1667a2d9c2a8ed6c9ba620313b06aeebb2ae6e1d3df1266ba93a7f&=&format=webp'], business_outcome: '↑ Retención de pacientes 20%' },
          { id: '4', name: 'Invayt', description: 'Plataforma web en producción.', kind: 'web', url: 'https://invayt.com',
            images: ['https://nisdibzrgitfupvyhfes.supabase.co/storage/v1/object/public/event-images/1755124672134-web.png', 'https://nisdibzrgitfupvyhfes.supabase.co/storage/v1/object/public/event-images/1755124672134-web.png'], business_outcome: '↑ leads 25%' },
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
        <div className="max-w-8xl mx-auto mb-12 flex items-center justify-between">
            <span className="header-title">WeApps</span>
            <nav className="hidden md:flex gap-6 text-sm text-foreground/70">
              <button onClick={scrollToMaquetador} className="hover:text-foreground">Formulario</button>
              <Button variant="ghost" href={calendlyUrl} target="_blank" rel="noreferrer">Agendar</Button>
            </nav>
        </div>
        <div className="max-w-7xl mx-auto space-y-6">
          

          <SectionHeading
            title="Software con IA para PYMES — resultados en semanas"
            subtitle="Priorizamos un flujo, lo automatizamos y medimos impacto. Comencemos por el formulario."
          />
          
          <div className="relative my-12">
            <div className="h-px w-full mt-12 mb-4 bg-border" />
            <button
              onClick={scrollToMaquetador}
              aria-label="Ir al formulario"
              className="group absolute inset-x-0 -top-6 mx-auto h-12 w-12 rounded-full bg-foreground text-background grid place-items-center shadow-md hover:opacity-90 focus:outline-none animate-bounce"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 transition-transform group-hover:translate-y-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="pt-8 text-center">
              <button onClick={scrollToMaquetador} className="text-sm font-medium text-foreground hover:underline">Completar formulario</button>
            </div>
          </div>

          <HeroCalculator onPrimaryClick={scrollToMaquetador} onSecondaryHref={calendlyUrl} />

          <SectionHeading
            className="mt-10"
            title="Vista previa"
            subtitle="Ejemplo de interfaz y alcance inicial"
            underline={false}
          />

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
                    <li className="text-sm text-gray-300">Partes diarios y fotos centralizados — 20h</li>
                    <li className="text-sm text-gray-300">Alertas de desvíos y tablero — 30h</li>
                    <li className="text-sm text-gray-300">Certificados e hitos — 40h</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-12 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto space-y-6">
          <SectionHeading title="Demo IA" underline={true} />
          <IADemoUpload onPrimaryClick={scrollToMaquetador} onSecondaryHref={calendlyUrl} />
        </div>
      </section>

      <KPIsLogos />

      <section id="portafolio" className="px-6 md:px-10 py-12 bg-muted">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <SectionHeading title="Portafolio" subtitle="Casos por tipología" underline={false} />
            </div>
            <Button variant="outline" onClick={scrollToMaquetador}>Completar formulario</Button>
          </div>
          <PortfolioSlider items={portfolio} />
        </div>
      </section>

      <GuaranteesPRL />

      <section ref={maquetadorRef} id="simulador" className="px-6 md:px-10 py-12 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto space-y-6">
          <SectionHeading title="Simulador de propuesta" underline={true} />
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
        <div className="relative max-w-6xl mx-auto space-y-6">
          <SectionHeading title="Contacto" subtitle="Email y agenda para coordinar" underline={false} />
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4 order-2 md:order-1">
              <p className="text-foreground/70">Te ayudamos a identificar el primer flujo con mayor ROI, implementarlo en semanas y medir impacto.</p>
              <ul className="list-disc pl-5 text-foreground/70 space-y-1 text-sm">
                <li>Arrancamos con un flujo acotado y medible.</li>
                <li>Integraciones con tu stack (ERP, BI, correo, WhatsApp).</li>
                <li>Automatizaciones con IA y tableros de control.</li>
                <li>Soporte y evolución trimestral.</li>
              </ul>
              <div className="flex gap-2">
                <Button onClick={scrollToMaquetador}>Completar formulario</Button>
                <Button variant="outline" href={calendlyUrl} target="_blank" rel="noreferrer">Agendar</Button>
              </div>
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
          <div className="justify-self-end text-foreground/60">Consultoría y desarrollo de software con IA para constructoras.</div>
        </div>
      </footer>
    </div>
  )
}

