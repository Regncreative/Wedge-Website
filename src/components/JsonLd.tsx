import { SITE } from '@/lib/constants'

export function JsonLd({ version, downloadUrl }: { version: string; downloadUrl: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE.name,
    alternateName: 'Stash',
    operatingSystem: 'Windows 10, Windows 11',
    applicationCategory: 'UtilitiesApplication',
    description: SITE.description,
    url: SITE.url,
    downloadUrl,
    installUrl: SITE.msStore,
    softwareVersion: version,
    image: `${SITE.url}/brand/og.png`,
    video: {
      '@type': 'VideoObject',
      name: 'Wedge in 56 seconds',
      description:
        'Files pile up, the edge of the screen takes them, and they come back into any app.',
      thumbnailUrl: `${SITE.url}/video/wedge-film-en.jpg`,
      contentUrl: `${SITE.url}/video/wedge-film-en.mp4`,
      uploadDate: '2026-10-16',
      duration: 'PT56S',
    },
    author: {
      '@type': 'Organization',
      name: SITE.author,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    license: SITE.license,
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
