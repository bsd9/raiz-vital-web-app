'use client'

import type { ReactNode } from 'react'
import { AuthProvider } from '@/context/auth-context'
import { CartProvider } from '@/context/cart-context'
import { AgendaProvider } from '@/context/agenda-context'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <AgendaProvider>
          {children}
        </AgendaProvider>
      </CartProvider>
    </AuthProvider>
  )
}
