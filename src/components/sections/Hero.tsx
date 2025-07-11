'use client'
import { usePortfolioMode } from '@/context/PortfolioMode'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import CanvasArt from '../3d/CanvasArt'
import Computer from '../3d/Computer'

export default function Hero() {
  const [isArtMode, setIsArtMode] = useState(false)
  const { mode, toggleMode } = usePortfolioMode()
  const aboutSectionRef = useRef<HTMLElement | null>(null)

  const handleToggle = () => {
    const newMode = !isArtMode
    setIsArtMode(newMode)
    toggleMode()
  }

  const scrollToAbout = () => {
  const aboutSection = document.getElementById('about')
  if (aboutSection) {
    const startPosition = window.pageYOffset
    const targetPosition = aboutSection.getBoundingClientRect().top
    const distance = targetPosition - 100 // Adjust offset if needed
    const duration = 1000 // milliseconds
    let startTime: number | null = null

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    // Easing function
    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2
      if (t < 1) return c / 2 * t * t + b
      t--
      return -c / 2 * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }
}
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Toggle Button - Moved to bottom right */}
      <button 
        onClick={handleToggle}
        className="absolute bottom-8 right-8 z-20 px-6 py-3 bg-white/90 text-gray-900 rounded-full shadow-lg hover:bg-white transition-all font-medium text-lg backdrop-blur-sm border border-white/30">
        {mode === 'art' ? '👨‍💻 Switch to Developer Mode' : '🎨 Switch to Artist Mode'}
      </button>
      <a
        href="/documents/CV Aymane Lamssaqui.pdf"
        download="Aymane_Lamssaqui_CV.pdf"
        className="absolute bottom-8 left-8 z-20 px-6 py-3 bg-white/90 text-gray-900 rounded-full shadow-lg hover:bg-white transition-all font-medium text-lg backdrop-blur-sm border border-white/30 flex items-center gap-2">
        <span>📄 Download CV</span>
      </a>

      {/* 3D Canvas - Adjusted for better visibility */}
      <Canvas
        camera={{ position: [0, 0, mode === 'art' ? 16 : 14], fov: 45 }}
        className="bg-gradient-to-b from-purple-50/90 via-pink-50/90 to-orange-50/90"
      >
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#f9a8d4" />
        <pointLight position={[-10, 5, -5]} intensity={0.8} color="#93c5fd" />
        <pointLight position={[0, -10, 5]} intensity={0.5} color="#a5b4fc" />
        
        {mode === 'art' ? (
          <CanvasArt scale={1.5} position={[0, -0.5, 0]} />
        ) : (
          <Computer scale={1.2} position={[0, -1, 0]} />
        )}
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.5}
          minDistance={mode === 'art' ? 12 : 10}
          maxDistance={mode === 'art' ? 20 : 18}
        />
        <Environment preset={mode === 'art' ? "sunset" : "dawn"} />
      </Canvas>

      {/* Text Content - Adjusted for better visibility */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10"
      >
        <div className="bg-white/70 p-8 rounded-xl shadow-lg max-w-2xl backdrop-blur-sm border border-white/30 mb-16 mx-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Aymane Lamssaqui
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 mb-6">
            {mode === 'art' ? 'Digital Artist & Creative Mind' : 'Full-Stack Developer & Engineer'}
          </p>
          <p className="text-lg text-gray-700">
            {mode === 'art' ? 
              'Bridging technology and artistic expression' : 
              'Building innovative digital solutions'
            }
          </p>
        </div>
        <motion.button 
        onClick={scrollToAbout}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-white text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full backdrop-blur-sm shadow-lg cursor-pointer pointer-events-auto hover:from-purple-600 hover:to-pink-600 transition-colors"
      >
        Scroll to explore ↓
      </motion.button>
      </motion.div>
    </section>
  )
}