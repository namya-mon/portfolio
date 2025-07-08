'use client'
import { PortfolioModeProvider } from '@/context/PortfolioMode'
import './globals.css'
import Footer from '@/components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <PortfolioModeProvider>
          {children}
          <Footer />
        </PortfolioModeProvider>
      </body>
    </html>
  )
}