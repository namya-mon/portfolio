'use client'
import { createContext, useContext, useState, useEffect } from 'react'

type PortfolioMode = 'software' | 'art'

interface PortfolioModeContextType {
  mode: PortfolioMode
  toggleMode: () => void
}

const PortfolioModeContext = createContext<PortfolioModeContextType | null>(null)

export function PortfolioModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PortfolioMode>('software')
  
  useEffect(() => {
    // Initialize from localStorage if available
    const savedMode = localStorage.getItem('portfolioMode') as PortfolioMode | null
    if (savedMode) setMode(savedMode)
  }, [])

  const toggleMode = () => {
    const newMode = mode === 'software' ? 'art' : 'software'
    setMode(newMode)
    localStorage.setItem('portfolioMode', newMode)
  }

  return (
    <PortfolioModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </PortfolioModeContext.Provider>
  )
}

export const usePortfolioMode = () => {
  const context = useContext(PortfolioModeContext)
  if (!context) {
    throw new Error('usePortfolioMode must be used within PortfolioModeProvider')
  }
  return context
}