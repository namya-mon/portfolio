// components/ui/BootScreen.tsx
'use client'
import { useEffect, useState } from 'react'

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [bootComplete, setBootComplete] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showPressStart, setShowPressStart] = useState(false)

  const bootLines = [
    'AymaneOS HSP v3.0 (C) 1998 Aymane Lamssaqui Inc.',
    'Checking RAM = 14000 OK',
    'Initializing system components...',
    'Loading kernel modules...',
    'Starting system services...',
    'Mounting filesystems...',
    'Loading resources (18/19)...',
    'Loaded ctType ... 50%',
    'Loaded moxidDown ... 10%',
    'Loaded keyboardKeydown2 ... 60%',
    'Loaded keyboardKeydown6 ... 74%',
    'Loaded moxidUp ... 70%',
    'Loaded keyboardKeydown5 ... 80%',
    'Loaded keyboardKeydown6 ... 95%',
    'Loaded startup ...',
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
      setTimeout(() => {
        setShowWelcome(true)
        setTimeout(() => {
          setShowPressStart(true)
        }, 1500)
      }, 500)
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
    }, currentIndex < 2 ? 10 : 30) // Faster typing for first few lines

    return () => clearInterval(typingInterval)
  }, [currentIndex])

  useEffect(() => {
    if (!showPressStart) return

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
  }, [showPressStart, onDone])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center w-screen h-screen">
      {!showWelcome ? (
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
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-white text-3xl font-bold mb-8 animate-fade-in">
            Aymane Lamssaqui Portfolio Showcase
          </div>
          {showPressStart && (
            <div className="text-green-500 text-xl animate-pulse">
              Press any key to begin
            </div>
          )}
        </div>
      )}
    </div>
  )
}