'use client'
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { EngineModel, TruckModel } from './StandaloneModels'

export function ScrollModels() {
  const scroll = useScroll()
  const engineRef = useRef<THREE.Group>(null)
  const truckRef = useRef<THREE.Group>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useFrame((state) => {
    if (!isMounted || !scroll?.offset) return
    
    // Common bobbing animation
    const bob = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05
    
    if (engineRef.current) {
      const capgeminiProgress = THREE.MathUtils.clamp(
        (scroll.offset - 0.15) * 4, 0, 1
      )
      engineRef.current.position.x = THREE.MathUtils.lerp(-6, -2, capgeminiProgress)
      engineRef.current.position.y = THREE.MathUtils.lerp(0, 1, capgeminiProgress) + bob
      engineRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
      engineRef.current.visible = capgeminiProgress > 0 && capgeminiProgress < 1
    }

    if (truckRef.current) {
      const aramexProgress = THREE.MathUtils.clamp(
        (scroll.offset - 0.65) * 4, 0, 1
      )
      truckRef.current.position.x = THREE.MathUtils.lerp(6, 2, aramexProgress)
      truckRef.current.position.y = THREE.MathUtils.lerp(0, -1, aramexProgress) + bob
      truckRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
      truckRef.current.visible = aramexProgress > 0 && aramexProgress < 1
    }
  })

  if (!isMounted) return null

  return (
    <>
      <EngineModel ref={engineRef} />
      <TruckModel ref={truckRef} />
    </>
  )
}