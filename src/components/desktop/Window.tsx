'use client'
import { HTMLAttributes, useEffect, useState } from 'react'

interface WindowProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  children: React.ReactNode
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  position: { x: number; y: number }
  size: { width: number; height: number }
  onPositionChange?: (position: { x: number; y: number }) => void
}

export default function Window({
  title,
  children,
  isActive,
  onClose,
  onMinimize,
  onFocus,
  position,
  size,
  onPositionChange,
  ...props
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [windowPosition, setWindowPosition] = useState(position)

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.classList.contains('window-title-bar')) {
      setIsDragging(true)
      setDragOffset({
        x: e.clientX - windowPosition.x,
        y: e.clientY - windowPosition.y
      })
      onFocus()
      e.stopPropagation()
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    
    const newPos = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    }
    
    setWindowPosition(newPos)
    if (onPositionChange) onPositionChange(newPos)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  useEffect(() => {
    setWindowPosition(position)
  }, [position])

  return (
    <div
      {...props}
      className={`absolute border-2 ${isActive ? 'border-gray-300' : 'border-gray-500'} bg-gray-200 shadow-lg`}
      style={{
        left: `${windowPosition.x}px`,
        top: `${windowPosition.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: isActive ? 100 : 90,
        boxShadow: `
          inset -1px -1px #0a0a0a,
          inset 1px 1px #dfdfdf,
          inset -2px -2px #808080,
          inset 2px 2px #ffffff
        `,
        fontFamily: '"Press Start 2P", cursive'
      }}
    >
      <div 
        className={`flex items-center justify-between px-2 h-6 ${isActive ? 'bg-blue-800' : 'bg-gray-500'} text-white cursor-move window-title-bar`}
        onMouseDown={handleMouseDown}
      >
        <div className="font-bold text-xs">{title}</div>
        <div className="flex gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize() }}
            className="w-4 h-4 flex items-center justify-center bg-gray-200 border-2 border-t-gray-300 border-l-gray-300 border-r-gray-600 border-b-gray-600"
          >
            <span className="mb-0.5">-</span>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose() }}
            className="w-4 h-4 flex items-center justify-center bg-gray-200 border-2 border-t-gray-300 border-l-gray-300 border-r-gray-600 border-b-gray-600"
          >
            <span className="mb-1">×</span>
          </button>
        </div>
      </div>
      
      <div className="p-2 h-[calc(100%-24px)] overflow-auto bg-white">
        {children}
      </div>
    </div>
  )
}