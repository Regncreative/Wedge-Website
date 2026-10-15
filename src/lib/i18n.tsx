'use client'

import { createContext, useContext, useEffect, useSyncExternalStore } from 'react'

export type Lang = 'en' | 'tr'

const en = {
  nav: {
    how: 'How it works',
    features: 'Features',
    screens: 'Screens',
    download: 'Download',
    faq: 'FAQ',
    downloadBtn: 'Download',
  },
  install: {
    open: 'Installation help',
    close: 'Close',
    title: 'Installing Wedge on Windows',
    intro:
      'Wedge comes as a small Windows installer (`.exe`) from GitHub Releases. Until the app is code-signed, Windows may show a SmartScreen prompt the first time.',
    steps: [
      'Download the latest **Wedge** installer (`Wedge_<version>_x64-setup.exe`).',
      'Open it. No administrator rights are needed.',
      'If **Windows protected your PC** appears, click **More info**, then **Run anyway**.',
      'On first start, choose whether Wedge starts with Windows and adds **Add to Wedge** to File Explorer’s right-click menu.',
      'Start dragging a file: your shelves slide out of the right edge of the screen. `Ctrl+Shift+Space` opens a drawer any time.',
    ],
    blockedTitle: 'Still blocked?',
    blockedBody:
      'Right-click the `.exe` → **Properties** → check **Unblock** → **OK**, then run it again.',
    whyTitle: 'Why does this happen?',
    whyBody:
      'SmartScreen warns about new downloads that are not yet code-signed. Wedge is open source: you can read the code and download the official build from GitHub Releases. Updates are signature-checked by the app itself.',
    source: 'Source code',
    release: 'Release page',
  },
  hero: {
    renamed: 'Stash is now Wedge',
    title: 'Wedge your files into the edge of your screen.',
    tagline:
      'Start dragging a file and your shelves slide out. Drop it, keep working, and drag it into any app when you need it. Your files stay where they are.',
    downloadBtn: 'Download for Windows',
    githubBtn: 'View on GitHub',
    meta: ['Free and open source', 'Windows 10 and 11', '5 MB'],
  },
  demo: {
    label: 'Interactive demo of Wedge on a desktop',
    hintDrag: 'Grab a file and start dragging',
    hintDrop: 'Drop it on a shelf',
    hintOpen: 'Click a tab to pull the shelf out',
    hintOut: 'Drag a card back to the desktop',
    hintDone: 'That’s the whole idea. Try another file.',
    reset: 'Start over',
    tryIt: 'Try it yourself',
    play: 'Play the demo',
    close: 'Close',
    empty: 'Drop files on this tab',
    files: (n: number) => (n === 1 ? '1 file' : `${n} files`),
    shelves: [
      { id: 'pocket', name: 'Pocket', sub: 'DRAG LATER' },
      { id: 'work', name: 'Work', sub: 'KEPT' },
      { id: 'personal', name: 'Personal', sub: 'KEPT' },
      { id: 'temp', name: 'Temporary', sub: 'CLEARS IN 24 H' },
    ],
    desktop: ['Proposal.pdf', 'Cover.png', 'Pitch.pptx', 'Budget.xlsx'],
  },
  how: {
    eyebrow: 'How it works',
    title: 'One move to put a file away, one to get it back',
    description: 'No window to find, no folder to open. The shelves are already at the edge.',
    steps: [
      {
        title: 'Start dragging',
        body: 'From File Explorer, the desktop or a browser. The moment a drag starts, colored shelf tabs slide out of the screen edge.',
      },
      {
        title: 'Drop on a shelf',
        body: 'Work, Personal, the Pocket, a shared folder: drop on the tab you want and the tabs tuck back in.',
      },
      {
        title: 'Drag it out',
        body: 'Click a tab to pull the shelf out like a drawer, then drag a card into a mail, a chat or any app.',
      },
    ],
  },
  features: {
    eyebrow: 'Features',
    title: 'A shelf that keeps up with you',
    description:
      'Wedge only remembers where your files are. Nothing is moved, copied or uploaded unless you ask.',
    groups: [
      {
        title: 'Collect from anywhere',
        items: [
          'Tabs that slide out the moment you drag a file',
          'A Pocket that gathers files from different folders, then lets you drag them all out at once',
          'Automatic shelves for new downloads and screenshots',
          'Right-click → Add to Wedge, Ctrl+V, or send from your phone with a QR code',
        ],
      },
      {
        title: 'Share',
        items: [
          'Turn a Google Drive, OneDrive or Dropbox folder into a shelf',
          'What a friend, or your other PC, puts there shows up on your shelf',
        ],
      },
      {
        title: 'Find and use',
        items: [
          'Real previews on every card; Space for Quick Look',
          'Search inside PDF, Word, Excel and PowerPoint files',
          'ZIP, convert and shrink images, open all, drag a whole shelf as one ZIP',
          'Notes, tags, reminders and shelves that clear themselves',
        ],
      },
      {
        title: 'Quiet by design',
        items: [
          'No CPU use while it waits at the edge',
          'Steps aside for full-screen games, videos and presentations',
          'Desktop widgets, dark and light themes, Turkish and English',
          'No account, no ads, no telemetry',
        ],
      },
    ],
  },
  screens: {
    eyebrow: 'Screens',
    title: 'The real app, as it looks today',
    description: 'Shelf tabs on the edge, a drawer pulled out, the Pocket and settings.',
    items: [
      {
        src: '/screens/panel-dark.png',
        alt: 'A shelf pulled out as a drawer, dark theme',
        caption: 'A drawer, dark theme',
      },
      {
        src: '/screens/pocket.png',
        alt: 'The Pocket with files to drag out together',
        caption: 'The Pocket',
      },
      {
        src: '/screens/panel-light.png',
        alt: 'A shelf pulled out as a drawer, light theme',
        caption: 'A drawer, light theme',
      },
      {
        src: '/screens/shared-shelf.png',
        alt: 'Creating a shared shelf from a cloud folder',
        caption: 'Shared shelves',
      },
      { src: '/screens/settings.png', alt: 'Wedge settings', caption: 'Settings' },
    ],
  },
  download: {
    eyebrow: 'Download',
    title: 'Get Wedge for Windows',
    description:
      'Free and open source. A 5 MB installer that uses the WebView2 engine built into Windows, and updates itself, signature-checked.',
    latestVersion: 'Latest version',
    downloadBtn: 'Download Wedge',
    releasesBtn: 'All releases',
    facts: ['Windows 10 and 11, 64-bit', 'No administrator rights', 'No account'],
    renamed: 'Using Stash? It updates to Wedge by itself and keeps every shelf and setting.',
    smartscreen: 'Windows may warn about a new download. Here’s what to do.',
    store: 'Coming to the Microsoft Store.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Straight answers',
    description:
      'Short version: your files stay put, nothing leaves your PC, and it’s open source.',
    items: [
      {
        q: 'Does Wedge move or copy my files?',
        a: 'No. It remembers where a file is; the file stays where it was. Removing it from a shelf never deletes it from disk. Only shared shelves copy files, into the shared folder you picked.',
      },
      {
        q: 'Why is Stash called Wedge now?',
        a: 'It’s the same app with a new name and logo from version 2.0. Wedge says what it does: it wedges your files into the edge of the screen. Stash updates to Wedge by itself and keeps your shelves and settings.',
      },
      {
        q: 'How does it know I’m dragging a file?',
        a: 'Windows shows a small picture next to the cursor while you drag files. Wedge notices that picture appear and disappear; it doesn’t read your keyboard or mouse.',
      },
      {
        q: 'Does it need an account or upload anything?',
        a: 'No account, no sign-in, no cloud. Shelves and settings stay on your PC. The only thing it fetches is updates from GitHub.',
      },
      {
        q: 'Does it run on Windows 10?',
        a: 'Yes, Windows 10 and 11 (64-bit).',
      },
      {
        q: 'Is it open source?',
        a: 'Yes. Wedge is MIT-licensed and developed in the open on GitHub.',
      },
    ],
  },
  footer: {
    github: 'GitHub',
    releases: 'Releases',
    privacy: 'Privacy',
    license: 'License',
    formerly: 'Formerly Stash',
  },
}

export type Dict = typeof en

const tr: Dict = {
  nav: {
    how: 'Nasıl çalışır',
    features: 'Özellikler',
    screens: 'Ekranlar',
    download: 'İndir',
    faq: 'SSS',
    downloadBtn: 'İndir',
  },
  install: {
    open: 'Kurulum yardımı',
    close: 'Kapat',
    title: 'Wedge’i Windows’a kurmak',
    intro:
      'Wedge, GitHub Releases’ten küçük bir Windows kurulum dosyası (`.exe`) olarak gelir. Uygulama kod imzalı olana kadar Windows ilk seferde SmartScreen uyarısı gösterebilir.',
    steps: [
      'En son **Wedge** kurulum dosyasını indir (`Wedge_<sürüm>_x64-setup.exe`).',
      'Aç. Yönetici izni gerekmez.',
      '**Windows bilgisayarınızı korudu** çıkarsa **Ek bilgi**, sonra **Yine de çalıştır**’a tıkla.',
      'İlk açılışta Wedge’in Windows ile başlayıp başlamayacağını ve Dosya Gezgini’nin sağ tık menüsüne **Wedge’e ekle** eklenip eklenmeyeceğini seç.',
      'Bir dosyayı sürüklemeye başla: rafların ekranın sağ kenarından çıkar. `Ctrl+Shift+Space` istediğin an bir çekmece açar.',
    ],
    blockedTitle: 'Hâlâ engelleniyor mu?',
    blockedBody:
      '`.exe` dosyasına sağ tıkla → **Özellikler** → **Engellemeyi kaldır** kutusunu işaretle → **Tamam**, sonra yeniden çalıştır.',
    whyTitle: 'Bu neden oluyor?',
    whyBody:
      'SmartScreen, henüz kod imzası olmayan yeni indirmeler için uyarır. Wedge açık kaynaklıdır: kodunu okuyabilir, resmî derlemeyi GitHub Releases’ten indirebilirsin. Güncellemelerin imzasını uygulama kendisi doğrular.',
    source: 'Kaynak kodu',
    release: 'Sürüm sayfası',
  },
  hero: {
    renamed: 'Stash artık Wedge',
    title: 'Dosyalarını ekranının kenarına sıkıştır.',
    tagline:
      'Bir dosyayı sürüklemeye başla, rafların kenardan çıksın. Bırak, işine devam et; gerektiğinde istediğin uygulamaya sürükle. Dosyaların yerinde kalır.',
    downloadBtn: 'Windows için indir',
    githubBtn: 'GitHub’da gör',
    meta: ['Ücretsiz ve açık kaynak', 'Windows 10 ve 11', '5 MB'],
  },
  demo: {
    label: 'Masaüstünde Wedge’in etkileşimli demosu',
    hintDrag: 'Bir dosyayı tutup sürüklemeye başla',
    hintDrop: 'Bir rafa bırak',
    hintOpen: 'Rafı çekmek için bir sekmeye tıkla',
    hintOut: 'Bir kartı masaüstüne geri sürükle',
    hintDone: 'Bütün fikir bu. Başka bir dosya dene.',
    reset: 'Baştan başla',
    tryIt: 'Kendin dene',
    play: 'Demoyu oynat',
    close: 'Kapat',
    empty: 'Dosyaları bu sekmeye bırak',
    files: (n: number) => `${n} dosya`,
    shelves: [
      { id: 'pocket', name: 'Cep', sub: 'SONRA SÜRÜKLE' },
      { id: 'work', name: 'İş', sub: 'KALICI' },
      { id: 'personal', name: 'Kişisel', sub: 'KALICI' },
      { id: 'temp', name: 'Geçici', sub: '24 SAATTE BOŞALIR' },
    ],
    desktop: ['Teklif.pdf', 'Kapak.png', 'Sunum.pptx', 'Bütçe.xlsx'],
  },
  how: {
    eyebrow: 'Nasıl çalışır',
    title: 'Bir hareketle kaldır, bir hareketle geri al',
    description: 'Aranacak pencere, açılacak klasör yok. Raflar zaten kenarda.',
    steps: [
      {
        title: 'Sürüklemeye başla',
        body: 'Dosya Gezgini’nden, masaüstünden ya da tarayıcıdan. Sürükleme başladığı an renkli raf sekmeleri ekranın kenarından çıkar.',
      },
      {
        title: 'Bir rafa bırak',
        body: 'İş, Kişisel, Cep ya da paylaşılan bir klasör: istediğin sekmeye bırak, sekmeler geri çekilsin.',
      },
      {
        title: 'Geri sürükle',
        body: 'Bir sekmeye tıkla, raf çekmece gibi açılsın; kartı bir e-postaya, sohbete ya da herhangi bir uygulamaya sürükle.',
      },
    ],
  },
  features: {
    eyebrow: 'Özellikler',
    title: 'Senin hızına yetişen bir raf',
    description:
      'Wedge yalnızca dosyalarının nerede olduğunu hatırlar. Sen istemedikçe hiçbir şey taşınmaz, kopyalanmaz ya da yüklenmez.',
    groups: [
      {
        title: 'Her yerden topla',
        items: [
          'Bir dosyayı sürüklediğin an kenardan çıkan sekmeler',
          'Farklı klasörlerden dosya toplayıp hepsini bir seferde sürükleyebileceğin Cep',
          'Yeni indirmeler ve ekran görüntüleri için otomatik raflar',
          'Sağ tık → Wedge’e ekle, Ctrl+V ya da QR kodla telefondan gönder',
        ],
      },
      {
        title: 'Paylaş',
        items: [
          'Google Drive, OneDrive veya Dropbox klasörünü rafa dönüştür',
          'Arkadaşının ya da diğer bilgisayarının oraya koyduğu dosyalar senin rafında görünür',
        ],
      },
      {
        title: 'Bul ve kullan',
        items: [
          'Her kartta gerçek önizleme; Space ile Hızlı Bakış',
          'PDF, Word, Excel ve PowerPoint dosyalarının içinde arama',
          'ZIP, resim dönüştürme ve küçültme, hepsini açma, bütün rafı tek ZIP olarak sürükleme',
          'Notlar, etiketler, hatırlatıcılar ve kendini temizleyen raflar',
        ],
      },
      {
        title: 'Sessiz çalışır',
        items: [
          'Kenarda beklerken işlemciyi kullanmaz',
          'Tam ekran oyun, video ve sunumlarda kenara çekilir',
          'Masaüstü bileşenleri, koyu ve açık tema, Türkçe ve İngilizce',
          'Hesap yok, reklam yok, veri toplama yok',
        ],
      },
    ],
  },
  screens: {
    eyebrow: 'Ekranlar',
    title: 'Uygulamanın bugünkü hali',
    description: 'Kenardaki raf sekmeleri, açılmış bir çekmece, Cep ve ayarlar.',
    items: [
      {
        src: '/screens/panel-dark.png',
        alt: 'Çekmece gibi açılmış bir raf, koyu tema',
        caption: 'Çekmece, koyu tema',
      },
      { src: '/screens/pocket.png', alt: 'Birlikte sürüklenecek dosyalarla Cep', caption: 'Cep' },
      {
        src: '/screens/panel-light.png',
        alt: 'Çekmece gibi açılmış bir raf, açık tema',
        caption: 'Çekmece, açık tema',
      },
      {
        src: '/screens/shared-shelf.png',
        alt: 'Bulut klasöründen paylaşılan raf oluşturma',
        caption: 'Paylaşılan raflar',
      },
      { src: '/screens/settings.png', alt: 'Wedge ayarları', caption: 'Ayarlar' },
    ],
  },
  download: {
    eyebrow: 'İndir',
    title: 'Windows için Wedge',
    description:
      'Ücretsiz ve açık kaynak. Windows’taki WebView2 motorunu kullanan 5 MB’lık bir kurulum; güncellemelerini imzasını doğrulayarak kendisi yapar.',
    latestVersion: 'Son sürüm',
    downloadBtn: 'Wedge’i indir',
    releasesBtn: 'Tüm sürümler',
    facts: ['Windows 10 ve 11, 64 bit', 'Yönetici izni gerekmez', 'Hesap gerekmez'],
    renamed:
      'Stash mi kullanıyorsun? Kendiliğinden Wedge’e güncellenir; bütün rafların ve ayarların korunur.',
    smartscreen: 'Windows yeni bir indirme için uyarabilir. Ne yapacağın burada.',
    store: 'Microsoft Store’a geliyor.',
  },
  faq: {
    eyebrow: 'SSS',
    title: 'Kısa ve net',
    description: 'Özetle: dosyaların yerinde kalır, hiçbir şey bilgisayarından çıkmaz, kodu açık.',
    items: [
      {
        q: 'Wedge dosyalarımı taşır ya da kopyalar mı?',
        a: 'Hayır. Bir dosyanın nerede olduğunu hatırlar; dosya olduğu yerde kalır. Raftan kaldırmak onu diskten silmez. Yalnızca paylaşılan raflar, seçtiğin paylaşılan klasöre dosya kopyalar.',
      },
      {
        q: 'Stash’in adı neden Wedge oldu?',
        a: '2.0 sürümüyle aynı uygulama yeni bir isim ve logo aldı. Wedge ne yaptığını söylüyor: dosyalarını ekranın kenarına sıkıştırıyor. Stash kendiliğinden Wedge’e güncellenir, rafların ve ayarların korunur.',
      },
      {
        q: 'Dosya sürüklediğimi nereden biliyor?',
        a: 'Windows, dosya sürüklerken imlecin yanında küçük bir resim gösterir. Wedge bu resmin belirip kaybolduğunu fark eder; klavyeni ya da fareni okumaz.',
      },
      {
        q: 'Hesap gerekiyor mu, bir şey yüklüyor mu?',
        a: 'Hesap yok, giriş yok, bulut yok. Raflar ve ayarlar bilgisayarında kalır. İnternetten aldığı tek şey GitHub’daki güncellemeler.',
      },
      {
        q: 'Windows 10’da çalışır mı?',
        a: 'Evet, Windows 10 ve 11’de (64 bit).',
      },
      {
        q: 'Açık kaynak mı?',
        a: 'Evet. Wedge MIT lisanslıdır ve GitHub’da açık olarak geliştirilir.',
      },
    ],
  },
  footer: {
    github: 'GitHub',
    releases: 'Sürümler',
    privacy: 'Gizlilik',
    license: 'Lisans',
    formerly: 'Eski adıyla Stash',
  },
}

export const COPY: Record<Lang, Dict> = { en, tr }

const STORAGE_KEY = 'wedge-lang'

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dict
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => undefined,
  t: en,
})

// The chosen language lives outside React: read once from storage in the
// browser, English on the server and for first-time visitors.
const listeners = new Set<() => void>()
let chosen: Lang | null = null

function readSaved(): Lang {
  try {
    // Carry over the choice made on the Stash site.
    const saved =
      window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem('stash-lang')
    return saved === 'tr' ? 'tr' : 'en'
  } catch {
    return 'en'
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function choose(lang: Lang) {
  chosen = lang
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // Storage unavailable: the choice lasts for this visit.
  }
  listeners.forEach((listener) => listener())
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(
    subscribe,
    () => (chosen ??= readSaved()),
    () => 'en' as Lang,
  )

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = choose

  return (
    <LangContext.Provider value={{ lang, setLang, t: COPY[lang] }}>{children}</LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
