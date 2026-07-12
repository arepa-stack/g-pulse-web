import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { useStore } from '../../store/useStore'
import { getModel } from '../../config/models'
import { INITIAL_CAMERA, CAMERA } from '../../config/scene'
import { prefersReducedMotion } from '../../utils/webgl'

/**
 * OrbitControls + smooth camera fly-to when the selection changes.
 * The lerp only runs DURING the transition; once the camera arrives, the user
 * has full free orbit (previously the per-frame lerp fought every drag).
 */
export function CameraController() {
  const controls = useRef<OrbitControlsImpl>(null)
  const camera = useThree((s) => s.camera)
  const selectedId = useStore((s) => s.selectedId)
  const autoRotate = useStore((s) => s.autoRotate)
  const view = useStore((s) => s.view)

  const desiredPos = useRef(new Vector3(...INITIAL_CAMERA.position))
  const desiredTarget = useRef(new Vector3(...INITIAL_CAMERA.target))
  const animating = useRef(false)
  const reduce = prefersReducedMotion()

  // New destination only when the selection actually changes.
  useEffect(() => {
    const model = getModel(selectedId)
    if (model) {
      desiredPos.current.set(...model.focus.position)
      desiredTarget.current.set(...model.focus.target)
    } else {
      desiredPos.current.set(...INITIAL_CAMERA.position)
      desiredTarget.current.set(...INITIAL_CAMERA.target)
    }
    animating.current = true
  }, [selectedId])

  useFrame(() => {
    if (!animating.current || !controls.current) return
    const lerp = reduce ? 1 : 0.07
    camera.position.lerp(desiredPos.current, lerp)
    controls.current.target.lerp(desiredTarget.current, lerp)
    controls.current.update()
    // Arrived -> hand control back to the user.
    if (
      camera.position.distanceTo(desiredPos.current) < 0.08 &&
      controls.current.target.distanceTo(desiredTarget.current) < 0.08
    ) {
      animating.current = false
    }
  })

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      autoRotate={autoRotate && view === 'overview'}
      autoRotateSpeed={0.5}
      minDistance={CAMERA.minDistance}
      maxDistance={CAMERA.maxDistance}
      minPolarAngle={CAMERA.minPolarAngle}
      maxPolarAngle={CAMERA.maxPolarAngle}
      // A user drag cancels any in-flight fly-to immediately.
      onStart={() => (animating.current = false)}
    />
  )
}
