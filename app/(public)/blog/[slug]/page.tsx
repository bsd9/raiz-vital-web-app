import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { articulos } from '@/data/blog'

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params
  const articulo = articulos.find(a => a.slug === slug)

  if (!articulo) {
    notFound()
  }

  const otherArticles = articulos.filter(a => a.id !== articulo.id).slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-cream via-sand/30 to-cream py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al Blog
            </Link>

            <span className="inline-block rounded-full bg-sage/20 px-3 py-1 text-sm font-medium text-forest">
              {articulo.categoria}
            </span>
            
            <h1 className="mt-4 text-3xl font-semibold text-forest md:text-4xl lg:text-5xl text-balance">
              {articulo.titulo}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/30">
                  <User className="h-4 w-4 text-forest" />
                </div>
                {articulo.autor}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(articulo.fechaPublicacion).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {articulo.tiempoLectura} de lectura
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {/* Featured Image Placeholder */}
            <div className="relative mb-10 h-64 rounded-xl bg-sand/50 md:h-80 lg:h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-sage/30 flex items-center justify-center">
                  <span className="text-4xl font-light text-forest">
                    {articulo.titulo.charAt(0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
              {articulo.contenido.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="mt-8 mb-4 text-2xl font-semibold text-foreground">
                      {paragraph.replace('## ', '')}
                    </h2>
                  )
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="mt-6 mb-3 text-xl font-semibold text-foreground">
                      {paragraph.replace('### ', '')}
                    </h3>
                  )
                }
                if (paragraph.match(/^\d+\./)) {
                  const items = paragraph.split('\n').filter(line => line.trim())
                  return (
                    <ol key={index} className="mt-4 list-decimal pl-6 space-y-2">
                      {items.map((item, i) => (
                        <li key={i} className="text-muted-foreground">
                          {item.replace(/^\d+\.\s*\*\*(.+?)\*\*:?\s*/, '')}
                          {item.match(/\*\*(.+?)\*\*/) && (
                            <strong className="text-foreground">
                              {item.match(/\*\*(.+?)\*\*/)?.[1]}:
                            </strong>
                          )}{' '}
                          {item.replace(/^\d+\.\s*\*\*(.+?)\*\*:?\s*/, '')}
                        </li>
                      ))}
                    </ol>
                  )
                }
                return (
                  <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                )
              })}
            </article>

            {/* Share / CTA */}
            <div className="mt-12 rounded-xl border border-border bg-card p-6 text-center">
              <h3 className="text-lg font-semibold text-card-foreground">
                ¿Te interesa este tratamiento?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Reserva una consulta con nuestros especialistas y descubre 
                cómo podemos ayudarte.
              </p>
              <div className="mt-4">
                <Link href="/agenda">
                  <Button>Reservar Cita</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {otherArticles.length > 0 && (
        <section className="border-t border-border bg-sand/30 py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-2xl font-semibold text-foreground">
              Artículos Relacionados
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherArticles.map((art) => (
                <article
                  key={art.id}
                  className="group rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <div className="relative h-40 bg-sand/50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-sage/30 flex items-center justify-center">
                        <span className="text-xl font-light text-forest">
                          {art.titulo.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="inline-block rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                      {art.categoria}
                    </span>
                    
                    <h3 className="mt-2 text-base font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${art.slug}`}>
                        {art.titulo}
                      </Link>
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {art.tiempoLectura}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
