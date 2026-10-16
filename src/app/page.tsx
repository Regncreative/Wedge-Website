import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Film } from '@/components/sections/Film'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Features } from '@/components/sections/Features'
import { Screens } from '@/components/sections/Screens'
import { DownloadSection } from '@/components/sections/DownloadSection'
import { FAQ } from '@/components/sections/FAQ'
import { Footer } from '@/components/sections/Footer'
import { IntroFilm } from '@/components/IntroFilm'
import { JsonLd } from '@/components/JsonLd'
import { fetchLatestRelease } from '@/lib/github'
import { LanguageProvider } from '@/lib/i18n'

export default async function Home() {
  const release = await fetchLatestRelease()
  const downloadUrl = release.downloadUrl ?? release.url

  return (
    <LanguageProvider>
      <JsonLd version={release.version} downloadUrl={downloadUrl} />
      <Navbar downloadUrl={downloadUrl} />
      <main className="flex-1">
        <Hero version={release.version} downloadUrl={downloadUrl} />
        <Film />
        <HowItWorks />
        <Features />
        <Screens />
        <DownloadSection
          version={release.version}
          downloadUrl={downloadUrl}
          releaseUrl={release.url}
        />
        <FAQ />
      </main>
      <Footer />
      <IntroFilm />
    </LanguageProvider>
  )
}
