import { RotateCcw, RefreshCw, Volume2, VolumeX, Maximize, Eye, MousePointerClick, Move3d, ZoomIn } from 'lucide-react'
import { useStore } from '../../store/useStore'
import styles from './ViewerControls.module.css'

interface Props {
  onFullscreen?: () => void
}

/** Floating control bar + on-screen help for the 3D viewer. */
export function ViewerControls({ onFullscreen }: Props) {
  const autoRotate = useStore((s) => s.autoRotate)
  const soundOn = useStore((s) => s.soundOn)
  const selectedId = useStore((s) => s.selectedId)
  const toggleAutoRotate = useStore((s) => s.toggleAutoRotate)
  const toggleSound = useStore((s) => s.toggleSound)
  const clear = useStore((s) => s.clearSelection)

  return (
    <>
      <div className={styles.help} aria-hidden="true">
        <span><Move3d size={14} /> Arrastrar para rotar</span>
        <span><ZoomIn size={14} /> Rueda para zoom</span>
        <span><MousePointerClick size={14} /> Clic para seleccionar</span>
      </div>

      <div className={styles.bar} role="toolbar" aria-label="Controles del visor 3D">
        <button
          className={styles.ctrl}
          onClick={clear}
          aria-label="Restaurar vista general"
          data-active={!selectedId}
        >
          <RotateCcw size={18} />
        </button>
        <button
          className={styles.ctrl}
          onClick={toggleAutoRotate}
          aria-label={autoRotate ? 'Desactivar rotación automática' : 'Activar rotación automática'}
          aria-pressed={autoRotate}
          data-active={autoRotate}
        >
          <RefreshCw size={18} />
        </button>
        <button
          className={styles.ctrl}
          onClick={toggleSound}
          aria-label={soundOn ? 'Silenciar sonido ambiental' : 'Activar sonido ambiental'}
          aria-pressed={soundOn}
          data-active={soundOn}
        >
          {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
        {selectedId && (
          <button className={styles.ctrl} onClick={clear} aria-label="Cambiar a vista general">
            <Eye size={18} />
          </button>
        )}
        {onFullscreen && (
          <button className={styles.ctrl} onClick={onFullscreen} aria-label="Pantalla completa">
            <Maximize size={18} />
          </button>
        )}
      </div>
    </>
  )
}
