import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TOUR } from '@/data/landing'
import { cn } from '@/lib/utils'
import { PhoneShot, SectionHeading } from './Section'

/** Step list on the left drives the phone screen on the right (click or hover). */
export function AppTour() {
  const [active, setActive] = useState(0)

  return (
    <section id="app" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Cómo funciona"
          title={
            <>
              Tu entrenamiento, <span className="text-zinc-500">de principio a fin.</span>
            </>
          }
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_320px] lg:gap-20">
          <ol className="grid gap-3">
            {TOUR.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-current={i === active}
                  className={cn(
                    'group flex w-full gap-5 rounded-2xl border p-5 text-left transition-all duration-300 sm:p-6',
                    i === active
                      ? 'border-white/15 bg-white/[0.05]'
                      : 'border-transparent hover:bg-white/[0.02]',
                  )}
                >
                  <span
                    className={cn(
                      'font-mono text-sm font-semibold transition-colors',
                      i === active ? 'text-neon' : 'text-zinc-600',
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span
                      className={cn(
                        'block text-lg font-semibold tracking-tight transition-colors sm:text-xl',
                        i === active ? 'text-white' : 'text-zinc-400',
                      )}
                    >
                      {s.title}
                    </span>
                    <span className="mt-1.5 block text-[15px] leading-relaxed text-zinc-400">{s.text}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="relative order-first mx-auto w-full max-w-[220px] lg:order-none lg:max-w-none">
            <div className="absolute -inset-10 -z-10 bg-[radial-gradient(closest-side,rgba(165,61,255,0.12),transparent)]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <PhoneShot src={TOUR[active].screen} alt={TOUR[active].title} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
