import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

const chrome = { color: '#dfe3e8', metalness: 1, roughness: 0.22, envMapIntensity: 1.5 }
const iron = { color: '#0d0d0f', metalness: 0.6, roughness: 0.48, envMapIntensity: 0.9 }

function Particles({ count = 160 }) {
  const points = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (points.current) points.current.rotation.y = state.clock.elapsedTime * 0.015
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#c9a227" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

// Octagonal plate, axis along X (like the reference photo)
function OctPlate({ x, radius, thickness }) {
  return (
    <group position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <mesh rotation={[0, Math.PI / 8, 0]}>
        <cylinderGeometry args={[radius, radius, thickness, 8]} />
        <meshStandardMaterial {...iron} />
      </mesh>
      {/* raised chrome-edge ring on the plate face */}
      <mesh rotation={[0, Math.PI / 8, 0]}>
        <cylinderGeometry args={[radius * 0.5, radius * 0.5, thickness + 0.03, 32]} />
        <meshStandardMaterial color="#15151a" metalness={0.7} roughness={0.4} envMapIntensity={1} />
      </mesh>
    </group>
  )
}

function EndNut({ x }) {
  return (
    <group position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 0.26, 6]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      <mesh position={[Math.sign(x) * 0.0, Math.sign(x) * 0.14, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.04, 20]} />
        <meshStandardMaterial color="#050506" metalness={0.4} roughness={0.7} />
      </mesh>
    </group>
  )
}

function Dumbbell() {
  const knurl = useMemo(() => Array.from({ length: 34 }, (_, i) => -0.78 + i * 0.047), [])

  return (
    <group>
      {/* handle */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 3.4, 32]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      {/* knurled grip rings */}
      {knurl.map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.112, 0.014, 6, 28]} />
          <meshStandardMaterial color="#c4c9d0" metalness={1} roughness={0.35} envMapIntensity={1.2} />
        </mesh>
      ))}
      {/* plates: two per side */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <OctPlate x={s * 0.95} radius={1.0} thickness={0.5} />
          <OctPlate x={s * 1.4} radius={0.9} thickness={0.32} />
          <EndNut x={s * 1.72} />
        </group>
      ))}
    </group>
  )
}

function Scene({ pointer, scrollFactor }) {
  const outer = useRef()
  const spin = useRef()
  const base = useRef(0.6)
  const { viewport } = useThree()

  const narrow = viewport.width < 5.5
  const posX = narrow ? 0 : Math.min(viewport.width * 0.2, 2.3)
  const posY = narrow ? -1.3 : 0
  const scale = narrow ? 0.6 : 0.95

  useFrame((state, delta) => {
    base.current += delta * 0.28
    if (spin.current) {
      spin.current.rotation.y = base.current + scrollFactor.current * 2.4
      spin.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1
    }
    if (outer.current) {
      outer.current.rotation.z = THREE.MathUtils.lerp(outer.current.rotation.z, 0.32 - pointer.current.y * 0.18, 0.06)
      outer.current.rotation.x = THREE.MathUtils.lerp(outer.current.rotation.x, pointer.current.y * 0.25, 0.06)
      outer.current.position.y = posY + Math.sin(state.clock.elapsedTime * 0.7) * 0.12
      outer.current.position.x = THREE.MathUtils.lerp(outer.current.position.x, posX + pointer.current.x * 0.25, 0.06)
    }
  })

  return (
    <group ref={outer} position={[posX, posY, 0]} rotation={[0, 0, 0.32]} scale={scale}>
      <group ref={spin}>
        <Dumbbell />
      </group>
    </group>
  )
}

function Rig({ pointer, scrollFactor }) {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, pointer.current.x * 0.5, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.8 - pointer.current.y * 0.4, 0.05)
    state.camera.position.z = 6.4 - scrollFactor.current * 1.6
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Hero3D() {
  const pointer = useRef({ x: 0, y: 0 })
  const scrollFactor = useRef(0)

  useEffect(() => {
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    const scroll = () => {
      scrollFactor.current = Math.min(window.scrollY / 900, 1)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('scroll', scroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', scroll)
    }
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Canvas camera={{ position: [0, 0.8, 6.4], fov: 40 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 5, 4]} intensity={1.3} color="#f6ecd2" />
        <directionalLight position={[-5, -1, -3]} intensity={0.6} color="#c9a227" />
        <Environment resolution={256}>
          <color attach="background" args={['#07090c']} />
          <Lightformer form="rect" intensity={3.2} position={[0, 5, -2]} scale={[12, 2, 1]} color="#fff3d8" />
          <Lightformer form="rect" intensity={2} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[2, 6, 1]} />
          <Lightformer form="rect" intensity={1.8} position={[5, -1, 3]} rotation-y={-Math.PI / 2} scale={[2, 5, 1]} color="#c9a227" />
          <Lightformer form="ring" intensity={2} position={[0, 0, 6]} scale={4} color="#ffffff" />
        </Environment>
        <Scene pointer={pointer} scrollFactor={scrollFactor} />
        <Particles />
        <Rig pointer={pointer} scrollFactor={scrollFactor} />
      </Canvas>
    </div>
  )
}
