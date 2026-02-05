import Link from 'next/link'
import { ArrowRight, Leaf, FlaskRound, Heart, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { servicios } from '@/data/servicios'
import { ServiceCard } from '@/components/service-card'

const features = [
  {
    icon: Leaf,
    title: 'Ingredientes Naturales',
    description: 'Utilizamos extractos botánicos de la más alta pureza, respetuosos con tu piel y el medio ambiente.',
  },
  {
    icon: FlaskRound,
    title: 'Ciencia Avanzada',
    description: 'Combinamos tradición con investigación científica para tratamientos efectivos y seguros.',
  },
  {
    icon: Heart,
    title: 'Cuidado Personalizado',
    description: 'Cada tratamiento se adapta a tus necesidades únicas, porque cada persona es diferente.',
  },
  {
    icon: Sparkles,
    title: 'Resultados Visibles',
    description: 'Protocolos probados que transforman tu bienestar desde la primera sesión.',
  },
]

export default function HomePage() {
  const featuredServices = servicios.slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-sand/30 to-cream">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-sage/30 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        </div>
        
        <div className="container relative mx-auto px-4 py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-sage/20 px-4 py-1.5 text-sm font-medium text-forest mb-6">
              Centro de Bienestar Integral
            </span>
            
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-forest md:text-5xl lg:text-6xl">
              Donde la naturaleza y la ciencia se encuentran
            </h1>
            
            <p className="mt-6 text-pretty text-lg text-muted-foreground md:text-xl leading-relaxed">
              Descubre un espacio dedicado a tu bienestar integral. Tratamientos faciales, 
              capilares, corporales y terapias vitamínicas diseñadas para revitalizar 
              tu cuerpo y mente.
            </p>
            
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/servicios">
                <Button size="lg" className="min-w-[200px]">
                  Explorar Servicios
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/agenda">
                <Button variant="outline" size="lg" className="min-w-[200px] bg-transparent">
                  Reservar Cita
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y border-border bg-card py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold text-card-foreground md:text-4xl">
              Nuestra Filosofía
            </h2>
            <p className="mt-4 text-muted-foreground">
              En Raíz Vital creemos que el verdadero bienestar nace de la armonía 
              entre lo natural y lo científico.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-lg border border-border bg-background p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sage/20 text-forest transition-colors group-hover:bg-sage/30">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
                Servicios Destacados
              </h2>
              <p className="mt-2 text-muted-foreground">
                Tratamientos diseñados para tu bienestar integral
              </p>
            </div>
            <Link href="/servicios">
              <Button variant="outline">
                Ver todos los servicios
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((servicio) => (
              <ServiceCard key={servicio.id} servicio={servicio} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold text-cream md:text-4xl">
              Comienza tu viaje hacia el bienestar
            </h2>
            <p className="mt-4 text-cream/80">
              Reserva tu primera consulta y descubre cómo podemos ayudarte a 
              alcanzar tu mejor versión.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/agenda">
                <Button size="lg" className="bg-gold text-forest hover:bg-gold/90 min-w-[200px]">
                  Reservar Ahora
                </Button>
              </Link>
              <Link href="/contacto">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-cream/50 text-cream hover:bg-cream/10 min-w-[200px] bg-transparent"
                >
                  Contactar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
