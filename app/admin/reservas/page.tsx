'use client'

import React from "react"

import { useState, useMemo } from 'react'
import { Search, Filter, CheckCircle2, XCircle, Clock, CircleCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAgenda } from '@/context/agenda-context'
import { servicios } from '@/data/servicios'
import { usuarios } from '@/data/usuarios'
import { cn } from '@/lib/utils'
import type { Reserva } from '@/data/agendas'

const estadoConfig: Record<Reserva['estado'], { label: string; className: string; icon: React.ElementType }> = {
  pendiente: {
    label: 'Pendiente',
    className: 'bg-amber-100 text-amber-800',
    icon: Clock,
  },
  confirmada: {
    label: 'Confirmada',
    className: 'bg-primary/15 text-primary',
    icon: CheckCircle2,
  },
  cancelada: {
    label: 'Cancelada',
    className: 'bg-destructive/15 text-destructive',
    icon: XCircle,
  },
  completada: {
    label: 'Completada',
    className: 'bg-emerald-100 text-emerald-800',
    icon: CircleCheck,
  },
}

export default function AdminReservasPage() {
  const { reservas, updateReservaEstado } = useAgenda()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterEstado, setFilterEstado] = useState<string>('todas')

  const filteredReservas = useMemo(() => {
    return reservas.filter((r) => {
      const servicio = servicios.find((s) => s.id === r.servicioId)
      const usuario = usuarios.find((u) => u.id === r.usuarioId)
      const matchesSearch =
        searchQuery === '' ||
        servicio?.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        usuario?.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        usuario?.apellido.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.profesional.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesEstado = filterEstado === 'todas' || r.estado === filterEstado

      return matchesSearch && matchesEstado
    }).sort((a, b) => {
      const dateA = new Date(`${a.fecha}T${a.hora}`)
      const dateB = new Date(`${b.fecha}T${b.hora}`)
      return dateB.getTime() - dateA.getTime()
    })
  }, [reservas, searchQuery, filterEstado])

  const stats = useMemo(() => {
    return {
      total: reservas.length,
      pendientes: reservas.filter((r) => r.estado === 'pendiente').length,
      confirmadas: reservas.filter((r) => r.estado === 'confirmada').length,
      completadas: reservas.filter((r) => r.estado === 'completada').length,
      canceladas: reservas.filter((r) => r.estado === 'cancelada').length,
    }
  }, [reservas])

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Reservas</h1>
        <p className="mt-1 text-muted-foreground">
          Gestiona todas las reservas de los clientes
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-semibold text-card-foreground">{stats.total}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Pendientes</p>
          <p className="text-2xl font-semibold text-amber-600">{stats.pendientes}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Confirmadas</p>
          <p className="text-2xl font-semibold text-primary">{stats.confirmadas}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Completadas</p>
          <p className="text-2xl font-semibold text-emerald-600">{stats.completadas}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente, servicio o profesional..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="todas">Todas</option>
            <option value="pendiente">Pendientes</option>
            <option value="confirmada">Confirmadas</option>
            <option value="completada">Completadas</option>
            <option value="cancelada">Canceladas</option>
          </select>
        </div>
      </div>

      {/* Reservas List */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        {/* Table header - desktop */}
        <div className="hidden border-b border-border bg-muted/50 px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground md:grid md:grid-cols-12 md:gap-4">
          <div className="col-span-3">Cliente</div>
          <div className="col-span-3">Servicio</div>
          <div className="col-span-2">Fecha / Hora</div>
          <div className="col-span-2">Estado</div>
          <div className="col-span-2 text-right">Acciones</div>
        </div>

        {filteredReservas.length > 0 ? (
          <ul className="divide-y divide-border">
            {filteredReservas.map((reserva) => {
              const servicio = servicios.find((s) => s.id === reserva.servicioId)
              const usuario = usuarios.find((u) => u.id === reserva.usuarioId)
              const config = estadoConfig[reserva.estado]
              const Icon = config.icon

              return (
                <li
                  key={reserva.id}
                  className="px-6 py-4 transition-colors hover:bg-muted/30"
                >
                  {/* Desktop */}
                  <div className="hidden md:grid md:grid-cols-12 md:items-center md:gap-4">
                    <div className="col-span-3">
                      <p className="font-medium text-card-foreground text-sm">
                        {usuario?.nombre} {usuario?.apellido}
                      </p>
                      <p className="text-xs text-muted-foreground">{usuario?.email}</p>
                    </div>
                    <div className="col-span-3">
                      <p className="text-sm text-card-foreground">
                        {servicio?.nombre || reserva.servicioId}
                      </p>
                      <p className="text-xs text-muted-foreground">{reserva.profesional}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-card-foreground">
                        {new Date(reserva.fecha).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">{reserva.hora}h</p>
                    </div>
                    <div className="col-span-2">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
                          config.className
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {config.label}
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-end gap-2">
                      {reserva.estado === 'pendiente' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent text-xs"
                            onClick={() => updateReservaEstado(reserva.id, 'confirmada')}
                          >
                            Confirmar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent text-xs text-destructive hover:text-destructive"
                            onClick={() => updateReservaEstado(reserva.id, 'cancelada')}
                          >
                            Cancelar
                          </Button>
                        </>
                      )}
                      {reserva.estado === 'confirmada' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-transparent text-xs"
                          onClick={() => updateReservaEstado(reserva.id, 'completada')}
                        >
                          Completar
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-card-foreground text-sm">
                          {usuario?.nombre} {usuario?.apellido}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {servicio?.nombre || reserva.servicioId}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                          config.className
                        )}
                      >
                        <Icon className="h-3 w-3" />
                        {config.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{reserva.profesional}</span>
                      <span>
                        {new Date(reserva.fecha).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                        })}{' '}
                        - {reserva.hora}h
                      </span>
                    </div>
                    {(reserva.estado === 'pendiente' || reserva.estado === 'confirmada') && (
                      <div className="flex gap-2 pt-1">
                        {reserva.estado === 'pendiente' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 bg-transparent text-xs"
                              onClick={() => updateReservaEstado(reserva.id, 'confirmada')}
                            >
                              Confirmar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 bg-transparent text-xs text-destructive hover:text-destructive"
                              onClick={() => updateReservaEstado(reserva.id, 'cancelada')}
                            >
                              Cancelar
                            </Button>
                          </>
                        )}
                        {reserva.estado === 'confirmada' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent text-xs"
                            onClick={() => updateReservaEstado(reserva.id, 'completada')}
                          >
                            Completar
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="py-16 text-center">
            <Search className="mx-auto h-12 w-12 text-muted-foreground/30" />
            <p className="mt-3 text-muted-foreground">No se encontraron reservas</p>
            {searchQuery && (
              <Button
                variant="link"
                className="mt-1 text-primary"
                onClick={() => setSearchQuery('')}
              >
                Limpiar busqueda
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
