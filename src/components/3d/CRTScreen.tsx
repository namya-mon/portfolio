'use client'
import Desktop from '@/components/desktop/Desktop'
import BootScreen from '@/components/ui/BootScreen'
import { PortfolioModeProvider } from '@/context/PortfolioMode'
import { Environment, Html, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import Clock from '../ui/Clock'

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
    // Calculate based on viewport dimensions
    const targetWidth = size.width * 0.9 // 90% of viewport width
    const targetHeight = size.height * 0.9 // 90% of viewport height
    const baseWidth = 1200 // Base content width
    const baseHeight = 800 // Base content height
    
    // Calculate scale needed to fit either width or height
    const widthScale = targetWidth / baseWidth
    const heightScale = targetHeight / baseHeight
    
    // Use the smaller scale to ensure content fits entirely
    return Math.min(widthScale, heightScale) * (zoomed ? 1 : 0.8)
  }

  const scaleFactor = getScaleFactor()

  return (
    <group ref={group} scale={[scaleFactor, scaleFactor, scaleFactor]} position={[0, -1.5, 0]}>
      <primitive object={scene} />
      <group ref={screenRef} position={[0, 1.45, -0.263]} rotation={[0, 0, 0]}>
        <Html
          transform
          distanceFactor={1}
          style={{
            width: `${screenSize[0] * 95}px`,
            height: `${screenSize[1] * 85}px`,
            overflow: 'hidden',
            background: '#000',
            borderRadius: '15px',
          }}
          className="w-full h-full"
          center
        >
          <div className="w-full h-full crt-effect">
            <PortfolioModeProvider>
              <div className="w-full h-full overflow-hidden">
                {children}
              </div>
            </PortfolioModeProvider>
          </div>
        </Html>
      </group>
    </group>
  )
}

// Updated CRTScreen.tsx (partial changes)
function CameraController({ 
  state,
  onZoomComplete,
}: { 
  state: Exclude<AppState, 'booting'>,
  onZoomComplete: () => void,
}) {
  const { camera, size } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const targetPosition = useRef(new THREE.Vector3())
  const currentPosition = useRef(new THREE.Vector3())

  // Adjusted camera positions
  const cameraPositions = {
    waiting: new THREE.Vector3(-10, 5, 15),
    zoomed: new THREE.Vector3(0, 0, 6),
    zoomedIn: new THREE.Vector3(0, 0, 3)
  }

  // Adjust for mobile devices
  const getYOffset = () => {
    return size.height > size.width ? -2 : 0 // Lower camera for vertical monitors
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
    
    // Apply long ass vertical monitors offset
    if (state === 'waiting') {
      targetPosition.current.y += getYOffset()
    }
    
    targetPosition.current.x += mouse.current.x * factor
    targetPosition.current.y += mouse.current.y * factor * 0.5

    currentPosition.current.lerp(targetPosition.current, 0.1)
    camera.position.copy(currentPosition.current)
    camera.lookAt(0, getYOffset() * 0.5, 0) // Adjust look-at for vertical monitors

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
  const [isMuted, setIsMuted] = useState(false)
  const monitorRef = useRef<HTMLDivElement>(null)
  const ambientSoundRef = useRef<HTMLAudioElement | null>(null)
  
  // State that needs to be preserved
  const [desktopState, setDesktopState] = useState({
    windows: [
      { 
        id: 'portfolio', 
        isOpen: true, 
        isMinimized: false,
        position: { x: 110, y: 15 }
      }
    ],
    activeWindow: 'portfolio',
    showStartMenu: false,
    activeTab: 'home'
  })

  const playSound = (sound: 'startup' | 'click' | 'close') => {
    if (isMuted) return
    const audio = new Audio(`/sounds/${sound}.wav`)
    audio.volume = 0.3
    audio.play().catch(e => console.log("Audio play failed:", e))
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (ambientSoundRef.current) {
      ambientSoundRef.current.volume = isMuted ? 0.2 : 0
    }
  }

  // Initialize ambient sound only once
  useEffect(() => {
    if (!showBootScreen && state !== 'booting' && !ambientSoundRef.current) {
      ambientSoundRef.current = new Audio('/sounds/ambient.wav')
      ambientSoundRef.current.loop = true
      ambientSoundRef.current.volume = isMuted ? 0 : 0.2
      ambientSoundRef.current.play().catch(e => console.log("Ambient audio play failed:", e))
    }

    return () => {
      // Don't clean up the sound unless unmounting
    }
  }, [showBootScreen, state, isMuted])

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
    <div className="w-full h-screen bg-[#f5f5f5] relative overflow-hidden">
      {/* Corner Info Display and Mute Button */}
      {!showBootScreen && (
        <>
          <button
            onClick={toggleMute}
            className="absolute top-6 left-6 z-10 p-2 text-black hover:text-gray-600 transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            )}
          </button>

          <div className="absolute top-6 right-6 z-10 text-right pointer-events-none">
            <div className="text-black">
              <div className="text-xl font-medium">Aymane Lamssaqui</div>
              <div className="text-sm text-gray-600">Software Engineer</div>
              <div className="text-sm text-black-600 font-medium"><Clock /></div>
            </div>
          </div>
        </>
      )}

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
                className="monitor-content w-full h-full crt-effect"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => handleScreenHover(true)}
                onMouseLeave={() => handleScreenHover(false)}
              >
                <PortfolioModeProvider>
                  <Desktop 
                    playSound={playSound} 
                    isMuted={isMuted} 
                    toggleMute={toggleMute}
                    desktopState={desktopState}
                    setDesktopState={setDesktopState}
                  />
                </PortfolioModeProvider>
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