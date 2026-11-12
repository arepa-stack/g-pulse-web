import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Download, Move3d } from 'lucide-react'
import { GymScene } from '../three/GymScene'
import { InfoPanel } from '../ui/InfoPanel'
import { RoutinePanel } from '../ui/RoutinePanel'
import { ViewerControls } from '../ui/ViewerControls'
import { WebGLFallback } from '../ui/WebGLFallback'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { hasWebGL } from '@/utils/webgl'
import { useStore } from '@/store/useStore'

const webglOk = hasWebGL()

const STATS = [
  { value: '1300+', label: 'Ejercicios' },
  { value: '07', label: 'Equipos en 3D' },
  { value: 'IA', label: 'Coach de rutinas' },
]

/** HUD corner bracket. Purely decorative. */
function Corner({ className }: { className: string }) {
  return <span className={`absolute size-5 border-neon/60 ${className}`} />
}

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null)
  const heroVisible = useStore((s) => s.heroVisible)

  const goFullscreen = () => {
    const el = stageRef.current
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen()
    else el.requestFullscreen?.()
  }

  return (
    <section id="inicio" className="relative isolate min-h-svh overflow-hidden">
      {/* 3D stage — untouched: fills the hero, owns all pointer events. */}
      <div ref={stageRef} className="absolute inset-0 bg-zinc-950">
        {webglOk ? (
          <>
            <GymScene fallback={<WebGLFallback reason="error" />} />
            <ViewerControls onFullscreen={goFullscreen} />
            <RoutinePanel />
            <InfoPanel />
          </>
        ) : (
          <WebGLFallback reason="unsupported" />
        )}
      </div>

      {/* HUD frame + ambient light. pointer-events-none so the canvas keeps every drag. */}
      <div className="pointer-events-none absolute inset-0 z-[4]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_68%_58%,rgba(165,61,255,0.07),transparent_70%)]" />
        {/* readability veils: left on desktop, bottom on mobile */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-zinc-950/90 via-zinc-950/45 to-transparent md:block md:w-[62%]" />
        <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent md:hidden" />
        <div className="absolute inset-x-0 bottom-0 hidden h-28 bg-gradient-to-t from-zinc-950 to-transparent md:block" />

        <div className="absolute inset-x-4 top-20 bottom-4 hidden md:block lg:inset-x-6">
          <Corner className="left-0 top-0 border-l border-t" />
          <Corner className="right-0 top-0 border-r border-t" />
          <Corner className="bottom-0 left-0 border-b border-l" />
          <Corner className="bottom-0 right-0 border-b border-r" />
        </div>

        {webglOk && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute right-4 top-20 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-300 backdrop-blur-md md:right-10 md:top-24"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-neon" />
            </span>
            Explora en 3D
            <span className="hidden text-zinc-500 sm:inline">· arrastra para rotar</span>
            <Move3d size={13} className="text-zinc-500" />
          </motion.div>
        )}
      </div>

      <div className="pointer-events-none relative z-[5] mx-auto flex min-h-svh max-w-6xl flex-col justify-end px-4 pb-28 pt-24 sm:px-6 md:justify-center md:pb-24">
        <AnimatePresence>
          {heroVisible && (
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge
                variant="outline"
                className="mb-5 gap-2 rounded-full border-white/10 bg-white/[0.04] px-3 py-1 text-zinc-300 backdrop-blur-md"
              >
                <span className="rounded-full bg-neon px-1.5 py-px font-mono text-[10px] font-bold uppercase text-white">
                  Nuevo
                </span>
                Rutinas creadas con IA
              </Badge>

              <h1 className="text-[44px] font-extrabold leading-[0.95] tracking-tighter sm:text-6xl lg:text-7xl">
                Tu evolución
                <br />
                comienza <span className="text-neon">ahora.</span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg">
                Entrena más inteligente, registra cada serie y mide tu progreso. Explora el
                gimnasio G-Pulse en 3D.
              </p>

              <div className="pointer-events-auto mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#descargar">
                    <Download /> Descargar gratis
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="group">
                  <a href="#app">
                    Cómo funciona
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Button>
              </div>

              <dl className="mt-10 hidden gap-8 border-t border-white/10 pt-6 sm:flex">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-mono text-2xl font-semibold tracking-tight text-white">{s.value}</dd>
                    <dd className="mt-1 text-xs uppercase tracking-wider text-zinc-500">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
