'use client'

import { ShoppingBag, Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import { type Producto } from '@/data/productos'

interface ProductCardProps {
  producto: Producto
  className?: string
}

export function ProductCard({ producto, className }: ProductCardProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem(producto)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 hover:shadow-md',
        className
      )}
    >
      {/* Image placeholder */}
      <div className="relative aspect-square overflow-hidden bg-sand/50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-20 w-20 rounded-full bg-sage/20 flex items-center justify-center">
            <span className="text-3xl font-light text-forest">
              {producto.nombre.charAt(0)}
            </span>
          </div>
        </div>
        
        {/* Out of stock overlay */}
        {producto.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/50">
            <span className="rounded-full bg-card px-4 py-2 text-sm font-medium text-card-foreground">
              Agotado
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Category badge */}
        <span className="inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium capitalize text-secondary-foreground">
          {producto.categoria}
        </span>

        {/* Title */}
        <h3 className="mt-2 text-base font-semibold text-card-foreground line-clamp-1">
          {producto.nombre}
        </h3>

        {/* Description */}
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {producto.descripcion}
        </p>

        {/* Price and Add to Cart */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-primary">
            {producto.precio}€
          </span>
          
          <Button
            variant={added ? 'default' : 'outline'}
            size="sm"
            onClick={handleAddToCart}
            disabled={producto.stock === 0}
            className="transition-all"
          >
            {added ? (
              <>
                <Check className="mr-1 h-4 w-4" />
                Añadido
              </>
            ) : (
              <>
                <ShoppingBag className="mr-1 h-4 w-4" />
                Añadir
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
