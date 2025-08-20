/**
 * ProfileScreen.tsx
 * Profil bo‘limi: foydalanuvchi karta, tezkor amallar, sozlamalar ro‘yxati va “Hujjatlar”.
 * Light tema va #3050F9 accentga mos.
 */

import React from 'react'
import {
  Edit3,
  CreditCard,
  Shield,
  Globe,
  Bell,
  HelpCircle,
  LogOut,
} from 'lucide-react'
import { IDCard } from '../docs/IDCard'

/** Tezkor amal elementi */
interface QuickAction {
  /** Ikona */
  icon: React.ComponentType<{ size?: number; className?: string }>
  /** Matn */
  label: string
}

/** Bitta sozlama elementi */
interface SettingItem {
  /** Ikona */
  icon: React.ComponentType<{ size?: number; className?: string }>
  /** Sarlavha */
  title: string
  /** Qisqa izoh */
  desc?: string
}

const ACTIONS: QuickAction[] = [
  { icon: Edit3, label: 'Profilni tahrirlash' },
  { icon: CreditCard, label: 'To‘lov usullari' },
  { icon: Shield, label: 'Xavfsizlik' },
]

const SETTINGS: SettingItem[] = [
  { icon: Globe, title: 'Til', desc: "O‘zbek (Lotin)" },
  { icon: Bell, title: 'Bildirishnomalar', desc: 'Push, email' },
  { icon: HelpCircle, title: 'Yordam markazi', desc: 'Savol-javoblar' },
]

/** Kichik pill ikona konteyneri */
function IconPill({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={[
        'inline-flex h-9 w-9 items-center justify-center rounded-xl ring-1',
        'bg-[#3050F9]/10 text-[#3050F9] ring-[#3050F9]/20',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </span>
  )
}

/** Setting qatori */
function SettingRow({ item }: { item: SettingItem }) {
  const Icon = item.icon
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left ring-1 ring-slate-200 transition hover:bg-slate-50"
      aria-label={item.title}
    >
      <IconPill>
        <Icon size={18} />
      </IconPill>
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-slate-900">{item.title}</div>
        {item.desc && <div className="truncate text-xs text-slate-500">{item.desc}</div>}
      </div>
    </button>
  )
}

/** ProfileScreen komponenti */
export function ProfileScreen() {
  /** ID Card yangilash bosilganda sodir bo‘ladigan sodda xatti-harakat */
  function handleRefreshID() {
    // Kelajakda: API chaqirish yoki ma'lumotlarni qayta yuklash
    console.log('ID Card yangilandi')
  }

  return (
    <div className="page-enter">
      {/* Yuqori profil kartasi */}
      <div className="px-4 pt-4">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 overflow-hidden rounded-xl ring-1 ring-slate-200">
              <img
                src="https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/6cc82687-87ce-4aba-9e40-4bf26cc1bee7.JPG"
                className="object-cover h-full w-full"
              />
            </div>
            <div className="min-w-0">
              <div className="text-base font-semibold text-slate-900">Sardor Karimov</div>
              <div className="text-xs text-slate-500">+998 90 123 45 67 • sardor@example.com</div>
            </div>
          </div>

          {/* Tezkor amallar */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {ACTIONS.map((a) => {
              const Icon = a.icon
              return (
                <button
                  key={a.label}
                  type="button"
                  className="flex flex-col items-center gap-2 rounded-xl bg-slate-50 p-3 text-center text-xs text-slate-700 ring-1 ring-slate-100 transition hover:bg-slate-100"
                >
                  <IconPill>
                    <Icon size={18} />
                  </IconPill>
                  <span className="line-clamp-2">{a.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Sozlamalar ro'yxati */}
      <div className="px-4 pt-3">
        <div className="grid grid-cols-1 gap-2">
          {SETTINGS.map((s) => (
            <SettingRow key={s.title} item={s} />
          ))}
        </div>
      </div>

      {/* Hujjatlar bo‘limi */}
      <div className="px-4 pt-3">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
          <div className="px-1 pb-3">
            <h2 className="text-base font-bold tracking-tight text-slate-900">Hujjatlar</h2>
            <p className="mt-1 text-xs text-slate-600">
              Sayohat uchun zarur hujjatlar. Quyida ID karta namunasi keltirilgan.
            </p>
          </div>
          <div className="flex justify-center">
            <IDCard
              fullName="Sardor Karimov"
              docNumber="AA9876543"
              nationality="O‘zbekiston"
              expires="21.04.2031"
              onRefresh={handleRefreshID}
              refreshLabel="Yangilash"
            />
          </div>
        </div>
      </div>

      {/* Chiqish tugmasi */}
      <div className="px-4 py-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100"
        >
          <LogOut size={16} /> Chiqish
        </button>
      </div>

      {/* Pastki bo'sh joy: TabBar bilan to‘qnashmaslik */}
      <div className="pointer-events-none h-20" aria-hidden />
    </div>
  )
}
