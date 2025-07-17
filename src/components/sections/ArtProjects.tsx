'use client'
import { Icon } from '@/components/ui/Icones'
import UnderConstructionTape from '@/components/ui/UnderConstructionTape'
import Image from 'next/image'
import { useState, useEffect } from 'react'

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
    title: "The Wanderer",
    description: "My first ever digital painting depicting an unknown wanderer on a clif's edge overlooking a vast desert",
    category: "Digital",
    year: "2024",
    image: "/images/art/desert.jpg",
    tags: ["Landscap", "MsPaint", "Concept Art"],
    underConstruction: false
  },
  {
    id: 2,
    title: "The king Fisher",
    description: "One of my favorite pieces, a simple painting of a bird on a branch",
    category: "Digital",
    year: "2024",
    image: "/images/art/bird.jpg",
    tags: ["MsPaint", "Nature"]
  },
  {
    id: 3,
    title: "My RYUJIN",
    description: "My own depiction of the popular subject 'Ryijin', An origamin model that i consider to be one of my best works so far",
    category: "Origami",
    year: "2023",
    image: "/images/art/ryujin.jpg",
    tags: ["Origami", "Creature design","Sculpture"]
  },
  {
    id: 4,
    title: "Other designs",
    description: "These are some of the designs that i made over the years each during a phase of my journy.The Whyvern represents an phase where craming as much detail as possible was the goal of most of my designs,looking cool and complex was my goal at the time.The shrimp was made durring a phase where i was focusing on shapes where the focus was on more complex designs with clear shapes ,which is what made gravitate to marine life more as my subjects but not exclusivly sin the Ryujin was made during that time,The violenist is my lattest design blending simple shapes and complex strictures, while it might look simple it is one of the most complext designs to date  ",
    category: "Origami",
    year: "2020-2025",
    image: "/images/art/origami collage.jpg",
    tags: ["Origami", "Subject study","Sculpture"]
  },
  {
    id: 5,
    title: "Sketches",
    description: "Some of the sketches that i made in between working on bigger projects either Origami or Painting",
    category: "Drawing",
    year: "2024-2025",
    image: "/images/art/sketches.jpg",
    tags: ["Traditional", "pen and paper"]
  },
]

export default function ArtProjects({ onBack }: ArtProjectsProps) {
  const [dimensions, setDimensions] = useState<Record<number, {width: number, height: number}>>({});

  useEffect(() => {
    artPieces.forEach(piece => {
      const img = new window.Image();
      img.src = piece.image;
      img.onload = () => {
        setDimensions(prev => ({
          ...prev,
          [piece.id]: { width: img.width, height: img.height }
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
            
            <div className="relative w-full mb-4">
              <div 
                className="relative" 
                style={{ 
                  paddingBottom: dimensions[piece.id] 
                    ? `${(dimensions[piece.id].height / dimensions[piece.id].width) * 100}%` 
                    : '56.25%'
                }}
              >
                <Image
                  src={piece.image}
                  alt={piece.title}
                  fill
                  className="object-cover border-2 border-gray-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
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