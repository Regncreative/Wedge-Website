import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Instrument_Sans, Martian_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SITE } from '@/lib/constants'
import './globals.css'

// The same faces as the app.
const display = Bricolage_Grotesque({
  variable: '--font-display',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})
const body = Instrument_Sans({
  variable: '--font-body',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})
const mono = Martian_Mono({
  variable: '--font-mono',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}: ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author }],
  creator: SITE.author,
  keywords: [
    'Wedge',
    'Stash',
    'file shelf',
    'Windows 11',
    'Windows 10',
    'drag and drop',
    'productivity',
    'screen edge',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name}: ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: '/brand/og.png',
        width: 1200,
        height: 630,
        alt: 'Wedge: three shelf tabs coming out of the edge of the screen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name}: ${SITE.tagline}`,
    description: SITE.description,
    images: ['/brand/og.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=4', sizes: 'any' },
      { url: '/favicon.svg?v=4', type: 'image/svg+xml' },
      { url: '/icon.png?v=4', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=4', sizes: '256x256' }],
    shortcut: '/favicon.ico?v=4',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#14151c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
