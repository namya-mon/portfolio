'use client'
import CRTScreen from '@/components/3d/CRTScreen'
import About from '@/components/sections/About'
import ArtGallery from '@/components/sections/ArtGallery'
import Experience from '@/components/sections/Experience'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import Loader from '@/components/ui/Loader'
import { usePortfolioMode } from '@/context/PortfolioMode'
import { Suspense, useEffect, useState } from 'react'

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      <CRTScreen>
        <MainContent />
      </CRTScreen>
    </>
  )
}

function MainContent() {
  const { mode } = usePortfolioMode()
  return (
    <main className="min-h-screen w-full">
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
  )
}
