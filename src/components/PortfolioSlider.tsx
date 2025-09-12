import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from './ui/button'
import { PortfolioCard } from './PortfolioCard'
import type { PortfolioItem } from '../types'

type Props = {
  items: PortfolioItem[]
}

export function PortfolioSlider({ items }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const rafRef = useRef<number | null>(null)
  const isHoveringRef = useRef(false)
  const pauseTimeoutRef = useRef<number | null>(null)

  const onScroll = () => {
    const el = containerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
  }

  const pauseAuto = (ms = 1200) => {
    if (pauseTimeoutRef.current) window.clearTimeout(pauseTimeoutRef.current)
    isHoveringRef.current = true
    pauseTimeoutRef.current = window.setTimeout(() => {
      isHoveringRef.current = false
    }, ms) as unknown as number
  }

  const scrollByCard = (dir: 'left' | 'right') => {
    const el = containerRef.current
    if (!el) return
    const cardWidth = (el.querySelector('[data-card]') as HTMLElement | null)?.offsetWidth || 320
    const gap = 24
    const delta = (cardWidth + gap) * (dir === 'left' ? -1 : 1)

    const atStart = el.scrollLeft <= 0
    const atEnd = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth - 1

    if (dir === 'right' && atEnd) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (dir === 'left' && atStart) {
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
    } else {
      el.scrollBy({ left: delta, behavior: 'smooth' })
    }
    pauseAuto()
  }

  const hasItems = items && items.length > 0

  // Autoplay suave (scroll continuo). Pausa en hover y en pantallas muy pequeñas no forzamos
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const speedPxPerFrame = 0.5 // más alto = más rápido

    const tick = () => {
      if (!el) return
      if (!isHoveringRef.current) {
        const atEnd = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth
        if (atEnd) {
          el.scrollLeft = 0
        } else {
          el.scrollLeft += speedPxPerFrame
        }
        onScroll()
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    const onResize = () => onScroll()
    window.addEventListener('resize', onResize)
    onScroll()
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      if (pauseTimeoutRef.current) window.clearTimeout(pauseTimeoutRef.current)
    }
  }, [])

  return (
    <div className="relative">
      <div
        ref={containerRef}
        onScroll={onScroll}
        onMouseEnter={() => { isHoveringRef.current = true }}
        onMouseLeave={() => { isHoveringRef.current = false }}
        className="portfolio-slider no-scrollbar overflow-x-auto"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div className="portfolio-track">
          {(hasItems ? items : []).map((p, index) => (
            <div key={p.id} data-card className="portfolio-slide">
              <PortfolioCard number={(index+1).toString()} kind={p.kind} name={p.name} description={p.description} images={p.images} business_outcome={p.business_outcome} />
            </div>
          ))}
        </div>
      </div>

      {/* Fades laterales */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-muted to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-muted to-transparent" />

      {/* Botones superpuestos */}
      <Button
        variant="outline"
        onClick={() => scrollByCard('left')}
        className="absolute z-20 left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full h-10 w-10 p-0 shadow bg-card/80 backdrop-blur border border-border hover:scale-105 transition-transform focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Anterior"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
      <Button
        variant="outline"
        onClick={() => scrollByCard('right')}
        className="absolute z-20 right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full h-10 w-10 p-0 shadow bg-card/80 backdrop-blur border border-border hover:scale-105 transition-transform focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Siguiente"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
    </div>
  )
}


