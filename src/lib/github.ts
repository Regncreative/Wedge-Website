import { SITE } from './constants'

export type LatestRelease = {
  version: string
  url: string
  downloadUrl: string | null
  publishedAt: string | null
}

export async function fetchLatestRelease(): Promise<LatestRelease> {
  try {
    const res = await fetch(`https://api.github.com/repos/${SITE.repo}/releases/latest`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'wedge-website',
      },
    })

    if (!res.ok) {
      return fallbackRelease()
    }

    const data = (await res.json()) as {
      tag_name?: string
      html_url?: string
      published_at?: string
      assets?: Array<{ name: string; browser_download_url: string }>
    }

    // The regular installer (Wedge_<version>_x64-setup.exe), not the Store one.
    const setupAsset =
      data.assets?.find((asset) => /^wedge_.*_x64-setup\.exe$/i.test(asset.name)) ??
      data.assets?.find((asset) => /setup\.exe$/i.test(asset.name) && !/store/i.test(asset.name))

    return {
      version: (data.tag_name ?? SITE.versionFallback).replace(/^v/, ''),
      url: data.html_url ?? SITE.latestRelease,
      downloadUrl: setupAsset?.browser_download_url ?? SITE.latestRelease,
      publishedAt: data.published_at ?? null,
    }
  } catch {
    return fallbackRelease()
  }
}

function fallbackRelease(): LatestRelease {
  return {
    version: SITE.versionFallback,
    url: SITE.latestRelease,
    downloadUrl: SITE.latestRelease,
    publishedAt: null,
  }
}
