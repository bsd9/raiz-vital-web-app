import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { articulos } from '@/data/blog'

export default function BlogPage() {
  const featuredArticle = articulos[0]
  const otherArticles = articulos.slice(1)

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-cream via-sand/30 to-cream py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-sage/20 px-4 py-1.5 text-sm font-medium text-forest mb-4">
              Conocimiento y Bienestar
            </span>
            <h1 className="text-4xl font-semibold text-forest md:text-5xl">
              Blog de Raíz Vital
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Artículos, consejos y guías para tu bienestar integral. 
              Aprende sobre tratamientos, cuidado personal y salud natural.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-xl border border-border bg-card overflow-hidden lg:grid lg:grid-cols-2">
            {/* Image placeholder */}
            <div className="relative h-64 bg-sage/20 lg:h-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-sage/30 flex items-center justify-center">
                  <span className="text-4xl font-light text-forest">
                    {featuredArticle.titulo.charAt(0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {featuredArticle.categoria}
              </span>
              
              <h2 className="mt-4 text-2xl font-semibold text-card-foreground lg:text-3xl">
                {featuredArticle.titulo}
              </h2>
              
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {featuredArticle.extracto}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {featuredArticle.autor}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(featuredArticle.fechaPublicacion).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {featuredArticle.tiempoLectura}
                </div>
              </div>

              <div className="mt-6">
                <Link href={`/blog/${featuredArticle.slug}`}>
                  <Button>
                    Leer Artículo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-16 lg:pb-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-semibold text-foreground">
            Más Artículos
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherArticles.map((articulo, index) => (
              <article
                key={articulo.id}
                className="group rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image placeholder */}
                <div className="relative h-48 bg-sand/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-sage/30 flex items-center justify-center">
                      <span className="text-2xl font-light text-forest">
                        {articulo.titulo.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <span className="inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                    {articulo.categoria}
                  </span>
                  
                  <h3 className="mt-3 text-lg font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${articulo.slug}`}>
                      {articulo.titulo}
                    </Link>
                  </h3>
                  
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {articulo.extracto}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(articulo.fechaPublicacion).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {articulo.tiempoLectura}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-border bg-forest py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-semibold text-cream md:text-3xl">
              Suscríbete a nuestro newsletter
            </h2>
            <p className="mt-3 text-cream/80">
              Recibe consejos de bienestar, novedades y ofertas exclusivas 
              directamente en tu correo.
            </p>
            <form className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 rounded-lg border border-cream/20 bg-cream/10 px-4 py-3 text-cream placeholder:text-cream/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <Button className="bg-gold text-forest hover:bg-gold/90">
                Suscribirme
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
