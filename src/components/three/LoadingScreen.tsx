import { Html, useProgress } from '@react-three/drei'
import styles from './LoadingScreen.module.css'

/** Neon loader shown inside the Canvas while GLBs stream in. */
export function LoadingScreen() {
  const { progress, active } = useProgress()
  return (
    <Html center>
      <div className={styles.wrap} role="status" aria-live="polite">
        <div className={styles.ring} />
        <div className={styles.label}>
          {active ? `Cargando gimnasio ${Math.round(progress)}%` : 'Listo'}
        </div>
      </div>
    </Html>
  )
}
