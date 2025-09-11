import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import SectionHeading from './SectionHeading'

export default function GuaranteesPRL() {
  return (
    <section className="px-6 md:px-10 py-12 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto space-y-6">
        <SectionHeading title="Garantías de software" />
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Trazabilidad de requisitos y cambios</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/70 space-y-2">
              <p>Historias de usuario, alcance y cambios versionados. Cada entrega referencia tickets, PRs y métricas.</p>
              <ul className="list-disc pl-5">
                <li>Backlog y roadmap visibles</li>
                <li>Versionado semántico y changelog</li>
                <li>Demo y staging disponibles</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seguridad y cumplimiento</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/70 space-y-2">
              <p>Prácticas de seguridad integradas en el ciclo de vida del software.</p>
              <ul className="list-disc pl-5">
                <li>Revisión de código y escaneo de dependencias</li>
                <li>Gestión de secretos y control de accesos (RBAC)</li>
                <li>Registro de auditoría y GDPR básico</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calidad y soporte</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/70 space-y-2">
              <p>Entregas confiables y continuidad operativa después del lanzamiento.</p>
              <ul className="list-disc pl-5">
                <li>Pruebas automáticas y QA exploratorio</li>
                <li>Monitoreo y alertas en producción</li>
                <li>Soporte post-lanzamiento y acuerdos de nivel de servicio</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
