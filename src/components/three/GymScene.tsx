import { Component, Suspense, useEffect, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { FOG, CAMERA, INITIAL_CAMERA } from '../../config/scene'
import { modelPaths } from '../../config/models'
import { useStore } from '../../store/useStore'
import { GymLights } from './GymLights'
import { SceneEnvironment } from './SceneEnvironment'
import { ModelSelector } from './ModelSelector'
import { CameraController } from './CameraController'
import { LoadingScreen } from './LoadingScreen'

// Precache the real GLBs so switching focus is instant.
modelPaths.forEach((p) => useGLTF.preload(p))

/** Flips the global `loaded` flag once the scene content has mounted. */
function SceneReady() {
  const setLoaded = useStore((s) => s.setLoaded)
  useEffect(() => {
    setLoaded(true)
    return () => setLoaded(false)
  }, [setLoaded])
  return null
}

/** Catches any render/WebGL error so a broken model never blanks the page. */
class CanvasErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err: unknown) {
    console.error('[G-Pulse] 3D scene error:', err)
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export function GymScene({ fallback }: { fallback: ReactNode }) {
  const quality = useStore((s) => s.quality)

  return (
    <CanvasErrorBoundary fallback={fallback}>
      <Canvas
        shadows={quality === 'high'}
        dpr={quality === 'high' ? [1, 2] : [1, 1.2]}
        camera={{
          position: INITIAL_CAMERA.position,
          fov: CAMERA.fov,
          near: CAMERA.near,
          far: CAMERA.far,
        }}
        gl={{ antialias: quality === 'high', powerPreference: 'high-performance' }}
        onPointerMissed={() => useStore.getState().clearSelection()}
      >
        <color attach="background" args={[FOG.color]} />
        <fog attach="fog" args={[FOG.color, FOG.near, FOG.far]} />

        <Suspense fallback={<LoadingScreen />}>
          <GymLights />
          <SceneEnvironment />
          <ModelSelector />
          <SceneReady />
        </Suspense>

        <CameraController />
      </Canvas>
    </CanvasErrorBoundary>
  )
}
