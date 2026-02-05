'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ShoppingBag, User, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth-context'
import { useCart } from '@/context/cart-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/productos', label: 'Productos' },
  { href: '/sueros', label: 'Sueros e Infusiones' },
  { href: '/agenda', label: 'Reservas' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <span className="text-lg font-semibold text-primary-foreground">RV</span>
          </div>
          <span className="hidden text-xl font-semibold text-foreground sm:block">
            Raíz Vital
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/productos">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Carrito de compras</span>
            </Button>
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Menú de usuario</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.nombre} {user?.apellido}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Panel de Administración</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/agenda">Mis Reservas</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="default" size="sm">
                Iniciar Sesión
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/productos">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="container mx-auto flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'py-3 text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-border pt-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Hola, {user?.nombre}
                  </p>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setIsOpen(false)}
                      className="block text-sm font-medium text-primary"
                    >
                      Panel de Administración
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="w-full"
                  >
                    Cerrar Sesión
                  </Button>
                </div>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="default" size="sm" className="w-full">
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
