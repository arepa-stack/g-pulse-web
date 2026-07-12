/** Detect WebGL support so we can fall back gracefully. */
export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/** Rough "is this a low-end / mobile device" guess to auto-drop quality. */
export function isLowPowerDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const cores = navigator.hardwareConcurrency ?? 8
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false
  return (mem !== undefined && mem <= 4) || cores <= 4 || coarse
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
}
