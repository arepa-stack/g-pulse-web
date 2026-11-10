import { useEffect, useRef, useState } from 'react'
import { Phone } from '../ui/Phone'
import { TOUR } from '../../data/landing'
import styles from './AppTour.module.css'

/** Scroll-driven tour: steps scroll on the left, sticky phone swaps screens on the right. */
export function AppTour() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    // fires when a step crosses the vertical middle of the viewport
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="app" className="section">
      <div className="container">
        <p className="section-eyebrow">Cómo funciona</p>
        <h2 className="section-title">
          Tu entrenamiento, <span className="gradient-text">de principio a fin</span>
        </h2>

        <div className={styles.layout}>
          <ol className={styles.steps}>
            {TOUR.map((s, i) => (
              <li
                key={s.title}
                ref={(el) => (refs.current[i] = el)}
                data-i={i}
                className={`${styles.step} ${i === active ? styles.active : ''}`}
              >
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.text}>{s.text}</p>
                <div className={styles.inlinePhone}>
                  <Phone srcs={[s.screen]} alt={s.title} />
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.sticky}>
            <Phone srcs={TOUR.map((s) => s.screen)} active={active} alt={TOUR[active].title} />
          </div>
        </div>
      </div>
    </section>
  )
}
