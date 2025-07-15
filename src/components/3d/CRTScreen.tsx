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
      <group ref={screenRef} position={[0, 1.45, -0.263]} rotation={[0, 0, 0]}>
        <Html
          transform
          distanceFactor={1}
          style={{
            width: `${screenSize[0] * 94}px`,
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
    waiting: new THREE.Vector3(-10 , 5, 15), // Top-left angle, further away
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

export default function CRTScreen({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>('booting')
  const [showBootScreen, setShowBootScreen] = useState(true)
  const [interactionReady, setInteractionReady] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const monitorRef = useRef<HTMLDivElement>(null)
  const ambientSoundRef = useRef<HTMLAudioElement | null>(null)
  const timeIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Time updater - optimized to only update when minute changes
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formattedTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
      setCurrentTime(formattedTime)
    }

    // Calculate time until next minute
    const now = new Date()
    const secondsUntilNextMinute = 60 - now.getSeconds()
    
    // Initial update
    updateTime()
    
    // Set timeout for next minute change
    const initialTimeout = setTimeout(() => {
      updateTime()
      // Then set regular interval
      timeIntervalRef.current = setInterval(updateTime, 60000)
    }, secondsUntilNextMinute * 1000)

    return () => {
      clearTimeout(initialTimeout)
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current)
      }
    }
  }, [])

  const playSound = (sound: 'startup' | 'click' | 'close') => {
    if (isMuted) return
    const audio = new Audio(`/sounds/${sound}.wav`)
    audio.volume = 0.3
    audio.play().catch(e => console.log("Audio play failed:", e))
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (ambientSoundRef.current) {
      if (!isMuted) {
        ambientSoundRef.current.pause()
      } else {
        ambientSoundRef.current.play().catch(e => console.log("Ambient audio play failed:", e))
      }
    }
  }

  useEffect(() => {
    if (!showBootScreen && state !== 'booting') {
      ambientSoundRef.current = new Audio('/sounds/ambient.wav')
      ambientSoundRef.current.loop = true
      ambientSoundRef.current.volume = 0.2
      
      if (!isMuted) {
        ambientSoundRef.current.play().catch(e => console.log("Ambient audio play failed:", e))
      }
    }

    return () => {
      if (ambientSoundRef.current) {
        ambientSoundRef.current.pause()
        ambientSoundRef.current = null
      }
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

  const handleWheel = (e: WheelEvent) => {
    const monitorContent = monitorRef.current;
    if (monitorContent && monitorContent.contains(e.target as Node)) {
      const contentArea = monitorContent.querySelector('.window-content-area');
      if (contentArea) {
        contentArea.scrollTop += e.deltaY;
        e.preventDefault();
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('click', handleClick)
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [state])

  return (
    <div className="w-full h-screen bg-[#f5f5f5] relative overflow-hidden">
      {/* Corner Info Display and Mute Button */}
      {!showBootScreen && (
        <>
          {/* Mute Button - Top Left */}
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

          {/* Corner Info - Top Right */}
          <div className="absolute top-6 right-6 z-10 text-right pointer-events-none">
            <div className="text-black">
              <div className="text-xl font-medium">Aymane Lamssaqui</div>
              <div className="text-sm text-gray-600">Software Engineer</div>
              <div className="text-xs text-gray-500 mt-1">{currentTime}</div>
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
                className="monitor-content w-full h-full"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => handleScreenHover(true)}
                onMouseLeave={() => handleScreenHover(false)}
              >
                <Desktop playSound={playSound} isMuted={isMuted} toggleMute={toggleMute} />
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