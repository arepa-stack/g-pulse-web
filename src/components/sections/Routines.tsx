import { SectionHeading } from './Section'

const ROUTINES = [
  { img: '/img/routines/routine_cover_full_body.jpg', title: 'Cuerpo completo', tag: 'Fuerza total' },
  { img: '/img/routines/routine_cover_upper_body.jpg', title: 'Tren superior', tag: 'Pecho · Espalda · Hombros' },
  { img: '/img/routines/routine_cover_legs.jpg', title: 'Piernas', tag: 'Cuádriceps · Glúteos · Femoral' },
  { img: '/img/routines/routine_cover_arms.jpg', title: 'Brazos', tag: 'Bíceps · Tríceps · Antebrazo' },
  { img: '/img/routines/routine_cover_abs.jpg', title: 'Abdomen', tag: 'Core · Estabilidad' },
  { img: '/img/routines/routine_cover_cardio.jpg', title: 'Cardio', tag: 'Resistencia · Quema calórica' },
]

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex gap-4 pr-4" aria-hidden={hidden}>
      {ROUTINES.map((r, i) => (
        <figure
          key={r.title}
          className="group relative m-0 h-[380px] w-[280px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-surface"
        >
          <img
            src={r.img}
            alt={hidden ? '' : `Rutina de ${r.title}`}
            loading="lazy"
            className="size-full object-cover grayscale-[40%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent p-5 pt-16">
            <span className="font-mono text-[11px] text-neon">{String(i + 1).padStart(2, '0')}</span>
            <span className="mt-1 block text-lg font-semibold tracking-tight text-white">{r.title}</span>
            <span className="mt-0.5 block text-sm text-zinc-400">{r.tag}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export function Routines() {
  return (
    <section id="entrenamientos" className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Rutinas"
          title={
            <>
              Una rutina <span className="text-zinc-500">para cada grupo muscular.</span>
            </>
          }
          lead="Planes listos para empezar, o crea los tuyos con toda la biblioteca."
        />
      </div>

      <div className="mt-12 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          <Track />
          <Track hidden />
        </div>
      </div>
    </section>
  )
}
