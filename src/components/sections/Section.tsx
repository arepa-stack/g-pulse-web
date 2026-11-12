import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/** Eyebrow + title + optional lead, revealed on scroll. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn('max-w-2xl', className)}
    >
      <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-neon">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">{title}</h2>
      {lead && <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">{lead}</p>}
    </motion.div>
  )
}

/** Phone bezel around an app screenshot. */
export function PhoneShot({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 p-1.5 shadow-2xl shadow-black/60',
        className,
      )}
    >
      <img src={src} alt={alt} loading="lazy" className="aspect-[9/19] w-full rounded-[1.6rem] object-cover object-top" />
    </div>
  )
}
