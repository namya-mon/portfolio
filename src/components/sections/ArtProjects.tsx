'use client'
import { Icon } from '@/components/ui/Icones'
import UnderConstructionTape from '@/components/ui/UnderConstructionTape'
import Image from 'next/image'

interface ArtProjectsProps {
  onBack: () => void
}

interface ArtPiece {
  id: number
  title: string
  description: string
  category: string
  year: string
  image: string
  tags: string[]
  underConstruction?: boolean
}

const artPieces: ArtPiece[] = [
  {
    id: 1,
    title: "Digital Landscape Series",
    description: "Collection of surreal digital environments",
    category: "Digital",
    year: "2023",
    image: "/images/art/landscape.jpg",
    tags: ["Photoshop", "Blender", "Concept Art"],
    underConstruction: true
  },
  {
    id: 2,
    title: "Origami Architecture",
    description: "Paper folding sculptures of famous buildings",
    category: "Traditional",
    year: "2022",
    image: "/images/art/origami.jpg",
    tags: ["Paper Craft", "Sculpture"]
  },
  {
    id: 3,
    title: "3D Character Design",
    description: "Stylized 3D character models",
    category: "3D",
    year: "2023",
    image: "/images/art/character.jpg",
    tags: ["Blender", "ZBrush"]
  }
]

export default function ArtProjects({ onBack }: ArtProjectsProps) {
  return (
    <div className="w-full h-full p-4 overflow-auto">
      <button 
        onClick={onBack}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <Icon name="back" size={16} className="mr-2" />
        Back to Projects
      </button>
      
      <h1 className="text-2xl font-bold mb-6">Art Projects</h1>
      
      <div className="space-y-8">
        {artPieces.map((piece) => (
          <div key={piece.id} className="relative border border-gray-300 p-4 bg-white">
            {piece.underConstruction && (
              <UnderConstructionTape text="IN PROGRESS" position="top-right" angle={-5} />
            )}
            
            <h2 className="text-xl font-bold">{piece.title}</h2>
            <p className="mb-2">{piece.description}</p>
            <p className="text-gray-600 mb-4">{piece.category} • {piece.year}</p>
            
            <div className="relative w-full h-64 mb-4">
              <Image
                src={piece.image}
                alt={piece.title}
                fill
                className="object-cover border-2 border-gray-300"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {piece.tags.map((tag) => (
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