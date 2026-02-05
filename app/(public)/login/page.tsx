'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/auth-context'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const result = login(email, password)
    
    if (result.success) {
      // Check if admin to redirect to admin panel
      if (email.toLowerCase() === 'admin@raizvital.com') {
        router.push('/admin')
      } else {
        router.push('/')
      }
    } else {
      setError(result.error || 'Error al iniciar sesión')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <span className="text-xl font-semibold text-primary-foreground">RV</span>
            </div>
            <h1 className="text-2xl font-semibold text-card-foreground">
              Iniciar Sesión
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Accede a tu cuenta de Raíz Vital
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 rounded-md bg-sand/50 p-4">
            <p className="mb-2 text-sm font-medium text-foreground">
              Credenciales de Prueba:
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p><strong>Usuarios:</strong></p>
              <p>usuario1@raizvital.com / password123</p>
              <p>usuario2@raizvital.com / password123</p>
              <p>usuario3@raizvital.com / password123</p>
              <p>usuario4@raizvital.com / password123</p>
              <p className="mt-2"><strong>Admin:</strong></p>
              <p>admin@raizvital.com / admin123</p>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/" className="text-primary hover:underline">
              Volver al inicio
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
