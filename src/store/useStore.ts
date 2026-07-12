import { create } from 'zustand'
import type { AppState } from '../types'
import { getRoutine } from '../data/routines'

/** Single source of truth for the whole experience (viewer + UI). */
export const useStore = create<AppState>((set, get) => ({
  selectedId: null,
  view: 'overview',
  soundOn: false,
  autoRotate: true,
  quality: 'high',
  loaded: false,
  machineRotation: {},
  activeRoutineId: null,
  routineStep: 0,
  select: (id) => set({ selectedId: id, view: id ? 'focus' : 'overview' }),
  clearSelection: () => set({ selectedId: null, view: 'overview' }),
  startRoutine: (id) => {
    const routine = getRoutine(id)
    if (!routine) return
    set({
      activeRoutineId: id,
      routineStep: 0,
      selectedId: routine.steps[0].modelId,
      view: 'focus',
    })
  },
  exitRoutine: () =>
    set({ activeRoutineId: null, routineStep: 0, selectedId: null, view: 'overview' }),
  goToStep: (index) => {
    const routine = getRoutine(get().activeRoutineId)
    if (!routine || index < 0 || index >= routine.steps.length) return
    set({
      routineStep: index,
      selectedId: routine.steps[index].modelId,
      view: 'focus',
    })
  },
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  toggleAutoRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),
  setQuality: (quality) => set({ quality }),
  setLoaded: (loaded) => set({ loaded }),
  rotateMachine: (id, delta) =>
    set((s) => ({
      machineRotation: {
        ...s.machineRotation,
        [id]: (s.machineRotation[id] ?? 0) + delta,
      },
    })),
}))
