import type { Vector3Tuple } from 'three'

export type Category = 'Cardio' | 'Espalda' | 'Fuerza' | 'Pecho' | 'Accesorios'

export interface MachineModel {
  /** Stable id, also used as the R3F object name for raycasting. */
  id: string
  name: string
  category: Category
  /** Muscle groups worked. */
  muscles: string[]
  description: string
  level: 'Principiante' | 'Intermedio' | 'Avanzado'
  /** Estimated kcal for a standard session. */
  calories: number
  /** Public path to the .glb, or null when the asset is not yet available. */
  path: string | null
  position: Vector3Tuple
  rotation: Vector3Tuple
  scale: number
  /** Camera focus target used when this machine is selected. */
  focus: {
    position: Vector3Tuple
    target: Vector3Tuple
  }
}

export type ViewMode = 'overview' | 'focus'
export type Quality = 'high' | 'low'

/** One exercise (or cardio block) inside a guided routine. */
export interface RoutineStep {
  exercise: string
  /** Machine the camera flies to for this step. */
  modelId: string
  /** e.g. "4 × 10" or "10 minutos" for cardio. */
  volume: string
  rest: string | null
  muscles: string[]
  tip: string
}

export interface Routine {
  id: string
  name: string
  level: 'Principiante' | 'Intermedio' | 'Avanzado'
  duration: string
  description: string
  steps: RoutineStep[]
}

export interface AppState {
  selectedId: string | null
  view: ViewMode
  soundOn: boolean
  autoRotate: boolean
  /** Marketing copy overlaid on the 3D canvas; hide it to explore freely. */
  heroVisible: boolean
  quality: Quality
  loaded: boolean
  /** Extra user-applied Y rotation per machine id (radians). */
  machineRotation: Record<string, number>
  /** Guided routine currently being toured, if any. */
  activeRoutineId: string | null
  routineStep: number
  select: (id: string | null) => void
  clearSelection: () => void
  toggleSound: () => void
  toggleAutoRotate: () => void
  toggleHeroVisible: () => void
  setQuality: (q: Quality) => void
  setLoaded: (v: boolean) => void
  rotateMachine: (id: string, delta: number) => void
  startRoutine: (id: string) => void
  exitRoutine: () => void
  goToStep: (index: number) => void
}
