/**
 * StatusBar.tsx
 * Minimal simulated status bar for time and device indicators.
 * Light/Dark ko‘rinishga moslashadi (default: light).
 */

import { BatteryFull, Wifi, Signal } from 'lucide-react'
import React from 'react'

/** StatusBar propslari */
interface StatusBarProps {
  /** Light yoki Dark ko‘rinish */
  theme?: 'light' | 'dark'
}

/**
 * StatusBar
 * Light fonda to‘q matnli (default), Dark fonda oq matnli ikonka/soat ko‘rsatadi.
 */
export function StatusBar({ theme = 'light' }: StatusBarProps) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const isDark = theme === 'dark'

  return (
    <div
      className={[
        'flex items-center justify-between px-4 pt-3 text-[11px]',
        isDark ? 'text-slate-100/90' : 'text-slate-900/90',
      ].join(' ')}
    >
      <span className="font-medium">{time}</span>
      <div className={['flex items-center gap-1.5', isDark ? 'text-slate-100/80' : 'text-slate-900/70'].join(' ')}>
        <Signal size={14} />
        <Wifi size={14} />
        <BatteryFull size={16} />
      </div>
    </div>
  )
}
