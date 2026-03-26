import Link from 'next/link'
import { Check, ArrowRight, Leaf, Heart, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { servicios } from '@/data/servicios'

const benefits = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'Elaboradas con hierbas orgánicas y adaptógenos de la más alta calidad.',
  },
  {
    icon: Heart,
    title: 'Bienestar Integral',
    description: 'Actúan sobre el cuerpo y la mente para un equilibrio completo.',
  },
  {
    icon: Moon,
    title: 'Efecto Relajante',
    description: 'Fórmulas diseñadas para reducir el estrés y promover la calma interior.',
  },
  {
    icon: Sun,
    title: 'Vitalidad Diaria',
    description: 'Refuerzan tu sistema inmune y te ayudan a sentirte mejor cada día.',
  },
]

export default function InfusionesPage() {
  const infusiones = servicios.filter(s => s.categoria === 'infusiones')

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-sand/30 to-cream py-16 lg:py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
          <div className="absolute bottom-10 right-20 h-80 w-80 rounded-full bg-sage/30 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-gold/20 px-4 py-1.5 text-sm font-medium text-forest mb-4">
              Terapias Naturales
            </span>
            <h1 className="text-4xl font-semibold text-forest md:text-5xl lg:text-6xl text-balance">
              Infusiones Terapéuticas
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl leading-relaxed">
              Bebidas naturales elaboradas con hierbas adaptógenas y nutrientes esenciales.
              Un camino suave y efectivo hacia el equilibrio, la calma 
              y el fortalecimiento de tu organismo.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/agenda">
                <Button size="lg">
                  Reservar Sesión
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/sueros">
                <Button variant="outline" size="lg">
                  Ver Sueroterapia
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
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-forest">
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

      {/* Infusiones Treatments */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              Nuestras Infusiones
            </h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Cada infusión es preparada con ingredientes naturales seleccionados por 
              sus propiedades terapéuticas comprobadas.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {infusiones.map((servicio) => (
              <div
                key={servicio.id}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-gold/50 hover:shadow-lg"
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
                        <Check className="h-4 w-4 shrink-0 text-gold" />
                        {beneficio}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
                  <div>
                    <span className="text-2xl font-bold text-gold">
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

      {/* How it works */}
      <section className="bg-sand/30 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-semibold text-foreground md:text-4xl">
              ¿Cómo funciona?
            </h2>

            <div className="mt-10 space-y-6">
              <div className="flex gap-4 rounded-lg border border-border bg-card p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-forest">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Consulta Inicial</h3>
                  <p className="mt-1 text-muted-foreground leading-relaxed">
                    Nuestro especialista evalúa tu estado de salud, estilo de vida 
                    y objetivos para recomendarte la infusión más adecuada.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg border border-border bg-card p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-forest">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Preparación Personalizada</h3>
                  <p className="mt-1 text-muted-foreground leading-relaxed">
                    Tu infusión se prepara al momento con ingredientes frescos 
                    y de la más alta calidad, ajustada a tus necesidades.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg border border-border bg-card p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-forest">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Sesión Relajante</h3>
                  <p className="mt-1 text-muted-foreground leading-relaxed">
                    Disfruta de tu infusión en un ambiente tranquilo durante aproximadamente 
                    30 minutos mientras tu cuerpo absorbe los nutrientes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-semibold text-foreground md:text-4xl">
              Preguntas Frecuentes
            </h2>

            <div className="mt-10 space-y-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-card-foreground">
                  ¿Qué diferencia hay entre infusiones y sueroterapia?
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Las infusiones terapéuticas son bebidas naturales elaboradas con hierbas 
                  y adaptógenos que se consumen de forma oral. La sueroterapia, en cambio, 
                  administra nutrientes directamente al torrente sanguíneo por vía intravenosa 
                  para una absorción más rápida y concentrada.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-card-foreground">
                  ¿Con qué frecuencia puedo tomar infusiones?
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Nuestras infusiones son suaves y seguras para consumo regular. 
                  Dependiendo de la fórmula, pueden tomarse entre 2 y 4 veces por semana. 
                  Tu especialista te indicará la frecuencia ideal según tus objetivos.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-card-foreground">
                  ¿Tienen efectos secundarios?
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Al ser 100% naturales, nuestras infusiones son bien toleradas 
                  por la mayoría de personas. Siempre realizamos una consulta previa 
                  para verificar posibles alergias o interacciones con medicamentos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
