'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, User, ChevronLeft, ChevronRight, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth-context'
import { useAgenda } from '@/context/agenda-context'
import { servicios, categorias } from '@/data/servicios'
import { cn } from '@/lib/utils'

export default function AgendaPage() {
  const searchParams = useSearchParams()
  const servicioIdParam = searchParams.get('servicio')
  
  const { user, isAuthenticated } = useAuth()
  const { horarios, reservas, crearReserva, getReservasForUsuario } = useAgenda()
  
  const [selectedServicio, setSelectedServicio] = useState<string | null>(servicioIdParam)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date()
    const day = today.getDay()
    const diff = today.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(today.setDate(diff))
  })

  // Get user's reservations
  const userReservations = useMemo(() => {
    if (!user) return []
    return getReservasForUsuario(user.id)
  }, [user, getReservasForUsuario])

  // Generate week dates
  const weekDates = useMemo(() => {
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart)
      date.setDate(currentWeekStart.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }, [currentWeekStart])

  // Get available times for selected service and date
  const availableTimes = useMemo(() => {
    if (!selectedServicio || !selectedDate) return []
    return horarios.filter(
      h => h.servicioId === selectedServicio && h.fecha === selectedDate && h.disponible
    )
  }, [selectedServicio, selectedDate, horarios])

  const handlePrevWeek = () => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentWeekStart(newDate)
    setSelectedDate(null)
    setSelectedHorario(null)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentWeekStart(newDate)
    setSelectedDate(null)
    setSelectedHorario(null)
  }

  const handleBooking = async () => {
    if (!selectedServicio || !selectedHorario || !user) return
    
    const horario = horarios.find(h => h.id === selectedHorario)
    if (!horario) return
    
    setIsBooking(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    crearReserva({
      usuarioId: user.id,
      horarioId: horario.id,
      servicioId: selectedServicio,
      fecha: horario.fecha,
      hora: horario.hora,
      profesional: horario.profesional,
      estado: 'pendiente'
    })
    
    setIsBooking(false)
    setBookingSuccess(true)
    setSelectedHorario(null)
  }

  const selectedServicioData = servicios.find(s => s.id === selectedServicio)

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-cream via-sand/30 to-cream py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-sage/20 px-4 py-1.5 text-sm font-medium text-forest mb-4">
              Reserva tu Cita
            </span>
            <h1 className="text-4xl font-semibold text-forest md:text-5xl">
              Agenda de Reservas
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Selecciona el servicio, fecha y hora que mejor se adapte a tu rutina.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {!isAuthenticated ? (
            <div className="mx-auto max-w-md rounded-lg border border-border bg-card p-8 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-gold" />
              <h2 className="mt-4 text-xl font-semibold text-card-foreground">
                Inicia sesión para reservar
              </h2>
              <p className="mt-2 text-muted-foreground">
                Necesitas una cuenta para poder realizar reservas.
              </p>
              <Link href="/login">
                <Button className="mt-6">Iniciar Sesión</Button>
              </Link>
            </div>
          ) : bookingSuccess ? (
            <div className="mx-auto max-w-md rounded-lg border border-primary/30 bg-primary/10 p-8 text-center">
              <Check className="mx-auto h-16 w-16 text-primary" />
              <h2 className="mt-4 text-2xl font-semibold text-foreground">
                ¡Reserva confirmada!
              </h2>
              <p className="mt-2 text-muted-foreground">
                Tu cita ha sido registrada correctamente. Te enviaremos un recordatorio.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button onClick={() => {
                  setBookingSuccess(false)
                  setSelectedServicio(null)
                  setSelectedDate(null)
                }}>
                  Nueva Reserva
                </Button>
                <Button variant="outline" onClick={() => setBookingSuccess(false)}>
                  Ver Mis Reservas
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column - Service Selection */}
              <div className="lg:col-span-1">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  1. Selecciona un servicio
                </h2>
                
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {categorias.map(cat => {
                    const catServices = servicios.filter(s => s.categoria === cat.id)
                    return (
                      <div key={cat.id} className="space-y-1">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground py-2">
                          {cat.nombre}
                        </p>
                        {catServices.map(servicio => (
                          <button
                            key={servicio.id}
                            onClick={() => {
                              setSelectedServicio(servicio.id)
                              setSelectedDate(null)
                              setSelectedHorario(null)
                            }}
                            className={cn(
                              'w-full rounded-lg border p-3 text-left transition-all',
                              selectedServicio === servicio.id
                                ? 'border-primary bg-primary/10'
                                : 'border-border bg-card hover:border-primary/50'
                            )}
                          >
                            <p className="font-medium text-card-foreground text-sm">
                              {servicio.nombre}
                            </p>
                            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{servicio.duracion}</span>
                              <span className="text-primary font-semibold">
                                {servicio.precio}€
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Middle Column - Calendar */}
              <div className="lg:col-span-1">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  2. Elige fecha y hora
                </h2>
                
                {selectedServicio ? (
                  <div className="rounded-lg border border-border bg-card p-4">
                    {/* Week Navigation */}
                    <div className="flex items-center justify-between mb-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePrevWeek}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium text-card-foreground">
                        {new Date(currentWeekStart).toLocaleDateString('es-ES', {
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNextWeek}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Week Days */}
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, i) => (
                        <div key={i} className="text-center text-xs text-muted-foreground py-1">
                          {day}
                        </div>
                      ))}
                      {weekDates.map(date => {
                        const dateObj = new Date(date)
                        const isPast = dateObj < new Date(new Date().setHours(0,0,0,0))
                        const isSunday = dateObj.getDay() === 0
                        const hasSlots = horarios.some(
                          h => h.servicioId === selectedServicio && h.fecha === date && h.disponible
                        )
                        
                        return (
                          <button
                            key={date}
                            disabled={isPast || isSunday || !hasSlots}
                            onClick={() => {
                              setSelectedDate(date)
                              setSelectedHorario(null)
                            }}
                            className={cn(
                              'aspect-square rounded-md text-sm font-medium transition-all',
                              selectedDate === date
                                ? 'bg-primary text-primary-foreground'
                                : isPast || isSunday || !hasSlots
                                  ? 'text-muted-foreground/50 cursor-not-allowed'
                                  : 'hover:bg-primary/10 text-card-foreground'
                            )}
                          >
                            {dateObj.getDate()}
                          </button>
                        )
                      })}
                    </div>

                    {/* Time Slots */}
                    {selectedDate && (
                      <div>
                        <p className="text-sm font-medium text-card-foreground mb-3">
                          Horarios disponibles para{' '}
                          {new Date(selectedDate).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long'
                          })}
                        </p>
                        
                        {availableTimes.length > 0 ? (
                          <div className="grid grid-cols-3 gap-2">
                            {availableTimes.map(slot => (
                              <button
                                key={slot.id}
                                onClick={() => setSelectedHorario(slot.id)}
                                className={cn(
                                  'rounded-md border py-2 text-sm font-medium transition-all',
                                  selectedHorario === slot.id
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-border hover:border-primary/50 text-card-foreground'
                                )}
                              >
                                {slot.hora}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No hay horarios disponibles para esta fecha.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-lg border border-border bg-card p-8 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">
                      Selecciona un servicio para ver la disponibilidad.
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column - Summary */}
              <div className="lg:col-span-1">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  3. Confirmar reserva
                </h2>
                
                <div className="rounded-lg border border-border bg-card p-6">
                  {selectedServicioData && selectedHorario ? (
                    <>
                      <h3 className="font-semibold text-card-foreground">
                        Resumen de tu cita
                      </h3>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/20">
                            <span className="text-sm font-medium text-forest">
                              {selectedServicioData.nombre.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-card-foreground">
                              {selectedServicioData.nombre}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {selectedServicioData.duracion}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-card-foreground">
                            {selectedDate && new Date(selectedDate).toLocaleDateString('es-ES', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long'
                            })}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-card-foreground">
                            {availableTimes.find(h => h.id === selectedHorario)?.hora}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-card-foreground">
                            {availableTimes.find(h => h.id === selectedHorario)?.profesional}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 border-t border-border pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Total</span>
                          <span className="text-xl font-bold text-primary">
                            {selectedServicioData.precio}€
                          </span>
                        </div>
                      </div>

                      <Button
                        className="mt-6 w-full"
                        onClick={handleBooking}
                        disabled={isBooking}
                      >
                        {isBooking ? 'Reservando...' : 'Confirmar Reserva'}
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <p className="mt-4 text-muted-foreground">
                        Selecciona servicio, fecha y hora para confirmar tu cita.
                      </p>
                    </div>
                  )}
                </div>

                {/* User's Reservations */}
                {userReservations.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Tus próximas reservas
                    </h3>
                    <div className="space-y-2">
                      {userReservations
                        .filter(r => r.estado !== 'cancelada')
                        .slice(0, 3)
                        .map(reserva => {
                          const servicio = servicios.find(s => s.id === reserva.servicioId)
                          return (
                            <div
                              key={reserva.id}
                              className="rounded-md border border-border bg-card p-3"
                            >
                              <p className="text-sm font-medium text-card-foreground">
                                {servicio?.nombre}
                              </p>
                              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                <span>
                                  {new Date(reserva.fecha).toLocaleDateString('es-ES', {
                                    day: 'numeric',
                                    month: 'short'
                                  })}
                                </span>
                                <span>•</span>
                                <span>{reserva.hora}</span>
                                <span className={cn(
                                  'ml-auto rounded-full px-2 py-0.5 text-xs',
                                  reserva.estado === 'confirmada'
                                    ? 'bg-primary/20 text-primary'
                                    : 'bg-gold/20 text-gold'
                                )}>
                                  {reserva.estado}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
