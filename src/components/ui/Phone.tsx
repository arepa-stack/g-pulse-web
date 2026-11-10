import styles from './Phone.module.css'

/** CSS phone frame. Pass several srcs + `active` to crossfade between screens. */
export function Phone({ srcs, active = 0, alt }: { srcs: string[]; active?: number; alt: string }) {
  return (
    <div className={styles.phone}>
      <div className={styles.screen}>
        {srcs.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={i === active ? alt : ''}
            aria-hidden={i !== active}
            loading="lazy"
            className={i === active ? styles.on : ''}
          />
        ))}
      </div>
    </div>
  )
}
