'use client'
import UnderConstructionTape from '@/components/ui/UnderConstructionTape'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Icon } from '../ui/Icones'

const EngineModelWrapper = dynamic(
  () => import('@/components/3d/StandaloneModels').then((mod) => mod.EngineModelWrapper),
  { ssr: false, loading: () => <div className="w-full h-full bg-gray-100 rounded-lg" /> }
)

const TruckModelWrapper = dynamic(
  () => import('@/components/3d/StandaloneModels').then((mod) => mod.TruckModelWrapper),
  { ssr: false, loading: () => <div className="w-full h-full bg-gray-100 rounded-lg" /> }
)

const SymoliaModelWrapper = dynamic(
  () => import('@/components/3d/StandaloneModels').then((mod) => mod.SymoliaModelWrapper),
  { ssr: false, loading: () => <div className="w-full h-full bg-gray-100 rounded-lg" /> }
)

const BelaromeModelWrapper = dynamic(
  () => import('@/components/3d/StandaloneModels').then((mod) => mod.BelaromeModelWrapper),
  { ssr: false, loading: () => <div className="w-full h-full bg-gray-100 rounded-lg" /> }
)

interface ExperienceItem {
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

const experiences: ExperienceItem[] = [
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
    model: 'engine',
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

export default function Experience() {
  return (
    <div className="p-2 font-mono text-black bg-white h-full overflow-auto relative">
      <UnderConstructionTape text="EXPERIENCE SECTION" position="top" />
      
      <div className="border-b border-gray-400 mb-4 pb-2">
        <h2 className="text-xl font-bold">Professional Experience</h2>
      </div>
      
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="border border-gray-300 p-3 bg-gray-50 relative group">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 relative">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{exp.title}</h3>
                    <p className="text-gray-700">{exp.company} • {exp.period}</p>
                    {exp.location && <p className="text-gray-500 text-sm">{exp.location}</p>}
                  </div>
                </div>
                
                <ul className="list-disc pl-5 mb-3 space-y-1">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-200 text-xs border border-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {exp.model && (
                <div className="w-full md:w-64 h-64 bg-gray-100 rounded-lg overflow-hidden">
                  {exp.model === 'engine' && <EngineModelWrapper />}
                  {exp.model === 'truck' && <TruckModelWrapper />}
                  {exp.model === 'symolia' && <SymoliaModelWrapper />}
                  {exp.model === 'belarome' && <BelaromeModelWrapper />}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <a 
          href="/documents/CV Aymane Lamssaqui.pdf" 
          download="Aymane_Lamsaqui_CV.pdf"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <Icon name="documents" className="mr-2" />
          Download Resume
        </a>
      </div>
    </div>
  )
}