import { Component, Suspense, useMemo, useRef, useState, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Edges, Html } from '@react-three/drei'
import { Box3, Vector3, type Group, type Mesh } from 'three'
import type { MachineModel } from '../../types'
import { useStore } from '../../store/useStore'
import { DEBUG_3D } from '../../config/scene'

/** Loads a GLB, auto-normalizes its size and drops it on the floor. */
function LoadedModel({ model }: { model: MachineModel }) {
  const { scene } = useGLTF(model.path as string)

  const { object, fit } = useMemo(() => {
    const object = scene.clone(true)
    object.traverse((o) => {
      const m = o as Mesh
      if (m.isMesh) {
        m.castShadow = true
        m.receiveShadow = true
      }
    })
    const box = new Box3().setFromObject(object)
    const size = new Vector3()
    box.getSize(size)
    const center = new Vector3()
    box.getCenter(center)
    const factor = model.scale / (size.y || 1)
    return {
      object,
      fit: {
        factor,
        // Offset so the model is centered on x/z and its base sits at y=0.
        offset: [
          -center.x * factor,
          -box.min.y * factor,
          -center.z * factor,
        ] as [number, number, number],
      },
    }
  }, [scene, model.scale])

  return (
    <group position={fit.offset} scale={fit.factor}>
      <primitive object={object} />
    </group>
  )
}

/**
 * Confines a GLB load/parse failure to THIS machine: it degrades to the neon
 * placeholder instead of letting the error reach the Canvas boundary and
 * kill the whole 3D experience.
 */
class ModelErrorBoundary extends Component<
  { modelId: string; fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err: unknown) {
    console.error(`[G-Pulse] model "${this.props.modelId}" failed to load:`, err)
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

/** Neon wireframe box shown when a GLB is missing or still loading. */
function Placeholder({ model, label }: { model: MachineModel; label: string }) {
  const h = model.scale
  return (
    <group position={[0, h / 2, 0]}>
      <mesh>
        <boxGeometry args={[h * 0.8, h, h * 0.8]} />
        <meshStandardMaterial
          color="#12002b"
          emissive="#7a1fff"
          emissiveIntensity={0.4}
          transparent
          opacity={0.35}
        />
        <Edges color="#22d3ee" />
      </mesh>
      <Html center distanceFactor={12} position={[0, h * 0.15, 0]}>
        <div className="model-placeholder-label">{label}</div>
      </Html>
    </group>
  )
}

export function GymModel({ model }: { model: MachineModel }) {
  const group = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const selectedId = useStore((s) => s.selectedId)
  const select = useStore((s) => s.select)
  const rotationOffset = useStore((s) => s.machineRotation[model.id] ?? 0)
  const selected = selectedId === model.id

  // Subtle hover/selection feedback + smooth user rotation of the machine.
  useFrame(() => {
    if (!group.current) return
    const active = selected || hovered
    const target = active ? 1.04 : 1
    const s = group.current.scale
    s.x += (target - s.x) * 0.15
    s.y = s.z = s.x
    // Ease toward configured rotation + the offset applied from the panel.
    const desiredY = model.rotation[1] + rotationOffset
    group.current.rotation.y += (desiredY - group.current.rotation.y) * 0.12
  })

  const ringColor = selected ? '#ff2fd6' : '#22d3ee'

  return (
    <group
      ref={group}
      name={model.id}
      position={model.position}
      // Y rotation is animated in useFrame (config + user offset); passing it
      // as a prop would snap it back on every re-render.
      rotation-x={model.rotation[0]}
      rotation-z={model.rotation[2]}
      onClick={(e) => {
        e.stopPropagation()
        select(model.id)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      {model.path ? (
        <ModelErrorBoundary
          modelId={model.id}
          fallback={<Placeholder model={model} label="No disponible" />}
        >
          <Suspense fallback={<Placeholder model={model} label="Cargando…" />}>
            <LoadedModel model={model} />
          </Suspense>
        </ModelErrorBoundary>
      ) : (
        <Placeholder model={model} label="Próximamente" />
      )}

      {/* Selection / hover ground ring. */}
      {(selected || hovered) && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[model.scale * 0.7, model.scale * 0.82, 48]} />
          <meshBasicMaterial color={ringColor} transparent opacity={0.9} />
        </mesh>
      )}

      {DEBUG_3D && <DebugHelper model={model} />}
    </group>
  )
}

function DebugHelper({ model }: { model: MachineModel }) {
  return (
    <Html position={[0, model.scale + 0.4, 0]} center>
      <div className="debug-readout">
        <strong>{model.id}</strong>
        <br />
        pos [{model.position.join(', ')}]
        <br />
        rot [{model.rotation.map((r) => r.toFixed(2)).join(', ')}]
        <br />
        scale {model.scale}
      </div>
    </Html>
  )
}
