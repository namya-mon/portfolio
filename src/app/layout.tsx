'use client'
import Footer from '@/components/Footer'
import { PortfolioModeProvider } from '@/context/PortfolioMode'
import { Analytics } from "@vercel/analytics/next"
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
          <Analytics/>
          <Footer />
        </PortfolioModeProvider>
      </body>
    </html>
  )
}