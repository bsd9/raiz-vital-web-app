"use client"

import React from "react"

import { useState } from "react"
import { productos as initialProductos, type Producto } from "@/data/productos"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Package } from "lucide-react"

const categorias = [
  { value: "facial", label: "Facial" },
  { value: "corporal", label: "Corporal" },
  { value: "capilar", label: "Capilar" },
  { value: "aromaterapia", label: "Aromaterapia" },
  { value: "suplementos", label: "Suplementos" },
]

export default function AdminProductosPage() {
  const [productos, setProductos] = useState<Producto[]>(initialProductos)
  const [isOpen, setIsOpen] = useState(false)
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null)
  const [filterCategoria, setFilterCategoria] = useState<string>("all")
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    stock: "",
    ingredientes: "",
  })

  const filteredProductos = filterCategoria === "all" 
    ? productos 
    : productos.filter(p => p.categoria === filterCategoria)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingProducto) {
      setProductos(productos.map(p => 
        p.id === editingProducto.id 
          ? {
              ...p,
              nombre: formData.nombre,
              descripcion: formData.descripcion,
              precio: parseFloat(formData.precio),
              categoria: formData.categoria as Producto["categoria"],
              stock: parseInt(formData.stock),
              ingredientes: formData.ingredientes.split(",").map(i => i.trim()),
            }
          : p
      ))
    } else {
      const newProducto: Producto = {
        id: `prod-${Date.now()}`,
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        categoria: formData.categoria as Producto["categoria"],
        imagen: "/placeholder.svg?height=300&width=300",
        stock: parseInt(formData.stock),
        ingredientes: formData.ingredientes.split(",").map(i => i.trim()),
      }
      setProductos([...productos, newProducto])
    }
    
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      precio: "",
      categoria: "",
      stock: "",
      ingredientes: "",
    })
    setEditingProducto(null)
    setIsOpen(false)
  }

  const handleEdit = (producto: Producto) => {
    setEditingProducto(producto)
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio.toString(),
      categoria: producto.categoria,
      stock: producto.stock.toString(),
      ingredientes: producto.ingredientes.join(", "),
    })
    setIsOpen(true)
  }

  const handleDelete = (id: string) => {
    setProductos(productos.filter(p => p.id !== id))
  }

  const getCategoriaColor = (categoria: string) => {
    const colors: Record<string, string> = {
      facial: "bg-pink-100 text-pink-800",
      corporal: "bg-blue-100 text-blue-800",
      capilar: "bg-amber-100 text-amber-800",
      aromaterapia: "bg-purple-100 text-purple-800",
      suplementos: "bg-green-100 text-green-800",
    }
    return colors[categoria] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-forest">Gestión de Productos</h1>
          <p className="text-muted-foreground">Administra el catálogo de productos naturales</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-sage hover:bg-sage/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingProducto ? "Editar Producto" : "Nuevo Producto"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del producto</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="precio">Precio ($)</Label>
                  <Input
                    id="precio"
                    type="number"
                    step="0.01"
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría</Label>
                <Select
                  value={formData.categoria}
                  onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ingredientes">Ingredientes (separados por coma)</Label>
                <Input
                  id="ingredientes"
                  value={formData.ingredientes}
                  onChange={(e) => setFormData({ ...formData, ingredientes: e.target.value })}
                  placeholder="Aloe vera, vitamina E, aceite de argán"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-sage hover:bg-sage/90 text-white">
                  {editingProducto ? "Guardar Cambios" : "Crear Producto"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <Label>Filtrar por categoría:</Label>
        <Select value={filterCategoria} onValueChange={setFilterCategoria}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categorias.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProductos.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-sand flex items-center justify-center">
                      <Package className="h-5 w-5 text-forest" />
                    </div>
                    <div>
                      <p className="font-medium text-forest">{producto.nombre}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {producto.descripcion}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getCategoriaColor(producto.categoria)}>
                    {producto.categoria}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${producto.precio.toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  <span className={producto.stock < 10 ? "text-red-600 font-medium" : ""}>
                    {producto.stock}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(producto)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(producto.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
