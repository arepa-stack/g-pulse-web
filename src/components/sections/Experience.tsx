import { motion } from 'framer-motion'
import { Move3d, ZoomIn, MousePointerClick, Compass, ClipboardList } from 'lucide-react'
import { Button } from '../ui/Button'
import { MODELS } from '../../config/models'
import styles from './Experience.module.css'

const CONTROLS = [
  { icon: Move3d, title: 'Arrastrar para rotar', text: 'Gira la cámara alrededor del gimnasio con el mouse o el dedo.' },
  { icon: ZoomIn, title: 'Rueda para zoom', text: 'Acércate a cualquier máquina para ver el detalle.' },
  { icon: MousePointerClick, title: 'Clic para seleccionar', text: 'Toca una máquina y descubre para qué sirve.' },
  { icon: ClipboardList, title: 'Rutinas guiadas', text: 'Recorre una rutina completa estación por estación dentro del gimnasio.' },
]

export function Experience() {
  return (
    <section id="experiencia" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">Experiencia 3D</p>
          <h2 className="section-title">
            Explora el <span className="gradient-text">gimnasio del futuro</span>
          </h2>
          <p className={styles.intro}>
            Un rooftop gym cyberpunk que puedes recorrer libremente. Selecciona
            cada máquina para conocer el grupo muscular que trabaja, o sigue una
            rutina guiada estación por estación. En la app G-Pulse puedes armar
            cientos de rutinas con nuestros ejercicios.
          </p>
        </motion.div>

        <div className={styles.controls}>
          {CONTROLS.map((c, i) => (
            <motion.div
              key={c.title}
              className={styles.control}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <c.icon size={22} className={styles.controlIcon} />
              <div>
                <h3 className={styles.controlTitle}>{c.title}</h3>
                <p className={styles.controlText}>{c.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={styles.machines}>
          {MODELS.map((m) => (
            <span key={m.id} className={styles.tag}>
              {m.name.replace(' G-Pulse', '')}
            </span>
          ))}
        </div>

        <div className={styles.cta}>
          <Button href="#inicio" icon={<Compass size={18} />}>
            Explorar gimnasio
          </Button>
        </div>
      </div>
    </section>
  )
}
