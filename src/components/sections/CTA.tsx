import { motion } from 'framer-motion'
import { Download, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { DOWNLOAD_URL } from '../../config/app'
import styles from './CTA.module.css'

export function CTA() {
  return (
    <section id="descargar" className="section">
      <div className="container">
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">Comienza hoy</p>
          <h2 className={styles.title}>
            Convierte cada entrenamiento<br />
            <span className="gradient-text">en progreso</span>
          </h2>
          <p className={styles.text}>
            Descarga G-Pulse y lleva tu evolución al siguiente nivel. Mide, entrena y
            supera tus límites.
          </p>
          <div className={styles.actions}>
            <Button href={DOWNLOAD_URL} icon={<Download size={18} />}>
              Descargar aplicación
            </Button>
            <Button variant="outline" href={DOWNLOAD_URL} icon={<ArrowRight size={18} />}>
              Comenzar ahora
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
