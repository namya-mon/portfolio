'use client'
import { usePortfolioMode } from '@/context/PortfolioMode'

export default function About() {
  const { mode } = usePortfolioMode()

  const personalDescriptions = {
    software: (
      <>
        <p className="text-lg text-gray-700 mb-4">
          I'm a curious and creative mind with a passion for building useful tools, solving real problems, 
          and constantly learning. My journey in computer engineering has given me the chance to explore 
          everything from network infrastructure and system administration to full-stack development and digital art.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          What excites me most is the blend of technical precision and creativity, whether it's optimizing 
          the flow of data or designing user-friendly interfaces. I love challenging projects that push me 
          to think deeper and build smarter.
        </p>
        <p className="text-lg text-gray-700">
          I'm always open to new opportunities that allow me to grow, collaborate with great teams, 
          and create meaningful digital solutions.
        </p>
      </>
    ),
    art: (
      <>
        <p className="text-lg text-gray-700 mb-4">
          As an artist, I see the world through a lens of shapes, colors, and endless possibilities. 
          My creative journey blends traditional techniques with digital innovation, always exploring 
          new ways to express ideas and emotions.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          I'm fascinated by the intersection of technology and art, where precise algorithms meet 
          organic creativity. Whether working with pixels or paper, I strive to create work that 
          resonates on both an aesthetic and emotional level.
        </p>
        <p className="text-lg text-gray-700">
          My artistic practice is a constant exploration - each piece a new opportunity to learn, 
          experiment, and push boundaries.
        </p>
      </>
    )
  }

  return (
    <section id="about" className="min-h-screen p-8 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="max-w-6xl w-full space-y-12">
        <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="prose max-w-none">
            {personalDescriptions[mode]}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          {mode === 'software' ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Professional</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Computer Engineer with experience in full-stack development, IT infrastructure, 
                  and creative problem-solving.
                </p>
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-800">Skills</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Full-stack Development</li>
                    <li>• IT Infrastructure</li>
                    <li>• 3D Modeling</li>
                    <li>• Graphic Design</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Languages</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Arabic (Native)</li>
                  <li>• French (Fluent)</li>
                  <li>• English (Fluent)</li>
                  <li>• Spanish (Intermediate)</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Artistic</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Digital artist exploring the intersection of technology and 
                  traditional art forms.
                </p>
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-800">Skills</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Digital Art</li>
                    <li>• Drawing/Painting</li>
                    <li>• Origami</li>
                    <li>• Sculpting</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Mediums</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Digital Illustration</li>
                  <li>• Paper Crafts</li>
                  <li>• Mixed Media</li>
                  <li>• 3D Art</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
