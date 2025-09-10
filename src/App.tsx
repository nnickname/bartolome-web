import React, { useEffect, useRef, useState } from 'react'
import { PortfolioCard } from './components/PortfolioCard'
import { Maquetador } from './components/Maquetador'
import { QuoteResult } from './components/QuoteResult'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { generateQuote } from './api/quote'
import { supabase } from './lib/supabase'
import { QuoteResultPayload } from './types'
import { InlineWidget } from 'react-calendly'
import { generateQuotePdf } from './lib/pdf'

type PortfolioItem = { id: string; name: string; description: string; image_url?: string; business_outcome?: string }

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
      const { data, error } = await supabase.from('portfolio').select('*').order('name', { ascending: true })
      if (error) {
        setPortfolio([
          { id: '1', name: 'MedPlus', description: 'Health-tech app, redujo tiempos de gestión 30%', image_url: '', business_outcome: '30% menos tiempo' },
          { id: '2', name: 'Betless', description: 'Plataforma de apuestas, aumentó conversiones', image_url: '', business_outcome: '↑ conversiones' }
        ])
      } else {
        setPortfolio(data as PortfolioItem[])
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
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/90 border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-10 h-14">
          <span className="font-semibold text-foreground">PymeTech</span>
          <nav className="hidden md:flex gap-6 text-sm text-foreground/70">
            <button onClick={scrollToMaquetador} className="hover:text-foreground">Formulario</button>
            <a href="#portafolio" className="hover:text-foreground">Portafolio</a>
          </nav>
        </div>
      </header>
      <section ref={maquetadorRef} className="px-6 md:px-10 py-12 bg-background">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <Card className="order-2 md:order-1">
            <CardHeader>
              <CardTitle>Cuéntanos tu proyecto</CardTitle>
            </CardHeader>
            <CardContent>
              <Maquetador onSubmit={onSubmit} loading={loading} />
              {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
            </CardContent>
          </Card>
          <div className="order-1 md:order-2 space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground">Software a medida con IA</h1>
            <p className="text-foreground/70">
              Genera una estimación inicial de alcance, costos y tiempos. Te ayudamos a priorizar y lanzar rápido con impacto real en tu negocio.
            </p>
            <Button variant="outline" onClick={scrollToMaquetador}>Volver al formulario</Button>
          </div>
        </div>
      </section>

      <section id="portafolio" className="px-6 md:px-10 py-12 bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Portafolio</h2>
            <Button variant="outline" onClick={scrollToMaquetador}>Obtener cotización</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {portfolio.map(p => (
              <PortfolioCard key={p.id} name={p.name} description={p.description} image_url={p.image_url} business_outcome={p.business_outcome}/>
            ))}
          </div>
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

