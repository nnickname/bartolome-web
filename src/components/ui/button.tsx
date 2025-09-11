import React from 'react'
import clsx from 'clsx'

type Variant = 'default' | 'outline' | 'ghost'

type CommonProps = {
  variant?: Variant
  className?: string
}

type ButtonAsButton = React.ButtonHTMLAttributes<HTMLButtonElement> & CommonProps & { href?: undefined }

type ButtonAsLink = React.AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

export const Button: React.FC<ButtonProps> = ({ className, variant = 'default', ...props }) => {
  const base =
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2'
  const styles: Record<Variant, string> = {
    default: 'bg-primary text-primary-foreground hover:opacity-90',
    outline: 'border border-border bg-transparent hover:bg-muted',
    ghost: 'hover:bg-muted',
  }

  const classNames = clsx(base, styles[variant], className)

  if ('href' in props && props.href) {
    const { href, ...rest } = props
    return <a className={classNames} href={href} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />
  }

  return <button className={classNames} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} />
}


