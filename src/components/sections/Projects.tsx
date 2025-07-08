'use client'
import { motion } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: "EcoQuest RPG",
    description: "Educational role-playing game promoting environmental awareness",
    features: [
      "Pixel art graphics created with Photoshop/Illustrator",
      "Interactive NPCs and trash monster battles",
      "Environmental education mechanics",
      "First place in school competition"
    ],
    technologies: ["JavaScript", "Photoshop", "Audacity"],
    images: [
      "/projects/ecoquest1.jpg",
      "/projects/ecoquest2.jpg",
      "/projects/ecoquest3.jpg",
      "/projects/ecoquest4.jpg"
    ]
  },
  {
    id: 2,
    title: "ASL to Arabic Translator",
    description: "AI-powered sign language translation app",
    features: [
      "Real-time American Sign Language recognition",
      "Arabic text/speech output",
      "Custom trained ML model",
      "Accessibility focused design"
    ],
    technologies: ["Python", "TensorFlow", "React Native"],
    images: [
      "/projects/asl1.jpg",
      "/projects/asl2.jpg",
      "/projects/asl3.jpg",
      "/projects/asl4.jpg"
    ]
  }
]

export default function Projects() {
  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
        
        <div className="grid gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:flex`}
            >
              <div className="md:w-1/2 p-6">
                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {project.images.slice(0, 4).map((img, imgIndex) => (
                    <div 
                      key={imgIndex} 
                      className="aspect-square bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center"
                    >
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
                        <span className="text-gray-500">Screenshot {imgIndex + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-600 mb-6">{project.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {project.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}