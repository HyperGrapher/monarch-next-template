// Fictional demo content for "Monarch Architects" (all people, places, numbers and contact
// details are invented). Every builder takes a locale and returns the full document; the seed
// script writes `tr` first, then `en` into the SAME rows (stable ids), so translations line up.

export type L = 'tr' | 'en'
type Ids = Record<string, number>

export const photoAlt: Record<string, { tr: string; en: string }> = {
  'arch-01': { tr: 'Camlı köprülerle birbirine bağlanan kamusal bir yapı.', en: 'A civic building with glazed bridges linking its volumes.' },
  'arch-02': { tr: 'Dikey kaburgalı beyaz bir yapı, portre kadrajda.', en: 'A white ribbed structure, framed in portrait.' },
  'arch-03': { tr: 'Beyaz panel ve camdan yüksek, kıvrımlı bir kemere doğru yürüyen yalnız bir figür.', en: 'A lone figure walking toward a tall curved arch of white panels and glass.' },
  'arch-04': { tr: 'Açık gökyüzüne karşı testere dişi kesit oluşturan üst üste cam balkonlar.', en: 'Stacked glass balconies forming a sawtooth façade against a clear sky.' },
  'arch-05': { tr: 'Mavi gökyüzü altında, durgun suya yansıyan kaburgalı beyaz bir salon.', en: 'A ribbed white hall under a blue sky, reflected in still water.' },
  'arch-06': { tr: 'Bir havuzun kıyısında duran camlı müze kabuğu.', en: 'A glazed museum shell beside a pool.' },
  'arch-07': { tr: 'Gün batımında tek bir kıvrımlı ayağın üzerinde konsol çıkan camlı beton plak.', en: 'A glazed concrete slab cantilevering over a single curved support at golden hour.' },
  'arch-08': { tr: 'Döşeli avluya uzun çapraz gölgeler düşüren beton bir kolonad.', en: 'A concrete colonnade throwing long diagonal shadows across a paved court.' },
  'arch-09': { tr: 'Soluk bir gökyüzüne karşı, kaplamalı cam duvara doğru kıvrılan beyaz bir çatı.', en: 'A white roof folding down into a tiled glass wall against a pale sky.' },
  'arch-10': { tr: 'Sıcak taş tonlarında, üst üste dizilmiş balkonlar.', en: 'Stacked balconies in warm stone.' },
  'arch-11': { tr: 'Beyaz bir gökyüzüne karşı aşağıdan görülen, yüzeyli beyaz cam ve çelik pruva.', en: 'A faceted white prow of glass and steel seen from below against a white sky.' },
}

// ---- rich text (Lexical) -----------------------------------------------------------------
const text = (t: string) => ({ type: 'text', version: 1, text: t, detail: 0, format: 0, mode: 'normal', style: '' })
const para = (t: string) => ({ type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, textFormat: 0, children: [text(t)] })
const head = (t: string, tag = 'h2') => ({ type: 'heading', tag, version: 1, direction: 'ltr', format: '', indent: 0, children: [text(t)] })
export const rich = (...nodes: ({ kind: 'p' | 'h'; t: string })[]) => ({
  root: { type: 'root', version: 1, direction: 'ltr', format: '', indent: 0, children: nodes.map((n) => (n.kind === 'h' ? head(n.t) : para(n.t))) },
})
export const P = (t: string) => ({ kind: 'p' as const, t })
export const H = (t: string) => ({ kind: 'h' as const, t })

const pick = (L: L) => (tr: string, en: string) => (L === 'tr' ? tr : en)

// ---- site settings -----------------------------------------------------------------------
export const siteSettings = (L: L, ids: Ids) => {
  const t = pick(L)
  return {
    companyName: 'Monarch Architects',
    wordmark: 'MONARCH',
    legalName: 'Monarch Mimarlık Ltd. Şti. (kurgusal)',
    tagline: t('Yaşamın ritmine göre şekillenen mekânlar.', 'Spaces shaped around the way we live.'),
    footerDescription: t('Monarch Architects, bağlama, malzemeye ve ışığa duyarlı çağdaş mimari üreten butik bir stüdyodur. Bu sitedeki tüm içerik kurgusal bir demodur.', 'Monarch Architects is a boutique studio making contemporary architecture shaped by context, material and light. All content on this site is a fictional demo.'),
    copyright: t('Monarch Architects (kurgusal demo)', 'Monarch Architects (fictional demo)'),
    email: 'hello@monarch-architects.example',
    careersEmail: 'careers@monarch-architects.example',
    phone: '+90 212 555 0142',
    address: [{ id: 'a1', line: 'Örnek Sokak 12, Beşiktaş' }, { id: 'a2', line: '34353 İstanbul, Türkiye' }],
    mapUrl: 'https://maps.google.com/?q=Beşiktaş+İstanbul',
    social: [{ id: 's1', label: 'Instagram @monarch.architects', url: 'https://instagram.com/monarch.architects' }],
    seoTitle: t('Monarch Architects — Mimarlık Stüdyosu, İstanbul', 'Monarch Architects — Architecture Studio, Istanbul'),
    seoDescription: t('Bağlama, malzemeye ve ışığa duyarlı çağdaş mimari. Kurgusal bir demo stüdyodur.', 'Contemporary architecture shaped by context, material and light. A fictional demo studio.'),
    seoImage: ids['arch-06'],
  }
}

// ---- home page ---------------------------------------------------------------------------
export const homePage = (L: L, ids: Ids, projectIds: number[], serviceIds: number[]) => {
  const t = pick(L)
  return {
    hero: {
      leftImage: ids['arch-06'],
      rightImage: ids['arch-10'],
      statement: t('İnce bir kabuk, güçlü bir damarla yapılan binalar.', 'Buildings with a thin skin and a strong vein.'),
      caption: t('Monarch Architects, İstanbul merkezli bağımsız bir mimarlık stüdyosudur. On beş yıldır uzun açıklıklar, hafif kabuklar ve dört kuşak dayanacak kamusal mekânlar tasarlıyoruz.', 'Monarch Architects is an independent architecture studio in Istanbul. For fifteen years: long spans, light envelopes and public rooms built to last four generations.'),
      ctaLabel: t('Projeleri gör', 'See the work'),
    },
    intro: {
      statement: t('Kendi ağırlığını ve ardından gelen yılların ağırlığını taşıyan binalar tasarlıyoruz.', 'We design buildings that carry their own weight, and the weight of the years that follow.'),
      facts: [
        { id: 'f1', label: t('Kuruluş', 'Founded'), value: '2011' },
        { id: 'f2', label: t('Stüdyo', 'Studio'), value: t('İstanbul', 'Istanbul') },
        { id: 'f3', label: t('Ekip', 'People'), value: '34' },
        { id: 'f4', label: t('Proje', 'Projects'), value: '63' },
        { id: 'f5', label: t('Ülke', 'Countries'), value: '11' },
      ],
    },
    work: { heading: t('Seçilmiş projeler', 'Selected work'), projects: projectIds, moreLabel: t('Tüm projeler', 'All projects') },
    archive: {
      numbers: [
        { id: 'n1', value: 63, label: t('Proje', 'Projects') },
        { id: 'n2', value: 11, label: t('Ülke', 'Countries') },
        { id: 'n3', value: 15, label: t('Yıl', 'Years') },
        { id: 'n4', value: 34, label: t('Kişilik ekip', 'People') },
      ],
      categoriesLabel: t('Kategoriye göre', 'By category'),
      categories: [
        { id: 'c1', name: t('Kültürel', 'Cultural'), count: 18 },
        { id: 'c2', name: t('Konut', 'Housing'), count: 16 },
        { id: 'c3', name: t('Kamusal', 'Public'), count: 14 },
        { id: 'c4', name: t('Ticari', 'Commercial'), count: 9 },
        { id: 'c5', name: t('İç mekân', 'Interiors'), count: 6 },
      ],
      stripLabel: t('Arşivden', 'From the archive'),
      images: [{ id: 'i1', image: ids['arch-01'] }, { id: 'i2', image: ids['arch-02'] }],
    },
    services: { heading: t('Hizmetler', 'Services'), items: serviceIds },
    approach: {
      title: t('İnce kabuk, güçlü damar.', 'Skin and Vein.'),
      intro: t('Adımızı monarch kelebeğinden alıyoruz: birkaç mikron kalınlığında bir kanat ve her yükü taşıyan damarlar. Hiçbir monarch göçü tek başına tamamlamaz; yolculuk dört kuşak sürer.', 'The name comes from the monarch butterfly: a wing a few microns thick, held up by veins that carry every load. No single monarch completes its migration. It takes four generations.'),
      image: ids['arch-03'],
      caption: t('Kemere doğru yürürken: miras bırakılmak üzere yapılmış bir bina.', 'Walking into the arch, a building meant to be inherited.'),
      principles: [
        { id: 'p1', name: t('İnce kabuk.', 'Thin skin.'), text: t('Kabuk, dayanabildiği kadar hafif olmalı. Önce onu çizeriz.', 'The envelope is as light as it can be and still last. We draw it first.') },
        { id: 'p2', name: t('Güçlü damar.', 'Strong vein.'), text: t('Taşıyıcı sistem ne gizlenir ne süs olur. Yük taşımayan çizgi çizimden çıkar.', 'Structure is never hidden and never decorative. If a line carries no load, it leaves.') },
        { id: 'p3', name: t('Dördüncü kuşak.', 'Fourth generation.'), text: t('Binayı devralacak insanlar için tasarlarız: onarılabilir, genişletilebilir, yeniden kullanılabilir.', 'We design for the people who will inherit the building: repair, extend, reuse.') },
      ],
    },
    studio: {
      heading: t('Otuz dört kişi. Tek bir İstanbul stüdyosu.', 'Thirty-four people. One Istanbul studio.'),
      people: [
        { id: 'm1', name: 'Elif Karaca', role: t('Kurucu ortak', 'Founding principal'), text: t('Taşıyıcı sistem ve kabuk. Monarch’ı 2011’de kurdu.', 'Structure and envelope. Founded Monarch in 2011.') },
        { id: 'm2', name: 'Kerem Aydın', role: t('Ortak', 'Principal'), text: t('Kamusal ve kentsel projeler. 2014’te katıldı.', 'Public and urban projects. Joined in 2014.') },
        { id: 'm3', name: 'Zeynep Arslan', role: t('Monarch Lab direktörü', 'Director, Monarch Lab'), text: t('Araştırma programını 2017’de başlattı.', 'Started the research programme in 2017.') },
      ],
    },
    journal: { heading: t('Günlükten', 'From the journal'), moreLabel: t('Tüm yazılar', 'All articles') },
    contact: { lead: t('Bir arsanız, bir yarışmanız ya da sığmayan bir sorunuz mu var?', 'Have a site, a competition or a question that doesn’t fit?'), ctaLabel: t('Görüşelim', 'Start a conversation') },
    seo: { title: t('Monarch Architects — Mimarlık Stüdyosu', 'Monarch Architects — Architecture Studio'), description: t('İnce kabuklu, dürüst taşıyıcılı çağdaş mimari.', 'Contemporary architecture with a thin skin and an honest structure.') },
  }
}

export const landings = (L: L) => {
  const t = pick(L)
  return {
    'services-landing': { title: t('Hizmetler', 'Services'), intro: t('Fikirden teslime, mekânın her ölçeğinde: mimari, iç mekân, yeniden kullanım ve fizibilite.', 'From first idea to handover, at every scale of space: architecture, interiors, reuse and feasibility.') },
    'projects-landing': { title: t('Projeler', 'Work'), intro: t('Kültürel, kamusal, konut ve ticari projelerden bir seçki. Tüm projeler kurgusaldır.', 'A selection of cultural, public, housing and commercial projects. All projects are fictional.') },
    'journal-landing': { title: t('Günlük', 'Journal'), intro: t('Işık, malzeme ve yeniden kullanım üzerine notlar.', 'Notes on light, material and reuse.') },
    'contact-page': { title: t('İletişim', 'Contact'), intro: t('Yeni bir proje, bir yarışma ya da basit bir merak: yazın, birkaç iş günü içinde dönelim.', 'A new project, a competition or simple curiosity: write to us and we will reply within a few working days.'), formIntro: t('Formu doldurun; mesajınız doğrudan stüdyoya ulaşır.', 'Fill in the form and your message reaches the studio directly.'), hours: t('Pazartesi–Cuma, 09:00–18:00', 'Monday–Friday, 09:00–18:00') },
  } as const
}

// ---- categories --------------------------------------------------------------------------
export const categories = [
  { slug: 'design', name: { tr: 'Tasarım', en: 'Design' }, description: { tr: 'Işık, oran ve mekân üzerine.', en: 'On light, proportion and space.' } },
  { slug: 'materials', name: { tr: 'Malzeme', en: 'Materials' }, description: { tr: 'Taş, beton, cam ve ahşap.', en: 'Stone, concrete, glass and timber.' } },
  { slug: 'practice', name: { tr: 'Pratik', en: 'Practice' }, description: { tr: 'Yeniden kullanım ve şantiye notları.', en: 'Reuse and notes from site.' } },
]

// ---- services ----------------------------------------------------------------------------
export const services = (L: L, ids: Ids) => {
  const t = pick(L)
  return [
    { slug: 'architecture-spatial-design', order: 10, featured: true, cover: ids['arch-09'],
      title: t('Mimari ve mekân tasarımı', 'Architecture & Spatial Design'),
      summary: t('Fikirden teslime: yarışma, tasarım, uygulama ve şantiye denetimi.', 'Concept to completion: competitions, design, delivery and site supervision.'),
      layout: [{ blockType: 'richText', id: 'b-s1-1', width: 'narrow', heading: t('Yaklaşım', 'Approach'), content: rich(P(t('Her proje, taşıyıcı sistemin ve kabuğun tek bir nesne olarak ele alındığı bir araştırmayla başlar. Plan ondan sonra gelir.', 'Every project starts with structure and envelope studied together as one object. The plan comes after.')), P(t('Kültürel, kamusal, konut ve ticari yapılarda yarışmadan şantiye denetimine kadar tüm aşamalarda yanınızdayız.', 'For cultural, public, housing and commercial buildings we stay with you from competition to site supervision.'))) },
        { blockType: 'faq', id: 'b-s1-2', heading: t('Sık sorulanlar', 'Common questions'), items: [
          { id: 'q1', question: t('Bir proje ne kadar sürer?', 'How long does a project take?'), answer: t('Ölçeğe bağlı; küçük bir konut için ilk tasarım birkaç ay, kamusal bir yapı için bir yıl veya daha uzun sürebilir.', 'It depends on scale: a small house may take a few months to first design, a public building a year or more.') },
          { id: 'q2', question: t('Yarışmalara katılıyor musunuz?', 'Do you enter competitions?'), answer: t('Evet, kamusal ve kültürel yapılar için açık ve davetli yarışmalara katılıyoruz.', 'Yes, we enter open and invited competitions for public and cultural buildings.') },
        ] }] },
    { slug: 'interior-architecture', order: 20, featured: true, cover: ids['arch-10'],
      title: t('İç mekân mimarlığı', 'Interior Architecture'),
      summary: t('Salonlar, galeriler ve ofisler: binayla birlikte, sonradan değil.', 'Halls, galleries and workplaces, designed with the building rather than after it.'),
      layout: [{ blockType: 'richText', id: 'b-s2-1', width: 'narrow', content: rich(P(t('İç mekânı mimariden ayrı düşünmüyoruz. Işık, malzeme ve sirkülasyon kararları kabukla aynı masada verilir.', 'We do not treat interiors as separate from architecture. Decisions about light, material and circulation are taken at the same table as the envelope.')), P(t('Butik ofis ve konaklama projelerinde, az sayıda malzemeyi dikkatle detaylandırarak sakin ve kalıcı mekânlar kurarız.', 'In boutique workplaces and hospitality we build calm, lasting rooms from a few carefully detailed materials.'))) }] },
    { slug: 'restoration-adaptive-reuse', order: 30, featured: true, cover: ids['arch-08'],
      title: t('Restorasyon ve yeniden kullanım', 'Restoration & Adaptive Reuse'),
      summary: t('Mevcut yapının değerini koruyan, ona yeni bir hayat veren müdahaleler.', 'Interventions that keep the value of what exists and give it a new life.'),
      layout: [{ blockType: 'richText', id: 'b-s3-1', width: 'narrow', content: rich(P(t('En sürdürülebilir bina çoğu zaman zaten ayakta olandır. Yapıyı okur, neyin kalacağına ve neyin eklenebileceğine birlikte karar veririz.', 'The most sustainable building is often the one already standing. We read the structure, then decide together what stays and what can be added.')), P(t('Yeni katmanlar eskisinden açıkça ayrışır: onarılabilir ve geri alınabilir.', 'New layers stay clearly distinct from the old: repairable and reversible.'))) }] },
    { slug: 'feasibility-design-consultancy', order: 40, featured: false, cover: ids['arch-04'],
      title: t('Fizibilite ve tasarım danışmanlığı', 'Feasibility & Design Consultancy'),
      summary: t('Karar vermeden önce: arsa, program, bütçe ve risk üzerine kısa, net çalışmalar.', 'Before you commit: short, clear studies of site, brief, budget and risk.'),
      layout: [{ blockType: 'richText', id: 'b-s4-1', width: 'narrow', content: rich(P(t('Bir arsayı satın almadan veya bir programı kesinleştirmeden önce neyin mümkün olduğunu gösteririz.', 'Before you buy a site or fix a brief, we show what is possible.')), P(t('Sonuç, karar vermenize yetecek kadar ayrıntılı, geri kalanını açık bırakacak kadar kısa bir rapordur.', 'The result is a report detailed enough to decide on and short enough to leave the rest open.'))) }] },
  ]
}

// ---- projects ----------------------------------------------------------------------------
export const projects = (L: L, ids: Ids) => {
  const t = pick(L)
  const g = (a: string, b: string) => [{ id: 'g1', image: ids[a], caption: '' }, { id: 'g2', image: ids[b], caption: '' }]
  const story = (n: number, a: string, b: string) => [{ blockType: 'richText', id: `b-p${n}`, width: 'narrow', heading: t('Proje', 'The project'), content: rich(P(a), P(b)) }]
  return [
    { slug: 'aurelia-hall', type: 'cultural', year: 2022, areaM2: 18400, buildStatus: 'built', order: 10, featured: true, cover: ids['arch-05'], gallery: g('arch-06', 'arch-09'),
      title: 'Aurelia Hall', location: t('İzmir, Türkiye', 'Izmir, Türkiye'),
      summary: t('Su kenarında, kaburgalı beyaz bir kabukla örtülü kamusal bir salon.', 'A public hall under a ribbed white shell, set at the water’s edge.'),
      layout: story(1, t('Salon, tek bir uzun açıklıkla örtülü: kaburgalar hem taşıyıcı sistem hem de içerideki ışığın ritmidir.', 'The hall is covered in a single long span: the ribs are both the structure and the rhythm of the light inside.'), t('Kabuk birkaç santimetre kalınlığında; yükü kaburgalar taşır. Su yüzeyi, binayı ikinci kez, tersinden çizer.', 'The shell is only centimetres thick; the ribs carry the load. The water surface draws the building a second time, upside down.')) },
    { slug: 'slab-house', type: 'residential', year: 2019, areaM2: 640, buildStatus: 'built', order: 20, featured: true, cover: ids['arch-07'], gallery: g('arch-08', 'arch-03'),
      title: 'Slab House', location: t('Bodrum, Türkiye', 'Bodrum, Türkiye'),
      summary: t('Tek bir kıvrımlı ayağın üzerinde konsol çıkan, camlı bir beton plak.', 'A glazed concrete slab cantilevering over a single curved support.'),
      layout: story(2, t('Ev, manzaraya doğru uzanan tek bir plaktan oluşur. Altındaki gölge, yazın en serin oda olur.', 'The house is a single slab reaching toward the view. The shade beneath it becomes the coolest room in summer.'), t('Malzeme paleti kısıtlı: beton, cam ve yerel taş. Hiçbiri kaplama değil; hepsi yapının kendisi.', 'The palette is restrained: concrete, glass and local stone. None of it is cladding; all of it is the building itself.')) },
    { slug: 'fold-gallery', type: 'cultural', year: 2023, areaM2: 5200, buildStatus: 'built', order: 30, featured: true, cover: ids['arch-09'], gallery: g('arch-11', 'arch-05'),
      title: 'Fold Gallery', location: t('İstanbul, Türkiye', 'Istanbul, Türkiye'),
      summary: t('Beyaz bir çatının kıvrılarak cam bir duvara dönüştüğü küçük bir sanat galerisi.', 'A small art gallery where a white roof folds down into a glass wall.'),
      layout: story(3, t('Çatı, katlanarak duvara iniyor; böylece tek bir hareketle hem örtü hem cephe oluyor.', 'The roof folds down into the wall, so one gesture becomes both cover and façade.'), t('İçeride gün ışığı sert değil, yayılmış: sergilenen işler için sakin bir zemin.', 'Inside, daylight is diffused rather than sharp: a calm ground for the work on show.')) },
    { slug: 'terrace-44', type: 'housing', year: 2021, areaM2: 12900, buildStatus: 'built', order: 40, featured: true, cover: ids['arch-04'], gallery: g('arch-10', 'arch-01'),
      title: 'Terrace 44', location: t('Ankara, Türkiye', 'Ankara, Türkiye'),
      summary: t('Üst üste dizilmiş cam balkonlarla testere dişi bir cephe oluşturan konut.', 'Housing whose stacked glass balconies form a sawtooth façade.'),
      layout: story(4, t('Her daire kendi terasına sahip; teraslar birbirinin üstünde kayarak cepheye ritim verir.', 'Every apartment has its own terrace; the terraces slide over one another and give the façade its rhythm.'), t('Ortak sirkülasyon dışarıda tutuldu, doğal ışık ve havalandırma ile.', 'Shared circulation is kept outside, with natural light and ventilation.')) },
    { slug: 'colonnade-archive', type: 'public', year: 2020, areaM2: 9300, buildStatus: 'built', order: 50, featured: true, cover: ids['arch-08'], gallery: g('arch-02', 'arch-06'),
      title: 'Colonnade Archive', location: t('Bursa, Türkiye', 'Bursa, Türkiye'),
      summary: t('Mevcut bir depo yapısının beton kolonadla yeniden kullanılması.', 'The adaptive reuse of an existing depot behind a new concrete colonnade.'),
      layout: story(5, t('Eski taşıyıcı sistem korundu; yeni kolonad onu kente bağlayan kamusal bir gölgelik oldu.', 'The old structure was kept; the new colonnade became a public shade that ties it to the city.'), t('Gün boyunca değişen gölgeler, avluyu bir saat gibi okunur kılıyor.', 'Shadows shifting through the day make the court read like a clock.')) },
    { slug: 'glass-prow', type: 'commercial', year: 2025, areaM2: 22000, buildStatus: 'inConstruction', order: 60, featured: true, cover: ids['arch-11'], gallery: g('arch-09', 'arch-04'),
      title: 'Glass Prow', location: t('İstanbul, Türkiye', 'Istanbul, Türkiye'),
      summary: t('Cam ve çelikten yüzeyli bir pruva ile biten ticari bir yapı.', 'A commercial building ending in a faceted prow of glass and steel.'),
      layout: story(6, t('Yapı, kavşağa bir pruva gibi dönüyor. Yüzeyler, güneşin yönüne göre açılarak ısı kazancını azaltıyor.', 'The building turns to the junction like a prow. Its facets angle to the sun to cut heat gain.'), t('Şu anda inşaat aşamasında; tamamlanma tarihi için stüdyoya danışın.', 'Currently under construction; ask the studio about completion.')) },
  ]
}

// ---- posts -------------------------------------------------------------------------------
export const posts = (L: L, ids: Ids) => {
  const t = pick(L)
  return [
    { slug: 'designing-with-natural-light', cat: 'design', date: '2026-10-12', image: ids['arch-05'], author: 'Elif Karaca',
      title: t('Doğal ışıkla tasarlamak', 'Designing with natural light'),
      excerpt: t('Işık bir malzeme gibi tasarlanır: yönü, sertliği ve zamanı vardır.', 'Light is designed like a material: it has direction, hardness and time.'),
      content: rich(P(t('Bir odanın kalitesini çoğu zaman m²’si değil, ışığı belirler. Işığa yön vermek, ona bir malzeme gibi davranmaktır.', 'The quality of a room is rarely set by its area; it is set by its light. To give light a direction is to treat it as a material.')), H(t('Sert ışıktan yayılmış ışığa', 'From hard light to diffused light')), P(t('Güney cephesinde derin saçaklar, kuzeyde geniş açıklıklar; doğu ve batıda ise düşük güneşi yumuşatan süzgeçler kullanırız.', 'We use deep eaves to the south, wide openings to the north, and filters in the east and west to soften the low sun.')), P(t('En iyi ışık çoğu zaman en az müdahaleyle gelir: doğru yere açılmış tek bir pencere.', 'The best light often comes with the least intervention: one window, opened in the right place.'))) },
    { slug: 'material-and-place', cat: 'materials', date: '2026-09-02', image: ids['arch-08'], author: 'Zeynep Arslan',
      title: t('Malzeme ve yer ilişkisi', 'The relationship between material and place'),
      excerpt: t('Yerel malzeme bir nostalji değil, bir akıl yürütmedir.', 'Local material is not nostalgia; it is reasoning.'),
      content: rich(P(t('Bir malzemeyi yerinden seçmek, onun iklimle ve işçilikle zaten barıştığını varsaymaktır.', 'Choosing a material from its place assumes it has already made peace with the climate and the craft.')), H(t('Az malzeme, çok dikkat', 'Few materials, much attention')), P(t('Bir binada üç dört malzeme yeter. Önemli olan, her birinin nasıl birleştiği ve nasıl yaşlanacağıdır.', 'Three or four materials are enough for a building. What matters is how each joins and how each will age.')), P(t('Monarch Lab’da, yerel taş ve betonla yaptığımız örnekleri yıllarca dışarıda bekletip yaşlanmalarını izliyoruz.', 'At Monarch Lab we leave mock-ups of local stone and concrete outdoors for years and watch them age.'))) },
    { slug: 'adaptive-reuse-existing-buildings', cat: 'practice', date: '2026-07-20', image: ids['arch-01'], author: 'Kerem Aydın',
      title: t('Yeniden kullanım ve mevcut yapıların değeri', 'Adaptive reuse and the value of existing buildings'),
      excerpt: t('Yıkmak çoğu zaman en hızlı, nadiren en iyi yoldur.', 'Demolition is often the quickest route and rarely the best.'),
      content: rich(P(t('Mevcut bir yapı, enerjisi ve emeğiyle zaten ödenmiş bir yatırımdır. Onu okumak, tasarımın ilk adımıdır.', 'An existing building is an investment already paid for in energy and labour. Reading it is the first step of design.')), H(t('Okumak, sonra eklemek', 'Read first, then add')), P(t('Yeni katman eskiden açıkça ayrışmalı; böylece iki zaman da okunabilir kalır.', 'The new layer should stay clearly distinct from the old, so both times remain legible.')), P(t('Colonnade Archive’de depo yapısını koruduk ve ona yalnızca kamusal bir gölgelik ekledik.', 'At Colonnade Archive we kept the depot and added only a public shade to it.'))) },
    { slug: 'homes-around-daily-rituals', cat: 'design', date: '2026-05-09', image: ids['arch-07'], author: 'Elif Karaca',
      title: t('Evleri günlük ritüellerin etrafında tasarlamak', 'Designing homes around daily rituals'),
      excerpt: t('İyi bir ev, plandan önce bir günün akışıdır.', 'A good house is a day’s flow before it is a plan.'),
      content: rich(P(t('Sabah kahvesinin içileceği yer, akşam yemeğinin ışığı, kapıdan içeri girerken ayakkabının bırakıldığı köşe: ev bunlardan oluşur.', 'Where the morning coffee is drunk, the light at dinner, the corner where shoes are left at the door: a home is made of these.')), H(t('Önce ritüeller', 'Rituals first')), P(t('Müşterilerimizden bir günü baştan sona anlatmalarını isteriz; plan o anlatıdan çıkar.', 'We ask clients to describe one day from start to finish; the plan comes out of that account.')), P(t('Slab House’ta en değerli oda, plağın altındaki gölgeli teras oldu; çünkü en çok orada vakit geçiriliyor.', 'At Slab House the most valued room is the shaded terrace under the slab, because that is where most time is spent.'))) },
  ]
}

// ---- about page --------------------------------------------------------------------------
export const aboutPage = (L: L, ids: Ids) => {
  const t = pick(L)
  return {
    slug: 'about',
    title: t('Hakkımızda', 'About'),
    intro: t('Monarch Architects, bağlama, malzemeye ve ışığa duyarlı çağdaş mimari üreten butik bir stüdyodur.', 'Monarch Architects is a boutique studio making contemporary architecture shaped by context, material and light.'),
    featuredImage: ids['arch-06'],
    seo: { title: t('Hakkımızda — Monarch Architects', 'About — Monarch Architects'), description: t('Stüdyonun yaklaşımı, değerleri ve ekibi.', 'The studio’s approach, values and team.') },
    layout: [
      { blockType: 'richText', id: 'b-a1', width: 'narrow', heading: t('Stüdyo', 'The studio'), content: rich(P(t('2011’de İstanbul’da kurulan Monarch, bir binanın kabuğunu ve taşıyıcı sistemini tek bir nesne olarak düşünmeyi yöntem edinmiştir.', 'Founded in Istanbul in 2011, Monarch made it a method to think of a building’s envelope and structure as one object.')), P(t('Kendi başımıza çalışır, bir binayı daha önce yaptığımız hiçbir şeye benzetmemeye özen gösteririz.', 'We work independently and take care never to make a building look like anything we have already made.'))) },
      { blockType: 'textImage', id: 'b-a2', heading: t('İnce kabuk, güçlü damar', 'Thin skin, strong vein'), content: rich(P(t('Hafif görünen ama dürüst taşıyan binalar. Her proje, Monarch Lab’daki araştırmayla başlar.', 'Buildings that look light but carry honestly. Every project starts with research in Monarch Lab.'))), image: ids['arch-03'], imagePosition: 'left', background: 'mist' },
      { blockType: 'stats', id: 'b-a3', heading: t('Rakamlarla', 'In numbers'), items: [
        { id: 's1', value: '15', label: t('Yıl', 'Years') }, { id: 's2', value: '34', label: t('Kişilik ekip', 'People') }, { id: 's3', value: '63', label: t('Proje', 'Projects') }, { id: 's4', value: '11', label: t('Ülke', 'Countries') } ] },
      { blockType: 'richText', id: 'b-a4', width: 'narrow', heading: t('Değerlerimiz', 'Values'), content: rich(H(t('Dürüst yapı', 'Honest structure')), P(t('Taşıyıcı sistem gizlenmez, süslenmez.', 'Structure is neither hidden nor decorated.')), H(t('Ölçülü malzeme', 'Measured material')), P(t('Az malzeme, dikkatle detaylandırılmış.', 'Few materials, carefully detailed.')), H(t('Uzun ömür', 'Long life')), P(t('Onarılabilir, genişletilebilir, yeniden kullanılabilir.', 'Repairable, extendable, reusable.'))) },
      { blockType: 'testimonials', id: 'b-a5', heading: t('Müşterilerden (kurgusal demo)', 'From clients (fictional demo)'), items: [{ id: 't1', quote: t('Ekip, ihtiyacımızı bizden önce anladı. (Kurgusal demo alıntısı)', 'The team understood our brief before we did. (Fictional demo quote)'), name: t('Örnek Müşteri', 'Sample Client'), role: t('Demo kayıt', 'Demo entry') }] },
      { blockType: 'cta', id: 'b-a6', heading: t('Bir proje mi düşünüyorsunuz?', 'Thinking about a project?'), description: t('Arsanızı, programınızı ya da sorunuzu paylaşın.', 'Share your site, your brief or your question.'), buttonLabel: t('İletişime geçin', 'Get in touch'), buttonUrl: '/contact', background: 'ink' },
    ],
  }
}
