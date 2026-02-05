export interface Usuario {
  id: string
  email: string
  password: string
  nombre: string
  apellido: string
  telefono: string
  rol: 'cliente' | 'admin'
}

export const usuarios: Usuario[] = [
  {
    id: 'user-1',
    email: 'usuario1@raizvital.com',
    password: 'password123',
    nombre: 'María',
    apellido: 'García',
    telefono: '+34 612 345 678',
    rol: 'cliente'
  },
  {
    id: 'user-2',
    email: 'usuario2@raizvital.com',
    password: 'password123',
    nombre: 'Carlos',
    apellido: 'López',
    telefono: '+34 623 456 789',
    rol: 'cliente'
  },
  {
    id: 'user-3',
    email: 'usuario3@raizvital.com',
    password: 'password123',
    nombre: 'Ana',
    apellido: 'Martínez',
    telefono: '+34 634 567 890',
    rol: 'cliente'
  },
  {
    id: 'user-4',
    email: 'usuario4@raizvital.com',
    password: 'password123',
    nombre: 'Pedro',
    apellido: 'Sánchez',
    telefono: '+34 645 678 901',
    rol: 'cliente'
  },
  {
    id: 'admin-1',
    email: 'admin@raizvital.com',
    password: 'admin123',
    nombre: 'Laura',
    apellido: 'Fernández',
    telefono: '+34 656 789 012',
    rol: 'admin'
  }
]
