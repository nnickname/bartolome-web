import React from 'react'

export type SectionHeadingProps = {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({ title, subtitle, align = 'left', className }: SectionHeadingProps) {
  return (
    <div className={className ?? ''}>
      <div className={align === 'center' ? 'text-center' : 'text-left'}>
        <h2 className="text-2xl mr-2 md:text-3xl font-semibold inline-block relative pb-2">
          {title}
          <span className="block absolute left-0 -bottom-0.5 h-[3px] bg-primary" style={{ width: '50%' }} />
        </h2>
        {subtitle && (
          <div className={align === 'center' ? 'mt-2 inline-block' : 'mt-2 inline-block'}>
            <span className="text-sm px-2 py-1 rounded bg-primary text-foreground/80 border border-border">
              {subtitle}
            </span>
          </div>
        )}
      </div>
    </div>
  )}
