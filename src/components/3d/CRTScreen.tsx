'use client'
import Desktop from '@/components/desktop/Desktop'
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

  const getScaleFactor = () => {
    const widthRatio = size.width / 1000
    const heightRatio = size.height / 600
    return Math.min(widthRatio, heightRatio) * 0.9
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
            background: '#000',
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
    waiting: new THREE.Vector3(-5, 5, 12), // Top-left angle, further away
    zoomed: new THREE.Vector3(0, 0, 6),
    zoomedIn: new THREE.Vector3(0, 0, 4.3)
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

export default function CRTScreen() {
  const [state, setState] = useState<AppState>('booting')
  const [showBootScreen, setShowBootScreen] = useState(true)
  const [interactionReady, setInteractionReady] = useState(false)
  const monitorRef = useRef<HTMLDivElement>(null)

  const playSound = (sound: 'startup' | 'click' | 'close') => {
    const audio = new Audio(`/sounds/${sound}.mp3`)
    audio.volume = 0.3
    audio.play().catch(e => console.log("Audio play failed:", e))
  }

  const handleBootComplete = () => {
    playSound('startup')
    setState('waiting')
    setTimeout(() => setShowBootScreen(false), 800)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && (state === 'zoomed' || state === 'zoomedIn')) {
      setState('waiting')
    } else if (state === 'waiting' && e.key !== 'Escape') {
      setState('zoomed')
      setInteractionReady(true)
    }
  }

  const handleClick = () => {
    if (state === 'waiting') {
      setState('zoomed')
      setInteractionReady(true)
    }
  }

  const handleScreenHover = (isHovering: boolean) => {
    if (interactionReady && (state === 'zoomed' || state === 'zoomedIn')) {
      setState(isHovering ? 'zoomedIn' : 'zoomed')
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('click', handleClick)
    }
  }, [state])

  return (
    <div className="w-full h-screen bg-[#f5f5f5] relative">
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
                ref={monitorRef}
                className="monitor-content w-full h-full"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => handleScreenHover(true)}
                onMouseLeave={() => handleScreenHover(false)}
              >
                <Desktop playSound={playSound} />
              </div>
            </MonitorModel>
          </Suspense>
        </Canvas>
      )}

      {showBootScreen && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <BootScreen onDone={handleBootComplete} />
        </div>
      )}

      {state === 'waiting' && !showBootScreen && (
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
          <div className="text-white text-sm mb-6 px-6 py-3 bg-black bg-opacity-50 rounded-lg backdrop-blur-sm animate-pulse">
            Press any key or click to zoom in • ESC to zoom out
          </div>
        </div>
      )}
    </div>
  )
}