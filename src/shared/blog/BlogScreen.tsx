/**
 * BlogScreen.tsx
 * Blog maqolalari ro'yxati: yengil kartalar, rasm, sarlavha, qisqa matn, teglar.
 * Light tema va #3050F9 accentga mos.
 */

import React from 'react'
import { Calendar, Tag, ArrowRight } from 'lucide-react'

/** Bitta blog yozuvi turi */
interface BlogPost {
  /** Unikal id */
  id: string
  /** Sarlavha */
  title: string
  /** Qisqa tavsif */
  excerpt: string
  /** Sana matni */
  date: string
  /** Teglar */
  tags: string[]
  /** Rasm (smart placeholder) */
  image: string
}

/** Demo yozuvlar */
const POSTS: BlogPost[] = [
  {
    id: 'p1',
    title: 'Uzbekistonda kuz sayohatlari uchun 7 ajoyib yo‘nalish',
    excerpt: 'Qisqa dam olish kunlari uchun Samarqand, Buxoro va Xiva bo‘yicha g‘oyalar.',
    date: '2025-08-01',
    tags: ['yo‘nalish', 'kuz', 'vikend'],
    image: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/f37cb162-035a-431e-aa3a-6f61454024f7.jpg',
  },
  {
    id: 'p2',
    title: 'Arzon aviachipta olishning 5 siri',
    excerpt: 'Qidiruv vaqtini to‘g‘ri tanlash va narxlarni kuzatish bo‘yicha maslahatlar.',
    date: '2025-07-22',
    tags: ['avia', 'lifehack'],
    image: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/09628dca-dca2-455b-8f78-d4f68a182355.jpg',
  },
  {
    id: 'p3',
    title: 'Avto ijara: yangi boshlovchilar uchun qo‘llanma',
    excerpt: 'Kredit kartalar, depozit va sug‘urta turlari haqida bilib oling.',
    date: '2025-07-10',
    tags: ['car', 'rent', 'maslahat'],
    image: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/301f56b0-0985-4fc9-a21a-a91d0fdd820f.jpg',
  },
]

/** Blog kartasi */
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
      <div className="h-36 w-full">
        <img src={post.image} className="object-cover h-full w-full" />
      </div>
      <div className="p-4">
        <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
          <Calendar size={14} />
          <span>{post.date}</span>
        </div>
        <h3 className="text-base font-semibold text-slate-900">{post.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{post.excerpt}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded-full bg-[#3050F9]/10 px-2 py-1 text-[11px] font-medium text-[#3050F9] ring-1 ring-[#3050F9]/20"
            >
              <Tag size={12} /> {t}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
            aria-label="Batafsil"
          >
            Batafsil <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  )
}

/** BlogScreen */
export function BlogScreen() {
  return (
    <div className="page-enter">
      {/* Sarlavha */}
      <div className="px-4 pt-4">
        <div className="text-2xl font-bold tracking-tight text-slate-900">Blog</div>
        <div className="mt-1 text-xs text-slate-500">Sayohat ilhomlari va foydali maslahatlar</div>
      </div>

      {/* Ro'yxat */}
      <div className="grid grid-cols-1 gap-3 px-4 pb-24 pt-3">
        {POSTS.map((p) => (
          <BlogCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  )
}
