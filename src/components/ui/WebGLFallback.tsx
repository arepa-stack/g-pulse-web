import { AlertTriangle } from 'lucide-react'
import styles from './WebGLFallback.module.css'

/**
 * Shown when WebGL is unavailable or the scene crashes. Renders a stylized
 * static "gym" poster (pure CSS, no image asset) so the landing still looks
 * intentional, plus a discreet notice.
 */
export function WebGLFallback({ reason }: { reason: 'unsupported' | 'error' }) {
  return (
    <div className={styles.wrap} role="img" aria-label="Gimnasio futurista G-Pulse (vista estática)">
      <div className={styles.poster}>
        <div className={styles.horizon} />
        <div className={styles.sign}>G-PULSE</div>
        <div className={styles.grid} />
      </div>
      <div className={styles.notice}>
        <AlertTriangle size={15} />
        {reason === 'unsupported'
          ? 'Tu dispositivo no soporta la experiencia 3D. Mostramos una vista estática.'
          : 'No se pudo cargar la experiencia 3D. Mostramos una vista estática.'}
      </div>
    </div>
  )
}
