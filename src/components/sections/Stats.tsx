import { motion } from 'framer-motion'
import { StatCounter } from '../ui/StatCounter'
import styles from './Stats.module.css'

const STATS = [
  { value: 500, suffix: '+', label: 'Ejercicios disponibles' },
  { value: 100, suffix: '%', label: 'Seguimiento en tiempo real' },
  { value: 50, suffix: '+', label: 'Rutinas personalizadas' },
  { value: 7, suffix: ' días', label: 'Progreso semanal' },
]

export function Stats() {
  return (
    <section id="entrenamientos" className="section">
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
