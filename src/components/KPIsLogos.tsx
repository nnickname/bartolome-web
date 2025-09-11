import React from 'react'
import SectionHeading from './SectionHeading'

export default function KPIsLogos() {
  return (
    <section className="px-6 md:px-10 py-12 bg-muted">
      <div className="max-w-6xl mx-auto grid gap-10">
        <SectionHeading title="Resultados y confianza" subtitle="Métricas y clientes del sector" />
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="text-3xl font-extrabold">-27%</div>
            <div className="text-sm text-foreground/70 mt-1">desvíos de presupuesto</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="text-3xl font-extrabold">+32%</div>
            <div className="text-sm text-foreground/70 mt-1">velocidad en ofertas</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="text-3xl font-extrabold">98%</div>
            <div className="text-sm text-foreground/70 mt-1">acierto en mediciones estándar</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center opacity-80">
          {['Constructora Sur','Obras Norte','CIVILPRO','URBANA','INDUSCO','MEGA Obra'].map((name) => (
            <div key={name} className="h-12 bg-card border border-border rounded-md grid place-items-center text-xs text-foreground/60">
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
