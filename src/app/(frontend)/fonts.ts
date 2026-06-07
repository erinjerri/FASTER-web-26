/**
 * Performance: `display: "swap"` + `adjustFontFallback` limit FOIT/CLS; subset + weight list
 * trims bytes vs loading full variable axes.
 */
import { Inter, Montserrat, Open_Sans, Poppins } from 'next/font/google'

/**
 * Public site typography only: these classes are applied on `<html>` in
 * `src/app/(frontend)/layout.tsx` (`frontendFontVariables`). Payload admin
 * (`src/app/(payload)/layout.tsx`) does not use this file — changing fonts in
 * the CMS admin UI will not affect the marketing site.
 *
 * After changing families here, update the human-readable fallbacks in
 * `globals.css` (`--font-title` / `--font-copy`) so the stack matches.
 */
export const fontOpenSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  variable: '--font-family-body',
  weight: ['400', '500', '600', '700'],
})

export const fontPoppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  variable: '--font-family-heading',
  weight: ['400', '500', '700', '900'],
})

export const fontMontserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  variable: '--font-family-article',
  weight: ['300', '400', '500', '700'],
})

export const fontInter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  variable: '--font-family-ui',
  weight: ['400', '500', '700'],
})

/**
 * Space-separated variable classes for `<html>`.
 * Do not pass this through `tailwind-merge` / `cn()` — hashed names can be mishandled.
 */
export const frontendFontVariables = `${fontOpenSans.variable} ${fontPoppins.variable} ${fontMontserrat.variable} ${fontInter.variable}`
