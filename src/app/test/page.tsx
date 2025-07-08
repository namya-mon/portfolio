'use client'
import { useEffect } from 'react'

export default function TestPage() {
  useEffect(() => {
    async function testLoad() {
      try {
        const response = await fetch('/models/computer.glb')
        console.log('Model fetch response:', response.status)
        if (response.ok) {
          const data = await response.arrayBuffer()
          console.log('Model size:', data.byteLength, 'bytes')
        } else {
          console.error('Failed to fetch model:', response.statusText)
        }
      } catch (error) {
        console.error('Fetch error:', error)
      }
    }
    testLoad()
  }, [])

  return (
    <div className="p-8">
      <h1>Model Test Page</h1>
      <p>Check browser console for model loading results.</p>
    </div>
  )
}