import type { ReactNode } from 'react'

export function RichText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`prose prose-lg max-w-none font-body text-faster-body prose-headings:font-heading ${className}`}>
      {children}
    </div>
  )
}

