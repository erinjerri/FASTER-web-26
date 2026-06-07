import type { ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <article className={`rounded-lg border border-faster-gray-border bg-faster-card p-6 ${className}`}>
      {children}
    </article>
  )
}

