// components/ui/UnderConstructionTape.tsx
'use client'

interface UnderConstructionTapeProps {
  text: string
  position?: 'top' | 'top-right' | 'top-left' | 'middle'
  angle?: number
}

export default function UnderConstructionTape({ 
  text, 
  position = 'top',
  angle = -5
}: UnderConstructionTapeProps) {
  const positionClasses = {
    'top': 'top-0 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-2 right-0',
    'top-left': 'top-2 left-0',
    'middle': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  }

  return (
    <div 
      className={`absolute ${positionClasses[position]} px-4 py-1 bg-yellow-400 text-black font-bold text-xs z-10 shadow-md`}
      style={{ transform: `rotate(${angle}deg)` }}
    >
      {text}
    </div>
  )
}