'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import type { Header } from '@/payload-types'

type NavItem = {
  href: string
  label: string
  variant?: 'link' | 'button'
}

const fallbackNavItems: NavItem[] = [
  { label: 'ABOUT', href: '/about' },
  { label: 'DISCOVER', href: '/discover' },
  { label: 'READ', href: '/blog' },
  { label: 'WATCH', href: '/watch' },
  { label: 'DONATE', href: '/donate' },
  { label: 'JOIN', href: '/join', variant: 'button' },
]

const normalizePath = (value: string) => (value === '/' ? '/' : value.replace(/\/+$/, ''))

const resolveHeaderItems = (data: Header | null): NavItem[] => {
  const cmsItems = data?.navItems
    ?.map(({ link }) => {
      if (!link?.label) return null

      if (link.type === 'custom' && link.url) {
        return { href: link.url, label: link.label, variant: link.label === 'JOIN' ? 'button' : 'link' }
      }

      if (link.type === 'archive' && link.archive) {
        return {
          href: link.archive === 'posts' ? '/blog' : `/${link.archive}`,
          label: link.label,
          variant: link.label === 'JOIN' ? 'button' : 'link',
        }
      }

      if (
        link.type === 'reference' &&
        link.reference &&
        typeof link.reference.value === 'object' &&
        link.reference.value &&
        'slug' in link.reference.value &&
        link.reference.value.slug
      ) {
        const base = link.reference.relationTo === 'posts' ? '/blog' : ''
        return {
          href: `${base}/${link.reference.value.slug}`,
          label: link.label,
          variant: link.label === 'JOIN' ? 'button' : 'link',
        }
      }

      return null
    })
    .filter((item): item is NavItem => Boolean(item))

  return cmsItems?.length ? cmsItems : fallbackNavItems
}

export const HeaderClient: React.FC<{ data: Header | null; initialPathname: string }> = ({
  data,
  initialPathname,
}) => {
  const pathnameFromHook = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = pathnameFromHook || initialPathname || '/'
  const navItems = resolveHeaderItems(data)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const renderLink = (item: NavItem) => {
    const isActive = normalizePath(pathname) === normalizePath(item.href)
    const isButton = item.variant === 'button'

    return (
      <Link
        key={item.href}
        href={item.href}
        prefetch={false}
        className={[
          'inline-flex min-h-10 items-center justify-center rounded px-4 py-2 font-ui text-sm font-medium transition-colors',
          isButton || isActive
            ? 'bg-faster-nav-active text-faster-nav-activeText'
            : 'text-faster-nav-text hover:bg-white/10 hover:text-white',
        ].join(' ')}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-faster-nav-bg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          prefetch={false}
          className="font-heading text-xl font-black leading-none text-white"
          aria-label="FASTER home"
        >
          FASTER
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-2 md:flex">
          {navItems.map(renderLink)}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded text-faster-nav-text md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-faster-nav-bg px-4 py-4 md:hidden">
          <nav aria-label="Mobile primary" className="flex flex-col gap-2">
            {navItems.map(renderLink)}
          </nav>
        </div>
      ) : null}
    </header>
  )
}

