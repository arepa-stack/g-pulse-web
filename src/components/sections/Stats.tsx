import { motion } from 'framer-motion'

// Product facts only — no invented downloads or ratings.
const STATS = [
  { value: '1300+', label: 'Ejercicios con animación' },
  { value: '06', label: 'Grupos musculares' },
  { value: '0 €', label: 'Para empezar' },
  { value: '07', label: 'Equipos en el gym 3D' },
]

export function Stats() {
  return (
    <section aria-label="G-Pulse en cifras" className="border-y border-white/5 bg-surface/60">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="border-white/5 px-2 py-8 odd:border-r sm:px-6 lg:border-r lg:last:border-r-0"
          >
            <dd className="font-mono text-3xl font-semibold tracking-tight text-white sm:text-4xl">{s.value}</dd>
            <dt className="mt-1.5 text-xs uppercase tracking-wider text-zinc-500 sm:text-sm sm:normal-case sm:tracking-normal">
              {s.label}
            </dt>
          </motion.div>
        ))}
      </dl>
    </section>
  )
}
