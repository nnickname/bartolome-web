import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type Props = {
  name: string
  description: string
  image_url?: string
  business_outcome?: string
}

export function PortfolioCard({ name, description, image_url, business_outcome }: Props) {
  return (
    <Card className="overflow-hidden">
      {image_url ? (
        <img src={image_url} alt={name} className="h-40 w-full object-cover" />
      ) : (
        <div className="h-40 w-full bg-muted" />
      )}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-gray-300">{description}</p>
        {business_outcome && <p className="text-xs text-gray-400">Resultado: {business_outcome}</p>}
      </CardContent>
    </Card>
  )
}


