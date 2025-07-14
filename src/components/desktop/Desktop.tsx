'use client'
import Window from '@/components/desktop/Window'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import { Icon } from '@/components/ui/Icones'
import { useEffect, useState } from 'react'

interface DesktopProps {
  playSound: (sound: 'startup' | 'click' | 'close') => void
}

interface WindowState {
  id: string
  isOpen: boolean
  isMinimized: boolean
  position: { x: number; y: number }
}

export default function Desktop({ playSound }: DesktopProps) {
  const [windows, setWindows] = useState<WindowState[]>([
    { 
      id: 'portfolio', 
      isOpen: true, 
      isMinimized: false,
      position: getInitialPosition()
    }
  ])
  
  const [activeWindow, setActiveWindow] = useState('portfolio')
  const [time, setTime] = useState('')
  const [showStartMenu, setShowStartMenu] = useState(false)

  function getInitialPosition() {
    if (typeof window === 'undefined') return { x: 100, y: 100 }
    return {
      x: Math.max(0, (window.innerWidth - 800) / 2),
      y: Math.max(0, (window.innerHeight - 600) / 2)
    }
  }

  function getNextWindowPosition() {
    const offset = 30
    const count = windows.length
    return {
      x: Math.min(offset * count, window.innerWidth - 800 - offset),
      y: Math.min(offset * count, window.innerHeight - 600 - offset)
    }
  }

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const desktopIcons = [
    { id: 'portfolio', title: 'Portfolio.exe', icon: 'portfolio' },
    { id: 'about', title: 'About.txt', icon: 'about' },
    { id: 'experience', title: 'Experience.doc', icon: 'experience' },
    { id: 'projects', title: 'Projects.fld', icon: 'projects' },
    { id: 'contact', title: 'Contact.com', icon: 'contact' }
  ]

  const startMenuItems = [
    {
      name: 'Documents',
      icon: 'documents',
      action: () => {
        setShowStartMenu(false)
        window.open('/documents/CV Aymane Lamssaqui.pdf', '_blank')
      }
    },
    {
      name: 'Shut Down',
      icon: 'shutdown',
      action: () => {
        setShowStartMenu(false)
        if (confirm('Are you sure you want to shut down?')) {
          window.location.reload()
        }
      }
    }
  ]

  const openWindow = (id: string) => {
    playSound('click')
    setActiveWindow(id)
    
    if (!windows.some(w => w.id === id)) {
      setWindows([...windows, { 
        id, 
        isOpen: true, 
        isMinimized: false,
        position: getNextWindowPosition()
      }])
    } else {
      setWindows(windows.map(w => ({
        ...w,
        isMinimized: w.id === id ? false : w.isMinimized
      })))
    }
  }

  const closeWindow = (id: string) => {
    playSound('close')
    setWindows(windows.filter(w => w.id !== id))
    if (activeWindow === id) {
      setActiveWindow(windows.length > 1 ? windows[0].id : '')
    }
  }

  const minimizeWindow = (id: string) => {
    playSound('click')
    setWindows(windows.map(w => 
      w.id === id ? {...w, isMinimized: true} : w
    ))
  }

  const restoreWindow = (id: string) => {
    playSound('click')
    setActiveWindow(id)
    setWindows(windows.map(w => 
      w.id === id ? {...w, isMinimized: false} : w
    ))
  }

  const updateWindowPosition = (id: string, position: { x: number, y: number }) => {
    const boundedPos = {
      x: Math.max(0, Math.min(position.x, window.innerWidth - 800)),
      y: Math.max(0, Math.min(position.y, window.innerHeight - 600))
    }
    setWindows(windows.map(w => 
      w.id === id ? {...w, position: boundedPos} : w
    ))
  }

  const getWindowContent = (id: string) => {
    switch(id) {
      case 'portfolio': return <PortfolioContent />
      case 'about': return <About />
      case 'experience': return <Experience />
      case 'projects': return <Projects />
      case 'contact': return <Contact />
      default: return null
    }
  }

  const PortfolioContent = () => {
    const [activeTab, setActiveTab] = useState('home')
    
    return (
      <div className="w-full h-full flex">
        <div className="w-48 bg-gray-200 border-r border-gray-400 p-2">
          {['home', 'about', 'experience', 'projects', 'contact'].map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                playSound('click')
              }}
              className={`w-full text-left px-4 py-2 mb-1 ${activeTab === tab ? 
                'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-300'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          {activeTab === 'home' && (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">Welcome to My Digital Portfolio</h1>
              <div className="space-y-6">
                <p>
                  I'm a passionate developer with expertise in full-stack development, 
                  3D modeling, and creative problem solving.
                </p>
                <div className="border border-gray-300 p-4 bg-gray-50">
                  <h2 className="font-bold mb-2">Quick Links</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>About - Learn about my background and skills</li>
                    <li>Experience - See my professional journey</li>
                    <li>Projects - Check out my work</li>
                    <li>Contact - Get in touch with me</li>
                  </ul>
                </div>
                <a 
                  href="/documents/CV Aymane Lamssaqui.pdf" 
                  download="Aymane_Lamsaqui_CV.pdf"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  onClick={() => playSound('click')}
                >
                  <Icon name="documents" className="mr-2" />
                  Download Resume
                </a>
              </div>
            </div>
          )}
          {activeTab === 'about' && <About />}
          {activeTab === 'experience' && <Experience />}
          {activeTab === 'projects' && <Projects />}
          {activeTab === 'contact' && <Contact />}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-teal-900 bg-[url('/win95-bg.jpg')] bg-cover p-4 relative">
      <div className="grid grid-cols-1 gap-8 w-min">
        {desktopIcons.map(icon => (
          <button
            key={icon.id}
            onClick={() => openWindow(icon.id)}
            className="flex flex-col items-center w-20 gap-1 text-center text-white"
          >
            <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-2xl">
              <Icon name={icon.icon} size={24} />
            </div>
            <span className="text-white text-shadow bg-blue-800 px-1">
              {icon.title}
            </span>
          </button>
        ))}
      </div>

      {windows.map(window => !window.isMinimized && (
        <Window
          key={window.id}
          title={desktopIcons.find(i => i.id === window.id)?.title || ''}
          isActive={activeWindow === window.id}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onFocus={() => setActiveWindow(window.id)}
          position={window.position}
          size={{ width: 800, height: 600 }}
          onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
        >
          {getWindowContent(window.id)}
        </Window>
      ))}

      <div className="fixed bottom-0 left-0 right-0 h-8 bg-gray-400 border-t border-gray-300 flex items-center px-2 z-50">
        <button 
          className="h-6 px-3 bg-gray-300 border border-gray-500 flex items-center"
          onClick={() => {
            playSound('click')
            setShowStartMenu(!showStartMenu)
          }}
        >
          <Icon name="start" size={16} className="mr-1" />
          <span className="font-bold">Start</span>
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
        
        <div className="h-6 px-3 bg-gray-300 border border-gray-500 flex items-center text-sm">
          {time}
        </div>
      </div>

      {showStartMenu && (
        <div 
          className="fixed bottom-8 left-0 w-48 bg-gray-300 border border-gray-500 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-1 bg-blue-600 text-white font-bold">
            Windows 95
          </div>
          <div className="divide-y divide-gray-400">
            {startMenuItems.map((item) => (
              <button
                key={item.name}
                className="w-full text-left px-2 py-1 hover:bg-blue-600 hover:text-white flex items-center"
                onClick={item.action}
              >
                <Icon name={item.icon} size={16} className="mr-2" />
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}