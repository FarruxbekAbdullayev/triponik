/**
 * PromoCarousel.tsx
 * Bosh sahifa lentasi: navigatsiya bo‘limlari va promo bloklar.
 * Talab: “Bu foydali!” bo‘limidagi kartalar vertikal orientatsiyada bo‘lsin,
 * bitta gorizontal qatorda scroll orqali keyingi kartalar ko‘rinsin.
 */

import { useMemo, useState } from 'react'
import { BadgePercent, Calendar, Plane, TrainFront, ArrowRight, Clock } from 'lucide-react'
import { IDCard } from '../../docs/IDCard'

/** Kategoriya pillari uchun interfeys */
interface TopTab {
  /** Ko‘rsatish nomi (uz) */
  label: string
  /** Unikal qiymat */
  value: 'deals' | 'weekend' | 'popular' | 'features'
}

/** Promo banner ma'lumotlari */
interface PromoBanner {
  /** Kichik badge yoki izoh */
  tag?: string
  /** Sarlavha */
  title: string
  /** Pastki izoh (ixtiyoriy) */
  caption?: string
  /** Rasm manbai (smart placeholder yoki real URL) */
  src: string
  /** Fon rangi (ixtiyoriy) */
  ring?: string
}

/** Taklif kartasi uchun interfeys */
interface OfferCardProps {
  /** Transport turi: samolyot yoki poyezd */
  kind: 'plane' | 'train'
  /** Yo‘nalish */
  from: string
  to: string
  /** Jo‘nash vaqti (ko‘rinadigan matn) */
  when: string
  /** Yo‘l davomiyligi */
  duration: string
  /** To‘g‘ridan-to‘g‘ri yoki yo‘q */
  direct?: boolean
  /** Asosiy narx (hozirgi) */
  price: string
  /** Chegirma foizi, masalan: -15% */
  discount?: string
  /** Eski narx (chizib qo‘yiladi) */
  oldPrice?: string
}

/** Ichki foydalanish uchun Offer turi (id bilan) */
interface Offer extends OfferCardProps {
  /** Unikal identifikator */
  id: string
}

/**
 * ChipButton
 * Kichik chip tugma (yengil kontur).
 */
function ChipButton({
  active,
  children,
  onClick,
}: {
  active?: boolean
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'whitespace-nowrap rounded-full px-3 py-1.5 text-xs ring-1 transition',
        active
          ? 'bg-[#3050F9] text-white ring-[#3050F9]'
          : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

/**
 * OfferCard
 * Vertikal orientatsiyadagi karta: yo‘nalish timeline (ustma-ust), vaqt va davomiylik, narx bloki.
 * Talabga binoan transport ikonkasini o‘ng tomonga joyladik.
 */
function OfferCard({
  kind,
  from,
  to,
  when,
  duration,
  direct,
  price,
  discount,
  oldPrice,
}: OfferCardProps) {
  const Icon = kind === 'plane' ? Plane : TrainFront
  const pillColor =
    kind === 'plane'
      ? 'bg-[#3050F9]/10 text-[#3050F9] ring-[#3050F9]/20'
      : 'bg-emerald-500/10 text-emerald-600 ring-emerald-600/20'

  return (
    <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-200 h-full flex flex-col">
      {/* Yo‘nalish bloki: chapda vertikal timeline + matnlar, o‘ngda ikon */}
      <div className="mb-3">
        <div className="flex items-start justify-between gap-3">
          {/* Chap: timeline + from/to/when */}
          <div className="flex flex-1 items-start gap-3">
            {/* Timeline (ikki nuqta va chiziq) */}
            <div className="relative flex w-4 flex-col items-center pt-1">
              <span className="h-2 w-2 rounded-full bg-slate-900" aria-hidden="true" />
              <span className="my-1 h-6 w-px bg-slate-300" aria-hidden="true" />
              <span className="h-2 w-2 rounded-full bg-slate-900" aria-hidden="true" />
            </div>

            {/* From / To matnlari vertikal joylashuvda */}
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-900">{from}</div>
              <div className="truncate text-sm font-semibold text-slate-900">{to}</div>
              <div className="mt-0.5 text-xs text-slate-500">{when}</div>
            </div>
          </div>

          {/* O‘ng: transport ikonkasining pill varianti */}
          <span
            className={['flex h-8 w-8 items-center justify-center rounded-lg ring-1', pillColor, 'shrink-0'].join(' ')}
          >
            <Icon size={16} />
          </span>
        </div>

        {/* Vaqt va marshrut tafsilotlari (alohida qatorlarda) */}
        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar size={14} />
            <span>{when}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock size={14} />
            <span>
              {duration} {direct ? '· to‘g‘ridan-to‘g‘ri' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Narx bloki: pastga “yopishtirilgan” */}
      <div className="mt-auto flex items-end justify-between">
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold text-slate-900">{price}</div>
          {discount && (
            <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-medium text-[#3050F9] ring-1 ring-[#3050F9]/20">
              {discount}
            </span>
          )}
        </div>
        {oldPrice && <div className="text-xs text-slate-400 line-through">{oldPrice}</div>}
      </div>
    </div>
  )
}

/**
 * SectionTitle
 * Katta sarlavha va izoh.
 */
function SectionTitle({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="px-4">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
      {desc && <p className="mt-1 text-sm text-slate-500">{desc}</p>}
    </div>
  )
}

/**
 * PromoCarousel
 * Lenta tarkibi (bannerlar pastda). “Bu foydali!” — bitta qator, gorizontal scroll, vertikal kartalar.
 */
export function PromoCarousel() {
  // Eslatma: tabs/setTab hozir ishlatilmaydi, lekin kelajakdagi kengaytirish uchun qoldirilgan.
  const tabs: TopTab[] = useMemo(
    () => [
      { label: 'Bu foydali!', value: 'deals' },
      { label: 'Dam olish kunlari', value: 'weekend' },
      { label: 'Ommabop', value: 'popular' },
      { label: 'Foydali usullar', value: 'features' },
    ],
    []
  )
  const [tab, setTab] = useState<TopTab['value']>('deals')

  const banners: PromoBanner[] = [
    {
      tag: '30% keshbek',
      title: 'Bilet + mehmonxona',
      caption: 'Yaxshi to‘plam narxlari',
      src: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/f6bd8eaf-392f-4993-a072-1a66eb6a1866.jpg',
      ring: 'ring-indigo-200',
    },
    {
      tag: 'Avtobus afzalliklari',
      title: 'Tejamkor safarlar',
      caption: 'Qulay va hamyonbop',
      src: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/8c533fe7-cf61-4498-8594-70f8e2b2b296.jpg',
      ring: 'ring-emerald-200',
    },
    {
      tag: 'Belarus yo‘nalishlari',
      title: '990 000 so‘mdan',
      caption: 'Yangi yo‘nalishlar',
      src: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/ccd04ec1-9826-4ef0-9d77-9090f07c2357.jpg',
      ring: 'ring-violet-200',
    },
  ]

  /** Demo takliflar (keyinchalik API bilan almashtiriladi) */
  const offers: Offer[] = [
    {
      id: 'o1',
      kind: 'plane',
      from: 'Toshkent',
      to: 'Samarqand',
      when: '31 avg, 09:00',
      duration: '2 soat 10 daqiqa',
      direct: true,
      price: '477 900 so‘m',
      oldPrice: '532 000 so‘m',
      discount: '-15%',
    },
    {
      id: 'o2',
      kind: 'plane',
      from: 'Toshkent',
      to: 'Samarqand',
      when: '8 sen, 16:40',
      duration: '1 soat 25 daqiqa',
      direct: true,
      price: '548 300 so‘m',
      oldPrice: '598 900 so‘m',
      discount: '-8%',
    },
    {
      id: 'o3',
      kind: 'train',
      from: 'Toshkent',
      to: 'Buxoro',
      when: '2 sen, 07:30',
      duration: '6 soat 15 daqiqa',
      direct: true,
      price: '299 000 so‘m',
    },
    {
      id: 'o4',
      kind: 'train',
      from: 'Samarqand',
      to: 'Buxoro',
      when: '12 sen, 10:10',
      duration: '3 soat 45 daqiqa',
      direct: true,
      price: '255 000 so‘m',
    },
  ]

  const [filter, setFilter] = useState<'all' | 'plane' | 'train'>('all')

  /** Filterlangan takliflar — bitta qator bo‘lib map qilinadi */
  const filteredOffers = useMemo(() => {
    return filter === 'all' ? offers : offers.filter((o) => o.kind === filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  return (
    <div className="relative">
      {/* Oq fonli sirt — yuqori qism to‘q fon ustida chiroyli ko‘rinishi uchun */}
      <div className="rounded-t-3xl bg-white pb-24">
        {/* "Bu foydali!" bo‘limi */}
        <div id="section-deals" className="mt-4 space-y-3 scroll-mt-16">
          <SectionTitle
            title="Bu foydali!"
            desc="So‘nggi 10 kun ichida o‘rtachadan past narxlar. Doimiy yangilanadi — tez-tez tekshirib turing."
          />

          {/* Filtr chiplar */}
          <div className="px-4">
            <div className="flex gap-2">
              <ChipButton active={filter === 'all'} onClick={() => setFilter('all')}>
                Barchasi
              </ChipButton>
              <ChipButton active={filter === 'plane'} onClick={() => setFilter('plane')}>
                Samolyotlar
              </ChipButton>
              <ChipButton active={filter === 'train'} onClick={() => setFilter('train')}>
                Poyezdlar
              </ChipButton>
            </div>
          </div>

          {/* Taklif kartalari — bitta qator, gorizontal scroll, vertikal kartalar */}
          <div className="px-4">
            <div
              className="
                flex gap-3 overflow-x-auto pb-1
                snap-x snap-mandatory
              "
              aria-label="Foydali takliflar karuseli"
            >
              {filteredOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="
                    snap-start
                    min-w-[260px] max-w-[280px]
                  "
                >
                  <OfferCard
                    kind={offer.kind}
                    from={offer.from}
                    to={offer.to}
                    when={offer.when}
                    duration={offer.duration}
                    direct={offer.direct}
                    price={offer.price}
                    discount={offer.discount}
                    oldPrice={offer.oldPrice}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* "Dam olish kunlarida va nafaqat" bo‘limi */}
        <div id="section-weekend" className="mt-6 space-y-3 scroll-mt-16">
          <SectionTitle title="Dam olish kunlarida va nafaqat" desc="Qisqa safarlar uchun zo‘r yo‘nalishlar" />
          <div className="px-4">
            <div className="flex flex-wrap gap-2">
              <ChipButton>Barcha shaharlar</ChipButton>
              <ChipButton>Toshkentdan</ChipButton>
              <ChipButton>Samarqanddan</ChipButton>
            </div>
          </div>

          {/* Kichik yo‘nalish kartalari — namuna */}
          <div className="grid grid-cols-1 gap-3 px-4 pb-4">
            <div className="flex items-center justify-between rounded-2xl bg-white p-3 ring-1 ring-slate-200">
              <div>
                <div className="text-sm font-medium text-slate-900">Xiva — Urganch</div>
                <div className="text-xs text-slate-500">Dam olishga ajoyib yo‘nalish</div>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-xl bg-[#3050F9] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#2741d3]"
              >
                Ko‘rish
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bannerlar — sahifaning past qismi */}
        <div id="section-banners" className="mt-6 flex gap-3 overflow-x-auto px-4 pb-1 scroll-mt-16">
          {banners.map((b, i) => (
            <div
              key={i}
              className={[
                'min-w-[220px] overflow-hidden rounded-2xl bg-white ring-1',
                b.ring ?? 'ring-slate-200',
              ].join(' ')}
            >
              <div className="h-28 w-[220px]">
                <img src={b.src} className="object-cover h-full w-full" />
              </div>
              <div className="p-3">
                {b.tag && (
                  <div className="mb-1 inline-flex items-center gap-1 rounded-md bg-[#3050F9]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#3050F9] ring-1 ring-[#3050F9]/20">
                    <BadgePercent size={12} />
                    {b.tag}
                  </div>
                )}
                <div className="text-sm font-semibold text-slate-900">{b.title}</div>
                {b.caption && <div className="text-xs text-slate-500">{b.caption}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Hujjatlar — screen ichidagi bo‘lim */}
        <div id="section-docs" className="mt-6 space-y-3 scroll-mt-16">
          <SectionTitle
            title="Hujjatlar"
            desc="Sayohat uchun zarur hujjatlaringizni bu yerda saqlang va ko‘rib chiqing."
          />
          <div className="px-4 pb-4">
            <div className="flex justify-center">
              <IDCard
                fullName="Jahongir Ergashev"
                docNumber="AA1234567"
                nationality="O‘zbekiston"
                expires="12.10.2030"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
