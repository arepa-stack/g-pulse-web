import { useMemo } from 'react'
import { MeshReflectorMaterial, Text, Grid } from '@react-three/drei'
import { useStore } from '../../store/useStore'

const FLOOR = 26

/**
 * Everything that isn't an interactive machine and had no GLB provided:
 * the rooftop floor, perimeter railings and the neon G-Pulse sign. All
 * procedural so the scene is complete without extra assets.
 */
export function SceneEnvironment() {
  const quality = useStore((s) => s.quality)

  return (
    <group>
      <Floor highQuality={quality === 'high'} />
      <Grid
        position={[0, 0.01, 0]}
        args={[FLOOR, FLOOR]}
        cellSize={1}
        cellColor="#1b0f3a"
        sectionSize={5}
        sectionColor="#7a1fff"
        fadeDistance={34}
        fadeStrength={2}
        infiniteGrid={false}
      />
      <Railings />
      <NeonSign />
    </group>
  )
}

function Floor({ highQuality }: { highQuality: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[FLOOR, FLOOR]} />
      {highQuality ? (
        <MeshReflectorMaterial
          color="#0a0620"
          metalness={0.85}
          roughness={0.4}
          blur={[300, 90]}
          mixBlur={30}
          mixStrength={40}
          resolution={1024}
          mirror={0.5}
          depthScale={0.8}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.2}
        />
      ) : (
        <meshStandardMaterial color="#0a0620" metalness={0.6} roughness={0.6} />
      )}
    </mesh>
  )
}

/** Glowing perimeter railing built from a top rail + posts on all four sides. */
function Railings() {
  const half = FLOOR / 2 - 0.5
  const sides = useMemo(
    () =>
      [
        { pos: [0, 0.9, -half], rot: 0, len: FLOOR - 1 },
        { pos: [0, 0.9, half], rot: 0, len: FLOOR - 1 },
        { pos: [-half, 0.9, 0], rot: Math.PI / 2, len: FLOOR - 1 },
        { pos: [half, 0.9, 0], rot: Math.PI / 2, len: FLOOR - 1 },
      ] as const,
    [half],
  )

  return (
    <group>
      {sides.map((s, i) => (
        <group key={i} position={s.pos as [number, number, number]} rotation={[0, s.rot, 0]}>
          {/* Top rail */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[s.len, 0.06, 0.06]} />
            <meshStandardMaterial color="#0d1830" emissive="#22d3ee" emissiveIntensity={1.6} />
          </mesh>
          {/* Posts */}
          {Array.from({ length: 9 }).map((_, p) => {
            const x = -s.len / 2 + (p * s.len) / 8
            return (
              <mesh key={p} position={[x, 0, 0]}>
                <boxGeometry args={[0.05, 1, 0.05]} />
                <meshStandardMaterial color="#0d1830" metalness={0.7} roughness={0.4} />
              </mesh>
            )
          })}
        </group>
      ))}
    </group>
  )
}

/** 3D neon "G-PULSE" sign standing at the back of the rooftop. */
function NeonSign() {
  return (
    <group position={[0, 3.4, -12]}>
      <Text
        fontSize={2.1}
        letterSpacing={0.05}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#22d3ee"
      >
        G-PULSE
        <meshStandardMaterial
          color="#ff2fd6"
          emissive="#ff2fd6"
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </Text>
      <Text position={[0, -1.5, 0]} fontSize={0.4} letterSpacing={0.3} anchorX="center" color="#8be9ff">
        LIVE STRONG · LIVE FUTURE
      </Text>
    </group>
  )
}
