import type { ReactNode } from 'react'

export function Grid({
  children,
  className = '',
  columns = 3,
}: {
  children: ReactNode
  className?: string
  columns?: 2 | 3 | 4
}) {
  const desktopColumns = {
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  }[columns]

  return <div className={`grid gap-6 md:grid-cols-2 ${desktopColumns} ${className}`}>{children}</div>
}

