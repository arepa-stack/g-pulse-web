import { motion } from 'framer-motion'
import { StatCounter } from '../ui/StatCounter'
import styles from './Stats.module.css'

const STATS = [
  { value: 1360, suffix: '', label: 'Ejercicios en la biblioteca' },
  { value: 6, suffix: '', label: 'Grupos musculares cubiertos' },
  { value: 100, suffix: '%', label: 'Seguimiento en tiempo real' },
  { value: 24, suffix: '/7', label: 'Asistente IA disponible' },
]

export function Stats() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.grid}>
            {STATS.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
