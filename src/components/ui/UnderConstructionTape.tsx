// src/components/ui/UnderConstructionTape.tsx
'use client'

interface UnderConstructionTapeProps {
  text?: string
  angle?: number
  width?: string
  stickyEnds?: boolean
  className?: string
  position?: 'top' | 'middle' | 'bottom'
}

export default function UnderConstructionTape({ 
  text = "UNDER CONSTRUCTION",
  angle = -4,
  width = "w-[140%]",
  stickyEnds = true,
  className = "",
  position = 'top'
}: UnderConstructionTapeProps) {
  const positionClasses = {
    top: "top-4",
    middle: "top-1/2 -translate-y-1/2",
    bottom: "bottom-4"
  }

  return (
    <div className={`absolute ${positionClasses[position]} left-0 ${width} z-20 pointer-events-none overflow-visible ${className}`}
      style={{ transform: `rotate(${angle}deg) translateX(-10%)` }}
    >
      <div className="relative bg-yellow-300 text-black font-bold text-center py-2 px-8 shadow-sm border-y-2 border-yellow-400/70">
        <span className="whitespace-nowrap flex items-center justify-center gap-2 font-mono text-sm tracking-tighter">
          <span className="text-red-500">⚠</span> {text} <span className="text-red-500">⚠</span>
        </span>
        
        {/* Tape texture */}
        <div className="absolute inset-0 opacity-20 mix-blend-multiply"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 5px,
              rgba(0,0,0,0.1) 5px,
              rgba(0,0,0,0.1) 10px
            )`
          }}
        />

        {/* Left dangling end */}
        {stickyEnds && (
          <div className="absolute left-0 top-1/2 w-6 h-8 bg-yellow-400 transform -translate-y-1/2 -translate-x-1/2 rotate-45"
            style={{
              clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)'
            }}
          />
        )}
        
        {/* Right dangling end */}
        {stickyEnds && (
          <div className="absolute right-0 top-1/2 w-6 h-8 bg-yellow-400 transform -translate-y-1/2 translate-x-1/2 -rotate-45"
            style={{
              clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)'
            }}
          />
        )}
      </div>
    </div>
  )
}