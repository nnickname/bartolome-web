export type Complexity = 'low' | 'medium' | 'high'

export interface ParsedPrompt {
  features: string[]
  techStack: string[]
  complexity: Complexity
  deadline: string
}

export interface QuoteItem {
  feature: string
  hours: number
}

export interface Quote {
  scope: QuoteItem[]
  total_hours: number
  total_cost: number
  timeline: string
}

export interface UIComponentDesc {
  name: string
  description: string
  image_url?: string
}

export interface QuoteResultPayload {
  parsed: ParsedPrompt
  quote: Quote
  uiKit: UIComponentDesc[]
  leadId?: string
}

