'use client'
import { Icon } from '@/components/ui/Icones'
import UnderConstructionTape from '@/components/ui/UnderConstructionTape'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface DevProjectsProps {
  onBack: () => void
}

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  image: string
  link: string
  underConstruction?: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: "EcoQuest RPG",
    description: "Educational game promoting environmental awareness through interactive gameplay",
    tags: ["Game Development", "JavaScript", "Pixel Art"],
    image: "/images/projects/ecoquest.jpg",
    link: "#",
    underConstruction: true
  },
  {
    id: 2,
    title: "ASL Translator",
    description: "AI-powered sign language translation system with Arabic output",
    tags: ["Machine Learning", "Python", "TensorFlow"],
    image: "/images/projects/asl.jpg",
    link: "#"
  },
  {
    id: 3,
    title: "Portfolio OS",
    description: "Interactive portfolio with Windows 95 inspired interface",
    tags: ["React", "Three.js", "Next.js"],
    image: "/images/projects/portfolio.jpg",
    link: "#",
    underConstruction: true
  }
]

export default function DevProjects({ onBack }: DevProjectsProps) {
  const [dimensions, setDimensions] = useState<Record<number, {width: number, height: number}>>({});

  useEffect(() => {
    projects.forEach(project => {
      const img = new window.Image();
      img.src = project.image;
      img.onload = () => {
        setDimensions(prev => ({
          ...prev,
          [project.id]: { width: img.width, height: img.height }
        }));
      };
    });
  }, []);

  return (
    <div className="w-full h-full p-4 overflow-auto">
      <button 
        onClick={onBack}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <Icon name="back" size={16} className="mr-2" />
        Back to Projects
      </button>
      
      <h1 className="text-2xl font-bold mb-6">Development Projects</h1>
      
      <div className="space-y-8">
        {projects.map((project) => (
          <div key={project.id} className="relative border border-gray-300 p-4 bg-white">
            {project.underConstruction && (
              <UnderConstructionTape text="IN PROGRESS" position="top-right" angle={-5} />
            )}
            
            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            <p className="mb-4">{project.description}</p>
            
            <div className="relative w-full mb-4">
              <div 
                className="relative" 
                style={{ 
                  paddingBottom: dimensions[project.id] 
                    ? `${(dimensions[project.id].height / dimensions[project.id].width) * 100}%` 
                    : '56.25%'
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover border border-gray-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full border border-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}