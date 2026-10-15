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
    softwareVersion: version,
    image: `${SITE.url}/brand/og.png`,
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
