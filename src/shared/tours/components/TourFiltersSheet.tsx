/** 
 * TourFiltersSheet.tsx
 * To'liq ekranli yoki konteyner ichida (inline) ochiladigan tur filtrlari paneli.
 * Yangilanish: "drill-down" navigatsiya — har bir sozlama ichki sahifada tanlanadi.
 * - Root ro'yxat: elementga bosilganda ichki sahifa ochiladi (yonida emas).
 * - Header: root'da panelni yopadi; ichki sahifada root'ga qaytaradi.
 * - Pastda umumiy "Filtrlarni qo'llash" tugmasi.
 */

import React, { useEffect, useMemo, useState } from 'react'
import {
  Zap,
  Anchor,
  Umbrella,
  Building2,
  Utensils,
  DollarSign,
  Armchair,
  Star,
  Waves,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react'
import * as Slider from '@radix-ui/react-slider'

/** Filtr qiymatlari interfeysi */
export interface TourFilters {
  instantConfirm: boolean
  distanceToSea: 'any' | '500m' | '1km' | '3km' | '5km'
  privateBeach: 'any' | 'yes' | 'no'
  hotelClass: 'any' | 5 | 4 | 3 | 2
  board: 'any' | 'RO' | 'BB' | 'HB' | 'AI' | 'UAI'
  budget: [number, number] // USD
  amenities: string[] // masalan: ['Pool', 'Spa', 'WiFi']
  rating: 'any' | '9+' | '8+' | '7+' | '6+'
  waterFun: string[] // masalan: ['Jetski', 'Diving']
}

/** Standart (default) filtrlar */
export const defaultTourFilters: TourFilters = {
  instantConfirm: false,
  distanceToSea: 'any',
  privateBeach: 'any',
  hotelClass: 'any',
  board: 'any',
  budget: [100, 4000],
  amenities: [],
  rating: 'any',
  waterFun: [],
}

/** USD formatlovchi */
function formatUSD(v: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
}

/**
 * Chip — kichik badge-tugma (sub sahifalarda ham ishlatiladi).
 */
function Chip({
  selected,
  onClick,
  children,
}: {
  selected?: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'px-3 py-1.5 rounded-full text-sm border transition-colors',
        selected ? 'bg-[#3050F9] text-white border-transparent' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

/**
 * Row — Root ro'yxat elementi (icon + title + subtitle). 
 * onClick berilsa butun satr bosiladigan bo'ladi va o'ngda chevron chiqadi.
 */
function Row({
  icon,
  title,
  subtitle,
  onClick,
  right,
}: {
  icon: React.ReactNode
  title: string
  subtitle?: string
  onClick?: () => void
  right?: React.ReactNode
}) {
  const Comp = onClick ? 'button' : 'div'
  return (
    <Comp
      onClick={onClick as any}
      className={[
        'w-full flex items-center justify-between gap-3 px-4 py-4 border-b border-slate-100',
        onClick ? 'text-left hover:bg-slate-50 transition-colors' : '',
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5 text-slate-500">{icon}</div>
        <div>
          <div className="text-[15px] font-medium text-slate-900">{title}</div>
          {subtitle && <div className="text-sm text-slate-500 mt-0.5">{subtitle}</div>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {right}
        {onClick && <ChevronRight className="w-5 h-5 text-slate-400" />}
      </div>
    </Comp>
  )
}

/** Ichki sahifa turini bildiruvchi tip */
type SubView =
  | 'root'
  | 'distanceToSea'
  | 'privateBeach'
  | 'hotelClass'
  | 'board'
  | 'budget'
  | 'amenities'
  | 'rating'
  | 'waterFun'

/**
 * SubHeader — ichki sahifa header'i.
 */
function SubHeader({
  title,
  onBack,
  right,
}: {
  title: string
  onBack: () => void
  right?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between px-2 py-3">
      <button
        aria-label="Orqaga"
        onClick={onBack}
        className="p-2 rounded hover:bg-white/10 active:bg-white/15 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <div className="text-base font-semibold">{title}</div>
      <div className="min-w-[64px] flex justify-end">{right}</div>
    </div>
  )
}

/**
 * OptionItem — radio uslubidagi bitta variant (single-select).
 */
function OptionItem({
  label,
  selected,
  onSelect,
  subtitle,
}: {
  label: string
  selected?: boolean
  onSelect: () => void
  subtitle?: string
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-100 hover:bg-slate-50"
    >
      <div className="text-left">
        <div className="text-[15px] text-slate-900">{label}</div>
        {subtitle && <div className="text-xs text-slate-500 mt-0.5">{subtitle}</div>}
      </div>
      {selected ? (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#3050F9] text-white">
          <Check className="w-4 h-4" />
        </span>
      ) : (
        <span className="w-6 h-6 rounded-full border border-slate-300" />
      )}
    </button>
  )
}

/**
 * ToggleItem — multi-select varianti (checkbox uslubi).
 */
function ToggleItem({
  label,
  checked,
  onToggle,
}: {
  label: string
  checked?: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-100 hover:bg-slate-50"
    >
      <div className="text-[15px] text-slate-900">{label}</div>
      {checked ? (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-[#3050F9] text-white">
          <Check className="w-4 h-4" />
        </span>
      ) : (
        <span className="w-6 h-6 rounded border border-slate-300" />
      )}
    </button>
  )
}

/**
 * TourFiltersSheet
 * - fixed fullscreen yoki inline absolute panel
 * - Drill-down UX: root ro'yxatdan ichki sahifalarga o'tish
 */
export default function TourFiltersSheet({
  open,
  onOpenChange,
  value,
  onChange,
  onApply,
  inline = false,
}: {
  /** Ochiqlik holati */
  open: boolean
  /** Ochiqlikni o'zgartirish */
  onOpenChange: (open: boolean) => void
  /** Tashqi qiymat */
  value: TourFilters
  /** Tashqi qiymatni yozish (ixtiyoriy) */
  onChange?: (v: TourFilters) => void
  /** Qo'llash payti */
  onApply: (v: TourFilters) => void
  /** true bo'lsa, panel parent konteyner ichida ochiladi */
  inline?: boolean
}) {
  const [draft, setDraft] = useState<TourFilters>(value)
  const [view, setView] = useState<SubView>('root')

  /** Panel ochilganda tashqi qiymat bilan sinxronlashtirish */
  useEffect(() => {
    if (open) {
      setDraft(value)
      setView('root')
    }
  }, [open, value])

  /** Draftni yangilash */
  function patch(p: Partial<TourFilters>) {
    const next = { ...draft, ...p }
    setDraft(next)
    onChange?.(next)
  }

  /** Tozalash -> defaultlar */
  function reset() {
    setDraft(defaultTourFilters)
    onChange?.(defaultTourFilters)
  }

  /** Qo'llash */
  function apply() {
    onApply(draft)
    onOpenChange(false)
  }

  /** Kataloglar */
  const amenityCatalog = useMemo(() => ['Wi‑Fi', 'Hovuz', 'Spa', 'Avtoturargoh', 'Sport zali', 'Transfer'], [])
  const waterCatalog = useMemo(() => ['Jet-ski', 'Diving', 'Snorkeling', 'Parus', 'Katamaran'], [])

  if (!open) return null

  const wrapperClass = (inline ? 'absolute inset-0 z-40' : 'fixed inset-0 z-50') + ' bg-white flex flex-col'

  /** Header rangli zonasi (root va sub sahifalarda ham ishlatiladi) */
  const headerBg = 'bg-[#0B1B70] text-white'

  /** Root sahifasi tarkibi */
  function renderRoot() {
    return (
      <>
        <Row
          icon={<Zap className="w-5 h-5" />}
          title="Tezkor tasdiqlash"
          subtitle="Darhol tasdiqlanadigan variantlar"
          right={
            <label className="inline-flex items-center gap-2 select-none cursor-pointer">
              <input
                type="checkbox"
                className="appearance-none w-11 h-6 rounded-full bg-slate-200 relative outline-none transition-colors checked:bg-[#3050F9]"
                checked={draft.instantConfirm}
                onChange={(e) => patch({ instantConfirm: e.target.checked })}
                aria-label="Tezkor tasdiqlash"
              />
            </label>
          }
        />

        <Row
          icon={<Anchor className="w-5 h-5" />}
          title="Dengizgacha masofa"
          subtitle={distanceLabel(draft.distanceToSea)}
          onClick={() => setView('distanceToSea')}
        />

        <Row
          icon={<Umbrella className="w-5 h-5" />}
          title="Mehmonxonaning shaxsiy plyaji"
          subtitle={yesNoAnyLabel(draft.privateBeach)}
          onClick={() => setView('privateBeach')}
        />

        <Row
          icon={<Building2 className="w-5 h-5" />}
          title="Mehmonxona sinfi"
          subtitle={hotelClassLabel(draft.hotelClass)}
          onClick={() => setView('hotelClass')}
        />

        <Row
          icon={<Utensils className="w-5 h-5" />}
          title="Ovqatlanish"
          subtitle={boardLabel(draft.board)}
          onClick={() => setView('board')}
        />

        <Row
          icon={<DollarSign className="w-5 h-5" />}
          title="Byudjet"
          subtitle={`${formatUSD(draft.budget[0])} — ${formatUSD(draft.budget[1])}`}
          onClick={() => setView('budget')}
        />

        <Row
          icon={<Armchair className="w-5 h-5" />}
          title="Qulayliklar"
          subtitle={draft.amenities.length ? draft.amenities.join(', ') : 'Har qanday'}
          onClick={() => setView('amenities')}
        />

        <Row
          icon={<Star className="w-5 h-5" />}
          title="Reyting"
          subtitle={ratingLabel(draft.rating)}
          onClick={() => setView('rating')}
        />

        <Row
          icon={<Waves className="w-5 h-5" />}
          title="Suv ko‘ngilochar"
          subtitle={draft.waterFun.length ? draft.waterFun.join(', ') : 'Har qanday'}
          onClick={() => setView('waterFun')}
        />

        <div className="h-24" />
      </>
    )
  }

  /** Ichki sahifalar */
  function renderDistance() {
    const options: Array<TourFilters['distanceToSea']> = ['any', '500m', '1km', '3km', '5km']
    return (
      <>
        <div className={headerBg}>
          <SubHeader title="Dengizgacha masofa" onBack={() => setView('root')} />
        </div>
        <div>
          {options.map((opt) => (
            <OptionItem
              key={opt}
              label={distanceLabel(opt)}
              selected={draft.distanceToSea === opt}
              onSelect={() => patch({ distanceToSea: opt })}
            />
          ))}
        </div>
      </>
    )
  }

  function renderPrivateBeach() {
    const options: Array<TourFilters['privateBeach']> = ['any', 'yes', 'no']
    return (
      <>
        <div className={headerBg}>
          <SubHeader title="Shaxsiy plyaj" onBack={() => setView('root')} />
        </div>
        <div>
          {options.map((opt) => (
            <OptionItem
              key={opt}
              label={yesNoAnyLabel(opt)}
              selected={draft.privateBeach === opt}
              onSelect={() => patch({ privateBeach: opt })}
            />
          ))}
        </div>
      </>
    )
  }

  function renderHotelClass() {
    const options: Array<TourFilters['hotelClass']> = ['any', 5, 4, 3, 2]
    return (
      <>
        <div className={headerBg}>
          <SubHeader title="Mehmonxona sinfi" onBack={() => setView('root')} />
        </div>
        <div>
          {options.map((opt) => (
            <OptionItem
              key={String(opt)}
              label={hotelClassLabel(opt)}
              selected={draft.hotelClass === opt}
              onSelect={() => patch({ hotelClass: opt as TourFilters['hotelClass'] })}
            />
          ))}
        </div>
      </>
    )
  }

  function renderBoard() {
    const options: Array<TourFilters['board']> = ['any', 'RO', 'BB', 'HB', 'AI', 'UAI']
    return (
      <>
        <div className={headerBg}>
          <SubHeader title="Ovqatlanish" onBack={() => setView('root')} />
        </div>
        <div>
          {options.map((opt) => (
            <OptionItem
              key={opt}
              label={boardLabel(opt)}
              selected={draft.board === opt}
              onSelect={() => patch({ board: opt })}
            />
          ))}
        </div>
      </>
    )
  }

  function renderBudget() {
    return (
      <>
        <div className={headerBg}>
          <SubHeader title="Byudjet" onBack={() => setView('root')} />
        </div>
        <div className="px-4 py-5">
          <div className="text-sm text-slate-600 mb-3">
            {formatUSD(draft.budget[0])} — {formatUSD(draft.budget[1])}
          </div>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={draft.budget}
            min={50}
            max={5000}
            step={10}
            onValueChange={(val) => patch({ budget: val as [number, number] })}
            aria-label="Byudjet oralig'i"
          >
            <Slider.Track className="bg-slate-200 relative grow rounded-full h-1.5">
              <Slider.Range className="absolute bg-[#3050F9] rounded-full h-1.5" />
            </Slider.Track>
            <Slider.Thumb className="block w-4 h-4 bg-white border border-slate-300 rounded-full shadow" aria-label="Min" />
            <Slider.Thumb className="block w-4 h-4 bg-white border border-slate-300 rounded-full shadow" aria-label="Max" />
          </Slider.Root>
          <div className="mt-2 text-xs text-slate-500">{formatUSD(50)} — {formatUSD(5000)}</div>
        </div>
      </>
    )
  }

  function renderAmenities() {
    return (
      <>
        <div className={headerBg}>
          <SubHeader
            title="Qulayliklar"
            onBack={() => setView('root')}
            right={
              draft.amenities.length > 0 ? (
                <button
                  className="px-3 py-1.5 rounded text-sm font-medium hover:bg-white/10 active:bg-white/15 transition-colors"
                  onClick={() => patch({ amenities: [] })}
                >
                  Tozalash
                </button>
              ) : (
                <div />
              )
            }
          />
        </div>
        <div>
          {amenityCatalog.map((a) => {
            const selected = draft.amenities.includes(a)
            return <ToggleItem key={a} label={a} checked={selected} onToggle={() => {
              const next = selected ? draft.amenities.filter((x) => x !== a) : [...draft.amenities, a]
              patch({ amenities: next })
            }} />
          })}
        </div>
      </>
    )
  }

  function renderRating() {
    const options: Array<TourFilters['rating']> = ['any', '9+', '8+', '7+', '6+']
    return (
      <>
        <div className={headerBg}>
          <SubHeader title="Reyting" onBack={() => setView('root')} />
        </div>
        <div>
          {options.map((r) => (
            <OptionItem
              key={r}
              label={ratingLabel(r)}
              selected={draft.rating === r}
              onSelect={() => patch({ rating: r })}
            />
          ))}
        </div>
      </>
    )
  }

  function renderWaterFun() {
    return (
      <>
        <div className={headerBg}>
          <SubHeader
            title="Suv ko‘ngilochar"
            onBack={() => setView('root')}
            right={
              draft.waterFun.length > 0 ? (
                <button
                  className="px-3 py-1.5 rounded text-sm font-medium hover:bg-white/10 active:bg-white/15 transition-colors"
                  onClick={() => patch({ waterFun: [] })}
                >
                  Tozalash
                </button>
              ) : (
                <div />
              )
            }
          />
        </div>
        <div>
          {waterCatalog.map((w) => {
            const selected = draft.waterFun.includes(w)
            return <ToggleItem key={w} label={w} checked={selected} onToggle={() => {
              const next = selected ? draft.waterFun.filter((x) => x !== w) : [...draft.waterFun, w]
              patch({ waterFun: next })
            }} />
          })}
        </div>
      </>
    )
  }

  return (
    <div className={wrapperClass}>
      {/* Header */}
      <div className={headerBg}>
        {view === 'root' ? (
          <div className="flex items-center justify-between px-2 py-3">
            <button
              aria-label="Orqaga"
              onClick={() => onOpenChange(false)}
              className="p-2 rounded hover:bg-white/10 active:bg-white/15 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-base font-semibold">Filtrlar</div>
            <button
              onClick={reset}
              className="px-3 py-1.5 rounded text-sm font-medium hover:bg-white/10 active:bg-white/15 transition-colors"
            >
              Tozalash
            </button>
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {view === 'root' && renderRoot()}
        {view === 'distanceToSea' && renderDistance()}
        {view === 'privateBeach' && renderPrivateBeach()}
        {view === 'hotelClass' && renderHotelClass()}
        {view === 'board' && renderBoard()}
        {view === 'budget' && renderBudget()}
        {view === 'amenities' && renderAmenities()}
        {view === 'rating' && renderRating()}
        {view === 'waterFun' && renderWaterFun()}
        <div className="h-24" />
      </div>

      {/* Bottom action */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur border-t border-slate-200 p-4">
        <button
          className="w-full py-3.5 rounded-xl bg-[#6C5CE7] hover:bg-[#5b4ed0] text-white font-semibold shadow-md transition-colors"
          onClick={apply}
        >
          Filtrlarni qo‘llash
        </button>
      </div>
    </div>
  )
}

/** Yordamchi matnlar */
function distanceLabel(v: TourFilters['distanceToSea']): string {
  switch (v) {
    case '500m':
      return '< 500 m'
    case '1km':
      return '< 1 km'
    case '3km':
      return '< 3 km'
    case '5km':
      return '< 5 km'
    default:
      return 'Muhim emas'
  }
}

function yesNoAnyLabel(v: TourFilters['privateBeach']): string {
  switch (v) {
    case 'yes':
      return 'Ha'
    case 'no':
      return 'Yo‘q'
    default:
      return 'Muhim emas'
  }
}

function hotelClassLabel(v: TourFilters['hotelClass']): string {
  if (v === 'any') return 'Istalgan'
  return `${v}★ va yuqori`
}

function boardLabel(v: TourFilters['board']): string {
  switch (v) {
    case 'RO':
      return 'RO — faqat xona'
    case 'BB':
      return 'BB — nonushta'
    case 'HB':
      return 'HB — yarim pansion'
    case 'AI':
      return 'AI — hammasi ichida'
    case 'UAI':
      return 'UAI — ultra all inclusive'
    default:
      return 'Istalgan'
  }
}

function ratingLabel(v: TourFilters['rating']): string {
  switch (v) {
    case '9+':
      return '9+ a’lo'
    case '8+':
      return '8+ juda yaxshi'
    case '7+':
      return '7+ yaxshi'
    case '6+':
      return '6+ qoniqarli'
    default:
      return 'Istalgan'
  }
}
