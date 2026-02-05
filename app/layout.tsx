import React from "react"
import type { Metadata, Viewport } from 'next'
import { Poppins, Inter } from 'next/font/google'

import './globals.css'
import { Providers } from '@/components/providers'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Raíz Vital | Centro de Bienestar Integral',
  description: 'Centro de bienestar que combina naturaleza y ciencia. Tratamientos faciales, capilares, corporales, sueroterapia e infusiones vitamínicas.',
}

export const viewport: Viewport = {
  themeColor: '#7A9D8E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} ${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
