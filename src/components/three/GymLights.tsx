import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { PointLight } from 'three'
import { useStore } from '../../store/useStore'
import { prefersReducedMotion } from '../../utils/webgl'

/** Cyan + magenta neon lighting for the nighttime rooftop mood. */
export function GymLights() {
  const quality = useStore((s) => s.quality)
  const cyan = useRef<PointLight>(null)
  const magenta = useRef<PointLight>(null)
  const reduce = prefersReducedMotion()

  // Subtle neon pulse (skipped for reduced-motion users).
  useFrame((state) => {
    if (reduce) return
    const t = state.clock.elapsedTime
    if (cyan.current) cyan.current.intensity = 70 + Math.sin(t * 1.3) * 12
    if (magenta.current) magenta.current.intensity = 70 + Math.cos(t * 1.1) * 12
  })

  return (
    <>
      <ambientLight intensity={0.8} color="#5a4a8a" />
      <hemisphereLight intensity={0.6} color="#22d3ee" groundColor="#140a2e" />

      {/* Key spot from above. */}
      <spotLight
        position={[0, 14, 6]}
        angle={0.7}
        penumbra={0.8}
        intensity={220}
        color="#e9d5ff"
        distance={60}
        castShadow={quality === 'high'}
        shadow-mapSize-width={quality === 'high' ? 2048 : 1024}
        shadow-mapSize-height={quality === 'high' ? 2048 : 1024}
        shadow-bias={-0.0005}
      />
      {/* Front fill spot so machines never read as silhouettes. */}
      <spotLight
        position={[8, 10, 12]}
        angle={0.8}
        penumbra={1}
        intensity={140}
        color="#c7f5ff"
        distance={55}
      />
      <directionalLight position={[-6, 8, 4]} intensity={0.9} color="#b7c8ff" />

      {/* Neon accents. */}
      <pointLight ref={cyan} position={[-9, 4, -6]} intensity={70} color="#22d3ee" distance={34} />
      <pointLight ref={magenta} position={[9, 4, 6]} intensity={70} color="#ff2fd6" distance={34} />
      <pointLight position={[0, 3, -10]} intensity={45} color="#4f46e5" distance={30} />
      <pointLight position={[-8, 3, 8]} intensity={35} color="#7a1fff" distance={26} />
      <pointLight position={[8, 3, -8]} intensity={35} color="#22d3ee" distance={26} />
      {/* Low warm fill at the center so floors/undersides aren't pitch black. */}
      <pointLight position={[0, 1.5, 2]} intensity={25} color="#ffd9f5" distance={20} />
    </>
  )
}
