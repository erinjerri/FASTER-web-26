import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'badge'

type BaseProps = {
  children: ReactNode
  className?: string
  href?: string
  variant?: ButtonVariant
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-faster-button-primary text-faster-button-primary-text hover:bg-faster-deep-teal focus-visible:outline-faster-teal-primary',
  secondary:
    'border border-faster-dark-text bg-faster-white text-faster-dark-text hover:bg-faster-gray-light focus-visible:outline-faster-teal-primary',
  badge:
    'bg-faster-button-primary text-faster-button-primary-text text-xs font-medium uppercase tracking-normal',
}

export function Button({
  children,
  className = '',
  href,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const classes = [
    'inline-flex min-h-10 items-center justify-center rounded-full px-6 py-2 font-ui text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    variant === 'badge' ? 'min-h-7 px-3 py-1' : '',
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <Link className={classes} href={href} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  )
}

