export interface ArticuloBlog {
  id: string
  titulo: string
  slug: string
  extracto: string
  contenido: string
  imagen: string
  autor: string
  categoria: string
  fechaPublicacion: string
  tiempoLectura: string
}

export const articulos: ArticuloBlog[] = [
  {
    id: 'art-1',
    titulo: 'Los Beneficios de la Sueroterapia para tu Salud',
    slug: 'beneficios-sueroterapia',
    extracto: 'Descubre cómo la terapia intravenosa de vitaminas puede transformar tu bienestar.',
    contenido: `La sueroterapia, también conocida como terapia intravenosa de nutrientes, es una técnica que permite la administración directa de vitaminas, minerales y otros nutrientes esenciales al torrente sanguíneo.

## ¿Por qué elegir la sueroterapia?

A diferencia de los suplementos orales, que deben pasar por el sistema digestivo donde se pierde gran parte de su potencia, la administración intravenosa garantiza una absorción del 100% de los nutrientes.

## Beneficios principales:

1. **Energía inmediata**: Sentirás un aumento de vitalidad desde la primera sesión.
2. **Sistema inmune fortalecido**: Los nutrientes apoyan directamente las defensas del cuerpo.
3. **Hidratación profunda**: Ideal para combatir los efectos de la deshidratación.
4. **Recuperación acelerada**: Perfecta después de entrenamientos intensos o periodos de estrés.

## ¿Es segura?

En Raíz Vital, todos nuestros tratamientos son supervisados por profesionales médicos certificados, utilizando únicamente productos de la más alta calidad.`,
    imagen: '/images/blog-sueroterapia.jpg',
    autor: 'Dra. Elena Vega',
    categoria: 'Sueroterapia',
    fechaPublicacion: '2026-01-15',
    tiempoLectura: '5 min'
  },
  {
    id: 'art-2',
    titulo: 'Rutina de Skincare Natural: Guía Completa',
    slug: 'rutina-skincare-natural',
    extracto: 'Aprende a crear una rutina de cuidado facial efectiva con ingredientes naturales.',
    contenido: `Una rutina de skincare bien diseñada es la base para una piel saludable y radiante. En este artículo, te guiaremos paso a paso para crear tu rutina perfecta.

## Paso 1: Limpieza

La limpieza es fundamental. Utiliza un limpiador suave que respete el pH natural de tu piel.

## Paso 2: Tonificación

Un tónico sin alcohol ayuda a equilibrar y preparar la piel para los siguientes productos.

## Paso 3: Sérum

Los sérums concentrados penetran profundamente para tratar preocupaciones específicas como arrugas, manchas o deshidratación.

## Paso 4: Hidratación

Una crema hidratante sella la humedad y protege la barrera cutánea.

## Paso 5: Protección Solar

Nunca olvides el protector solar durante el día. Es el producto antiedad más importante.`,
    imagen: '/images/blog-skincare.jpg',
    autor: 'Lic. Sofía Ruiz',
    categoria: 'Cuidado Facial',
    fechaPublicacion: '2026-01-22',
    tiempoLectura: '7 min'
  },
  {
    id: 'art-3',
    titulo: 'Alimentación y Cabello: Lo Que Debes Saber',
    slug: 'alimentacion-cabello-saludable',
    extracto: 'La salud capilar comienza desde adentro. Conoce los nutrientes esenciales.',
    contenido: `Tu cabello es un reflejo de tu salud interna. Una alimentación equilibrada puede marcar la diferencia entre un cabello débil y uno fuerte y brillante.

## Nutrientes clave para el cabello:

### Proteínas
El cabello está compuesto principalmente de queratina, una proteína. Incluye carnes magras, pescado, huevos y legumbres en tu dieta.

### Biotina
Esta vitamina del complejo B es esencial para la producción de queratina. Encuéntrala en yemas de huevo, nueces y aguacates.

### Hierro
La deficiencia de hierro es una causa común de caída del cabello. Consume espinacas, lentejas y carnes rojas.

### Zinc
Este mineral apoya la reparación del tejido capilar. Las ostras, semillas de calabaza y garbanzos son excelentes fuentes.

### Omega-3
Los ácidos grasos esenciales nutren el folículo capilar. Incluye salmón, sardinas y semillas de chía.`,
    imagen: '/images/blog-cabello.jpg',
    autor: 'Dr. Miguel Torres',
    categoria: 'Cuidado Capilar',
    fechaPublicacion: '2026-01-28',
    tiempoLectura: '6 min'
  },
  {
    id: 'art-4',
    titulo: 'Técnicas de Relajación para el Bienestar Integral',
    slug: 'tecnicas-relajacion-bienestar',
    extracto: 'Incorpora estas prácticas en tu vida diaria para reducir el estrés.',
    contenido: `El estrés crónico afecta no solo nuestra salud mental, sino también nuestra piel, cabello y bienestar general. Aquí te compartimos técnicas efectivas de relajación.

## Respiración Consciente

Dedica 5 minutos al día a respirar profundamente. Inhala por la nariz contando hasta 4, mantén 4 segundos, y exhala por la boca contando hasta 6.

## Meditación Guiada

Comienza con sesiones cortas de 10 minutos. Existen muchas aplicaciones que pueden ayudarte a empezar.

## Escaneo Corporal

Acuéstate cómodamente y lleva tu atención a cada parte del cuerpo, desde los pies hasta la cabeza, liberando la tensión conscientemente.

## Aromaterapia

Los aceites esenciales como lavanda, manzanilla y sándalo pueden promover la relajación cuando se difunden o se aplican diluidos.

## Baños Terapéuticos

Un baño caliente con sales de Epsom y aceites esenciales al final del día puede hacer maravillas para tu descanso.`,
    imagen: '/images/blog-relajacion.jpg',
    autor: 'Lic. Andrea Molina',
    categoria: 'Bienestar',
    fechaPublicacion: '2026-02-01',
    tiempoLectura: '5 min'
  }
]
