import type { MachineModel } from '../types'

/**
 * Centralized model configuration. Nothing about placement lives in components.
 *
 * IMPORTANT about `scale`: AI-generated GLBs arrive at wildly different sizes,
 * so each model is auto-normalized (see GymModel.tsx) so its bounding box is
 * `scale` world-units tall. Tune `scale` to change apparent size, `position`
 * to move it on the floor, `rotation` (radians) to turn it.
 *
 * `path: null` means the GLB is not available yet — a labelled neon placeholder
 * is rendered instead and the app keeps working. See README to add real files.
 */
export const MODELS: MachineModel[] = [
  {
    id: 'rack-mancuernas',
    name: 'Rack de Mancuernas G-Pulse',
    category: 'Fuerza',
    muscles: ['Bíceps', 'Hombros', 'Pecho', 'Espalda'],
    description:
      'Set completo de mancuernas con reconocimiento de peso. Registra cada serie automáticamente en tu rutina.',
    level: 'Intermedio',
    calories: 320,
    path: '/models/rack-mancuernas.glb',
    position: [-6, 0, -3],
    rotation: [0, Math.PI / 2, 0],
    scale: 2.1,
    focus: { position: [-6, 2.2, 3.2], target: [-6, 1, -3] },
  },
  {
    id: 'silla',
    name: 'Silla de Entrenamiento G-Pulse',
    category: 'Fuerza',
    muscles: ['Bíceps', 'Hombros', 'Core'],
    description:
      'Silla con respaldo firme para trabajo sentado. Ideal para curl de bíceps y press de hombros con espalda apoyada.',
    level: 'Principiante',
    calories: 220,
    path: '/models/silla.glb',
    position: [-1.5, 0, 3],
    rotation: [0, -Math.PI / 6, 0],
    scale: 1.4,
    focus: { position: [-1.5, 2, 7], target: [-1.5, 0.8, 3] },
  },
  {
    id: 'banco',
    name: 'Banco de Entrenamiento G-Pulse',
    category: 'Pecho',
    muscles: ['Pecho', 'Tríceps', 'Espalda', 'Hombros'],
    description:
      'Banco ajustable inteligente. Detecta el ángulo y guía la ejecución en press, aperturas, remo y pullover.',
    level: 'Principiante',
    calories: 280,
    path: '/models/banco.glb',
    position: [0.5, 0, -0.5],
    rotation: [0, Math.PI / 3, 0],
    scale: 1.3,
    focus: { position: [0.5, 2, 3.5], target: [0.5, 0.7, -0.5] },
  },
  {
    id: 'discos',
    name: 'Discos G-Pulse',
    category: 'Accesorios',
    muscles: ['Cuerpo completo'],
    description:
      'Set de discos con chip de peso integrado. Completan la estación de fuerza junto al banco y las mancuernas.',
    level: 'Principiante',
    calories: 200,
    path: '/models/discos.glb',
    position: [2.6, 0, -1.8],
    rotation: [0, -Math.PI / 5, 0],
    scale: 1.1,
    focus: { position: [2.6, 1.8, 1.4], target: [2.6, 0.6, -1.8] },
  },
  {
    id: 'espejos',
    name: 'Espejos G-Pulse',
    category: 'Accesorios',
    muscles: ['Técnica'],
    description:
      'Pared de espejos con análisis de postura en tiempo real. Verifica tu técnica en cada repetición.',
    level: 'Principiante',
    calories: 0,
    path: '/models/espejos.glb',
    position: [-10.5, 0, -1],
    rotation: [0, Math.PI / 2, 0],
    scale: 2.4,
    focus: { position: [-5.8, 1.8, -1], target: [-10.5, 1.4, -1] },
  },
  {
    id: 'caminadora',
    name: 'Caminadora G-Pulse',
    category: 'Cardio',
    muscles: ['Piernas', 'Glúteos', 'Core'],
    description:
      'Caminadora inteligente con seguimiento de velocidad, distancia y rendimiento en tiempo real.',
    level: 'Principiante',
    calories: 450,
    path: '/models/caminadora.glb',
    position: [6, 0, 2],
    rotation: [0, -Math.PI / 2, 0],
    scale: 2.2,
    focus: { position: [6, 2.4, 7], target: [6, 1, 2] },
  },
  {
    id: 'lat-pulldown',
    name: 'Máquina de Jalón G-Pulse',
    category: 'Espalda',
    muscles: ['Dorsales', 'Bíceps', 'Trapecio'],
    description:
      'Jalón al pecho con resistencia electrónica. Ajusta la carga y cuenta tus repeticiones sin tocar nada.',
    level: 'Intermedio',
    calories: 300,
    path: '/models/lat-pulldown.glb',
    position: [3.5, 0, -5],
    rotation: [0, Math.PI, 0],
    scale: 2.6,
    focus: { position: [3.5, 2.8, 0], target: [3.5, 1.4, -5] },
  },
  {
    // No GLB available yet -> renders a neon placeholder. Add
    // /public/models/maquina-poleas.glb and set `path` to enable it.
    id: 'maquina-poleas',
    name: 'Máquina de Poleas G-Pulse',
    category: 'Fuerza',
    muscles: ['Pecho', 'Espalda', 'Hombros', 'Brazos'],
    description:
      'Sistema de poleas de doble torre. Cientos de ejercicios en una sola estación con carga digital.',
    level: 'Avanzado',
    calories: 380,
    path: null,
    position: [-6, 0, 4.5],
    rotation: [0, Math.PI / 4, 0],
    scale: 2.6,
    focus: { position: [-6, 2.6, 9], target: [-6, 1.3, 4.5] },
  },
]

export const getModel = (id: string | null) =>
  MODELS.find((m) => m.id === id) ?? null

/** Only models with a real asset are worth precaching. */
export const modelPaths = MODELS.map((m) => m.path).filter(
  (p): p is string => !!p,
)
