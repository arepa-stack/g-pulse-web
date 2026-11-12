import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Library, Users, TrendingUp } from 'lucide-react'
import { HIGHLIGHTS, EXTRAS } from '@/data/landing'
import { cn } from '@/lib/utils'
import { PhoneShot, SectionHeading } from './Section'

const [ai, library, community] = HIGHLIGHTS

function Card({ className, children, delay = 0 }: { className?: string; children: ReactNode; delay?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-colors duration-300 hover:border-white/20 sm:p-8',
        className,
      )}
    >
      {children}
    </motion.article>
  )
}

function CardCopy({ icon, eyebrow, title, text }: { icon: ReactNode; eyebrow: string; title: string; text: string }) {
  return (
    <div className="relative z-10 max-w-sm">
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
        <span className="text-neon">{icon}</span>
        {eyebrow}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-zinc-400">{text}</p>
    </div>
  )
}

/** Peeking phone that rises a little on card hover. */
function Peek({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn('transition-transform duration-500 ease-out group-hover:-translate-y-2', className)}>
      <PhoneShot src={src} alt={alt} />
    </div>
  )
}

// ponytail: decorative bars, not real user data
const BARS = [38, 52, 46, 64, 58, 72, 86]

export function Bento() {
  return (
    <section id="funciones" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Funciones"
          title={
            <>
              Todo lo que necesitas <span className="text-zinc-500">para progresar.</span>
            </>
          }
          lead="Rutinas con IA, una biblioteca enorme y datos claros de cada sesión. En una sola app."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-6 lg:grid-rows-[280px_280px_260px_auto]">
          {/* Coach IA — hero card */}
          <Card className="sm:min-h-[420px] lg:min-h-0 lg:col-span-4 lg:row-span-2">
            <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_100%,rgba(165,61,255,0.10),transparent)]" />
            <CardCopy icon={<Sparkles size={14} />} eyebrow={ai.eyebrow} title={ai.title} text={ai.text} />
            <div className="relative z-10 mt-6 flex max-w-sm flex-wrap gap-2 font-mono text-xs">
              {['Músculo: pecho', 'Nivel: intermedio', 'Equipo: mancuernas'].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-zinc-950/60 px-3 py-1 text-zinc-300">
                  {t}
                </span>
              ))}
            </div>
            <Peek
              src={ai.screen}
              alt={ai.title}
              className="absolute -bottom-40 right-6 hidden w-56 rotate-[-4deg] sm:block lg:-bottom-24 lg:right-12 lg:w-64"
            />
          </Card>

          {/* Biblioteca */}
          <Card className="min-h-[420px] lg:min-h-0 lg:col-span-2 lg:row-span-2" delay={0.08}>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              <Library size={14} className="text-neon" />
              {library.eyebrow}
            </p>
            <p className="mt-4 font-mono text-6xl font-bold tracking-tighter text-white">
              1300<span className="text-neon">+</span>
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-400">
              Ejercicios con animación, músculos trabajados e instrucciones paso a paso.
            </p>
            <Peek src={library.screen} alt={library.title} className="absolute -bottom-48 left-1/2 w-52 -translate-x-1/2 lg:-bottom-36" />
          </Card>

          {/* Comunidad */}
          <Card className="sm:min-h-[260px] lg:min-h-0 lg:col-span-3" delay={0.04}>
            <CardCopy icon={<Users size={14} />} eyebrow={community.eyebrow} title={community.title} text={community.text} />
            <Peek
              src={community.screen}
              alt={community.title}
              className="absolute -bottom-56 right-6 hidden w-40 rotate-[5deg] sm:block"
            />
          </Card>

          {/* Progreso */}
          <Card className="min-h-[260px] lg:min-h-0 lg:col-span-3" delay={0.12}>
            <CardCopy
              icon={<TrendingUp size={14} />}
              eyebrow="Progreso"
              title="Récords detectados solos"
              text="Volumen, historial y evolución por ejercicio."
            />
            <div className="absolute inset-x-6 bottom-6 flex h-16 items-end gap-2 sm:inset-x-8 sm:left-auto sm:w-48" aria-hidden="true">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className={cn(
                    'flex-1 rounded-sm transition-all duration-500 group-hover:opacity-100',
                    i === BARS.length - 1 ? 'bg-neon' : 'bg-white/15 opacity-80',
                  )}
                />
              ))}
            </div>
          </Card>

          {/* Extras */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:grid-cols-4">
            {EXTRAS.map((f, i) => (
              <Card key={f.title} className="p-5 sm:p-6" delay={i * 0.05}>
                <f.icon size={20} className="text-neon" />
                <h3 className="mt-4 font-semibold tracking-tight text-white">{f.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{f.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
