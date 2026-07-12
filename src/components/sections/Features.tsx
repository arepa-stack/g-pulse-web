import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import { Brain, LineChart, Activity, Dumbbell, History, Sparkles } from 'lucide-react'
import styles from './Features.module.css'

const TOTAL_FRAMES = 192
const frameUrl = (i: number) => `/sequences/features/frame-${String(i).padStart(4, '0')}.jpg`

const FEATURES = [
  { icon: Brain, title: 'Rutinas inteligentes', description: 'Planes que se adaptan a tu nivel y objetivos, generados automáticamente.' },
  { icon: LineChart, title: 'Seguimiento de progreso', description: 'Visualiza tu evolución con gráficas claras semana a semana.' },
  { icon: Activity, title: 'Métricas de rendimiento', description: 'Volumen, intensidad y calorías calculadas en cada sesión.' },
  { icon: Dumbbell, title: 'Entrenamientos personalizados', description: 'Ejercicios ajustados a tu equipo disponible y preferencias.' },
  { icon: History, title: 'Historial de ejercicios', description: 'Cada serie, peso y repetición guardada para consultarla cuando quieras.' },
  { icon: Sparkles, title: 'Recomendaciones con IA', description: 'Sugerencias inteligentes para superar estancamientos y mejorar la técnica.' },
]

export function Features() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start start', 'end end'] })

  function drawFrame(index: number) {
    const canvas = canvasRef.current
    const img = imagesRef.current[index]
    const ctx = canvas?.getContext('2d')
    if (!canvas || !img || !ctx || !img.complete || img.naturalWidth === 0) return
    const { width, height } = canvas
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight)
    const w = img.naturalWidth * scale
    const h = img.naturalHeight * scale
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h)
  }

  // preload sequence
  useEffect(() => {
    const imgs: HTMLImageElement[] = []
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = frameUrl(i + 1)
      if (i === 0) img.onload = () => drawFrame(0)
      imgs.push(img)
    }
    imagesRef.current = imgs
  }, [])

  // resize canvas to its container at device resolution
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio
      drawFrame(currentFrameRef.current)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const frame = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(progress * (TOTAL_FRAMES - 1))))
    currentFrameRef.current = frame
    drawFrame(frame)

    const next = Math.min(FEATURES.length - 1, Math.floor(progress * FEATURES.length))
    setActiveIndex((prev) => (prev === next ? prev : next))
  })

  const active = FEATURES[activeIndex]

  return (
    <section id="funciones" ref={wrapperRef} className={styles.scrollTrack}>
      <div className={styles.sticky}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <div className={styles.scrim} />

        <div className={`container ${styles.overlay}`}>
          <div className={styles.copy}>
            <p className="section-eyebrow">Funciones</p>
            <h2 className={styles.heading}>
              Todo para <span className="gradient-text">entrenar más inteligente</span>
            </h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <div className={styles.iconWrap}>
                  <active.icon size={22} />
                </div>
                <h3 className={styles.copyTitle}>{active.title}</h3>
                <p className={styles.copyDesc}>{active.description}</p>
              </motion.div>
            </AnimatePresence>

            <div className={styles.dots}>
              {FEATURES.map((f, i) => (
                <span key={f.title} className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
