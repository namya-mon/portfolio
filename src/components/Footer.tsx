'use client'
import { motion } from 'framer-motion'

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/namya-mon',
    icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/aymane-lamssaqui-50b42b27a',
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
  },
  {
    name: 'Email',
    url: 'mailto:alemssaqui@gmail.com',
    icon: 'M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z'
  }
]

export default function Footer() {
  return (
    <footer className="bg-gray-300 border-t-2 border-gray-400 py-6 px-8 shadow-[0_-2px_5px_rgba(0,0,0,0.2)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-xl font-bold mb-2 text-gray-800">Aymane Lamssaqui</p>
            <p className="text-gray-600">Computer Engineer & Creative Developer</p>
          </div>
          
          <div>
            <h4 className="text-md font-bold mb-3 text-gray-800 border-b border-gray-400 pb-1">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Fes, Morocco
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                alemssaqui@gmail.com
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                +212 648-709912
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-bold mb-3 text-gray-800 border-b border-gray-400 pb-1">Connect</h4>
            <div className="flex space-x-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="bg-gray-200 p-2 rounded border border-gray-400 hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24">
                    <path d={link.icon} fill="currentColor" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-400 mt-6 pt-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Aymane Lamssaqui. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}