import type { Routine } from '../types'

/**
 * Guided routines toured inside the 3D scene. Each step points at a model id
 * from config/models.ts; advancing a step flies the camera to that machine.
 * These are showcase routines — the real app lets users build hundreds more.
 */
export const ROUTINES: Routine[] = [
  {
    id: 'basica-pecho-espalda-biceps',
    name: 'G-Pulse Básica: Pecho, Espalda y Bíceps',
    level: 'Principiante',
    duration: '45–55 min',
    description:
      'Rutina completa de empuje y tracción con banco, mancuernas, jalones y silla. Descansa 60–90 s entre series y usa un peso que te permita terminar con buena técnica.',
    steps: [
      {
        exercise: 'Calentamiento en caminadora',
        modelId: 'caminadora',
        volume: '10 minutos',
        rest: null,
        muscles: ['Cardio', 'Movilidad'],
        tip: 'Empieza caminando y aumenta gradualmente el ritmo, sin llegar a fatigarte.',
      },
      {
        exercise: 'Press de banca con mancuernas',
        modelId: 'banco',
        volume: '4 × 10',
        rest: '75 s',
        muscles: ['Pecho', 'Tríceps', 'Hombros'],
        tip: 'Mantén los pies apoyados y baja las mancuernas de forma controlada.',
      },
      {
        exercise: 'Press inclinado con mancuernas',
        modelId: 'banco',
        volume: '4 × 10',
        rest: '75 s',
        muscles: ['Pecho superior', 'Hombros', 'Tríceps'],
        tip: 'Usa una inclinación moderada para evitar que todo el esfuerzo pase a los hombros.',
      },
      {
        exercise: 'Aperturas con mancuernas',
        modelId: 'banco',
        volume: '4 × 12',
        rest: '60 s',
        muscles: ['Pecho'],
        tip: 'Mantén una ligera flexión en los codos y evita bajar demasiado los brazos.',
      },
      {
        exercise: 'Jalones al pecho',
        modelId: 'lat-pulldown',
        volume: '4 × 10–12',
        rest: '75 s',
        muscles: ['Dorsales', 'Bíceps', 'Espalda media'],
        tip: 'Lleva la barra hacia la parte superior del pecho sin balancear el cuerpo.',
      },
      {
        exercise: 'Remo con mancuerna a una mano',
        modelId: 'banco',
        volume: '4 × 10 por brazo',
        rest: '60 s',
        muscles: ['Dorsales', 'Romboides', 'Bíceps'],
        tip: 'Lleva el codo hacia atrás y mantén la espalda recta.',
      },
      {
        exercise: 'Pullover con mancuerna',
        modelId: 'banco',
        volume: '4 × 12',
        rest: '60 s',
        muscles: ['Dorsales', 'Pecho', 'Serrato'],
        tip: 'Mueve la mancuerna lentamente y evita arquear demasiado la espalda.',
      },
      {
        exercise: 'Curl alterno con mancuernas',
        modelId: 'espejos',
        volume: '4 × 10 por brazo',
        rest: '60 s',
        muscles: ['Bíceps'],
        tip: 'Usa el espejo para comprobar que los codos permanezcan pegados al torso.',
      },
      {
        exercise: 'Curl martillo',
        modelId: 'rack-mancuernas',
        volume: '4 × 10–12',
        rest: '60 s',
        muscles: ['Bíceps', 'Braquial', 'Antebrazo'],
        tip: 'Mantén las palmas enfrentadas y evita impulsarte con la espalda.',
      },
      {
        exercise: 'Curl sentado',
        modelId: 'silla',
        volume: '4 × 10',
        rest: '60 s',
        muscles: ['Bíceps'],
        tip: 'Apoya bien la espalda y controla especialmente la bajada.',
      },
      {
        exercise: 'Vuelta a la calma en caminadora',
        modelId: 'caminadora',
        volume: '5 minutos',
        rest: null,
        muscles: ['Cardio'],
        tip: 'Termina caminando lentamente para bajar pulsaciones.',
      },
    ],
  },
  {
    id: 'express-principiante',
    name: 'G-Pulse Express Principiante',
    level: 'Principiante',
    duration: '25–30 min',
    description:
      'Versión ligera de 3 series por ejercicio para empezar. Cuando la domines, desbloquea la rutina básica completa de 4 series.',
    steps: [
      {
        exercise: 'Calentamiento en caminadora',
        modelId: 'caminadora',
        volume: '8 minutos',
        rest: null,
        muscles: ['Cardio', 'Movilidad'],
        tip: 'Ritmo suave a moderado, solo para activar el cuerpo.',
      },
      {
        exercise: 'Press de banca con mancuernas',
        modelId: 'banco',
        volume: '3 × 10',
        rest: '75 s',
        muscles: ['Pecho', 'Tríceps', 'Hombros'],
        tip: 'Prioriza el control del movimiento sobre el peso.',
      },
      {
        exercise: 'Jalones al pecho',
        modelId: 'lat-pulldown',
        volume: '3 × 12',
        rest: '75 s',
        muscles: ['Dorsales', 'Bíceps'],
        tip: 'Baja la barra al pecho sin inclinarte hacia atrás.',
      },
      {
        exercise: 'Curl alterno frente al espejo',
        modelId: 'espejos',
        volume: '3 × 10 por brazo',
        rest: '60 s',
        muscles: ['Bíceps'],
        tip: 'Observa en el espejo que los codos no se despeguen del torso.',
      },
      {
        exercise: 'Curl sentado',
        modelId: 'silla',
        volume: '3 × 10',
        rest: '60 s',
        muscles: ['Bíceps'],
        tip: 'Espalda apoyada y bajada lenta en cada repetición.',
      },
      {
        exercise: 'Vuelta a la calma en caminadora',
        modelId: 'caminadora',
        volume: '5 minutos',
        rest: null,
        muscles: ['Cardio'],
        tip: 'Camina lento hasta normalizar las pulsaciones.',
      },
    ],
  },
]

export const getRoutine = (id: string | null) =>
  ROUTINES.find((r) => r.id === id) ?? null
