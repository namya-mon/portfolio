'use client'
import { useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import ModelLoader from '../ui/Loader'

export default function Computer(props: any) {
  const group = useRef<any>(null)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.x = Math.sin(t / 4) / 8
      group.current.rotation.y = Math.sin(t / 4) / 8
      group.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
    }
  })

  return (
    <Suspense fallback={<ModelLoader />}>
      <group ref={group} {...props} scale={[2, 2, 2]}>
        {/* Monitor */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[2, 1.5, 0.1]} />
          <meshStandardMaterial color="#333" metalness={0.3} roughness={0.7} />
          
          {/* Screen Bezel */}
          <mesh position={[0, 0, 0.051]}>
            <boxGeometry args={[1.95, 1.45, 0.01]} />
            <meshStandardMaterial color="#111" />
          </mesh>
          
          {/* Screen content */}
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[1.9, 1.4]} />
            <meshStandardMaterial 
              color="#007acc" 
              emissive="#007acc" 
              emissiveIntensity={0.8}
              metalness={0.2}
              roughness={0.1}
            />
          </mesh>
          
          {/* Webcam */}
          <mesh position={[0, 0.65, 0.055]}>
            <circleGeometry args={[0.03, 16]} />
            <meshStandardMaterial color="#000" />
          </mesh>
        </mesh>
        
        {/* Monitor Stand */}
        <group position={[0, -0.8, 0]}>
          {/* Neck */}
          <mesh position={[0, 0, -0.2]}>
            <cylinderGeometry args={[0.1, 0.15, 0.5, 8]} />
            <meshStandardMaterial color="#555" metalness={0.4} />
          </mesh>
          
          {/* Base */}
          <mesh position={[0, -0.25, -0.5]}>
            <boxGeometry args={[0.5, 0.1, 0.3]} />
            <meshStandardMaterial color="#444" metalness={0.4} />
          </mesh>
          
          {/* Weight */}
          <mesh position={[0, -0.3, -0.5]}>
            <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
            <meshStandardMaterial color="#333" metalness={0.5} roughness={0.6} />
          </mesh>
        </group>
        
        {/* Keyboard */}
        <group position={[0, -1.2, 0.8]} rotation={[0.2, 0, 0]}>
          {/* Base */}
          <mesh>
            <boxGeometry args={[1.8, 0.1, 0.6]} />
            <meshStandardMaterial color="#222" metalness={0.3} roughness={0.8} />
          </mesh>
          
          {/* Keys */}
          <group position={[0, 0.06, 0]}>
            {[...Array(5)].map((_, row) => (
              [...Array(15)].map((_, col) => (
                <mesh
                  key={`key-${row}-${col}`}
                  position={[
                    -0.8 + (col * 0.12),
                    0,
                    -0.25 + (row * 0.12)
                  ]}
                >
                  <boxGeometry args={[0.1, 0.05, 0.1]} />
                  <meshStandardMaterial 
                    color={col === 14 ? "#f00" : "#444"} 
                    metalness={0.2}
                    roughness={0.5}
                  />
                </mesh>
              ))
            ))}
            
            {/* Spacebar */}
            <mesh position={[0, 0, 0.35]}>
              <boxGeometry args={[0.8, 0.03, 0.2]} />
              <meshStandardMaterial color="#333" metalness={0.3} />
            </mesh>
          </group>
        </group>
        
        {/* Mouse - Position adjusted further right and forward */}
        <group position={[1.2, -1.15, 0.9]} rotation={[0, -0.3, 0]}>
          {/* Body - Changed to rounded box for better shape */}
          <mesh>
            <boxGeometry args={[0.3, 0.15, 0.4]} />
            <meshStandardMaterial color="#222" metalness={0.4} roughness={0.6} />
          </mesh>
          
          {/* Top surface - Replaced the problematic circle */}
          <mesh position={[0, 0.075, 0.1]} rotation={[-0.2, 0, 0]}>
            <boxGeometry args={[0.28, 0.01, 0.35]} />
            <meshStandardMaterial color="#333" metalness={0.5} roughness={0.4} />
          </mesh>
          
          {/* Buttons */}
          <group position={[0, 0.08, 0.15]}>
            <mesh rotation={[-0.3, 0, 0]}>
              <boxGeometry args={[0.2, 0.02, 0.1]} />
              <meshStandardMaterial color="#333" metalness={0.5} />
            </mesh>
            <mesh position={[0, 0, -0.1]} rotation={[-0.1, 0, 0]}>
              <boxGeometry args={[0.2, 0.02, 0.1]} />
              <meshStandardMaterial color="#333" metalness={0.5} />
            </mesh>
          </group>
          
          {/* Scroll wheel */}
          <mesh position={[0, 0.07, 0]} rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[0.03, 0.01, 16, 32]} />
            <meshStandardMaterial color="#555" metalness={0.8} />
          </mesh>
          
          {/* Side buttons */}
          <mesh position={[-0.18, 0.02, 0.1]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.02, 0.08, 0.05]} />
            <meshStandardMaterial color="#333" metalness={0.5} />
          </mesh>
          
          {/* Bottom surface - flat rectangle instead of circle */}
          <mesh position={[0, -0.075, 0]} rotation={[Math.PI, 0, 0]}>
            <planeGeometry args={[0.25, 0.35]} />
            <meshStandardMaterial color="#111" metalness={0.2} roughness={0.8} />
          </mesh>
        </group>
      </group>
    </Suspense>
  )
}