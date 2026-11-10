import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { DOWNLOAD_URL } from '../../config/app'
import styles from './CTA.module.css'

const live = DOWNLOAD_URL.startsWith('http')

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
          <div className={styles.copy}>
            <p className="section-eyebrow">Comienza hoy</p>
            <h2 className={styles.title}>
              Convierte cada entrenamiento <span className="gradient-text">en progreso</span>
            </h2>
            <p className={styles.text}>Gratis en Android. Crea tu cuenta y entrena hoy mismo.</p>

            <a
              href={live ? DOWNLOAD_URL : undefined}
              className={`${styles.play} ${live ? '' : styles.soon}`}
              aria-disabled={!live}
              target="_blank"
              rel="noopener"
            >
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                <path fill="currentColor" d="M4 2.5v19a1 1 0 0 0 1.5.86l16-9.5a1 1 0 0 0 0-1.72l-16-9.5A1 1 0 0 0 4 2.5z" />
              </svg>
              <span>
                <small>{live ? 'Disponible en' : 'Muy pronto en'}</small>
                Google Play
              </span>
            </a>
          </div>

          {live && (
            <div className={styles.qr}>
              <QRCodeSVG value={DOWNLOAD_URL} size={140} bgColor="transparent" fgColor="#eef2ff" />
              <p>Escanea con tu teléfono</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
