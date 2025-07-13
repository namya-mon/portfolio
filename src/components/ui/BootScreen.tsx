// components/ui/BootScreen.tsx
'use client'
import { useEffect, useState } from 'react'

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [bootComplete, setBootComplete] = useState(false)

  const bootLines = [
    'Booting AymaneOS v3.0...',
    'Initializing system components...',
    'Loading kernel modules...',
    'Starting system services...',
    'Mounting filesystems...',
    'Launching desktop environment...',
    'System ready'
  ]

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (currentIndex >= bootLines.length) {
      setBootComplete(true)
      return
    }

    const line = bootLines[currentIndex]
    let charIndex = 0

    const typingInterval = setInterval(() => {
      if (charIndex <= line.length) {
        setCurrentLine(line.substring(0, charIndex))
        charIndex++
      } else {
        clearInterval(typingInterval)
        setLines(prev => [...prev, line])
        setCurrentLine('')
        setCurrentIndex(prev => prev + 1)
      }
    }, 30)

    return () => clearInterval(typingInterval)
  }, [currentIndex])

  useEffect(() => {
    if (!bootComplete) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onDone()
      }
    }

    const handleClick = () => {
      onDone()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('click', handleClick)
    }
  }, [bootComplete, onDone])

  return (
<div className="fixed inset-0 bg-black flex items-center justify-center w-screen h-screen">
      <div className="font-mono text-green-500 max-w-2xl mx-auto p-4">
        {lines.map((line, idx) => (
          <div key={idx} className="whitespace-pre">{line}</div>
        ))}
        <div className="whitespace-pre">
          {currentIndex < bootLines.length ? (
            <>
              {currentLine}
              <span className={`inline-block w-2 h-5 bg-green-500 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
            </>
          ) : (
            <div className="mt-4 text-green-400">
              Press any key to continue...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}