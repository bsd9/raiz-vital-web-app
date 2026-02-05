'use client'

import React from "react"

import { useState, useMemo } from 'react'
import { Plus, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAgenda } from '@/context/agenda-context'
import { servicios } from '@/data/servicios'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const profesionales = ['Dra. Elena Vega', 'Dr. Miguel Torres', 'Lic. Sofía Ruiz', 'Lic. Andrea Molina']
const horas = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00']

export default function AdminAgendasPage() {
  const { horarios, addHorario, getHorariosForFecha } = useAgenda()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0]
  })
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date()
    const day = today.getDay()
    const diff = today.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(today.setDate(diff))
  })

  const [newHorario, setNewHorario] = useState({
    servicioId: servicios[0].id,
    fecha: new Date().toISOString().split('T')[0],
    hora: '09:00',
    profesional: profesionales[0]
  })

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

  const horariosDelDia = getHorariosForFecha(selectedDate)

  const handlePrevWeek = () => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentWeekStart(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentWeekStart(newDate)
  }

  const handleCreateHorario = (e: React.FormEvent) => {
    e.preventDefault()
    addHorario({
      ...newHorario,
      disponible: true
    })
    setIsDialogOpen(false)
    setNewHorario({
      servicioId: servicios[0].id,
      fecha: new Date().toISOString().split('T')[0],
      hora: '09:00',
      profesional: profesionales[0]
    })
  }

  // Group schedules by service
  const horariosPorServicio = useMemo(() => {
    const grouped: Record<string, typeof horariosDelDia> = {}
    for (const horario of horariosDelDia) {
      if (!grouped[horario.servicioId]) {
        grouped[horario.servicioId] = []
      }
      grouped[horario.servicioId].push(horario)
    }
    return grouped
  }, [horariosDelDia])

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Gestión de Agendas</h1>
          <p className="mt-1 text-muted-foreground">
            Administra los horarios disponibles para cada servicio
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Horario
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Crear Horario</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateHorario} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="servicio">Servicio</Label>
                <select
                  id="servicio"
                  value={newHorario.servicioId}
                  onChange={e => setNewHorario({ ...newHorario, servicioId: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {servicios.map(s => (
                    <option key={s.id} value={s.id}>{s.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={newHorario.fecha}
                  onChange={e => setNewHorario({ ...newHorario, fecha: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hora">Hora</Label>
                <select
                  id="hora"
                  value={newHorario.hora}
                  onChange={e => setNewHorario({ ...newHorario, hora: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {horas.map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profesional">Profesional</Label>
                <select
                  id="profesional"
                  value={newHorario.profesional}
                  onChange={e => setNewHorario({ ...newHorario, profesional: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {profesionales.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Crear Horario
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Week Calendar View */}
      <div className="rounded-lg border border-border bg-card p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={handlePrevWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium text-card-foreground">
            {new Date(currentWeekStart).toLocaleDateString('es-ES', {
              month: 'long',
              year: 'numeric'
            })}
          </span>
          <Button variant="ghost" size="icon" onClick={handleNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, i) => (
            <div key={i} className="text-center text-xs font-medium text-muted-foreground py-1">
              {day}
            </div>
          ))}
          {weekDates.map(date => {
            const dateObj = new Date(date)
            const isSunday = dateObj.getDay() === 0
            const horarioCount = getHorariosForFecha(date).length
            
            return (
              <button
                key={date}
                disabled={isSunday}
                onClick={() => setSelectedDate(date)}
                className={cn(
                  'flex flex-col items-center rounded-lg p-2 transition-all',
                  selectedDate === date
                    ? 'bg-primary text-primary-foreground'
                    : isSunday
                      ? 'text-muted-foreground/50 cursor-not-allowed'
                      : 'hover:bg-muted text-card-foreground'
                )}
              >
                <span className="text-sm font-medium">{dateObj.getDate()}</span>
                {horarioCount > 0 && (
                  <span className={cn(
                    'mt-1 text-xs',
                    selectedDate === date ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  )}>
                    {horarioCount} slots
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Day Schedule */}
      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="flex items-center gap-2 font-semibold text-card-foreground">
            <Calendar className="h-5 w-5 text-primary" />
            Agenda del {new Date(selectedDate).toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </h2>
        </div>
        <div className="p-6">
          {Object.keys(horariosPorServicio).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(horariosPorServicio).map(([servicioId, slots]) => {
                const servicio = servicios.find(s => s.id === servicioId)
                return (
                  <div key={servicioId}>
                    <h3 className="font-medium text-card-foreground mb-3">
                      {servicio?.nombre}
                    </h3>
                    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {slots.sort((a, b) => a.hora.localeCompare(b.hora)).map(slot => (
                        <div
                          key={slot.id}
                          className={cn(
                            'rounded-md border p-3 text-sm',
                            slot.disponible
                              ? 'border-primary/30 bg-primary/10'
                              : 'border-border bg-muted'
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-card-foreground">
                              {slot.hora}
                            </span>
                            <span className={cn(
                              'rounded-full px-2 py-0.5 text-xs',
                              slot.disponible
                                ? 'bg-primary/20 text-primary'
                                : 'bg-muted-foreground/20 text-muted-foreground'
                            )}>
                              {slot.disponible ? 'Disponible' : 'Ocupado'}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {slot.profesional}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground/30" />
              <p className="mt-2 text-muted-foreground">
                No hay horarios programados para este día
              </p>
              <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Crear Horario
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
