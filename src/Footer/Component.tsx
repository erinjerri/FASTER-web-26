import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'

const fallbackColumns = [
  {
    heading: 'ARCHIVE',
    links: [
      { label: 'Substack', href: '#' },
      { label: 'YouTube', href: '#' },
      { label: 'Blog', href: '/blog' },
      { label: 'FASTER Collection (Museum, Wikimedia Foundation)', href: '#' },
    ],
  },
  {
    heading: 'JOIN',
    links: [
      { label: 'FASTER FACETS', href: '/join#facets' },
      { label: 'FASTER FRESH', href: '/join#fresh' },
      { label: 'FASTER Education', href: '/join#education' },
      { label: 'FASTER PROS', href: '/join#pros' },
    ],
  },
  {
    heading: 'ORGANIZATION',
    links: [
      { label: 'Donate', href: '/donate' },
      { label: 'About', href: '/about' },
      { label: 'Store', href: '/store' },
    ],
  },
  {
    heading: 'LEGAL',
    links: [
      { label: 'Accessibility Statement', href: '/legal/accessibility' },
      { label: 'Cookie Consent Policy', href: '/legal/cookies' },
      { label: 'Copyright Notice', href: '/legal/copyright' },
      { label: 'Data Storage Disclosure', href: '/legal/data-storage' },
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms & Conditions', href: '/legal/terms' },
    ],
  },
]

interface FooterProps {
  data?: FooterType | null
}

export async function Footer({ data }: FooterProps = {}) {
  const columns =
    data?.linkGroups?.length
      ? data.linkGroups.map((group) => ({
          heading: group.header || '',
          links:
            group.links
              ?.map((item) => {
                const link = item.link
                if (!link?.label) return null
                return {
                  label: link.label,
                  href:
                    link.type === 'archive' && link.archive
                      ? link.archive === 'posts'
                        ? '/blog'
                        : `/${link.archive}`
                      : link.url || '#',
                }
              })
              .filter((item): item is { href: string; label: string } => Boolean(item)) || [],
        }))
      : fallbackColumns

  return (
    <footer className="mt-auto bg-faster-footer text-faster-muted">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" prefetch={false} className="font-heading text-3xl font-black text-faster-heading">
              FASTER
            </Link>
            <p className="max-w-sm font-body text-base leading-relaxed">
              Filipinx Americans in Science, Technology, Engineering, Arts, and Mathematics.
            </p>
          </div>

          <nav className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" aria-label="Footer">
            {columns.map((column) => (
              <div key={column.heading} className="flex flex-col gap-3">
                <h2 className="font-ui text-2xl font-bold text-faster-heading">{column.heading}</h2>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={`${column.heading}-${link.label}`}>
                      <Link
                        href={link.href}
                        prefetch={false}
                        className="font-ui text-base font-medium hover:text-faster-heading"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-faster-gray-mid pt-6 font-ui text-sm">
          {data?.copyright ||
            '© FASTER - Filipinx Americans in STEAM. All rights reserved. Made with PayloadCMS.'}
        </div>
      </div>
    </footer>
  )
}

