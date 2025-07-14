// components/sections/HomeContent.tsx
'use client'

export default function HomeContent() {
  return (
    <div className="p-2 font-mono text-black bg-white h-full overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome</h1>
      
      <div className="space-y-4">
        <div className="border border-gray-300 p-3 bg-gray-50">
          <h2 className="text-xl font-bold mb-2">I'm Aymane Lamsaqui</h2>
          <p>
            I'm a software engineer with a passion for creating innovative solutions.
            Currently working on exciting projects that blend technology and creativity.
          </p>
        </div>
        
        <div className="border border-gray-300 p-3 bg-gray-50">
          <h3 className="font-bold mb-2">Quick Links</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>About Me - Learn more about my background</li>
            <li>Experience - See my professional journey</li>
            <li>Projects - Check out my work</li>
            <li>Contact - Get in touch</li>
          </ul>
        </div>
        
        <div className="border border-gray-300 p-3 bg-gray-50">
          <h3 className="font-bold mb-2">Looking for my resume?</h3>
          <button className="px-3 py-1 bg-blue-600 text-white">
            Download Resume
          </button>
        </div>
      </div>
    </div>
  )
}