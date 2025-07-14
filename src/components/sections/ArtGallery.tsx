'use client'
import { Icon } from '@/components/ui/Icones'
import UnderConstructionTape from '@/components/ui/UnderConstructionTape'
import Image from 'next/image'
import { useState } from 'react'

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

export default function ArtProjects() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const categories = ['all', 'Digital', 'Traditional', '3D']

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${
              activeCategory === category 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {category === 'all' ? (
              <>
                <Icon name="art" size={16} />
                All Works
              </>
            ) : (
              <>
                <Icon name={category.toLowerCase()} size={16} />
                {category}
              </>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artPieces
          .filter(piece => activeCategory === 'all' || piece.category === activeCategory)
          .map(piece => (
            <div 
              key={piece.id}
              className="relative bg-white border-2 border-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredItem(piece.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {piece.underConstruction && (
                <UnderConstructionTape text="IN PROGRESS" position="top-right" angle={-5} />
              )}
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={piece.image}
                  alt={piece.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 transition-opacity duration-300 ${
                  hoveredItem === piece.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <h3 className="text-white font-bold text-xl">{piece.title}</h3>
                  <p className="text-gray-300 text-sm">{piece.description}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{piece.title}</h3>
                    <p className="text-gray-500 text-sm">
                      {piece.category} • {piece.year}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {piece.tags.slice(0, 2).map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-0.5 bg-gray-200 text-gray-800 text-xs rounded-full border border-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}