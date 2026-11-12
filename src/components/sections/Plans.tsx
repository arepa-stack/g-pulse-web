import { Check, Sparkles } from 'lucide-react'
import { PLANS, PLAN_COMMON } from '@/data/landing'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SectionHeading } from './Section'

export function Plans() {
  return (
    <section id="planes" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Planes"
          title={
            <>
              Empieza gratis. <span className="text-zinc-500">Sube cuando quieras.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {PLANS.map((p) => {
            const free = p.price === 'Gratis'
            return (
              <article
                key={p.name}
                className={cn(
                  'relative flex flex-col rounded-3xl border p-7 backdrop-blur-md',
                  p.featured
                    ? 'border-neon/40 bg-neon/[0.04] shadow-[0_0_60px_-20px_rgba(165,61,255,0.35)]'
                    : 'border-white/10 bg-white/[0.03]',
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold tracking-tight text-white">{p.name}</h3>
                  {p.featured && <Badge className="rounded-full">Recomendado</Badge>}
                  {!free && !p.featured && (
                    <Badge variant="outline" className="rounded-full border-white/10 text-zinc-400">
                      Pronto
                    </Badge>
                  )}
                </div>

                <p className="mt-6 font-mono text-4xl font-semibold tracking-tight text-white">
                  {free ? '0 €' : '—'}
                </p>
                <p className="mt-1 text-sm text-zinc-500">{free ? 'Para siempre' : 'Precio próximamente'}</p>

                <ul className="mt-8 grid gap-3 text-[15px]">
                  <li className="flex items-center gap-2.5 font-medium text-white">
                    <Sparkles size={16} className="text-neon" /> {p.ai}
                  </li>
                  {PLAN_COMMON.map((c) => (
                    <li key={c} className="flex items-center gap-2.5 text-zinc-400">
                      <Check size={16} className="text-zinc-500" /> {c}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  variant={free ? 'default' : 'outline'}
                  className="mt-8 w-full"
                >
                  <a href="#descargar">{free ? 'Empezar gratis' : 'Avísame'}</a>
                </Button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
