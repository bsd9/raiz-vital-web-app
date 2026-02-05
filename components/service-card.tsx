'use client'

import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { type Servicio } from '@/data/servicios'

interface ServiceCardProps {
  servicio: Servicio
  className?: string
}

export function ServiceCard({ servicio, className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 hover:shadow-md',
        className
      )}
    >
      {/* Image placeholder with gradient overlay */}
      <div className="relative h-48 overflow-hidden bg-sage/20">
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-sage/30 flex items-center justify-center">
            <span className="text-2xl font-light text-forest">
              {servicio.nombre.charAt(0)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Category badge */}
        <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium capitalize text-secondary-foreground">
          {servicio.categoria}
        </span>

        {/* Title */}
        <h3 className="mt-3 text-lg font-semibold text-card-foreground">
          {servicio.nombre}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {servicio.descripcion}
        </p>

        {/* Details */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{servicio.duracion}</span>
          </div>
          <span className="text-lg font-semibold text-primary">
            {servicio.precio}€
          </span>
        </div>

        {/* CTA */}
        <div className="mt-4">
          <Link href={`/agenda?servicio=${servicio.id}`}>
            <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent">
              Reservar
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
