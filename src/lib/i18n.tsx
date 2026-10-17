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
    storeTip:
      'Rather skip the warning? Get Wedge Shelf from the Microsoft Store; Microsoft signs it.',
  },
  store: {
    badgeAlt: 'Download from the Microsoft Store',
  },
  hero: {
    renamed: 'Stash is now Wedge',
    title: 'Wedge your files into the edge of your screen.',
    tagline:
      'Start dragging a file and your shelves slide out. Drop it, keep working, and drag it into any app when you need it. Your files stay where they are.',
    downloadBtn: 'Download for Windows',
    githubBtn: 'View on GitHub',
    meta: ['Free and open source', 'Windows 10 and 11', '5 MB'],
    videoLabel:
      'Animation: files slide into shelf tabs on the screen edge, then come back out of a drawer into an app.',
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
  film: {
    label: 'Wedge, the 56-second film, with voice and captions',
    play: 'Watch the film',
  },
  screens: {
    eyebrow: 'Screens',
    title: 'The real app, as it looks today',
    description:
      'Taken from Wedge itself: the tabs on the edge, a drawer, the Pocket and settings.',
    items: [
      {
        src: '/screens/en/edge-tabs.jpg',
        alt: 'Four shelf tabs out of the right edge of the screen',
        caption: 'Tabs on the edge',
        body: 'They slide out the moment a drag starts.',
      },
      {
        src: '/screens/en/drawer-dark.jpg',
        alt: 'The Work shelf pulled out as a drawer, dark theme',
        caption: 'A drawer',
        body: 'Real previews, notes, tags and pins.',
      },
      {
        src: '/screens/en/pocket.jpg',
        alt: 'The Pocket with two files ready to drag out together',
        caption: 'The Pocket',
        body: 'Collect, then drag them all out at once.',
      },
      {
        src: '/screens/en/drawer-light.jpg',
        alt: 'The Work shelf pulled out as a drawer, light theme',
        caption: 'Light theme',
        body: 'Or follow Windows.',
      },
      {
        src: '/screens/en/shared-shelf.jpg',
        alt: 'Turning a cloud folder into a shared shelf',
        caption: 'Shared shelves',
        body: 'A Google Drive, OneDrive or Dropbox folder as a shelf.',
      },
      {
        src: '/screens/en/settings.jpg',
        alt: 'Wedge settings',
        caption: 'Settings',
        body: 'Theme, accent color, shortcut, what to catch.',
      },
    ],
  },
  download: {
    eyebrow: 'Download',
    title: 'Get Wedge for Windows',
    description:
      'Free and open source. A 5 MB installer that uses the WebView2 engine built into Windows, and updates itself, signature-checked.',
    latestVersion: 'Latest version',
    downloadBtn: 'Download Wedge',
    releasesBtn: 'All releases and release notes on GitHub',
    facts: ['Windows 10 and 11, 64-bit', 'No administrator rights', 'No account'],
    renamed: 'Using Stash? It updates to Wedge by itself and keeps every shelf and setting.',
    smartscreen: 'Windows may warn about a new download. Here’s what to do.',
    store:
      'Also in the Microsoft Store as Wedge Shelf: signed by Microsoft, no SmartScreen warning, updated by the Store.',
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
        q: 'Microsoft Store or the installer?',
        a: 'Same app, pick either. The Store version (Wedge Shelf) is signed by Microsoft and the Store keeps it updated; the installer updates itself from GitHub. If you switch to the Store, its first start takes over your shelves.',
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
    storeTip:
      'Uyarıyla uğraşmak istemiyor musun? Wedge Shelf’i Microsoft Store’dan al; Microsoft imzalı.',
  },
  store: {
    badgeAlt: 'Microsoft Store’dan indirin',
  },
  hero: {
    renamed: 'Stash artık Wedge',
    title: 'Dosyalarını ekranının kenarına sıkıştır.',
    tagline:
      'Bir dosyayı sürüklemeye başla, rafların kenardan çıksın. Bırak, işine devam et; gerektiğinde istediğin uygulamaya sürükle. Dosyaların yerinde kalır.',
    downloadBtn: 'Windows için indir',
    githubBtn: 'GitHub’da gör',
    meta: ['Ücretsiz ve açık kaynak', 'Windows 10 ve 11', '5 MB'],
    videoLabel:
      'Animasyon: dosyalar ekranın kenarındaki raf sekmelerine girer, sonra bir çekmeceden bir uygulamaya geri çıkar.',
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
  film: {
    label: 'Wedge’in 56 saniyelik tanıtım filmi, seslendirmeli ve altyazılı',
    play: 'Filmi izle',
  },
  screens: {
    eyebrow: 'Ekranlar',
    title: 'Uygulamanın bugünkü hali',
    description: 'Doğrudan Wedge’den alındı: kenardaki sekmeler, bir çekmece, Cep ve ayarlar.',
    items: [
      {
        src: '/screens/tr/edge-tabs.jpg',
        alt: 'Ekranın sağ kenarından çıkmış dört raf sekmesi',
        caption: 'Kenardaki sekmeler',
        body: 'Sürükleme başladığı an kenardan çıkarlar.',
      },
      {
        src: '/screens/tr/drawer-dark.jpg',
        alt: 'Çekmece gibi açılmış İş rafı, koyu tema',
        caption: 'Çekmece',
        body: 'Gerçek önizlemeler, notlar, etiketler, sabitlemeler.',
      },
      {
        src: '/screens/tr/pocket.jpg',
        alt: 'Birlikte sürüklenmeye hazır iki dosyayla Cep',
        caption: 'Cep',
        body: 'Topla, sonra hepsini tek seferde sürükle.',
      },
      {
        src: '/screens/tr/drawer-light.jpg',
        alt: 'Çekmece gibi açılmış İş rafı, açık tema',
        caption: 'Açık tema',
        body: 'İstersen Windows’a uyar.',
      },
      {
        src: '/screens/tr/shared-shelf.jpg',
        alt: 'Bir bulut klasörünü paylaşılan rafa dönüştürme',
        caption: 'Paylaşılan raflar',
        body: 'Google Drive, OneDrive ya da Dropbox klasörü bir raf olur.',
      },
      {
        src: '/screens/tr/settings.jpg',
        alt: 'Wedge ayarları',
        caption: 'Ayarlar',
        body: 'Tema, vurgu rengi, kısayol, nelerin yakalanacağı.',
      },
    ],
  },
  download: {
    eyebrow: 'İndir',
    title: 'Windows için Wedge',
    description:
      'Ücretsiz ve açık kaynak. Windows’taki WebView2 motorunu kullanan 5 MB’lık bir kurulum; güncellemelerini imzasını doğrulayarak kendisi yapar.',
    latestVersion: 'Son sürüm',
    downloadBtn: 'Wedge’i indir',
    releasesBtn: 'Tüm sürümler ve sürüm notları GitHub’da',
    facts: ['Windows 10 ve 11, 64 bit', 'Yönetici izni gerekmez', 'Hesap gerekmez'],
    renamed:
      'Stash mi kullanıyorsun? Kendiliğinden Wedge’e güncellenir; bütün rafların ve ayarların korunur.',
    smartscreen: 'Windows yeni bir indirme için uyarabilir. Ne yapacağın burada.',
    store:
      'Microsoft Store’da da var, adı Wedge Shelf: Microsoft imzalı, SmartScreen uyarısı yok, güncellemeleri Store getirir.',
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
        q: 'Microsoft Store mu, kurulum dosyası mı?',
        a: 'Aynı uygulama, hangisini istersen. Store sürümü (Wedge Shelf) Microsoft imzalı ve güncellemelerini Store getirir; kurulum dosyasıyla kurulan sürüm kendini GitHub’dan günceller. Store’a geçersen ilk açılışta rafların oraya taşınır.',
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
