'use client'

interface IconProps {
  name: string
  size?: number
  className?: string
}

export const Icon = ({ name, size = 20, className = '' }: IconProps) => {
  const icons: Record<string, string> = {
    portfolio: '📁',
    about: '📄',
    experience: '📑',
    contact: '✉️',
    projects: '🗂️',
    start: '🏠',
    programs: '💻',
    documents: '📂',
    settings: '⚙️',
    shutdown: '⏻',
    download: '⏬',
    home: '🏠',
    art: '🎨',
    dev: '💻',
    github: '🐙',
    linkedin: '🔗',
    location: '📍',
    email: '✉️',
    phone: '📞'
  }

  return (
    <span 
      className={`inline-block ${className}`}
      style={{ fontSize: size }}
      aria-hidden="true"
    >
      {icons[name] || '📄'}
    </span>
  )
}