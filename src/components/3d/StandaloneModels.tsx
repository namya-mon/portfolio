'use client'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

type GLTFModel = {
  nodes: {
    [key: string]: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.MeshStandardMaterial
  }
}

type EnvironmentPreset = 
  | 'city' | 'sunset' | 'dawn' | 'apartment' | 'forest' 
  | 'lobby' | 'night' | 'park' | 'studio' | 'warehouse'
  | undefined

// Updated animation hooks with null checks
// Update the animation hook types to accept nullable refs
const useEngineAnimation = (group: React.RefObject<THREE.Group | null>) => {
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.getElapsedTime() * 0.15
    group.current.position.y = Math.sin(state.clock.getElapsedTime() * 5) * 1
    group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05
  })
}

const useTruckAnimation = (group: React.RefObject<THREE.Group | null>) => {
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.x = state.clock.getElapsedTime() * 0.2
    group.current.rotation.y = state.clock.getElapsedTime() * 0.25
    group.current.rotation.z = state.clock.getElapsedTime() * 0.1
  })
}

const useSymoliaAnimation = (group: React.RefObject<THREE.Group | null>) => {
  useFrame((state) => {
    if (!group.current) return
    group.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.8) * 0.1
    group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.05
  })
}

const useBelaromeAnimation = (
  group1: React.RefObject<THREE.Group | null>,
  group2: React.RefObject<THREE.Group | null>
) => {
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (group1.current) {
      group1.current.position.x = Math.sin(time * 0.5) * 2
      group1.current.position.z = Math.cos(time * 0.5) * 2
      group1.current.rotation.y = time * 0.3
      group1.current.rotation.x = Math.sin(time * 0.7) * 0.2
      group1.current.position.y = Math.sin(time * 1.2) * 0.3
    }
    
    if (group2.current) {
      group2.current.position.x = Math.sin(time * 0.5 + Math.PI) * 1.5
      group2.current.position.z = Math.cos(time * 0.5 + Math.PI) * 1.5
      group2.current.rotation.y = -time * 0.4
      group2.current.rotation.x = Math.sin(time * 0.5) * 0.1
      group2.current.position.y = Math.sin(time * 1.5) * 0.2
    }
  })
}

interface ModelLoaderProps {
  modelPath: string
  scale?: number | [number, number, number]
  position?: [number, number, number]
  animationType: 'engine' | 'truck' | 'symolia' | 'belarome'
}

function ModelLoader({ 
  modelPath, 
  scale = 1, 
  position = [0, 0, 0],
  animationType,
  ...props 
}: ModelLoaderProps) {
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [model, setModel] = useState<THREE.Group | null>(null)
  const [error, setError] = useState(false)

  // Load model
  useEffect(() => {
    try {
      const gltf = useGLTF(modelPath)
      setModel(gltf.scene)
      setError(false)
    } catch (err) {
      console.error(`Failed to load model at ${modelPath}:`, err)
      setError(true)
    }
  }, [modelPath])

  if (error || !model) {
    return (
      <group ref={group} position={position} scale={scale} {...props}>
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial 
            color={hovered ? '#a0a0a0' : '#cccccc'} 
            metalness={0.3} 
            roughness={0.7} 
          />
        </mesh>
      </group>
    )
  }

  return (
    <group 
      ref={group} 
      position={position} 
      scale={scale} 
      {...props}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={model} />
    </group>
  )
}

// Updated individual model components with proper ref types
export function EngineModel(props: any) {
  const group = useRef<THREE.Group>(null)
  useEngineAnimation(group)
  
  return (
    <group ref={group} {...props}>
      <ModelLoader 
        modelPath="/models/piston.glb" 
        scale={0.016}
        animationType="engine"
      />
    </group>
  )
}

export function TruckModel(props: any) {
  const group = useRef<THREE.Group>(null)
  useTruckAnimation(group)
  
  return (
    <group ref={group} {...props}>
      <ModelLoader 
        modelPath="/models/low_poly_truck.glb" 
        scale={1.1}
        animationType="truck"
      />
    </group>
  )
}

export function SymoliaModel(props: any) {
  const group = useRef<THREE.Group>(null)
  useSymoliaAnimation(group)
  
  return (
    <group ref={group} {...props}>
      <ModelLoader 
        modelPath="/models/low_poly_check_list.glb" 
        scale={0.5}
        animationType="symolia"
      />
    </group>
  )
}

export function SoapModel(props: any) {
  return (
    <ModelLoader 
      modelPath="/models/low_poly_soap.glb" 
      scale={0.8}
      position={[0, 0, 0]}
      animationType="belarome"
      {...props} 
    />
  )
}

export function ServerModel(props: any) {
  return (
    <ModelLoader 
      modelPath="/models/server.glb" 
      scale={0.2}
      position={[0, 0, 0]}
      animationType="belarome"
      {...props} 
    />
  )
}

// Updated Belarome model component
export function BelaromeModel(props: any) {
  const group1 = useRef<THREE.Group>(null)
  const group2 = useRef<THREE.Group>(null)
  
  useBelaromeAnimation(group1, group2)

  return (
    <group {...props}>
      <group ref={group1}>
        <SoapModel />
      </group>
      <group ref={group2}>
        <ServerModel />
      </group>
    </group>
  )
}

// Preload all models
useGLTF.preload('/models/low_poly_truck.glb')
useGLTF.preload('/models/piston.glb')
useGLTF.preload('/models/low_poly_check_list.glb')
useGLTF.preload('/models/low_poly_soap.glb')
useGLTF.preload('/models/server.glb')

// Model wrapper configuration remains the same
interface ModelWrapperProps {
  ModelComponent: React.ComponentType<any>
  preset?: EnvironmentPreset
  cameraPosition?: [number, number, number]
  fov?: number
  enableZoom?: boolean
  enablePan?: boolean
  enableRotate?: boolean
}

function ModelWrapper({ 
  ModelComponent, 
  preset = 'city', 
  cameraPosition = [5, 2, 8],
  fov = 45,
  enableZoom = true,
  enablePan = true,
  enableRotate = true
}: ModelWrapperProps) {
  return (
    <Canvas 
      style={{ width: '100%', height: '100%' }}
      camera={{ position: cameraPosition, fov }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, 5, -5]} intensity={0.5} />
      
      <Suspense fallback={null}>
        <ModelComponent />
      </Suspense>
      
      <OrbitControls
        enableZoom={enableZoom}
        enablePan={enablePan}
        enableRotate={enableRotate}
      />
      <Environment preset={preset} />
    </Canvas>
  )
}

// Wrapper components for each model remain the same
export function TruckModelWrapper() {
  return (
    <ModelWrapper 
      ModelComponent={TruckModel} 
      preset="city"
      enableZoom={false}
      cameraPosition={[5, 2, 8]}
    />
  )
}

export function EngineModelWrapper() {
  return (
    <ModelWrapper 
      ModelComponent={EngineModel} 
      preset="sunset"
      cameraPosition={[6, 4, 3]}
      enableZoom={false}
      enablePan={false}
    />
  )
}

export function SymoliaModelWrapper() {
  return (
    <ModelWrapper 
      ModelComponent={SymoliaModel} 
      preset="dawn"
      enableZoom={false}
      cameraPosition={[7, 3, 6]}
    />
  )
}

export function BelaromeModelWrapper() {
  return (
    <ModelWrapper 
      ModelComponent={BelaromeModel} 
      preset="lobby"
      enableZoom={false}
      cameraPosition={[0, 2, 8]}
      fov={50}
    />
  )
}