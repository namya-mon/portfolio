import { AramexIcon, CapgeminiIcon, SymoliaIcon } from '../icons'

const experiences = [
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
    Icon: CapgeminiIcon
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
    Icon: SymoliaIcon
  },
  {
    id: 3,
    title: "IT Intern",
    company: "Aramex",
    period: "Jun 2023 - Aug 2023",
    description: [
      "Performed server maintenance and routine system checks",
      "Managed Active Directory accounts for employees",
      "Integrated new CCTV cameras into existing network"
    ],
    technologies: ["Windows Server", "Active Directory", "Networking"],
    Icon: AramexIcon
  }
]

export default function Timeline() {
  return (
    <div className="relative max-w-4xl mx-auto py-12 px-4">
      <div className="absolute left-1/2 w-1 h-full bg-gray-200 transform -translate-x-1/2"></div>
      
      {experiences.map((exp, index) => (
        <div 
          key={exp.id} 
          className={`mb-12 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
        >
          <div className="w-1/2 px-6 py-4 bg-white rounded-lg shadow-lg">
            <div className="flex items-center mb-2">
              <exp.Icon className="w-8 h-8 mr-3" />
              <div>
                <h3 className="text-lg font-bold">{exp.title}</h3>
                <p className="text-gray-600">{exp.company} • {exp.period}</p>
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
        </div>
      ))}
    </div>
  )
}