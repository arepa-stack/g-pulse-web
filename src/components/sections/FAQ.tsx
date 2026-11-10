import { FAQ as ITEMS } from '../../data/landing'
import styles from './FAQ.module.css'

export function FAQ() {
  return (
    <section id="faq" className="section">
      <div className={`container ${styles.wrap}`}>
        <p className="section-eyebrow">Preguntas frecuentes</p>
        <h2 className="section-title">¿Dudas?</h2>
        <div className={styles.list}>
          {ITEMS.map((f) => (
            <details key={f.q} className={styles.item}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
