import { defaultLocale, type Locale } from '../../config/locales'

// Fixed interface strings (buttons, labels, form messages). Page CONTENT lives in Payload.
type Dict = {
  skip: string; menu: string; openMenu: string; closeMenu: string; sections: string; backToTop: string; scrollTop: string
  language: string; backHome: string
  nav: { projects: string; services: string; about: string; blog: string; contact: string }
  contactCta: string
  footer: { navigation: string; legal: string[]; legalNote: string; instagram: string }
  facts: { type: string; place: string; year: string; area: string; status: string }
  status: { built: string; inConstruction: string }
  types: Record<string, string>
  all: string; readMore: string; allProjects: string; allPosts: string; viewProject: string
  home: { introduction: string; work: string; archive: string; services: string; approach: string; studio: string; journal: string; contact: string; byCategory: string; fromArchive: string; archiveWord: string; address: string; careers: string }
  blog: { published: string; by: string; readingTime: (m: number) => string; related: string; page: string; of: string; newer: string; older: string; categories: string; none: string; pagination: string }
  project: { gallery: string; relatedServices: string; story: string; next: string }
  service: { relatedProjects: string }
  contact: { name: string; email: string; phone: string; message: string; optional: string; send: string; sending: string; success: string; error: string; invalid: string; details: string; address: string; hours: string; map: string }
  notFound: { title: string; text: string; cta: string }
  error: { title: string; text: string; retry: string }
  preview: { banner: string; exit: string }
  untranslated: string
  loading: string
}

const en: Dict = {
  skip: 'Skip to content', menu: 'Menu', openMenu: 'Open menu', closeMenu: 'Close menu', sections: 'Sections', backToTop: 'Back to top', scrollTop: 'Scroll to top',
  language: 'Language', backHome: 'back to home',
  nav: { projects: 'Work', services: 'Services', about: 'About', blog: 'Journal', contact: 'Contact' },
  contactCta: 'Contact',
  footer: { navigation: 'Footer', legal: ['Privacy', 'Cookies', 'Imprint'], legalNote: 'Available on request', instagram: 'Instagram' },
  facts: { type: 'Type', place: 'Place', year: 'Year', area: 'Area', status: 'Status' },
  status: { built: 'Built', inConstruction: 'In construction' },
  types: { cultural: 'Cultural', residential: 'Residential', housing: 'Housing', public: 'Public', commercial: 'Commercial', interiors: 'Interiors' },
  all: 'All', readMore: 'Read', allProjects: 'All projects', allPosts: 'All articles', viewProject: 'View project',
  home: { introduction: 'Introduction', work: 'Work', archive: 'Archive', services: 'Services', approach: 'Approach', studio: 'Studio', journal: 'Journal', contact: 'Contact', byCategory: 'By category', fromArchive: 'From the archive', archiveWord: 'Archive', address: 'Address', careers: 'Careers' },
  blog: { published: 'Published', by: 'By', readingTime: (m) => `${m} min read`, related: 'Related reading', page: 'Page', of: 'of', newer: 'Newer', older: 'Older', categories: 'Categories', none: 'No articles yet.', pagination: 'Pagination' },
  project: { gallery: 'Gallery', relatedServices: 'Related services', story: 'The project', next: 'Next project' },
  service: { relatedProjects: 'Related projects' },
  contact: { name: 'Name', email: 'Email', phone: 'Phone', message: 'Message', optional: 'optional', send: 'Send message', sending: 'Sending…', success: 'Thank you. Your message has been received.', error: 'Something went wrong. Please try again or email us directly.', invalid: 'Please check the highlighted fields.', details: 'Details', address: 'Address', hours: 'Hours', map: 'Open in maps' },
  notFound: { title: 'Page not found', text: 'The page you are looking for does not exist or has moved.', cta: 'Back to the home page' },
  error: { title: 'Something went wrong', text: 'An unexpected error occurred. Please try again.', retry: 'Try again' },
  preview: { banner: 'Draft preview — visitors cannot see this.', exit: 'Exit preview' },
  untranslated: 'This content is not yet available in English.',
  loading: 'Loading',
}

const tr: Dict = {
  skip: 'İçeriğe geç', menu: 'Menü', openMenu: 'Menüyü aç', closeMenu: 'Menüyü kapat', sections: 'Bölümler', backToTop: 'Başa dön', scrollTop: 'Sayfa başına çık',
  language: 'Dil', backHome: 'ana sayfaya dön',
  nav: { projects: 'Projeler', services: 'Hizmetler', about: 'Hakkımızda', blog: 'Günlük', contact: 'İletişim' },
  contactCta: 'İletişim',
  footer: { navigation: 'Alt menü', legal: ['Gizlilik', 'Çerezler', 'Künye'], legalNote: 'Talep üzerine sunulur', instagram: 'Instagram' },
  facts: { type: 'Tür', place: 'Yer', year: 'Yıl', area: 'Alan', status: 'Durum' },
  status: { built: 'Tamamlandı', inConstruction: 'İnşaat aşamasında' },
  types: { cultural: 'Kültürel', residential: 'Konut', housing: 'Toplu konut', public: 'Kamusal', commercial: 'Ticari', interiors: 'İç mekân' },
  all: 'Tümü', readMore: 'Oku', allProjects: 'Tüm projeler', allPosts: 'Tüm yazılar', viewProject: 'Projeyi gör',
  home: { introduction: 'Giriş', work: 'Projeler', archive: 'Arşiv', services: 'Hizmetler', approach: 'Yaklaşım', studio: 'Stüdyo', journal: 'Günlük', contact: 'İletişim', byCategory: 'Kategoriye göre', fromArchive: 'Arşivden', archiveWord: 'Arşiv', address: 'Adres', careers: 'Kariyer' },
  blog: { published: 'Yayın tarihi', by: 'Yazar', readingTime: (m) => `${m} dk okuma`, related: 'İlgili yazılar', page: 'Sayfa', of: '/', newer: 'Daha yeni', older: 'Daha eski', categories: 'Kategoriler', none: 'Henüz yazı yok.', pagination: 'Sayfalar' },
  project: { gallery: 'Galeri', relatedServices: 'İlgili hizmetler', story: 'Proje', next: 'Sonraki proje' },
  service: { relatedProjects: 'İlgili projeler' },
  contact: { name: 'Ad soyad', email: 'E-posta', phone: 'Telefon', message: 'Mesaj', optional: 'isteğe bağlı', send: 'Mesajı gönder', sending: 'Gönderiliyor…', success: 'Teşekkürler. Mesajınız bize ulaştı.', error: 'Bir sorun oluştu. Lütfen tekrar deneyin veya doğrudan e-posta gönderin.', invalid: 'Lütfen işaretli alanları kontrol edin.', details: 'Bilgiler', address: 'Adres', hours: 'Çalışma saatleri', map: 'Haritada aç' },
  notFound: { title: 'Sayfa bulunamadı', text: 'Aradığınız sayfa yok ya da taşınmış olabilir.', cta: 'Ana sayfaya dön' },
  error: { title: 'Bir sorun oluştu', text: 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.', retry: 'Tekrar dene' },
  preview: { banner: 'Taslak önizleme — ziyaretçiler bunu göremez.', exit: 'Önizlemeden çık' },
  untranslated: 'Bu içerik henüz Türkçe olarak mevcut değil.',
  loading: 'Yükleniyor',
}

// Keyed by plain string so a single-language edition can keep both dictionaries without type errors.
const dictionaries: Record<string, Dict> = { tr, en }
export const getDictionary = (locale: Locale): Dict => dictionaries[locale] ?? dictionaries[defaultLocale]
export type { Dict }
