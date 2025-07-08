'use client'
import { usePortfolioMode } from '@/context/PortfolioMode'
import dynamic from 'next/dynamic'
import Image from 'next/image'


const EngineModelWrapper = dynamic(
  () => import('@/components/3d/StandaloneModels').then((mod) => mod.EngineModelWrapper),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 rounded-lg" />
  }
)

const TruckModelWrapper = dynamic(
  () => import('@/components/3d/StandaloneModels').then((mod) => mod.TruckModelWrapper),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 rounded-lg" />
  }
)

const SymoliaModelWrapper = dynamic(
  () => import('@/components/3d/StandaloneModels').then((mod) => mod.SymoliaModelWrapper),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 rounded-lg" />
  }
)

const BelaromeModelWrapper = dynamic(
  () => import('@/components/3d/StandaloneModels').then((mod) => mod.BelaromeModelWrapper),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 rounded-lg" />
  }
)

interface Experience {
  id: number
  title: string
  company: string
  period: string
  location?: string
  description: string[]
  technologies: string[]
  logo: string 
  model?: 'engine' | 'truck' | 'symolia' | 'belarome'
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Capgemini Engineering",
    period: "Feb 2025 - Present",
    description: [
      "Designed and implemented a custom dimensional calculation and analysis tool using ASP.NET",
      "Developed dynamic tables with real-time calculations based on adjustable user input",
      "Integrated advanced PDF export and auto-adjustment algorithms",
      "Implemented image-based inputs and drag-and-drop schema building using Fabric.js"
    ],
    technologies: ["ASP.NET", "Fabric.js", "JavaScript", "SQL"],
    logo: "/images/logos/capgemini.png",
    model: 'engine'
  },
  {
    id: 2,
    title: "Software Developer Intern",
    company: "SYMOLIA",
    period: "Jun 2024 - Aug 2024",
    description: [
      "Developed web-based leave management system with Angular/Spring Boot",
      "Implemented role-based access control (Admin, Manager, Employee)",
      "Created automatic leave balance calculations and email notifications"
    ],
    technologies: ["Angular", "Spring Boot", "TypeScript", "Java"],
    logo: "/images/logos/symolia.png",
    model: 'symolia'
  },
  {
    id: 3,
    title: "IT Specialist & Network Administrator",
    company: "Belarôme",
    period: "Sep 2022 - Oct 2023 · 1 yr 2 mos",
    location: "Fez, Fès-Meknès, Morocco · Hybrid",
    description: [
      "Configured and managed network connectivity across office systems and devices",
      "Developed plans for centralized domain-based infrastructure",
      "Implemented shared storage and VPN planning for remote employee access",
      "Provided troubleshooting and support across hardware and software issues",
      "Additionally supported packaging design projects using Photoshop and Illustrator to create renders of products"
    ],
    technologies: ["Network Administration", "VPN Configuration", "Photoshop", "Illustrator"],
    logo: "/images/logos/belarome.png",
    model: 'belarome'
  },
  {
    id: 4,
    title: "IT Intern",
    company: "Aramex",
    period: "Jun 2023 - Aug 2023",
    description: [
      "Performed server maintenance and routine system checks",
      "Managed Active Directory accounts for employees",
      "Integrated new CCTV cameras into existing network"
    ],
    technologies: ["Windows Server", "Active Directory", "Networking"],
    logo: "/images/logos/aramex.png",
    model: 'truck'
  }
]

export default function Timeline() {
  const { mode } = usePortfolioMode()

  if (mode === 'art') return null

  return (
    <section id="experience" className="relative py-20">
      <div className="max-w-6xl mx-auto px-4">        
        <div className="relative">
          <div className="absolute left-1/2 w-1 h-full bg-gray-200 transform -translate-x-1/2"></div>
          
          {experiences.map((exp, index) => (
            <div 
              key={exp.id} 
              className={`relative mb-12 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
            >
              <div className="w-1/2 px-6 py-4 bg-white rounded-lg shadow-lg z-10">
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 relative mr-3">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company} • {exp.period}</p>
                    {exp.location && <p className="text-gray-500 text-sm">{exp.location}</p>}
                  </div>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-100 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className={`w-1/2 px-6 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                {exp.model === 'engine' && (
                  <div className="inline-block w-80 h-80 relative">
                    <EngineModelWrapper />
                  </div>
                )}
                {exp.model === 'truck' && (
                  <div className="inline-block w-80 h-80 relative">
                    <TruckModelWrapper />
                  </div>
                )}
                {exp.model === 'symolia' && (
                  <div className="inline-block w-80 h-80 relative">
                    <SymoliaModelWrapper />
                  </div>
                )}
                {exp.model === 'belarome' && (
                  <div className="inline-block w-80 h-80 relative">
                    <BelaromeModelWrapper />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}