'use client'

import React from "react"

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Dirección',
    details: ['Calle Bienestar 123', 'Madrid, España 28001'],
  },
  {
    icon: Phone,
    title: 'Teléfono',
    details: ['+34 912 345 678', '+34 678 901 234'],
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@raizvital.com', 'reservas@raizvital.com'],
  },
  {
    icon: Clock,
    title: 'Horario',
    details: ['Lun - Vie: 9:00 - 20:00', 'Sáb: 10:00 - 14:00'],
  },
]

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: '',
    })
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-cream via-sand/30 to-cream py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-sage/20 px-4 py-1.5 text-sm font-medium text-forest mb-4">
              Estamos aquí para ti
            </span>
            <h1 className="text-4xl font-semibold text-forest md:text-5xl">
              Contacta con Nosotros
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              ¿Tienes preguntas sobre nuestros tratamientos? ¿Quieres más información? 
              Estaremos encantados de ayudarte.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                Envíanos un mensaje
              </h2>
              <p className="mt-2 text-muted-foreground">
                Completa el formulario y te responderemos lo antes posible.
              </p>

              {isSubmitted ? (
                <div className="mt-8 rounded-lg border border-primary/30 bg-primary/10 p-8 text-center">
                  <CheckCircle className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Gracias por contactarnos. Te responderemos pronto.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6 bg-transparent"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre completo</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+34 600 000 000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="asunto">Asunto</Label>
                      <Input
                        id="asunto"
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        placeholder="¿En qué podemos ayudarte?"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje">Mensaje</Label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      'Enviando...'
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                Información de contacto
              </h2>
              <p className="mt-2 text-muted-foreground">
                También puedes visitarnos o llamarnos directamente.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="rounded-lg border border-border bg-card p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage/20 text-forest">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-semibold text-card-foreground">
                      {info.title}
                    </h3>
                    <div className="mt-2 space-y-1">
                      {info.details.map((detail, index) => (
                        <p key={index} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 overflow-hidden rounded-lg border border-border">
                <div className="relative h-64 bg-sand/50">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <MapPin className="h-12 w-12 text-sage" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Mapa de ubicación
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Calle Bienestar 123, Madrid
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-forest py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <h2 className="text-xl font-semibold text-cream md:text-2xl">
                ¿Prefieres reservar directamente?
              </h2>
              <p className="mt-1 text-cream/80">
                Consulta nuestra agenda y elige el horario que mejor te convenga.
              </p>
            </div>
            <Button asChild className="bg-gold text-forest hover:bg-gold/90">
              <a href="/agenda">Ver Agenda</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
