/**
 * AIChatWidget.tsx
 * Yordam (AI) chat vidjeti: bottom-sheet modal ko'rinishida, xabarlar ro'yxati va yuborish oynasi.
 * Foydalanuvchi yozadi, "soxta AI" tezkor maslahatlar bilan javob beradi.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { X, Send, Bot, User as UserIcon, MessageCircle, Sparkles } from 'lucide-react'

/** Xabar yozuvi */
export interface ChatMessage {
  /** Kim yozdi: user yoki assistant */
  role: 'user' | 'assistant'
  /** Matn kontent */
  text: string
  /** Vaqt tamg'asi */
  ts: number
}

/** AI chat vidjeti propslari */
export interface AIChatWidgetProps {
  /** Ochiq/yopiq holati */
  open: boolean
  /** Yopish callback */
  onClose: () => void
}

/**
 * ChatBubble
 * Bitta xabar ko'rinishi: avatar + pufakcha.
 */
function ChatBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user'
  return (
    <div className={['flex items-end gap-2', isUser ? 'justify-end' : 'justify-start'].join(' ')}>
      {!isUser && (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white">
          <Bot size={14} />
        </div>
      )}
      <div
        className={[
          'max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ring-1',
          isUser
            ? 'bg-[#3050F9] text-white ring-[#3050F9]'
            : 'bg-white text-slate-800 ring-slate-200',
        ].join(' ')}
      >
        {msg.text}
      </div>
      {isUser && (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-slate-700">
          <UserIcon size={14} />
        </div>
      )}
    </div>
  )
}

/**
 * ChatHeader
 * Sarlavha paneli: unvon, kichik tag matn va yopish tugmasi.
 */
function ChatHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl bg-white/95 px-4 py-3 backdrop-blur ring-1 ring-slate-200">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3050F9] text-white">
          <MessageCircle size={14} />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">Yordam chat</div>
          <div className="text-[11px] text-slate-500">AI yordamchi onlayn</div>
        </div>
      </div>
      <button
        aria-label="Yopish"
        onClick={onClose}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
      >
        <X size={16} />
      </button>
    </div>
  )
}

/**
 * ChatInput
 * Pastki kirish paneli: matn maydoni + yuborish tugmasi.
 */
function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void
  disabled?: boolean
}) {
  const [text, setText] = useState('')
  /** Submitni qayta ishlash */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    onSend(value)
    setText('')
  }
  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-slate-200 p-3">
      <div className="flex-1">
        <textarea
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Savolingizni yozing..."
          className="h-10 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#3050F9] focus:ring-2 focus:ring-[#3050F9]/30"
        />
      </div>
      <button
        type="submit"
        disabled={disabled}
        className={[
          'inline-flex h-10 items-center justify-center gap-1 rounded-xl px-3 text-sm font-semibold text-white shadow-sm transition',
          disabled ? 'bg-slate-400' : 'bg-[#3050F9] hover:brightness-95 active:brightness-90',
        ].join(' ')}
      >
        <Send size={16} />
        Yuborish
      </button>
    </form>
  )
}

/**
 * AIChatWidget
 * - fixed bottom-sheet modal (max-w-md) — mobilga yo'naltirilgan dizayn.
 * - Portal orqali body ichiga chiqariladi; overlayga klikda yopiladi.
 * - "Soxta AI" qoidalari: yo'nalish, sanalar, tariflar, bagaj kabi mavzularda qisqa maslahat.
 */
export function AIChatWidget({ open, onClose }: AIChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      role: 'assistant',
      text:
        "Salom! Men sayohat rejangiz bo'yicha yordam beraman. Qayerdan qayerga, qay sanalarda va nechta yo'lovchi?",
      ts: Date.now(),
    },
  ])
  const [typing, setTyping] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  /** Esc bilan yopish */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', onKey)
      return () => document.removeEventListener('keydown', onKey)
    }
    return
  }, [open, onClose])

  /** Xabarlar scrollini pastga surish */
  useEffect(() => {
    if (!open) return
    const el = listRef.current
    if (el) {
      // scrollBottom
      el.scrollTop = el.scrollHeight
    }
  }, [open, messages, typing])

  /** Oddiy qoidaviy javob generatsiyasi */
  function generateReply(input: string): string {
    const lower = input.toLowerCase()
    if (/(samolyot|reys|avia|flight)/.test(lower)) {
      return "Aviabiletlar uchun: eng arzon kunlarni topish uchun sanani ±1-2 kun o'zgartirib ko'ring. To'g'ridan-to'g'ri reyslar uchun 'Direct' filtrini yoqing."
    }
    if (/(hotel|mehmonxona)/.test(lower)) {
      return "Mehmonxona tanlashda: markazga yaqinlik va bekor qilish siyosatini tekshiring. Xarita (Map) rejimida hududlarni solishtirish qulay."
    }
    if (/(avto|car|rent|ijara)/.test(lower)) {
      return "Avto ijara uchun: uchish-vaqtingizga yaqin 'Pickup/Dropoff' vaqtlarini tanlang, shu bilan ortiqcha kun to'lovi oldini olasiz."
    }
    if (/(bagaj|baga|luggage)/.test(lower)) {
      return "Bagaj: 23 kg bagaj kerak bo'lsa, 'Baggage included' filtrini yoqing yoki natijadagi 'Bagaj 23 kg' opsiyasini tanlang."
    }
    if (/(qaytar|refund|returnable)/.test(lower)) {
      return "Qaytarib bo'ladigan tariflar odatda qimmatroq bo'ladi, lekin reja o'zgarsa xavfsiz. 'Refundable' filtrini yoqib ko'ring."
    }
    if (/(transfer|tur)/.test(lower)) {
      return "Transfer/tur: kelish va jo'nash vaqtlariga mos paketlarni solishtirib ko'ring, ko'pincha guruh chegirmalari mavjud."
    }
    // Default foydali javob
    return "Savolingizni aniqroq yozing: masalan, 'Toshkent → Istanbul 12–16 avg, 2 yo'lovchi, bagajsiz'. Shunga ko'ra eng qulay variantlarni tavsiya qilaman."
  }

  /** Xabar yuborish: user -> typing -> assistant */
  function handleSend(text: string) {
    const userMsg: ChatMessage = { role: 'user', text, ts: Date.now() }
    setMessages((m) => [...m, userMsg])
    setTyping(true)
    // "AI" typing simulyatsiyasi
    setTimeout(() => {
      const reply: ChatMessage = {
        role: 'assistant',
        text: generateReply(text),
        ts: Date.now(),
      }
      setMessages((m) => [...m, reply])
      setTyping(false)
    }, 500)
  }

  if (!open) return null

  // Portal orqali chiqarish (z-index ustuvorligi uchun)
  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Bottom sheet panel (max-w-md) */}
      <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md">
        <div className="mx-3 mb-3 rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
          <ChatHeader onClose={onClose} />
          {/* Xabarlar ro'yxati */}
          <div ref={listRef} className="max-h-[60vh] overflow-y-auto px-4 py-3">
            {messages.map((m, idx) => (
              <div key={idx} className="mb-2">
                <ChatBubble msg={m} />
              </div>
            ))}
            {typing && (
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <Sparkles size={14} />
                </div>
                <div className="rounded-2xl bg-white px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200">
                  Yozmoqda...
                </div>
              </div>
            )}
          </div>
          <ChatInput onSend={handleSend} disabled={typing} />
        </div>
        {/* Safe-area pastki bo'sh joy */}
        <div className="h-3" aria-hidden />
      </div>
    </>,
    document.body,
  )
}

export default AIChatWidget
