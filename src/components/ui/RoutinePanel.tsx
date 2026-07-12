import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ClipboardList,
  X,
  ChevronLeft,
  ChevronRight,
  Timer,
  Repeat,
  Lightbulb,
  Sparkles,
} from 'lucide-react'
import { useStore } from '../../store/useStore'
import { ROUTINES, getRoutine } from '../../data/routines'
import { DOWNLOAD_URL } from '../../config/app'
import styles from './RoutinePanel.module.css'

/**
 * Guided routine tour for the 3D gym: a launcher + routine picker on the left
 * of the viewer, and a step card while a routine is active. Advancing a step
 * selects that machine, so the camera flies to it (CameraController).
 */
export function RoutinePanel() {
  const [pickerOpen, setPickerOpen] = useState(false)
  const activeRoutineId = useStore((s) => s.activeRoutineId)
  const routineStep = useStore((s) => s.routineStep)
  const startRoutine = useStore((s) => s.startRoutine)
  const exitRoutine = useStore((s) => s.exitRoutine)
  const goToStep = useStore((s) => s.goToStep)

  const routine = getRoutine(activeRoutineId)
  const step = routine?.steps[routineStep]

  return (
    <>
      {/* Launcher + picker (hidden while touring a routine). */}
      {!routine && (
        <div className={styles.launcherWrap}>
          <button
            className={styles.launcher}
            onClick={() => setPickerOpen((v) => !v)}
            aria-expanded={pickerOpen}
          >
            <ClipboardList size={17} />
            Rutinas guiadas
          </button>

          <AnimatePresence>
            {pickerOpen && (
              <motion.div
                className={styles.picker}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <p className={styles.pickerTitle}>Recorre una rutina en el gimnasio 3D</p>
                {ROUTINES.map((r) => (
                  <button
                    key={r.id}
                    className={styles.routineOption}
                    onClick={() => {
                      setPickerOpen(false)
                      startRoutine(r.id)
                    }}
                  >
                    <span className={styles.routineName}>{r.name}</span>
                    <span className={styles.routineMeta}>
                      {r.level} · {r.duration} · {r.steps.length} estaciones
                    </span>
                  </button>
                ))}
                <p className={styles.pickerFoot}>
                  <Sparkles size={13} /> Con la app G-Pulse puedes armar cientos de
                  rutinas con todos nuestros ejercicios.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Active routine step card. */}
      <AnimatePresence>
        {routine && step && (
          <motion.aside
            key={`${routine.id}-${routineStep}`}
            className={styles.card}
            role="dialog"
            aria-label={`Paso ${routineStep + 1} de ${routine.steps.length}: ${step.exercise}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <button className={styles.close} onClick={exitRoutine} aria-label="Salir de la rutina">
              <X size={16} />
            </button>

            <span className={styles.routineLabel}>{routine.name}</span>

            <div className={styles.progress}>
              {routine.steps.map((_, i) => (
                <button
                  key={i}
                  className={styles.dot}
                  data-active={i === routineStep}
                  data-done={i < routineStep}
                  onClick={() => goToStep(i)}
                  aria-label={`Ir al paso ${i + 1}`}
                />
              ))}
            </div>

            <h3 className={styles.exercise}>
              <span className={styles.stepNum}>
                {routineStep + 1}/{routine.steps.length}
              </span>
              {step.exercise}
            </h3>

            <div className={styles.stats}>
              <span className={styles.stat}>
                <Repeat size={14} /> {step.volume}
              </span>
              {step.rest && (
                <span className={styles.stat}>
                  <Timer size={14} /> Descanso {step.rest}
                </span>
              )}
            </div>

            <div className={styles.chips}>
              {step.muscles.map((m) => (
                <span key={m} className={styles.chip}>
                  {m}
                </span>
              ))}
            </div>

            <p className={styles.tip}>
              <Lightbulb size={14} /> {step.tip}
            </p>

            <div className={styles.nav}>
              <button
                className={styles.navBtn}
                onClick={() => goToStep(routineStep - 1)}
                disabled={routineStep === 0}
                aria-label="Paso anterior"
              >
                <ChevronLeft size={16} /> Anterior
              </button>
              {routineStep < routine.steps.length - 1 ? (
                <button
                  className={`${styles.navBtn} ${styles.navPrimary}`}
                  onClick={() => goToStep(routineStep + 1)}
                  aria-label="Siguiente paso"
                >
                  Siguiente <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  className={`${styles.navBtn} ${styles.navPrimary}`}
                  onClick={exitRoutine}
                >
                  Terminar rutina
                </button>
              )}
            </div>

            <a className={styles.appNote} href={DOWNLOAD_URL}>
              <Sparkles size={13} /> Esta es solo una muestra: en la app G-Pulse
              armas cientos de rutinas a tu medida.
            </a>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
