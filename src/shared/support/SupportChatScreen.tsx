/** 
 * SupportChatScreen.tsx
 * Ekran ichidagi alohida "Yordam chat" sahifasi (portal emas).
 * Sarlavha (back), xabarlar ro'yxati va yuborish maydonidan iborat.
 */

import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Bot, Send, Sparkles, User as UserIcon } from 'lucide-react'

/** Bitta chat xabari tavsifi */
export interface ChatMessage {
  /** Kim yozdi: user yoki assistant */
  role: 'user' | 'assistant'
  /** Matn kontent */
  text: string
  /** Vaqt tamg'asi */
  ts: number
}

/** SupportChatScreen komponenti uchun prop turlari */
export interface SupportChatScreenProps {
  /** Orqaga bosilganda (sahifani yopish) */
  onBack?: () => void
}

/**
 * ChatBubble
 * Xabar pufagi: avatar + pufakcha.
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
          isUser ? 'bg-[#3050F9] text-white ring-[#3050F9]' : 'bg-white text-slate-800 ring-slate-200',
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
 * ChatInput
 * Pastdagi matn kiritish paneli va "Yuborish" tugmasi.
 */
function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void
  disabled?: boolean
}) {
  const [text, setText] = useState('')

  /** Yuborish hodisasi */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    onSend(value)
    setText('')
  }

  return (
    // Muhim: items-center bilan textarea va button bir chiziqda, vertikal markazda tekislanadi
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate-200 p-3">
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
 * oddiy qoidaviy javob generatsiyasi (soxta AI)
 */
function generateReply(input: string): string {
  const lower = input.toLowerCase()
  if (/(samolyot|reys|avia|flight)/.test(lower)) {
    return "Aviabiletlar uchun: eng arzon kunlarni topish uchun sanani ±1–2 kun o'zgartirib ko'ring. To'g'ridan-to'g'ri reyslar uchun 'Direct' filtrini yoqing."
  }
  if (/(hotel|mehmonxona)/.test(lower)) {
    return "Mehmonxona tanlashda: markazga yaqinlik va bekor qilish siyosatini tekshiring. Xarita (Map) rejimida hududlarni solishtirish qulay."
  }
  if (/(avto|car|rent|ijara)/.test(lower)) {
    return "Avto ijara uchun: uchish-vaqtingizga yaqin 'Pickup/Dropoff' vaqtlarini tanlang — ortiqcha kun to'lovidan qochasiz."
  }
  if (/(bagaj|baga|luggage)/.test(lower)) {
    return "Bagaj: 23 kg bagaj kerak bo'lsa, 'Baggage included' filtrini yoqing yoki natijadagi 'Bagaj 23 kg' opsiyasini tanlang."
  }
  if (/(qaytar|refund|returnable)/.test(lower)) {
    return "Qaytarib bo'ladigan tariflar odatda qimmatroq, lekin reja o'zgarsa xavfsiz. 'Refundable' filtrini yoqib ko'ring."
  }
  return "Savolingizni aniqroq yozing: masalan, 'Toshkent → Istanbul 12–16 avg, 2 yo'lovchi, bagajsiz'. Shunga ko'ra eng qulay variantlarni tavsiya qilaman."
}

/**
 * SupportChatScreen
 * Ekran ichida to'liq sahifa sifatida ko'rinadigan yordam chat sahifasi.
 */
export default function SupportChatScreen({ onBack }: SupportChatScreenProps) {
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

  /** Xabarlar listini pastga scroll qilish */
  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  /** Yuborish oqimi: user -> typing -> assistant */
  function handleSend(text: string) {
    const userMsg: ChatMessage = { role: 'user', text, ts: Date.now() }
    setMessages((m) => [...m, userMsg])
    setTyping(true)
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

  return (
    <div className="absolute inset-0 z-30 bg-slate-50 flex h-full min-h-0 flex-col">
      {/* Sarlavha paneli */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white/95 px-3 py-3 backdrop-blur ring-1 ring-slate-200">
        <button
          aria-label="Orqaga"
          onClick={onBack}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="text-sm font-semibold text-slate-900">Yordam chat</div>
        <div className="h-9 w-9" />
      </div>

      {/* Xabarlar ro'yxati */}
      <div ref={listRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-3">
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
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

      {/* Kirish paneli */}
      <ChatInput onSend={handleSend} disabled={typing} />
    </div>
  )
}
