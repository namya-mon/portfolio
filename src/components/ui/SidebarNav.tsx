'use client'

export default function SidebarNav() {
  const sections = [
    { href: '#home', label: '🏠 Home' },
    { href: '#about', label: '👤 About' },
    { href: '#experience', label: '💼 Experience' },
    { href: '#projects', label: '📂 Projects' },
    { href: '#art', label: '🎨 Art' },
    { href: '#contact', label: '📞 Contact' }
  ]

  return (
    <div className="fixed top-4 left-4 z-50 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg p-2 flex flex-col gap-2">
      {sections.map(section => (
        <a
          key={section.href}
          href={section.href}
          className="text-sm font-medium px-4 py-2 rounded-md text-white hover:bg-white/20 transition-all"
        >
          {section.label}
        </a>
      ))}
    </div>
  )
}
