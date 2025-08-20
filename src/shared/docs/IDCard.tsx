/**
 * IDCard.tsx
 * Hujjat (ID) ma'lumotlarini estetik karta ko‘rinishida ko‘rsatadigan komponent.
 */

import React from 'react'
import { Calendar, Flag, Hash, QrCode, Shield, User, RotateCcw } from 'lucide-react'

/**
 * IDCardProps
 * ID karta ma'lumotlari uchun interfeys.
 */
export interface IDCardProps {
  /** To'liq ism-familiya */
  fullName: string
  /** Hujjat raqami */
  docNumber: string
  /** Fuqarolik */
  nationality: string
  /** Amal qilish muddati (ko‘rinadigan matn) */
  expires: string
  /** Avatar rasmi (smart placeholder yoki real URL) */
  avatarSrc?: string
  /** Ixtiyoriy className */
  className?: string
  /** Yangilash tugmasi bosilganda ishga tushadigan handler */
  onRefresh?: () => void
  /** Yangilash tugmasi matni (default: "Yangilash") */
  refreshLabel?: string
}

/**
 * InfoRow
 * Belgili kichik ma'lumot qatori.
 */
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-50 ring-1 ring-slate-200 text-slate-600">
        <Icon size={14} />
      </span>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wide text-slate-500">{label}</div>
        <div className="truncate text-sm font-medium text-slate-900">{value}</div>
      </div>
    </div>
  )
}

/**
 * IDCard
 * Light fon, nozik ring va yengil soyali ID karta.
 */
export function IDCard({
  fullName,
  docNumber,
  nationality,
  expires,
  avatarSrc = 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/dd8230ae-15a7-4a0f-872e-18ddaff84fce.jpg',
  className,
  onRefresh,
  refreshLabel = 'Yangilash',
}: IDCardProps) {
  return (
    <div
      className={[
        'w-full max-w-md rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm',
        'overflow-hidden',
        className ?? '',
      ].join(' ')}
      role="region"
      aria-label="ID Card"
    >
      {/* Yuqori bant: gradient, “ID CARD” badge, QR va “Yangilash” tugmasi */}
      <div className="relative">
        <div className="h-14 bg-gradient-to-r from-indigo-500 to-blue-500" />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-800 ring-1 ring-white/70 backdrop-blur">
            <Shield size={14} className="text-indigo-500" />
            ID CARD
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-white/70 backdrop-blur">
              <QrCode size={14} className="text-slate-600" />
              QR
            </div>
            <button
              type="button"
              onClick={onRefresh}
              className="inline-flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-white/70 backdrop-blur hover:bg-white"
              aria-label={refreshLabel}
            >
              <RotateCcw size={14} className="text-slate-600" />
              {refreshLabel}
            </button>
          </div>
        </div>
      </div>

      {/* Tana qismi */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
            <img src={avatarSrc} className="object-cover h-full w-full" />
            <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/20" aria-hidden="true" />
          </div>

        {/* Ism va raqam */}
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                <User size={16} />
              </span>
              <div className="truncate text-base font-semibold text-slate-900">{fullName}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wide text-slate-500">Hujjat raqami</span>
              <span className="font-mono text-sm font-semibold text-slate-900">{docNumber}</span>
            </div>
          </div>
        </div>

        {/* Ajratgich */}
        <div className="my-3 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" aria-hidden="true" />

        {/* Pastki info qatorlari */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <InfoRow icon={Flag} label="Fuqarolik" value={nationality} />
          <InfoRow icon={Calendar} label="Amal qiladi" value={expires} />
          <InfoRow icon={Hash} label="ID" value={docNumber} />
        </div>
      </div>
    </div>
  )
}

export default IDCard
