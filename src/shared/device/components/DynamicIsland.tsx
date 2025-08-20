/**
 * DynamicIsland.tsx
 * Visual representation of the iPhone Dynamic Island / notch area.
 */

import React from 'react'

/**
 * DynamicIsland
 * Renders a centered pill-shaped element at the top of the frame.
 */
export const DynamicIsland: React.FC = () => {
  return (
    <div className="absolute left-1/2 top-3 -translate-x-1/2">
      {/* Main pill */}
      <div
        className="
          h-9 w-40 rounded-full
          bg-black
          shadow-[0_2px_6px_rgba(0,0,0,0.4)_inset]
          ring-1 ring-black/80
        "
        aria-hidden
      />
    </div>
  )
}
