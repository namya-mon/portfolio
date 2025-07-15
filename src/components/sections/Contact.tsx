'use client'
import { Icon } from '@/components/ui/Icones'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Replace with your actual form submission logic
      // This could be an API route, Formspree, or email service
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

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
              <a href="mailto:alemssaqui@gmail.com" className="hover:underline">
                alemssaqui@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="phone" size={16} />
              <a href="tel:+212648709912" className="hover:underline">
                +212 648 709 912
              </a>
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
              className="flex items-center gap-2 hover:underline"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/aymane-lamssaqui-50b42b27a" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
        
        <div className="border border-gray-300 p-3 bg-gray-50">
          <h3 className="font-bold mb-2">Contact Form</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-2 py-1 border border-gray-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-2 py-1 border border-gray-400"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">Message</label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-2 py-1 border border-gray-400 h-20"
              />
            </div>
            <div className="flex items-center gap-4">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-1 bg-blue-600 text-white border border-gray-400 hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
              {submitStatus === 'success' && (
                <span className="text-green-600">Message sent successfully!</span>
              )}
              {submitStatus === 'error' && (
                <span className="text-red-600">Failed to send message. Please try again.</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}