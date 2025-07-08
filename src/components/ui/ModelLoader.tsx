'use client'
import { Html, useProgress } from '@react-three/drei'

export function ModelLoader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="bg-white/90 p-4 rounded-lg shadow-xl border border-gray-200">
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-400 to-orange-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-gray-700 font-medium">
          Loading model... {Math.round(progress)}%
        </p>
      </div>
    </Html>
  )
}