import { AnimatePresence, motion } from 'framer-motion'
import { X, Dumbbell, Flame, Gauge, ArrowLeft, PlusCircle, RotateCcw, RotateCw } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { getModel } from '../../config/models'
import { Button } from './Button'
import styles from './InfoPanel.module.css'

/** Side panel (desktop) / bottom sheet (mobile) for the selected machine. */
export function InfoPanel() {
  const selectedId = useStore((s) => s.selectedId)
  const routineActive = useStore((s) => !!s.activeRoutineId)
  const clear = useStore((s) => s.clearSelection)
  const rotateMachine = useStore((s) => s.rotateMachine)
  // During a guided routine the RoutinePanel owns the overlay.
  const model = routineActive ? null : getModel(selectedId)

  return (
    <AnimatePresence>
      {model && (
        <motion.aside
          key={model.id}
          className={styles.panel}
          role="dialog"
          aria-label={`Información de ${model.name}`}
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 40, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        >
          <button className={styles.close} onClick={clear} aria-label="Cerrar panel">
            <X size={18} />
          </button>

          <span className={styles.category}>{model.category}</span>
          <h3 className={styles.name}>{model.name}</h3>
          <p className={styles.desc}>{model.description}</p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <Gauge size={16} />
              <span>{model.level}</span>
            </div>
            <div className={styles.stat}>
              <Flame size={16} />
              <span>{model.calories} kcal</span>
            </div>
          </div>

          <div className={styles.muscles}>
            <div className={styles.musclesLabel}>
              <Dumbbell size={15} /> Músculos trabajados
            </div>
            <div className={styles.chips}>
              {model.muscles.map((m) => (
                <span key={m} className={styles.chip}>
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.rotateRow}>
            <span className={styles.rotateLabel}>Rotar máquina</span>
            <div className={styles.rotateBtns}>
              <button
                className={styles.rotateBtn}
                onClick={() => rotateMachine(model.id, -Math.PI / 4)}
                aria-label="Rotar máquina a la izquierda"
              >
                <RotateCcw size={16} />
              </button>
              <button
                className={styles.rotateBtn}
                onClick={() => rotateMachine(model.id, Math.PI / 4)}
                aria-label="Rotar máquina a la derecha"
              >
                <RotateCw size={16} />
              </button>
            </div>
          </div>

          <div className={styles.actions}>
            <Button icon={<PlusCircle size={17} />}>Ver ejercicio</Button>
            <Button variant="outline" icon={<PlusCircle size={17} />}>
              Agregar a rutina
            </Button>
            <Button variant="ghost" icon={<ArrowLeft size={16} />} onClick={clear}>
              Volver a la vista general
            </Button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
