'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { usuarios, type Usuario } from '@/data/usuarios'

interface AuthContextType {
  user: Usuario | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => { success: boolean; error?: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null)

  const login = useCallback((email: string, password: string): { success: boolean; error?: string } => {
    const foundUser = usuarios.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )

    if (foundUser) {
      setUser(foundUser)
      return { success: true }
    }

    return { success: false, error: 'Credenciales incorrectas' }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.rol === 'admin',
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
