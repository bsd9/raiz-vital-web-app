'use client'

import { Calendar, Users, ClipboardList, DollarSign, TrendingUp, Clock } from 'lucide-react'
import { useAgenda } from '@/context/agenda-context'
import { usuarios } from '@/data/usuarios'
import { servicios } from '@/data/servicios'

export default function AdminDashboard() {
  const { reservas, serviciosAdmin } = useAgenda()
  
  const pendingReservations = reservas.filter(r => r.estado === 'pendiente').length
  const confirmedReservations = reservas.filter(r => r.estado === 'confirmada').length
  const totalClientes = usuarios.filter(u => u.rol === 'cliente').length
  
  // Calculate today's appointments
  const today = new Date().toISOString().split('T')[0]
  const todayAppointments = reservas.filter(r => r.fecha === today && r.estado !== 'cancelada')

  // Calculate estimated revenue (from all confirmed reservations)
  const estimatedRevenue = reservas
    .filter(r => r.estado === 'confirmada')
    .reduce((sum, r) => {
      const servicio = servicios.find(s => s.id === r.servicioId)
      return sum + (servicio?.precio || 0)
    }, 0)

  const stats = [
    {
      title: 'Reservas Pendientes',
      value: pendingReservations,
      icon: Clock,
      color: 'text-gold',
      bg: 'bg-gold/20'
    },
    {
      title: 'Reservas Confirmadas',
      value: confirmedReservations,
      icon: ClipboardList,
      color: 'text-primary',
      bg: 'bg-primary/20'
    },
    {
      title: 'Total Clientes',
      value: totalClientes,
      icon: Users,
      color: 'text-forest',
      bg: 'bg-forest/20'
    },
    {
      title: 'Ingresos Estimados',
      value: `${estimatedRevenue}€`,
      icon: DollarSign,
      color: 'text-sage',
      bg: 'bg-sage/20'
    }
  ]

  // Get recent reservations
  const recentReservations = [...reservas]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Bienvenido al panel de administración de Raíz Vital
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-lg border border-border bg-card p-6"
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-semibold text-card-foreground">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Today's Appointments */}
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border px-6 py-4">
            <h2 className="flex items-center gap-2 font-semibold text-card-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              Citas de Hoy
            </h2>
          </div>
          <div className="p-6">
            {todayAppointments.length > 0 ? (
              <div className="space-y-4">
                {todayAppointments.map(appointment => {
                  const servicio = servicios.find(s => s.id === appointment.servicioId)
                  const cliente = usuarios.find(u => u.id === appointment.usuarioId)
                  return (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between rounded-md border border-border p-3"
                    >
                      <div>
                        <p className="font-medium text-card-foreground">
                          {servicio?.nombre}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {cliente?.nombre} {cliente?.apellido}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-card-foreground">
                          {appointment.hora}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.profesional}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="py-8 text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground/30" />
                <p className="mt-2 text-muted-foreground">
                  No hay citas programadas para hoy
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Reservations */}
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border px-6 py-4">
            <h2 className="flex items-center gap-2 font-semibold text-card-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              Reservas Recientes
            </h2>
          </div>
          <div className="p-6">
            {recentReservations.length > 0 ? (
              <div className="space-y-3">
                {recentReservations.map(reserva => {
                  const servicio = servicios.find(s => s.id === reserva.servicioId)
                  const cliente = usuarios.find(u => u.id === reserva.usuarioId)
                  return (
                    <div
                      key={reserva.id}
                      className="flex items-center justify-between rounded-md border border-border p-3"
                    >
                      <div>
                        <p className="font-medium text-card-foreground text-sm">
                          {servicio?.nombre}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {cliente?.nombre} {cliente?.apellido} • {new Date(reserva.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        reserva.estado === 'confirmada' 
                          ? 'bg-primary/20 text-primary'
                          : reserva.estado === 'pendiente'
                            ? 'bg-gold/20 text-gold'
                            : 'bg-destructive/20 text-destructive'
                      }`}>
                        {reserva.estado}
                      </span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="py-8 text-center">
                <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground/30" />
                <p className="mt-2 text-muted-foreground">
                  No hay reservas recientes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="mt-6 rounded-lg border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-semibold text-card-foreground">
            Servicios Activos ({serviciosAdmin.length})
          </h2>
        </div>
        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviciosAdmin.slice(0, 6).map(servicio => (
              <div
                key={servicio.id}
                className="rounded-md border border-border p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium capitalize text-secondary-foreground">
                    {servicio.categoria}
                  </span>
                  <span className="font-semibold text-primary">{servicio.precio}€</span>
                </div>
                <h3 className="mt-2 font-medium text-card-foreground text-sm">
                  {servicio.nombre}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {servicio.duracion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
