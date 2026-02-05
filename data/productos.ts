export interface Producto {
  id: string
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  categoria: 'facial' | 'corporal' | 'capilar' | 'suplementos'
  ingredientes: string[]
  stock: number
}

export const productos: Producto[] = [
  {
    id: 'serum-vitamina-c',
    nombre: 'Sérum Vitamina C Radiante',
    descripcion: 'Sérum concentrado con vitamina C pura al 15% para iluminar y proteger la piel.',
    precio: 68,
    imagen: '/images/serum-vitamina-c.jpg',
    categoria: 'facial',
    ingredientes: ['Vitamina C', 'Ácido Ferúlico', 'Vitamina E', 'Extracto de Rosa Mosqueta'],
    stock: 25
  },
  {
    id: 'crema-hidratante-noche',
    nombre: 'Crema Hidratante Nocturna',
    descripcion: 'Crema nutritiva de noche con retinol vegetal y péptidos regeneradores.',
    precio: 85,
    imagen: '/images/crema-noche.jpg',
    categoria: 'facial',
    ingredientes: ['Retinol Vegetal', 'Péptidos', 'Manteca de Karité', 'Aceite de Argán'],
    stock: 18
  },
  {
    id: 'aceite-corporal',
    nombre: 'Aceite Corporal Nutritivo',
    descripcion: 'Mezcla de aceites naturales para una piel suave y nutrida.',
    precio: 52,
    imagen: '/images/aceite-corporal.jpg',
    categoria: 'corporal',
    ingredientes: ['Aceite de Jojoba', 'Aceite de Almendras', 'Vitamina E', 'Extracto de Lavanda'],
    stock: 30
  },
  {
    id: 'exfoliante-corporal',
    nombre: 'Exfoliante Corporal Natural',
    descripcion: 'Exfoliante suave con azúcar de caña y aceites esenciales.',
    precio: 42,
    imagen: '/images/exfoliante.jpg',
    categoria: 'corporal',
    ingredientes: ['Azúcar de Caña', 'Aceite de Coco', 'Sal Marina', 'Aceite Esencial de Menta'],
    stock: 22
  },
  {
    id: 'champu-fortalecedor',
    nombre: 'Champú Fortalecedor',
    descripcion: 'Champú con biotina y extractos vegetales para un cabello fuerte.',
    precio: 38,
    imagen: '/images/champu.jpg',
    categoria: 'capilar',
    ingredientes: ['Biotina', 'Extracto de Ortiga', 'Proteína de Quinoa', 'Aceite de Romero'],
    stock: 35
  },
  {
    id: 'mascarilla-capilar',
    nombre: 'Mascarilla Capilar Intensiva',
    descripcion: 'Tratamiento intensivo para cabello dañado con queratina vegetal.',
    precio: 45,
    imagen: '/images/mascarilla-capilar.jpg',
    categoria: 'capilar',
    ingredientes: ['Queratina Vegetal', 'Aceite de Argán', 'Proteína de Seda', 'Pantenol'],
    stock: 20
  },
  {
    id: 'colageno-bebible',
    nombre: 'Colágeno Bebible Premium',
    descripcion: 'Colágeno hidrolizado marino con vitamina C y ácido hialurónico.',
    precio: 75,
    imagen: '/images/colageno.jpg',
    categoria: 'suplementos',
    ingredientes: ['Colágeno Marino', 'Vitamina C', 'Ácido Hialurónico', 'Extracto de Granada'],
    stock: 40
  },
  {
    id: 'vitaminas-belleza',
    nombre: 'Complejo Vitamínico Belleza',
    descripcion: 'Suplemento con biotina, zinc y vitaminas para piel, cabello y uñas.',
    precio: 48,
    imagen: '/images/vitaminas.jpg',
    categoria: 'suplementos',
    ingredientes: ['Biotina', 'Zinc', 'Vitamina E', 'Selenio', 'Vitamina B12'],
    stock: 50
  },
  {
    id: 'contorno-ojos',
    nombre: 'Contorno de Ojos Rejuvenecedor',
    descripcion: 'Tratamiento específico para el área de los ojos con cafeína y péptidos.',
    precio: 62,
    imagen: '/images/contorno-ojos.jpg',
    categoria: 'facial',
    ingredientes: ['Cafeína', 'Péptidos de Colágeno', 'Vitamina K', 'Extracto de Pepino'],
    stock: 15
  },
  {
    id: 'protector-solar',
    nombre: 'Protector Solar Mineral SPF50',
    descripcion: 'Protección solar de amplio espectro con filtros minerales.',
    precio: 55,
    imagen: '/images/protector-solar.jpg',
    categoria: 'facial',
    ingredientes: ['Óxido de Zinc', 'Dióxido de Titanio', 'Vitamina E', 'Extracto de Aloe Vera'],
    stock: 28
  }
]

export const categoriasProductos = [
  { id: 'facial', nombre: 'Cuidado Facial' },
  { id: 'corporal', nombre: 'Cuidado Corporal' },
  { id: 'capilar', nombre: 'Cuidado Capilar' },
  { id: 'suplementos', nombre: 'Suplementos' }
]
