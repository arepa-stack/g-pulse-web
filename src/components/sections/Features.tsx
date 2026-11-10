import { EXTRAS } from '../../data/landing'
import styles from './Features.module.css'

/** Secondary features: one compact row, no cards competing with the highlights. */
export function Features() {
  return (
    <section className={styles.section} aria-label="Más funciones">
      <div className={`container ${styles.grid}`}>
        {EXTRAS.map((f) => (
          <div key={f.title} className={styles.item}>
            <f.icon size={22} className={styles.icon} />
            <div>
              <h3 className={styles.title}>{f.title}</h3>
              <p className={styles.text}>{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
