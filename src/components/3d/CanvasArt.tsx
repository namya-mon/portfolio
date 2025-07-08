'use client'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export default function CanvasArt(props: any) {
  const group = useRef<any>(null)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = t * 0.1
      group.current.position.y = Math.sin(t) * 0.05
    }
  })

  // Create a more artistic painting texture
  const createPaintingTexture = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')!
    
    // Base color
    ctx.fillStyle = '#f9a8d4'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Abstract brush strokes
    ctx.strokeStyle = '#93c5fd'
    ctx.lineWidth = 20
    ctx.beginPath()
    ctx.moveTo(100, 100)
    ctx.bezierCurveTo(150, 50, 200, 150, 300, 100)
    ctx.bezierCurveTo(350, 80, 400, 120, 450, 100)
    ctx.stroke()
    
    ctx.strokeStyle = '#fca5a5'
    ctx.lineWidth = 30
    ctx.beginPath()
    ctx.moveTo(50, 400)
    ctx.bezierCurveTo(100, 350, 200, 450, 300, 380)
    ctx.stroke()
    
    // Add some texture
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 30,
        Math.random() * 30
      )
    }
    
    return new THREE.CanvasTexture(canvas)
  }

  const paintingTexture = createPaintingTexture()

  return (
    <group ref={group} {...props} scale={[2, 2, 2]}>
      {/* Canvas Frame - more detailed */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 1.7, 0.15]} />
        <meshStandardMaterial 
          color="#654321" 
          roughness={0.7}
          metalness={0.1}
        />
        
        {/* Ornamental details */}
        <mesh position={[1.05, 0.8, 0.075]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.1, 6]} />
          <meshStandardMaterial color="#876543" metalness={0.3} />
        </mesh>
        <mesh position={[-1.05, 0.8, 0.075]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.1, 6]} />
          <meshStandardMaterial color="#876543" metalness={0.3} />
        </mesh>
        
        {/* Canvas */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[2, 1.5, 0.02]} />
          <meshStandardMaterial 
            map={paintingTexture}
            roughness={0.9}
          />
          
          {/* Paint texture - impasto effect */}
          <mesh position={[0.3, 0.2, 0.03]} rotation={[0, 0, Math.PI/6]}>
            <boxGeometry args={[0.5, 0.8, 0.05]} />
            <meshStandardMaterial 
              color="#93c5fd" 
              roughness={0.8}
              bumpScale={0.05}
            />
          </mesh>
          <mesh position={[-0.4, -0.1, 0.03]} rotation={[0, 0, -Math.PI/4]}>
            <boxGeometry args={[0.7, 0.3, 0.07]} />
            <meshStandardMaterial 
              color="#fca5a5" 
              roughness={0.8}
              bumpScale={0.07}
            />
          </mesh>
        </mesh>
      </mesh>
      
      {/* Easel - more realistic */}
      <group position={[0, -1.8, -0.7]}>
        {/* Back leg */}
        <mesh position={[0, 0, -0.4]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.1, 3, 0.1]} />
          <meshStandardMaterial color="#654321" roughness={0.7} />
        </mesh>
        
        {/* Front legs */}
        <mesh position={[-0.4, 0, 0.2]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.1, 3, 0.1]} />
          <meshStandardMaterial color="#654321" roughness={0.7} />
        </mesh>
        <mesh position={[0.4, 0, 0.2]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.1, 3, 0.1]} />
          <meshStandardMaterial color="#654321" roughness={0.7} />
        </mesh>
        
        {/* Crossbar */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[0.9, 0.1, 0.1]} />
          <meshStandardMaterial color="#765432" roughness={0.6} />
        </mesh>
        
        {/* Support bar */}
        <mesh position={[0, -0.5, -0.1]}>
          <boxGeometry args={[0.9, 0.1, 0.1]} />
          <meshStandardMaterial color="#765432" roughness={0.6} />
        </mesh>
        
        {/* Canvas holder */}
        <mesh position={[0, 1.2, -0.2]}>
          <boxGeometry args={[1, 0.1, 0.2]} />
          <meshStandardMaterial color="#876543" roughness={0.5} />
        </mesh>
      </group>
      
      {/* Paint palette on side */}
      <group position={[1.5, -1, 0]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
          <meshStandardMaterial color="#321" roughness={0.6} />
        </mesh>
        {/* Paint blobs */}
        <mesh position={[0.1, 0.1, 0.03]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#f9a8d4" roughness={0.9} />
        </mesh>
        <mesh position={[-0.1, -0.1, 0.03]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#93c5fd" roughness={0.9} />
        </mesh>
        <mesh position={[0.15, -0.05, 0.03]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#fca5a5" roughness={0.9} />
        </mesh>
      </group>
      
      {/* Paint brushes */}
      <group position={[1.8, -0.8, 0]} rotation={[0, 0, -0.3]}>
        <mesh>
          <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
          <meshStandardMaterial color="#654321" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.05, 0.08, 0.2, 8]} />
          <meshStandardMaterial color="#aaa" roughness={0.5} metalness={0.3} />
        </mesh>
      </group>
    </group>
  )
}
