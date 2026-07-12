import { useRef } from 'react'
import { motion } from 'framer-motion'
import { MousePointer2, Download, Compass } from 'lucide-react'
import { GymScene } from '../three/GymScene'
import { InfoPanel } from '../ui/InfoPanel'
import { RoutinePanel } from '../ui/RoutinePanel'
import { ViewerControls } from '../ui/ViewerControls'
import { Button } from '../ui/Button'
import { WebGLFallback } from '../ui/WebGLFallback'
import { hasWebGL } from '../../utils/webgl'
import { DOWNLOAD_URL } from '../../config/app'
import styles from './Hero.module.css'

const webglOk = hasWebGL()

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null)

  const goFullscreen = () => {
    const el = stageRef.current
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen()
    else el.requestFullscreen?.()
  }

  return (
    <section id="inicio" className={styles.hero}>
      <div ref={stageRef} className={styles.stage}>
        {webglOk ? (
          <>
            <GymScene fallback={<WebGLFallback reason="error" />} />
            <ViewerControls onFullscreen={goFullscreen} />
            <RoutinePanel />
            <InfoPanel />
          </>
        ) : (
          <WebGLFallback reason="unsupported" />
        )}
      </div>

      <div className={styles.overlay}>
        <div className="container">
          <motion.div
            className={styles.copy}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.eyebrow}>Live Strong. Live Future.</span>
            <h1 className={styles.title}>
              Tu evolución<br />
              <span className="gradient-text">comienza ahora</span>
            </h1>
            <p className={styles.lead}>
              Entrena más inteligente, mide tu progreso y supera tus límites en un
              gimnasio futurista que puedes explorar en 3D.
            </p>
            <div className={styles.actions}>
              <Button href="#experiencia" icon={<Compass size={18} />}>
                Explorar gimnasio
              </Button>
              <Button variant="outline" href={DOWNLOAD_URL} icon={<Download size={18} />}>
                Descargar aplicación
              </Button>
            </div>
          </motion.div>
        </div>

        {webglOk && (
          <motion.div
            className={styles.dragHint}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <MousePointer2 size={16} />
            Arrastra para explorar la escena
          </motion.div>
        )}
      </div>
    </section>
  )
}
