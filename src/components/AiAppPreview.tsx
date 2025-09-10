import React from 'react'

/**
 * AiAppPreview
 *
 * Mock visual súper básico de cómo podría verse una app generada con IA.
 * No tiene lógica; es solo UI para dar contexto en la vista previa.
 */
export function AiAppPreview() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PhoneFrame>
        <div className="p-4">
          <div className="text-lg font-semibold">New Task</div>
          <div className="mt-4 flex gap-2">
            <Chip active>Today</Chip>
            <Chip>Tomorrow</Chip>
          </div>
          <div className="mt-6 space-y-2 text-sm">
            <Label>Project</Label>
            <div className="flex gap-2">
              <Bubble>Holidays in Norway</Bubble>
              <Bubble muted>Daily Tasks</Bubble>
            </div>
            <Label className="mt-4">Title</Label>
            <InputGhost placeholder="Purchase travel insurance" />
            <InputGhost placeholder="Description (optional)" />
          </div>
          <button className="mt-6 w-full rounded-full bg-foreground text-background text-sm py-3">Create</button>
        </div>
      </PhoneFrame>

      <PhoneFrame gradient="from-cyan-500 to-blue-600">
        <div className="p-4">
          <div className="text-sm text-foreground/70">Hello, Michael</div>
          <div className="text-2xl font-bold leading-7 mt-1">Your Projects <span className="opacity-70">(4)</span></div>
        </div>
        <div className="px-4">
          <CardGradient title="Holidays in Norway" progress="8/10 tasks" />
          <div className="h-3" />
          <CardGradient title="Daily Tasks" progress="2/4" tint="from-amber-400 to-pink-500" />
        </div>
      </PhoneFrame>

      
    </div>
  )
}

function PhoneFrame({ children, gradient }: { children: React.ReactNode; gradient?: string }) {
  return (
    <div className="relative w-full aspect-[9/19] rounded-[28px] border border-border bg-card shadow-lg overflow-hidden">
      <div className="absolute inset-0">
        <div className={`absolute inset-x-0 top-0 h-40 rounded-b-[40px] bg-gradient-to-br ${gradient ?? 'from-muted to-muted'} opacity-80`} />
        <div className="absolute inset-x-0 top-0 h-6 bg-card/40 backdrop-blur-sm rounded-b-xl" />
      </div>
      <div className="relative h-full">
        {children}
      </div>
    </div>
  )
}

function Chip({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span className={active ? 'px-3 py-1 rounded-full bg-foreground text-background text-xs' : 'px-3 py-1 rounded-full border border-border text-xs'}>{children}</span>
  )
}

function Bubble({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <span className={muted ? 'px-2.5 py-1 rounded-full bg-muted text-foreground/80 text-xs' : 'px-2.5 py-1 rounded-full bg-primary/20 text-foreground text-xs'}>{children}</span>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`text-xs text-foreground/70 ${className ?? ''}`}>{children}</div>
}

function InputGhost({ placeholder }: { placeholder: string }) {
  return (
    <div className="w-full rounded-full border border-border bg-card text-foreground/80 text-xs px-3 py-2">
      {placeholder}
    </div>
  )
}

function CardGradient({ title, progress, tint }: { title: string; progress: string; tint?: string }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden h-40 bg-gradient-to-br ${tint ?? 'from-cyan-500 to-blue-600'}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
      <div className="absolute inset-0 px-4 py-3 text-white/95">
        <div className="text-xl font-semibold drop-shadow-sm">{title}</div>
        <div className="mt-8 text-xs opacity-90">{progress}</div>
        <div className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-white/90 text-black grid place-items-center text-xl">+</div>
      </div>
    </div>
  )
}

function TodoItem({ text, checked }: { text: string; checked?: boolean }) {
  return (
    <div className="flex items-center gap-2 py-2">
      <span className={`h-4 w-4 rounded-full border ${checked ? 'bg-white/90 border-white/90' : 'border-white/90'} grid place-items-center`}>{checked ? '✓' : ''}</span>
      <span className={checked ? 'text-white/90 text-sm line-through' : 'text-white/95 text-sm'}>{text}</span>
    </div>
  )
}

export default AiAppPreview


