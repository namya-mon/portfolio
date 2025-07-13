'use client'
import BootScreen from '@/components/ui/BootScreen'
import { PortfolioModeProvider } from '@/context/PortfolioMode'
import { Environment, Html, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

type AppState = 'booting' | 'waiting' | 'zoomed' | 'zoomedIn'

function MonitorModel({ children, zoomed }: { 
  children: React.ReactNode, 
  zoomed: boolean
}) {
  const { scene, nodes } = useGLTF('/models/monitor.glb') as any
  const group = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.Group>(null)
  const { size } = useThree()
  const [screenSize, setScreenSize] = useState<[number, number]>([16, 9])

  useEffect(() => {
    const screenMesh = Object.values(nodes).find(
      (node: any) => node.isMesh && node.name.toLowerCase().includes('screen')
    ) as THREE.Mesh | undefined

    if (screenMesh) {
      const box = new THREE.Box3().setFromObject(screenMesh)
      const vec = new THREE.Vector3()
      box.getSize(vec)
      setScreenSize([vec.x, vec.y])
      screenMesh.visible = false
    }
  }, [nodes])

  // ✅ Responsive monitor scaling based on both width and height
  const getScaleFactor = () => {
    const widthRatio = size.width / 1000
    const heightRatio = size.height / 600
    return Math.min(widthRatio, heightRatio) * 0.9 // 0.9 adds some padding
  }

  const scaleFactor = getScaleFactor()

     return (
    <group ref={group} scale={[scaleFactor, scaleFactor, scaleFactor]} position={[0, -1.5, 0]}>
      <primitive object={scene} />
      <group ref={screenRef} position={[0, 1.46, -0.263]} rotation={[0, 0, 0]}>
        <Html
          transform
          distanceFactor={1}
          style={{
            width: `${screenSize[0] * 94}px`,
            height: `${screenSize[1] * 84}px`,
            overflow: 'hidden',
            background: '#000', // Ensures black background
            borderRadius: '8px',
          }}
          className="w-full h-full"
          center
        >
          <div className="w-full h-full crt-effect">
            <PortfolioModeProvider>
              <div className="w-full h-full overflow-y-auto scrollbar-hide">
                {children || <div className="w-full h-full bg-black" />}
              </div>
            </PortfolioModeProvider>
          </div>
        </Html>
      </group>
    </group>
  )
}

function CameraController({ 
  state,
  onZoomComplete,
}: { 
  state: Exclude<AppState, 'booting'>,
  onZoomComplete: () => void,
}) {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const targetPosition = useRef(new THREE.Vector3())
  const currentPosition = useRef(new THREE.Vector3())

  const cameraPositions = {
    waiting: new THREE.Vector3(0, 0, 9),
    zoomed: new THREE.Vector3(0, 0,6),
    zoomedIn: new THREE.Vector3(0, 0,4.3)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    targetPosition.current.copy(cameraPositions[state])
    const factor = state === 'waiting' ? 0.7 : state === 'zoomed' ? 0.4 : 0.1
    targetPosition.current.x += mouse.current.x * factor
    targetPosition.current.y += mouse.current.y * factor * 0.5

    currentPosition.current.lerp(targetPosition.current, 0.1)
    camera.position.copy(currentPosition.current)
    camera.lookAt(0, 0, 0)

    if (state === 'zoomed' && currentPosition.current.distanceTo(targetPosition.current) < 0.05) {
      onZoomComplete()
    }
  })

  return null
}

export default function CRTScreen({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>('booting')
  const [showBootScreen, setShowBootScreen] = useState(true)
  const [interactionReady, setInteractionReady] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const monitorRef = useRef<HTMLDivElement>(null)


  const handleBootComplete = () => {
    setState('waiting')
    setContentVisible(true)
    setTimeout(() => setShowBootScreen(false), 800)
  }


  const handleClick = (e: React.MouseEvent) => {
    // Check if click was inside the monitor
    const isClickInsideMonitor = monitorRef.current?.contains(e.target as Node)
    
    if (state === 'waiting' && !isClickInsideMonitor) {
      // Click outside monitor - zoom in
      setState('zoomed')
      setInteractionReady(true)
    } else if ((state === 'zoomed' || state === 'zoomedIn') && isClickInsideMonitor) {
      // Click inside monitor - zoom out
      setState('waiting')
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && (state === 'zoomed' || state === 'zoomedIn')) {
      setState('waiting')
    }
  }

  const handleScreenHover = (isHovering: boolean) => {
    if (interactionReady && (state === 'zoomed' || state === 'zoomedIn')) {
      setState(isHovering ? 'zoomedIn' : 'zoomed')
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [state])

  
  return (
    <div className="w-full h-screen bg-[#f5f5f5] relative" onClick={handleClick}>
      {/* Only show Canvas and MonitorModel after boot */}
      {!showBootScreen && (
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <Environment preset="apartment" />

            {state !== 'booting' && (
              <CameraController 
                state={state} 
                onZoomComplete={() => setInteractionReady(true)}
              />
            )}

            <MonitorModel zoomed={state === 'zoomedIn'}>
              <div 
                ref={monitorRef} // Add ref to monitor content
                onMouseEnter={() => handleScreenHover(true)}
                onMouseLeave={() => handleScreenHover(false)}
                className="w-full h-full"
                onClick={(e) => e.stopPropagation()} // Prevent event bubbling
              >
                {children}
              </div>
            </MonitorModel>
          </Suspense>
        </Canvas>
      )}

      {/* Fullscreen boot overlay - only this should be visible during boot */}
      {showBootScreen && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <BootScreen onDone={handleBootComplete} />
        </div>
      )}

      {/* Click to zoom prompt */}
      {state === 'waiting' && !showBootScreen && (
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
          <div className="text-white text-sm mb-6 px-6 py-3 bg-black bg-opacity-50 rounded-lg backdrop-blur-sm animate-pulse">
            Click to zoom in • ESC to zoom out
          </div>
        </div>
      )}
    </div>
  )
}
