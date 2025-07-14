// components/sections/About.tsx
'use client'

export default function About() {
  return (
    <div className="p-2 font-mono text-black bg-white h-full overflow-auto">
      <div className="border-b border-gray-400 mb-4 pb-2">
        <h2 className="text-xl font-bold">About Me</h2>
      </div>
      
      <div className="space-y-4">
        <p>
          I'm a curious and creative mind with a passion for building useful tools, 
          solving real problems, and constantly learning. My journey in computer 
          engineering has given me the chance to explore everything from network 
          infrastructure to full-stack development.
        </p>
        
        <div className="border border-gray-300 p-3 bg-gray-50">
          <h3 className="font-bold mb-2">Professional</h3>
          <p className="mb-3">
            Computer Engineer with experience in full-stack development, 
            IT infrastructure, and creative problem-solving.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-1">Skills</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Full-stack Development</li>
                <li>IT Infrastructure</li>
                <li>3D Modeling</li>
                <li>Graphic Design</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-1">Languages</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Arabic (Native)</li>
                <li>French (Fluent)</li>
                <li>English (Fluent)</li>
                <li>Spanish (Intermediate)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}