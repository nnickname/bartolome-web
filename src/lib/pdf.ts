import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { QuoteResultPayload } from '@/types'

export async function generateQuotePdf(payload: QuoteResultPayload, prompt: string, email?: string) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595.28, 841.89])
  const { width } = page.getSize()

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const title = 'PymeTech IA - Propuesta'
  const sub = 'Cotización y Alcance'
  const margin = 40
  let y = 790

  const drawText = (text: string, size = 12, color = rgb(1,1,1)) => {
    page.drawText(text, { x: margin, y, size, font, color })
    y -= size + 8
  }

  drawText(title, 20, rgb(0, 0.88, 0.72))
  drawText(sub, 14)

  drawText(`Email: ${email || 'No proporcionado'}`)
  drawText(`Prompt del proyecto: ${prompt}`)
  y -= 8

  drawText(`Complejidad: ${payload.parsed.complexity}`)
  drawText(`Timeline: ${payload.quote.timeline}`)
  drawText(`Total horas: ${payload.quote.total_hours}`)
  drawText(`Total costo (USD): $${payload.quote.total_cost}`)

  y -= 10
  drawText('Alcance (features):', 14, rgb(0.9,0.9,0.9))
  y -= 4

  payload.quote.scope.forEach(item => {
    if (y < 80) {
      page.drawLine({ start: { x: margin, y: 60 }, end: { x: width - margin, y: 60 }, thickness: 0.5, color: rgb(0.2,0.2,0.2) })
      y = 790
      pdfDoc.addPage([595.28, 841.89])
    }
    drawText(`- ${item.feature} (${item.hours}h)`)
  })

  y -= 10
  drawText('UI Kit (descripciones):', 14, rgb(0.9,0.9,0.9))
  y -= 4

  payload.uiKit.forEach(ui => {
    drawText(`• ${ui.name}: ${ui.description}`)
  })

  const pdfBytes = await pdfDoc.save()
  return new Blob([pdfBytes], { type: 'application/pdf' })
}

