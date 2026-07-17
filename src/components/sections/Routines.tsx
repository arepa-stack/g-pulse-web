import { motion } from 'framer-motion'
import styles from './Routines.module.css'

const ROUTINES = [
  { img: '/img/routines/routine_cover_full_body.png', title: 'Cuerpo completo', tag: 'Fuerza total' },
  { img: '/img/routines/routine_cover_upper_body.png', title: 'Tren superior', tag: 'Pecho · Espalda · Hombros' },
  { img: '/img/routines/routine_cover_legs.png', title: 'Piernas', tag: 'Cuádriceps · Glúteos · Femoral' },
  { img: '/img/routines/routine_cover_arms.png', title: 'Brazos', tag: 'Bíceps · Tríceps · Antebrazo' },
  { img: '/img/routines/routine_cover_abs.png', title: 'Abdomen', tag: 'Core · Estabilidad' },
  { img: '/img/routines/routine_cover_cardio.png', title: 'Cardio', tag: 'Resistencia · Quema calórica' },
]

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={styles.track} aria-hidden={hidden}>
      {ROUTINES.map((r) => (
        <figure key={r.title} className={styles.card}>
          <img src={r.img} alt={hidden ? '' : `Rutina de ${r.title}`} loading="lazy" />
          <figcaption className={styles.caption}>
            <span className={styles.cardTitle}>{r.title}</span>
            <span className={styles.cardTag}>{r.tag}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export function Routines() {
  return (
    <section id="entrenamientos" className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">Entrenamientos</p>
          <h2 className="section-title">
            Rutinas para <span className="gradient-text">cada grupo muscular</span>
          </h2>
          <p className={styles.subtitle}>
            Planes listos para empezar o crea los tuyos con la biblioteca de 1360 ejercicios.
          </p>
        </motion.div>
      </div>

      <div className={styles.marquee}>
        <div className={styles.marqueeInner}>
          <Track />
          <Track hidden />
        </div>
      </div>
    </section>
  )
}
