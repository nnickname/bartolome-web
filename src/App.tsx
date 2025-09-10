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

      <footer className="px-6 md:px-10 py-10 border-t border-border text-sm text-foreground/60 bg-card">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span>© {new Date().getFullYear()} PymeTech</span>
        </div>
      </footer>
    </div>
  )
}

