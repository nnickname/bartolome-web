import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import SectionHeading from './SectionHeading'

export default function GuaranteesPRL() {
  return (
    <section className="px-6 md:px-10 py-12 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto space-y-6">
        <SectionHeading title="Garantías y PRL" subtitle="Trazabilidad, seguridad y calidad" />
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Trazabilidad por partida</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/70 space-y-2">
              <p>Precios con fuente y rendimiento usado. Cada partida muestra unidad, cantidad y coste unitario.</p>
              <ul className="list-disc pl-5">
                <li>Catálogo referenciado</li>
                <li>Rendimientos documentados</li>
                <li>Historial de versiones</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PRL y cumplimiento</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/70 space-y-2">
              <p>Buenas prácticas de seguridad y salud integradas en el flujo de obra.</p>
              <ul className="list-disc pl-5">
                <li>Checklist PRL por etapa</li>
                <li>Registros y evidencias</li>
                <li>Alertas preventivas</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certificaciones</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/70 space-y-2">
              <p>Procesos orientados a estándares de calidad.</p>
              <ul className="list-disc pl-5">
                <li>ISO 9001 (orientación)</li>
                <li>Gestión documental</li>
                <li>Auditoría de cambios</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
