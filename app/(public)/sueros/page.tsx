import Link from 'next/link'
import { Check, ArrowRight, Droplets, Zap, Shield, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { servicios } from '@/data/servicios'

const benefits = [
  {
    icon: Droplets,
    title: 'Absorción Completa',
    description: 'Los nutrientes van directamente al torrente sanguíneo, garantizando una absorción del 100%.',
  },
  {
    icon: Zap,
    title: 'Resultados Inmediatos',
    description: 'Siente el efecto desde la primera sesión con un aumento notable de energía y vitalidad.',
  },
  {
    icon: Shield,
    title: 'Seguridad Médica',
    description: 'Todos los tratamientos son supervisados por profesionales de salud certificados.',
  },
  {
    icon: Sparkles,
    title: 'Personalización',
    description: 'Fórmulas adaptadas a tus necesidades específicas y objetivos de bienestar.',
  },
]

export default function SuerosPage() {
  const sueroterapia = servicios.filter(s => s.categoria === 'sueroterapia')

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-sand/30 to-cream py-16 lg:py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 h-64 w-64 rounded-full bg-sage/40 blur-3xl" />
          <div className="absolute bottom-10 left-20 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-sage/20 px-4 py-1.5 text-sm font-medium text-forest mb-4">
              Terapia Intravenosa
            </span>
            <h1 className="text-4xl font-semibold text-forest md:text-5xl lg:text-6xl text-balance">
              Sueroterapia
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl leading-relaxed">
              Nutrición de precisión administrada directamente a tu organismo por vía intravenosa. 
              Vitaminas, minerales y antioxidantes en alta concentración para restaurar 
              tu energía y potenciar tu bienestar desde el interior.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/agenda">
                <Button size="lg">
                  Reservar Sesión
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/infusiones">
                <Button variant="outline" size="lg">
                  Ver Infusiones
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-b border-border bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/20 text-forest">
                  <benefit.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sueroterapia Treatments */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              Nuestros Sueros
            </h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Tratamientos de alta concentración vitamínica administrados por vía intravenosa 
              para una absorción inmediata y completa.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {sueroterapia.map((servicio) => (
              <div
                key={servicio.id}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-card-foreground">
                  {servicio.nombre}
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {servicio.descripcionLarga}
                </p>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-card-foreground">
                    Beneficios:
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {servicio.beneficios.map((beneficio) => (
                      <li key={beneficio} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                        {beneficio}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      {servicio.precio}€
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      / {servicio.duracion}
                    </span>
                  </div>
                  <Link href={`/agenda?servicio=${servicio.id}`}>
                    <Button>Reservar</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-sand/30 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-semibold text-foreground md:text-4xl">
              Preguntas Frecuentes
            </h2>
            
            <div className="mt-10 space-y-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-card-foreground">
                  ¿Es segura la sueroterapia?
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Sí, todos nuestros tratamientos son administrados por profesionales 
                  de salud certificados utilizando productos de grado farmacéutico. 
                  Realizamos una evaluación previa para asegurar que el tratamiento 
                  sea adecuado para ti.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-card-foreground">
                  ¿Cuánto dura una sesión?
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Las sesiones de sueroterapia duran aproximadamente 45 minutos. 
                  Te recomendamos llegar 10 minutos antes de tu cita para la evaluación inicial.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-card-foreground">
                  ¿Con qué frecuencia debo recibir tratamiento?
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  La frecuencia depende de tus objetivos y estado de salud. 
                  Generalmente recomendamos sesiones semanales o quincenales al inicio, 
                  y luego sesiones de mantenimiento mensuales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
