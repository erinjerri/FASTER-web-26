import type { ElementType, ReactNode } from 'react'

type HeadingProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  size?: 'hero' | 'section' | 'article'
}

const sizes = {
  hero: 'font-heading text-[40px] font-black leading-[1.1] text-faster-heading',
  section: 'font-heading text-xl font-black leading-tight text-faster-heading',
  article: 'font-article text-4xl font-bold leading-tight text-faster-heading md:text-[60px]',
}

export function Heading({ as: Tag = 'h2', children, className = '', size = 'section' }: HeadingProps) {
  return <Tag className={`${sizes[size]} ${className}`}>{children}</Tag>
}

