import { Check, Sparkles } from 'lucide-react'
import { PLANS, PLAN_COMMON } from '../../data/landing'
import styles from './Plans.module.css'

export function Plans() {
  return (
    <section id="planes" className="section">
      <div className="container">
        <p className="section-eyebrow">Planes</p>
        <h2 className="section-title">
          Empieza gratis, <span className="gradient-text">sube cuando quieras</span>
        </h2>

        <div className={styles.grid}>
          {PLANS.map((p) => (
            <article key={p.name} className={`${styles.card} ${p.featured ? styles.featured : ''}`}>
              {p.featured && <span className={styles.badge}>Recomendado</span>}
              <h3 className={styles.name}>{p.name}</h3>
              <p className={styles.price}>{p.price}</p>
              <ul className={styles.list}>
                <li className={styles.ai}>
                  <Sparkles size={16} /> {p.ai}
                </li>
                {PLAN_COMMON.map((c) => (
                  <li key={c}>
                    <Check size={16} /> {c}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
