import type { Vector3Tuple } from 'three'

/**
 * Toggle the 3D development overlay: grid, axes, bounding boxes and a live
 * transform readout for every model. Flip to `true` while positioning models.
 */
export const DEBUG_3D = false

/** Cinematic starting camera. */
export const INITIAL_CAMERA: { position: Vector3Tuple; target: Vector3Tuple } = {
  position: [9, 6, 12],
  target: [0, 1.2, 0],
}

export const FOG = { color: '#05010f', near: 14, far: 42 }

export const CAMERA = {
  fov: 45,
  near: 0.1,
  far: 200,
  /** Orbit limits so users can't fly under the floor. */
  minDistance: 5,
  maxDistance: 26,
  minPolarAngle: 0.15,
  maxPolarAngle: Math.PI / 2.05,
}
