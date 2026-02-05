'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { 
  horariosDisponibles, 
  reservasIniciales, 
  type HorarioDisponible, 
  type Reserva 
} from '@/data/agendas'
import { servicios, type Servicio } from '@/data/servicios'

interface AgendaContextType {
  horarios: HorarioDisponible[]
  reservas: Reserva[]
  serviciosAdmin: Servicio[]
  getHorariosForServicio: (servicioId: string) => HorarioDisponible[]
  getHorariosForFecha: (fecha: string) => HorarioDisponible[]
  getReservasForUsuario: (usuarioId: string) => Reserva[]
  getReservasForServicio: (servicioId: string) => Reserva[]
  getReservasForFecha: (fecha: string) => Reserva[]
  crearReserva: (reserva: Omit<Reserva, 'id' | 'createdAt'>) => Reserva
  cancelarReserva: (reservaId: string) => void
  confirmarReserva: (reservaId: string) => void
  addServicio: (servicio: Omit<Servicio, 'id'>) => Servicio
  updateServicio: (id: string, servicio: Partial<Servicio>) => void
  deleteServicio: (id: string) => void
  addHorario: (horario: Omit<HorarioDisponible, 'id'>) => void
}

const AgendaContext = createContext<AgendaContextType | undefined>(undefined)

export function AgendaProvider({ children }: { children: ReactNode }) {
  const [horarios, setHorarios] = useState<HorarioDisponible[]>(horariosDisponibles)
  const [reservas, setReservas] = useState<Reserva[]>(reservasIniciales)
  const [serviciosAdmin, setServiciosAdmin] = useState<Servicio[]>(servicios)

  const getHorariosForServicio = useCallback((servicioId: string) => {
    return horarios.filter(h => h.servicioId === servicioId && h.disponible)
  }, [horarios])

  const getHorariosForFecha = useCallback((fecha: string) => {
    return horarios.filter(h => h.fecha === fecha)
  }, [horarios])

  const getReservasForUsuario = useCallback((usuarioId: string) => {
    return reservas.filter(r => r.usuarioId === usuarioId)
  }, [reservas])

  const getReservasForServicio = useCallback((servicioId: string) => {
    return reservas.filter(r => r.servicioId === servicioId)
  }, [reservas])

  const getReservasForFecha = useCallback((fecha: string) => {
    return reservas.filter(r => r.fecha === fecha)
  }, [reservas])

  const crearReserva = useCallback((reservaData: Omit<Reserva, 'id' | 'createdAt'>): Reserva => {
    const newReserva: Reserva = {
      ...reservaData,
      id: `reserva-${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    
    setReservas(current => [...current, newReserva])
    
    // Mark the schedule as unavailable
    setHorarios(current =>
      current.map(h =>
        h.id === reservaData.horarioId ? { ...h, disponible: false } : h
      )
    )
    
    return newReserva
  }, [])

  const cancelarReserva = useCallback((reservaId: string) => {
    setReservas(current =>
      current.map(r =>
        r.id === reservaId ? { ...r, estado: 'cancelada' } : r
      )
    )
    
    // Make the schedule available again
    const reserva = reservas.find(r => r.id === reservaId)
    if (reserva) {
      setHorarios(current =>
        current.map(h =>
          h.id === reserva.horarioId ? { ...h, disponible: true } : h
        )
      )
    }
  }, [reservas])

  const confirmarReserva = useCallback((reservaId: string) => {
    setReservas(current =>
      current.map(r =>
        r.id === reservaId ? { ...r, estado: 'confirmada' } : r
      )
    )
  }, [])

  const addServicio = useCallback((servicioData: Omit<Servicio, 'id'>): Servicio => {
    const newServicio: Servicio = {
      ...servicioData,
      id: `servicio-${Date.now()}`
    }
    setServiciosAdmin(current => [...current, newServicio])
    return newServicio
  }, [])

  const updateServicio = useCallback((id: string, updates: Partial<Servicio>) => {
    setServiciosAdmin(current =>
      current.map(s => (s.id === id ? { ...s, ...updates } : s))
    )
  }, [])

  const deleteServicio = useCallback((id: string) => {
    setServiciosAdmin(current => current.filter(s => s.id !== id))
  }, [])

  const addHorario = useCallback((horarioData: Omit<HorarioDisponible, 'id'>) => {
    const newHorario: HorarioDisponible = {
      ...horarioData,
      id: `${horarioData.fecha}-${horarioData.hora}-${horarioData.servicioId}`
    }
    setHorarios(current => [...current, newHorario])
  }, [])

  return (
    <AgendaContext.Provider
      value={{
        horarios,
        reservas,
        serviciosAdmin,
        getHorariosForServicio,
        getHorariosForFecha,
        getReservasForUsuario,
        getReservasForServicio,
        getReservasForFecha,
        crearReserva,
        cancelarReserva,
        confirmarReserva,
        addServicio,
        updateServicio,
        deleteServicio,
        addHorario
      }}
    >
      {children}
    </AgendaContext.Provider>
  )
}

export function useAgenda() {
  const context = useContext(AgendaContext)
  if (context === undefined) {
    throw new Error('useAgenda must be used within an AgendaProvider')
  }
  return context
}
