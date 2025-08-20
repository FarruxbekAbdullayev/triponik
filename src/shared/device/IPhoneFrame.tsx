/**
 * IPhoneFrame.tsx
 * A stylized iPhone device frame component with Dynamic Island notch and safe area.
 */

import { PropsWithChildren } from 'react'
import { DynamicIsland } from './components/DynamicIsland'

/**
 * IPhoneFrame
 * Creates a realistic iPhone-like container for mobile app previews.
 */
export function IPhoneFrame({ children }: PropsWithChildren) {
  return (
    <div
      className="
        relative
        [--w:380px] md:[--w:400px]
        w-[var(--w)] h-[calc(var(--w)*2.05)]
        rounded-[42px]
        p-1
        bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300
        shadow-[0_20px_50px_rgba(2,6,23,0.25)]
      "
      aria-label="iPhone device frame"
    >
      {/* Bezel */}
      <div
        className="
          relative h-full w-full rounded-[38px]
          bg-black/95 ring-1 ring-black/40 overflow-hidden
        "
      >
        {/* Dynamic Island */}
        <DynamicIsland />

        {/* Inner Screen */}
        <div
          className="
            absolute inset-[12px]
            rounded-[28px]
            overflow-hidden
            bg-[#0b0f3b]
          "
        >
          {/* App Content with safe paddings (top for island, bottom for tab bar) */}
          <div className="relative flex h-full min-h-0 flex-col text-slate-100">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/30 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/30 to-transparent" />
            {/* Important: allow inner scrollable areas to work by using min-h-0 */}
            <div className="flex-1 min-h-0 overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
