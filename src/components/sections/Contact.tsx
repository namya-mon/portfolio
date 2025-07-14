'use client'
import { Icon } from '@/components/ui/Icones'

export default function Contact() {
  return (
    <div className="p-2 font-mono text-black bg-white h-full overflow-auto">
      <div className="border-b border-gray-400 mb-4 pb-2">
        <h2 className="text-xl font-bold">Contact</h2>
      </div>
      
      <div className="space-y-6">
        <div className="border border-gray-300 p-3 bg-gray-50">
          <h3 className="font-bold mb-2">Get In Touch</h3>
          <p>Feel free to reach out for opportunities or collaborations.</p>
        </div>
        
        <div className="border border-gray-300 p-3 bg-gray-50">
          <h3 className="font-bold mb-2">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon name="location" size={16} />
              <span>Fes, Morocco</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="email" size={16} />
              <span>alemssaqui@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="phone" size={16} />
              <span>+212 648 709 912</span>
            </div>
          </div>
        </div>
        
        <div className="border border-gray-300 p-3 bg-gray-50">
          <h3 className="font-bold mb-2">Social Links</h3>
          <div className="flex gap-4">
            <a 
              href="https://github.com/namya-mon" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <Icon name="github" size={16} />
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/aymane-lamssaqui-50b42b27a" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <Icon name="linkedin" size={16} />
              LinkedIn
            </a>
          </div>
        </div>
        
        <div className="border border-gray-300 p-3 bg-gray-50">
          <h3 className="font-bold mb-2">Contact Form</h3>
          <form className="space-y-3">
            <div>
              <label className="block mb-1">Name</label>
              <input 
                type="text" 
                className="w-full px-2 py-1 border border-gray-400"
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input 
                type="email" 
                className="w-full px-2 py-1 border border-gray-400"
              />
            </div>
            <div>
              <label className="block mb-1">Message</label>
              <textarea 
                className="w-full px-2 py-1 border border-gray-400 h-20"
              />
            </div>
            <button 
              type="submit"
              className="px-4 py-1 bg-blue-600 text-white border border-gray-400"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}