'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { servicios, categorias } from '@/data/servicios'
import { ServiceCard } from '@/components/service-card'

export default function ServiciosPage() {
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null)

  const serviciosFiltrados = categoriaActiva
    ? servicios.filter(s => s.categoria === categoriaActiva)
    : servicios

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-cream via-sand/30 to-cream py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-sage/20 px-4 py-1.5 text-sm font-medium text-forest mb-4">
              Nuestros Tratamientos
            </span>
            <h1 className="text-4xl font-semibold text-forest md:text-5xl">
              Servicios de Bienestar
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Descubre nuestra amplia gama de tratamientos diseñados para 
              cuidar tu cuerpo y mente de manera integral.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-card py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              variant={categoriaActiva === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoriaActiva(null)}
            >
              Todos
            </Button>
            {categorias.map((cat) => (
              <Button
                key={cat.id}
                variant={categoriaActiva === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategoriaActiva(cat.id)}
              >
                {cat.nombre}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {categoriaActiva && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground">
                {categorias.find(c => c.id === categoriaActiva)?.nombre}
              </h2>
              <p className="mt-1 text-muted-foreground">
                {categorias.find(c => c.id === categoriaActiva)?.descripcion}
              </p>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviciosFiltrados.map((servicio, index) => (
              <div
                key={servicio.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard servicio={servicio} />
              </div>
            ))}
          </div>

          {serviciosFiltrados.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No hay servicios disponibles en esta categoría.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="border-t border-border bg-sand/30 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-semibold text-foreground md:text-3xl">
              ¿No sabes qué tratamiento elegir?
            </h2>
            <p className="mt-4 text-center text-muted-foreground">
              Nuestro equipo de especialistas está aquí para ayudarte. 
              Reserva una consulta gratuita y diseñaremos un plan 
              personalizado según tus necesidades.
            </p>
            <div className="mt-8 flex justify-center">
              <Button size="lg" asChild>
                <a href="/contacto">Solicitar Consulta Gratuita</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
