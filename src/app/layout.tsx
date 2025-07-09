'use client'
import Footer from '@/components/Footer'
import { PortfolioModeProvider } from '@/context/PortfolioMode'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="min-h-screen">
        <PortfolioModeProvider>
          {children}
          <Footer />
        </PortfolioModeProvider>
      </body>
    </html>
  )
}