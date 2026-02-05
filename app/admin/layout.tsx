'use client'

import React from "react"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Calendar, 
  ClipboardList, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth-context'

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/servicios', label: 'Servicios', icon: Settings },
  { href: '/admin/agendas', label: 'Agendas', icon: Calendar },
  { href: '/admin/reservas', label: 'Reservas', icon: ClipboardList },
  { href: '/admin/usuarios', label: 'Usuarios', icon: Users },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAdmin, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isAdmin) {
      router.push('/login')
    }
  }, [isAdmin, router])

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="mt-4 text-muted-foreground">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-card px-6 py-4">
          {/* Logo */}
          <div className="flex h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-lg font-semibold text-primary-foreground">RV</span>
              </div>
              <div>
                <span className="block text-lg font-semibold text-card-foreground">Raíz Vital</span>
                <span className="block text-xs text-muted-foreground">Admin Panel</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-1">
              {adminLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'group flex gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      pathname === link.href
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <link.icon className="h-5 w-5 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* User Info & Logout */}
            <div className="border-t border-border pt-4">
              <div className="mb-3 px-3">
                <p className="text-sm font-medium text-card-foreground">
                  {user?.nombre} {user?.apellido}
                </p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                Cerrar Sesión
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-foreground/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-card px-6 py-4">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <span className="text-lg font-semibold text-primary-foreground">RV</span>
                </div>
                <span className="text-lg font-semibold text-card-foreground">Admin</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6 text-muted-foreground" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col">
              <ul className="space-y-1">
                {adminLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        'flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        pathname === link.href
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <link.icon className="h-5 w-5 shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto border-t border-border pt-4">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  Cerrar Sesión
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:pl-64 flex-1">
        {/* Mobile Header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-muted-foreground"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 text-center">
            <span className="font-semibold text-card-foreground">Panel de Administración</span>
          </div>
        </div>

        <main className="py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
