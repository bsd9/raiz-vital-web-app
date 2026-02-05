import Link from 'next/link'
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  servicios: [
    { href: '/servicios', label: 'Tratamientos Faciales' },
    { href: '/servicios', label: 'Tratamientos Capilares' },
    { href: '/servicios', label: 'Tratamientos Corporales' },
    { href: '/sueros', label: 'Sueroterapia' },
    { href: '/sueros', label: 'Infusiones' },
  ],
  empresa: [
    { href: '/blog', label: 'Blog' },
    { href: '/contacto', label: 'Contacto' },
    { href: '/agenda', label: 'Reservas' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-forest text-cream">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage">
                <span className="text-lg font-semibold text-forest">RV</span>
              </div>
              <span className="text-xl font-semibold">Raíz Vital</span>
            </div>
            <p className="text-sm text-cream/80 leading-relaxed">
              Centro de bienestar integral que combina la sabiduría de la naturaleza 
              con los avances de la ciencia moderna.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 transition-colors hover:text-gold"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 transition-colors hover:text-gold"
                aria-label="Síguenos en Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Servicios
            </h3>
            <ul className="space-y-2">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Empresa
            </h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                <span className="text-sm text-cream/70">
                  Calle Bienestar 123, Madrid, España
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-gold" />
                <a
                  href="tel:+34912345678"
                  className="text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  +34 912 345 678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-gold" />
                <a
                  href="mailto:info@raizvital.com"
                  className="text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  info@raizvital.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/20 pt-8">
          <p className="text-center text-sm text-cream/60">
            &copy; {new Date().getFullYear()} Raíz Vital. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
