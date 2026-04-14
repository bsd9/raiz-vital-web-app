'use client'

import { useState } from 'react'
import { ShoppingBag, X, Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { productos, categoriasProductos } from '@/data/productos'
import { ProductCard } from '@/components/product-card'
import { useCart } from '@/context/cart-context'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'

export default function ProductosPage() {
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null)
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()

  const productosFiltrados = categoriaActiva
    ? productos.filter(p => p.categoria === categoriaActiva)
    : productos

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-cream via-sand/30 to-cream py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-sage/20 px-4 py-1.5 text-sm font-medium text-forest mb-4">
              Tienda Natural
            </span>
            <h1 className="text-4xl font-semibold text-forest md:text-5xl">
              Productos de Belleza
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Cosméticos naturales formulados con ingredientes de alta calidad 
              para el cuidado diario de tu piel y cabello.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Cart */}
      <section className="border-b border-border bg-card py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={categoriaActiva === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategoriaActiva(null)}
              >
                Todos
              </Button>
              {categoriasProductos.map((cat) => (
                <Button
                  key={cat.id}
                  variant={categoriaActiva === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoriaActiva(cat.id)}
                >
                  {cat.nombre}
                </Button>
              ))}
            </div>

            {/* Cart Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative bg-transparent">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Carrito
                  {items.length > 0 && (
                    <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      {items.reduce((sum, item) => sum + item.cantidad, 0)}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="flex w-full flex-col sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Tu Carrito</SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">
                      Tu carrito está vacío
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-auto py-4">
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div
                            key={item.producto.id}
                            className="flex gap-4 rounded-lg border border-border p-4"
                          >
                            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-sand">
                              <span className="text-lg font-medium text-forest">
                                {item.producto.nombre.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground line-clamp-1">
                                {item.producto.nombre}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {item.producto.precio}€
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 bg-transparent"
                                  onClick={() =>
                                    updateQuantity(
                                      item.producto.id,
                                      item.cantidad - 1
                                    )
                                  }
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm">
                                  {item.cantidad}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 bg-transparent"
                                  onClick={() =>
                                    updateQuantity(
                                      item.producto.id,
                                      item.cantidad + 1
                                    )
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive"
                                  onClick={() => removeItem(item.producto.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-semibold text-foreground">
                                {(item.producto.precio * item.cantidad).toFixed(2)}€
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <SheetFooter className="border-t border-border pt-4">
                      <div className="w-full space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold">Total</span>
                          <span className="text-xl font-bold text-primary">
                            {total.toFixed(2)}€
                          </span>
                        </div>
                        <Button className="w-full" size="lg">
                          Proceder al Pago
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={clearCart}
                        >
                          Vaciar Carrito
                        </Button>
                      </div>
                    </SheetFooter>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {categoriaActiva && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground">
                {categoriasProductos.find(c => c.id === categoriaActiva)?.nombre}
              </h2>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productosFiltrados.map((producto, index) => (
              <div
                key={producto.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard producto={producto} />
              </div>
            ))}
          </div>

          {productosFiltrados.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No hay productos disponibles en esta categoría.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
