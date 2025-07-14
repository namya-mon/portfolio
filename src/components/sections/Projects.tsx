'use client'
import { Icon } from '@/components/ui/Icones'
import { useState } from 'react'
import ArtProjects from './ArtProjects'
import DevProjects from './DevProjects'

export default function Projects() {
  const [activeView, setActiveView] = useState<'menu' | 'dev' | 'art'>('menu')

  if (activeView === 'dev') return <DevProjects onBack={() => setActiveView('menu')} />
  if (activeView === 'art') return <ArtProjects onBack={() => setActiveView('menu')} />

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Projects & Hobbies</h1>
      <p className="mb-6">Click on one of the areas below to view projects in that category.</p>
      
      <div className="space-y-4">
        <button
          onClick={() => setActiveView('dev')}
          className="w-full p-4 border-2 border-gray-300 bg-gray-100 hover:bg-gray-200 text-left"
        >
          <div className="flex items-center gap-4">
            <Icon name="dev" size={24} />
            <div>
              <h2 className="text-xl font-bold">Development Projects</h2>
              <p>Software and coding projects</p>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => setActiveView('art')}
          className="w-full p-4 border-2 border-gray-300 bg-gray-100 hover:bg-gray-200 text-left"
        >
          <div className="flex items-center gap-4">
            <Icon name="art" size={24} />
            <div>
              <h2 className="text-xl font-bold">Art Projects</h2>
              <p>Creative works and artistic endeavors</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}