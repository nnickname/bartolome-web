import React from 'react'
import SectionHeading from './SectionHeading'

export default function KPIsLogos() {
  return (
    <section className="px-6 md:px-10 py-12 bg-muted">
      <div className="max-w-6xl mx-auto grid gap-10">
        <SectionHeading title="Resultados y confianza" underline={false} />
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="text-3xl font-extrabold">+3.1×</div>
            <div className="text-sm text-foreground/70 mt-1">frecuencia de despliegues</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="text-3xl font-extrabold">-41%</div>
            <div className="text-sm text-foreground/70 mt-1">lead time de entrega</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="text-3xl font-extrabold">99.9%</div>
            <div className="text-sm text-foreground/70 mt-1">uptime último trimestre</div>
          </div>
        </div>

        
      </div>
    </section>
  )
}
