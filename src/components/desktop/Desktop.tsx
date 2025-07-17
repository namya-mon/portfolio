// Desktop.tsx
'use client'
import Window from '@/components/desktop/Window'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import { useRef } from 'react'
import Clock from '../ui/Clock'
import { Icon } from '../ui/Icones'

interface DesktopProps {
  playSound: (sound: 'startup' | 'click' | 'close') => void
  isMuted: boolean
  toggleMute: () => void
  desktopState: {
    windows: {
      id: string
      isOpen: boolean
      isMinimized: boolean
      position: { x: number; y: number }
    }[]
    activeWindow: string
    showStartMenu: boolean
    activeTab: string
  }
  setDesktopState: React.Dispatch<React.SetStateAction<{
    windows: {
      id: string
      isOpen: boolean
      isMinimized: boolean
      position: { x: number; y: number }
    }[]
    activeWindow: string
    showStartMenu: boolean
    activeTab: string
  }>>
}

export default function Desktop({ playSound, isMuted, toggleMute, desktopState, setDesktopState }: DesktopProps) {
  const { windows, activeWindow, showStartMenu, activeTab } = desktopState
  const timeIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const desktopIcons = [
    { id: 'portfolio', title: 'Portfolio.exe', icon: '📁' },
    { id: 'about', title: 'About.txt', icon: '📄' },
    { id: 'experience', title: 'Experience.doc', icon: '📑' },
    { id: 'contact', title: 'Contact.com', icon: '✉️' },
    { id: 'projects', title: 'Projects.fld', icon: '🗂️' }
  ]

  const openWindow = (id: string) => {
    playSound('click')
    setDesktopState(prev => {
      const existingWindow = prev.windows.find(w => w.id === id)
      
      if (!existingWindow) {
        return {
          ...prev,
          activeWindow: id,
          windows: [
            ...prev.windows,
            { 
              id, 
              isOpen: true, 
              isMinimized: false,
              position: { 
                x: 100 + prev.windows.length * 20, 
                y: 30 + prev.windows.length * 20 
              }
            }
          ]
        }
      }
      return { ...prev, activeWindow: id }
    })
  }

  const closeWindow = (id: string) => {
    playSound('close')
    setDesktopState(prev => ({
      ...prev,
      windows: prev.windows.filter(w => w.id !== id),
      activeWindow: prev.activeWindow === id ? 
        (prev.windows.length > 1 ? prev.windows[0].id : '') : 
        prev.activeWindow
    }))
  }

  const minimizeWindow = (id: string) => {
    playSound('click')
    setDesktopState(prev => ({
      ...prev,
      windows: prev.windows.map(w => 
        w.id === id ? {...w, isMinimized: true} : w
      )
    }))
  }

  const restoreWindow = (id: string) => {
    playSound('click')
    setDesktopState(prev => ({
      ...prev,
      activeWindow: id,
      windows: prev.windows.map(w => 
        w.id === id ? {...w, isMinimized: false} : w
      )
    }))
  }

  const updateWindowPosition = (id: string, position: { x: number, y: number }) => {
    setDesktopState(prev => ({
      ...prev,
      windows: prev.windows.map(w => 
        w.id === id ? {...w, position} : w
      )
    }))
  }

  const openCV = () => {
    playSound('click')
    window.open('/documents/CV Aymane Lamssaqui.pdf', '_blank')
    setDesktopState(prev => ({ ...prev, showStartMenu: false }))
  }

  const shutdown = () => {
    playSound('close')
    window.location.reload()
  }

  const getWindowContent = (id: string) => {
    if (id === 'portfolio') {
      return <PortfolioContent />
    }
    switch(id) {
      case 'about': return <About />
      case 'experience': return <Experience />
      case 'projects': return <Projects />
      case 'contact': return <Contact />
      default: return null
    }
  }

  const PortfolioContent = () => {
    return (
      <div className="w-full h-full flex">
        <div className="w-48 bg-gray-200 border-r border-gray-400 p-2 flex flex-col">
          <div className="p-2 mb-4 bg-blue-600 text-white font-bold text-center">
            Navigation
          </div>
          {['home', 'about', 'experience', 'projects', 'contact'].map(tab => (
            <button
              key={tab}
              onClick={() => {
                setDesktopState(prev => ({ ...prev, activeTab: tab }))
                playSound('click')
              }}
              className={`w-full text-left px-4 py-2 mb-1 flex items-center ${activeTab === tab ? 
                'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-300'}`}
            >
              <span className="mr-2 text-lg">
                {tab === 'home' ? '🏠' : 
                 tab === 'about' ? '📄' : 
                 tab === 'experience' ? '📑' : 
                 tab === 'projects' ? '🗂️' : '✉️'}
              </span>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="flex-1 overflow-auto bg-white">
          {activeTab === 'home' && <HomeContent />}
          {activeTab === 'about' && <About />}
          {activeTab === 'experience' && <Experience />}
          {activeTab === 'projects' && <Projects />}
          {activeTab === 'contact' && <Contact />}
        </div>
      </div>
    )
  }

  const HomeContent = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to My Portfolio</h1>
      <div className="space-y-6">
        <p className="text-lg">
          I'm a passionate developer with experience in full-stack development,
          3D modeling, and creative problem solving.
        </p>
        <div className="border border-gray-300 p-4 bg-gray-50">
          <h2 className="font-bold mb-3 text-xl">What to expect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>About - Learn about my background and skills</li>
            <li>Experience - See my professional journey</li>
            <li>Projects - Check out my work</li>
            <li>Contact - Get in touch with me</li>
          </ul>
        </div>
        <div className="mt-8 flex justify-center">
                <a 
                  href="/documents/CV Aymane Lamssaqui.pdf" 
                  download="Aymane_Lamsaqui_CV.pdf"
                  className="inline-flex items-left px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <Icon name="documents" className="mr-2" />
                  Download Resume
                </a>
              </div>
      </div>
    </div>
  )

  return (
    <div className="w-full h-full bg-teal-900 bg-[url('/win95-bg.jpg')] bg-cover p-4 relative">
      {/* Desktop Icons */}
      <div className="grid grid-cols-1 gap-8 w-min">
        {desktopIcons.map(icon => (
          <button
            key={icon.id}
            onClick={() => openWindow(icon.id)}
            className="flex flex-col items-center w-20 gap-1 text-center text-white"
          >
            <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-2xl">
              {icon.icon}
            </div>
            <span className="text-white text-shadow bg-blue-800 px-1">
              {icon.title}
            </span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {windows.map(window => !window.isMinimized && (
        <div 
          key={window.id} 
          style={{ 
            zIndex: activeWindow === window.id ? 50 : 40,
            position: 'absolute',
            left: `${window.position.x}px`,
            top: `${window.position.y}px`
          }}
        >
          <Window
            title={desktopIcons.find(i => i.id === window.id)?.title || ''}
            isActive={activeWindow === window.id}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onFocus={() => setDesktopState(prev => ({ ...prev, activeWindow: window.id }))}
            position={window.position}
            size={{ width: 1100, height: 700 }}
            onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
          >
            {getWindowContent(window.id)}
          </Window>
        </div>
      ))}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-8 bg-gray-400 border-t border-gray-300 flex items-center px-2 z-[100] rounded-b-lg shadow-[0_-2px_5px_rgba(0,0,0,0.2)]">
        <button 
          className="h-6 px-3 bg-gray-300 border border-gray-500 flex items-center"
          onClick={() => {
            playSound('click')
            setDesktopState(prev => ({ ...prev, showStartMenu: !prev.showStartMenu }))
          }}
        >
          <span className="font-bold mr-2">Start</span>
        </button>
        
        <div className="flex ml-2 space-x-1">
          {windows.filter(w => w.isMinimized).map(window => (
            <button
              key={window.id}
              className="h-6 px-3 bg-gray-300 border border-gray-500 flex items-center text-sm"
              onClick={() => restoreWindow(window.id)}
            >
              {desktopIcons.find(i => i.id === window.id)?.title}
            </button>
          ))}
        </div>
        
        <div className="flex-1"></div>
        
        <button 
          onClick={toggleMute}
          className="h-6 px-2 bg-gray-300 border border-gray-500 flex items-center text-sm mr-1"
        >
          {isMuted ? '🔇' : '🔈'}
        </button>
        
        <div className="h-6 px-3 bg-gray-300 border border-gray-500 flex items-center text-sm">
          <Clock />
        </div>
      </div>

      {/* Start Menu */}
      {showStartMenu && (
        <div 
          className="fixed bottom-8 left-0 w-48 bg-gray-300 border border-gray-500 z-[110]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-1 bg-blue-600 text-white font-bold">
            Windows 95
          </div>
          <div className="divide-y divide-gray-400">
            <div className="group relative">
              <button 
                className="w-full text-left px-2 py-1 hover:bg-blue-600 hover:text-white flex justify-between items-center"
                onClick={() => playSound('click')}
              >
                Programs
                <span>▶</span>
              </button>
              <div className="hidden group-hover:block absolute left-full bottom-0 w-48 bg-gray-300 border border-gray-500 z-[120]">
                {desktopIcons.map(icon => (
                  <button
                    key={icon.id}
                    className="w-full text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
                    onClick={() => {
                      playSound('click')
                      openWindow(icon.id)
                      setDesktopState(prev => ({ ...prev, showStartMenu: false }))
                    }}
                  >
                    {icon.title}
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="w-full text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
              onClick={openCV}
            >
              Documents
            </button>

            <button 
              className="w-full text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
              onClick={() => {
                playSound('click')
                setDesktopState(prev => ({ ...prev, showStartMenu: false }))
              }}
            >
              Settings
            </button>

            <button 
              className="w-full text-left px-2 py-1 hover:bg-blue-600 hover:text-white"
              onClick={shutdown}
            >
              Shut Down...
            </button>
          </div>
        </div>
      )}
    </div>
  )
}