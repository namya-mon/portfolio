'use client'
import About from '@/components/sections/About'
import ArtGallery from '@/components/sections/ArtGallery'
import Experience from '@/components/sections/Experience'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import Loader from '@/components/ui/Loader'
import { usePortfolioMode } from '@/context/PortfolioMode'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'

// Dynamically import Canvas to avoid SSR
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
)


export default function Page() {
  const { mode } = usePortfolioMode()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      
      <main className="min-h-screen">
        <Hero />
        <About />
        <Suspense fallback={<Loader />}>
          {mode === 'software' ? (
            <>
              <Experience />
              <Projects />
            </>
          ) : (
            <ArtGallery />
          )}
        </Suspense>
      </main>

      
      
    </>
  )
}