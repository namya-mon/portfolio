'use client'
import UnderConstructionTape from '@/components/ui/UnderConstructionTape'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface ArtPiece {
  id: number
  title: string
  description: string
  category: string
  year: number
  mockImage?: string
  underConstruction?: boolean
}

const artPieces: ArtPiece[] = [
  {
    id: 1,
    title: "Digital Landscape",
    description: "Mixed media digital painting exploring color theory",
    category: "Digital",
    year: 2023,
    mockImage: "/images/art1.jpg",
    underConstruction: true
  },
  {
    id: 2,
    title: "Origami Crane Series",
    description: "Paper folding sculptures inspired by Japanese tradition",
    category: "Origami",
    year: 2022,
    mockImage: "/images/art2.jpg",
    underConstruction: true
  },
  {
    id: 3,
    title: "Abstract Composition",
    description: "Experimental work with geometric shapes",
    category: "Digital",
    year: 2024,
    mockImage: "/images/art3.jpg",
    underConstruction: true
  },
  {
    id: 4,
    title: "Charcoal Portrait",
    description: "Study of human expression using traditional techniques",
    category: "Traditional",
    year: 2021,
    mockImage: "/images/art4.jpg",
    underConstruction: true
  },
  {
    id: 5,
    title: "Oil Painting",
    description: "Still life with fruits and vase",
    category: "Traditional",
    year: 2020,
    mockImage: "/images/art5.jpg",
    underConstruction: true
  },
  {
    id: 6,
    title: "Origami Modular",
    description: "Complex geometric structures from simple folded units",
    category: "Origami",
    year: 2023,
    mockImage: "/images/art6.jpg",
    underConstruction: true
  }
]

export default function ArtGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null)

  const filteredPieces = selectedCategory === 'all' 
    ? artPieces 
    : artPieces.filter(piece => piece.category === selectedCategory)

  return (
    <section className="min-h-screen p-8 bg-white/90 backdrop-blur-sm relative z-0">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gray-900">Art Gallery</h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full ${selectedCategory === 'all' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            All Works
          </button>
          <button
            onClick={() => setSelectedCategory('Digital')}
            className={`px-4 py-2 rounded-full ${selectedCategory === 'Digital' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Digital
          </button>
          <button
            onClick={() => setSelectedCategory('Traditional')}
            className={`px-4 py-2 rounded-full ${selectedCategory === 'Traditional' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Traditional
          </button>
          <button
            onClick={() => setSelectedCategory('Origami')}
            className={`px-4 py-2 rounded-full ${selectedCategory === 'Origami' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Origami
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              onClick={() => setSelectedPiece(piece.id)}
            >
              {piece.underConstruction && (
                <>
                  <UnderConstructionTape 
                    text="WORK IN PROGRESS" 
                    angle={-4}
                    width="w-[140%]"
                    position="middle"
                  />
                  <UnderConstructionTape 
                    text="CONTENT COMING" 
                    angle={4}
                    width="w-[140%]"
                    stickyEnds={false}
                    position="middle"
                  />
                </>
              )}
              
              <div className="aspect-square bg-gray-200 flex items-center justify-center relative">
                {piece.mockImage ? (
                  <img 
                    src={piece.mockImage} 
                    alt={piece.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                    <span className="text-gray-500">Artwork: {piece.title}</span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">{piece.title}</h3>
                <p className="text-gray-600">{piece.description}</p>
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <span>{piece.category}</span>
                  <span>{piece.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selectedPiece && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="relative">
                <button 
                  onClick={() => setSelectedPiece(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  {artPieces.find(p => p.id === selectedPiece)?.mockImage ? (
                    <img 
                      src={artPieces.find(p => p.id === selectedPiece)?.mockImage}
                      alt={artPieces.find(p => p.id === selectedPiece)?.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                      <span className="text-gray-500">
                        Detailed View: {artPieces.find(p => p.id === selectedPiece)?.title}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {artPieces.find(p => p.id === selectedPiece)?.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  {artPieces.find(p => p.id === selectedPiece)?.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Category:</span> {artPieces.find(p => p.id === selectedPiece)?.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Year:</span> {artPieces.find(p => p.id === selectedPiece)?.year}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}