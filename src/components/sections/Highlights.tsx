import { motion } from 'framer-motion'
import { Phone } from '../ui/Phone'
import { HIGHLIGHTS } from '../../data/landing'
import styles from './Highlights.module.css'

export function Highlights() {
  return (
    <section id="funciones" className="section">
      <div className="container">
        {HIGHLIGHTS.map((h, i) => (
          <motion.div
            key={h.title}
            className={`${styles.row} ${i % 2 ? styles.flip : ''}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.copy}>
              <p className="section-eyebrow">{h.eyebrow}</p>
              <h2 className="section-title">{h.title}</h2>
              <p className={styles.text}>{h.text}</p>
            </div>
            <div className={styles.media}>
              <span className={styles.glow} aria-hidden="true" />
              <Phone srcs={[h.screen]} alt={h.title} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
