export interface HorarioDisponible {
  id: string
  servicioId: string
  fecha: string
  hora: string
  profesional: string
  disponible: boolean
}

export interface Reserva {
  id: string
  usuarioId: string
  horarioId: string
  servicioId: string
  fecha: string
  hora: string
  profesional: string
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada'
  notas?: string
  createdAt: string
}

// Generate available schedules for the next 14 days
const generateHorarios = (): HorarioDisponible[] => {
  const horarios: HorarioDisponible[] = []
  const servicios = [
    'facial-hidratante', 'facial-antiedad', 
    'capilar-regenerador', 'capilar-anticaida',
    'corporal-reafirmante', 'corporal-detox',
    'sueroterapia-energia', 'sueroterapia-belleza',
    'infusion-relax', 'infusion-inmunidad'
  ]
  const profesionales = ['Dra. Elena Vega', 'Dr. Miguel Torres', 'Lic. Sofía Ruiz', 'Lic. Andrea Molina']
  const horas = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00']
  
  const today = new Date()
  
  for (let day = 0; day < 14; day++) {
    const fecha = new Date(today)
    fecha.setDate(today.getDate() + day)
    const fechaStr = fecha.toISOString().split('T')[0]
    
    // Skip Sundays
    if (fecha.getDay() === 0) continue
    
    for (const servicioId of servicios) {
      for (const hora of horas) {
        // Randomly assign availability and professional
        const profesional = profesionales[Math.floor(Math.random() * profesionales.length)]
        const disponible = Math.random() > 0.3 // 70% available
        
        horarios.push({
          id: `${fechaStr}-${hora}-${servicioId}`,
          servicioId,
          fecha: fechaStr,
          hora,
          profesional,
          disponible
        })
      }
    }
  }
  
  return horarios
}

export const horariosDisponibles: HorarioDisponible[] = generateHorarios()

export const reservasIniciales: Reserva[] = [
  {
    id: 'reserva-1',
    usuarioId: 'user-1',
    horarioId: '2026-02-05-10:00-facial-hidratante',
    servicioId: 'facial-hidratante',
    fecha: '2026-02-05',
    hora: '10:00',
    profesional: 'Dra. Elena Vega',
    estado: 'confirmada',
    createdAt: '2026-02-01T10:30:00Z'
  },
  {
    id: 'reserva-2',
    usuarioId: 'user-2',
    horarioId: '2026-02-06-15:00-corporal-detox',
    servicioId: 'corporal-detox',
    fecha: '2026-02-06',
    hora: '15:00',
    profesional: 'Lic. Sofía Ruiz',
    estado: 'pendiente',
    createdAt: '2026-02-02T14:00:00Z'
  },
  {
    id: 'reserva-3',
    usuarioId: 'user-3',
    horarioId: '2026-02-07-11:00-sueroterapia-energia',
    servicioId: 'sueroterapia-energia',
    fecha: '2026-02-07',
    hora: '11:00',
    profesional: 'Dr. Miguel Torres',
    estado: 'confirmada',
    createdAt: '2026-02-03T09:15:00Z'
  },
  {
    id: 'reserva-4',
    usuarioId: 'user-1',
    horarioId: '2026-02-08-16:00-capilar-regenerador',
    servicioId: 'capilar-regenerador',
    fecha: '2026-02-08',
    hora: '16:00',
    profesional: 'Lic. Andrea Molina',
    estado: 'pendiente',
    createdAt: '2026-02-03T11:45:00Z'
  }
]
