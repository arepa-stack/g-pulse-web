import { motion } from 'framer-motion'
import {
  Dumbbell,
  ClipboardList,
  Sparkles,
  LineChart,
  Ruler,
  Target,
  CalendarDays,
  Users,
} from 'lucide-react'
import styles from './Features.module.css'

const FEATURES = [
  { icon: Dumbbell, code: 'MOD.01', title: '1360 ejercicios', description: 'Biblioteca completa con músculos trabajados, equipamiento e instrucciones de cada ejercicio.' },
  { icon: ClipboardList, code: 'MOD.02', title: 'Rutinas personalizadas', description: 'Crea tus propias rutinas o parte de planes listos por grupo muscular.' },
  { icon: Sparkles, code: 'MOD.03', title: 'Asistente con IA', description: 'La IA analiza tus sesiones y te sugiere cómo progresar y mejorar la técnica.' },
  { icon: LineChart, code: 'MOD.04', title: 'Progreso y estadísticas', description: 'Gráficas de volumen, records personales e historial completo de entrenamientos.' },
  { icon: Ruler, code: 'MOD.05', title: 'Medidas corporales', description: 'Registra peso y medidas para ver tu evolución física en el tiempo.' },
  { icon: Target, code: 'MOD.06', title: 'Metas', description: 'Define objetivos claros y sigue su cumplimiento semana a semana.' },
  { icon: CalendarDays, code: 'MOD.07', title: 'Agenda semanal', description: 'Planifica qué entrenas cada día de la semana y mantén la constancia.' },
  { icon: Users, code: 'MOD.08', title: 'Comunidad', description: 'Comparte tus logros y sigue el progreso de otros atletas en el feed.' },
]

export function Features() {
  return (
    <section id="funciones" className={`section ${styles.section}`}>
      <div className={styles.gridBg} aria-hidden="true" />
      <div className="container">
        <p className="section-eyebrow">Funciones</p>
        <h2 className="section-title">
          Todo para <span className="gradient-text">entrenar más inteligente</span>
        </h2>

        <div className={styles.grid}>
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            >
              <span className={styles.code}>{f.code}</span>
              <div className={styles.iconWrap}>
                <f.icon size={22} />
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.description}</p>
              <span className={styles.scanline} aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
