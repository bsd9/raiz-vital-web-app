export interface Servicio {
  id: string
  nombre: string
  descripcion: string
  descripcionLarga: string
  precio: number
  duracion: string
  categoria: 'facial' | 'capilar' | 'corporal' | 'sueroterapia' | 'infusiones'
  imagen: string
  beneficios: string[]
}

export const servicios: Servicio[] = [
  {
    id: 'facial-hidratante',
    nombre: 'Tratamiento Facial Hidratante',
    descripcion: 'Hidratación profunda con activos naturales para una piel radiante.',
    descripcionLarga: 'Nuestro tratamiento facial hidratante utiliza una combinación de ácido hialurónico de origen vegetal y extractos botánicos para restaurar la barrera cutánea y proporcionar una hidratación duradera.',
    precio: 120,
    duracion: '60 min',
    categoria: 'facial',
    imagen: '/images/facial-hidratante.jpg',
    beneficios: ['Hidratación profunda', 'Restauración de la barrera cutánea', 'Luminosidad inmediata', 'Efecto antiedad']
  },
  {
    id: 'facial-antiedad',
    nombre: 'Tratamiento Antiedad Premium',
    descripcion: 'Rejuvenecimiento celular con tecnología avanzada y extractos premium.',
    descripcionLarga: 'Combinamos la ciencia más avanzada con ingredientes naturales de alta pureza para combatir los signos del envejecimiento de forma efectiva y segura.',
    precio: 180,
    duracion: '90 min',
    categoria: 'facial',
    imagen: '/images/facial-antiedad.jpg',
    beneficios: ['Reducción de arrugas', 'Firmeza mejorada', 'Regeneración celular', 'Luminosidad juvenil']
  },
  {
    id: 'capilar-regenerador',
    nombre: 'Tratamiento Capilar Regenerador',
    descripcion: 'Fortalecimiento y nutrición profunda para un cabello saludable.',
    descripcionLarga: 'Tratamiento intensivo que combina proteínas, vitaminas y extractos botánicos para fortalecer el cabello desde la raíz hasta las puntas.',
    precio: 95,
    duracion: '45 min',
    categoria: 'capilar',
    imagen: '/images/capilar-regenerador.jpg',
    beneficios: ['Fortalecimiento capilar', 'Reducción de caída', 'Brillo natural', 'Hidratación del cuero cabelludo']
  },
  {
    id: 'capilar-anticaida',
    nombre: 'Terapia Anticaída Avanzada',
    descripcion: 'Estimulación folicular con factores de crecimiento naturales.',
    descripcionLarga: 'Protocolo especializado que combina mesoterapia capilar con activos estimulantes para frenar la caída y promover el crecimiento de nuevo cabello.',
    precio: 150,
    duracion: '60 min',
    categoria: 'capilar',
    imagen: '/images/capilar-anticaida.jpg',
    beneficios: ['Estimulación folicular', 'Reducción de caída', 'Mayor densidad', 'Cuero cabelludo saludable']
  },
  {
    id: 'corporal-reafirmante',
    nombre: 'Tratamiento Corporal Reafirmante',
    descripcion: 'Tonificación y firmeza con técnicas de última generación.',
    descripcionLarga: 'Combina masaje modelador con aparatología de vanguardia y activos reafirmantes para mejorar la textura y firmeza de la piel.',
    precio: 140,
    duracion: '75 min',
    categoria: 'corporal',
    imagen: '/images/corporal-reafirmante.jpg',
    beneficios: ['Mayor firmeza', 'Reducción de flacidez', 'Contorno definido', 'Piel más tersa']
  },
  {
    id: 'corporal-detox',
    nombre: 'Ritual Detox Corporal',
    descripcion: 'Desintoxicación profunda con envolturas de algas y arcillas.',
    descripcionLarga: 'Protocolo de desintoxicación que utiliza algas marinas, arcillas purificantes y drenaje linfático para eliminar toxinas y revitalizar el organismo.',
    precio: 160,
    duracion: '90 min',
    categoria: 'corporal',
    imagen: '/images/corporal-detox.jpg',
    beneficios: ['Eliminación de toxinas', 'Reducción de retención', 'Mejora circulatoria', 'Sensación de ligereza']
  },
  {
    id: 'sueroterapia-energia',
    nombre: 'Suero de Energía Vital',
    descripcion: 'Cocktail vitamínico intravenoso para máxima vitalidad.',
    descripcionLarga: 'Infusión intravenosa de vitaminas del complejo B, vitamina C y minerales esenciales para combatir el cansancio y restaurar la energía.',
    precio: 200,
    duracion: '45 min',
    categoria: 'sueroterapia',
    imagen: '/images/suero-energia.jpg',
    beneficios: ['Aumento de energía', 'Mejora del rendimiento', 'Reducción del estrés', 'Sistema inmune fortalecido']
  },
  {
    id: 'sueroterapia-belleza',
    nombre: 'Suero de Belleza Radiante',
    descripcion: 'Nutrientes esenciales para piel, cabello y uñas.',
    descripcionLarga: 'Fórmula especializada con biotina, colágeno, antioxidantes y ácido hialurónico para potenciar la belleza desde el interior.',
    precio: 220,
    duracion: '45 min',
    categoria: 'sueroterapia',
    imagen: '/images/suero-belleza.jpg',
    beneficios: ['Piel luminosa', 'Cabello fortalecido', 'Uñas más fuertes', 'Antienvejecimiento celular']
  },
  {
    id: 'infusion-relax',
    nombre: 'Infusión Relajante Natural',
    descripcion: 'Combinación de adaptógenos para calma y bienestar.',
    descripcionLarga: 'Infusión de hierbas adaptógenas como ashwagandha, valeriana y pasiflora para reducir el estrés y promover un sueño reparador.',
    precio: 85,
    duracion: '30 min',
    categoria: 'infusiones',
    imagen: '/images/infusion-relax.jpg',
    beneficios: ['Reducción del estrés', 'Mejor calidad de sueño', 'Equilibrio emocional', 'Relajación muscular']
  },
  {
    id: 'infusion-inmunidad',
    nombre: 'Infusión Inmunidad Plus',
    descripcion: 'Potenciador del sistema inmunológico con vitaminas y minerales.',
    descripcionLarga: 'Fórmula diseñada para fortalecer las defensas naturales del cuerpo con vitamina C, zinc, equinácea y propóleo.',
    precio: 95,
    duracion: '30 min',
    categoria: 'infusiones',
    imagen: '/images/infusion-inmunidad.jpg',
    beneficios: ['Sistema inmune fuerte', 'Prevención de resfriados', 'Mayor resistencia', 'Recuperación acelerada']
  }
]

export const categorias = [
  { id: 'facial', nombre: 'Facial', descripcion: 'Tratamientos especializados para el rostro' },
  { id: 'capilar', nombre: 'Capilar', descripcion: 'Cuidado integral del cabello y cuero cabelludo' },
  { id: 'corporal', nombre: 'Corporal', descripcion: 'Tratamientos para el cuerpo completo' },
  { id: 'sueroterapia', nombre: 'Sueroterapia', descripcion: 'Infusiones intravenosas de nutrientes' },
  { id: 'infusiones', nombre: 'Infusiones', descripcion: 'Bebidas terapéuticas naturales' }
]
