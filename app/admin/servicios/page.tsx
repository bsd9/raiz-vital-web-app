'use client'

import React from "react"

import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAgenda } from '@/context/agenda-context'
import { categorias, type Servicio } from '@/data/servicios'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const emptyServicio: Omit<Servicio, 'id'> = {
  nombre: '',
  descripcion: '',
  descripcionLarga: '',
  precio: 0,
  duracion: '60 min',
  categoria: 'facial',
  imagen: '',
  beneficios: []
}

export default function AdminServiciosPage() {
  const { serviciosAdmin, addServicio, updateServicio, deleteServicio } = useAgenda()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingServicio, setEditingServicio] = useState<Servicio | null>(null)
  const [formData, setFormData] = useState<Omit<Servicio, 'id'>>(emptyServicio)
  const [beneficiosText, setBeneficiosText] = useState('')
  const [filterCategoria, setFilterCategoria] = useState<string | null>(null)

  const filteredServicios = filterCategoria
    ? serviciosAdmin.filter(s => s.categoria === filterCategoria)
    : serviciosAdmin

  const handleOpenCreate = () => {
    setEditingServicio(null)
    setFormData(emptyServicio)
    setBeneficiosText('')
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (servicio: Servicio) => {
    setEditingServicio(servicio)
    setFormData({
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      descripcionLarga: servicio.descripcionLarga,
      precio: servicio.precio,
      duracion: servicio.duracion,
      categoria: servicio.categoria,
      imagen: servicio.imagen,
      beneficios: servicio.beneficios
    })
    setBeneficiosText(servicio.beneficios.join(', '))
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const beneficios = beneficiosText.split(',').map(b => b.trim()).filter(Boolean)
    
    if (editingServicio) {
      updateServicio(editingServicio.id, { ...formData, beneficios })
    } else {
      addServicio({ ...formData, beneficios })
    }
    
    setIsDialogOpen(false)
    setEditingServicio(null)
    setFormData(emptyServicio)
    setBeneficiosText('')
  }

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este servicio?')) {
      deleteServicio(id)
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Gestión de Servicios</h1>
          <p className="mt-1 text-muted-foreground">
            Administra los servicios (puertas) del centro de bienestar
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Servicio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingServicio ? 'Editar Servicio' : 'Crear Servicio'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Servicio</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría</Label>
                <select
                  id="categoria"
                  value={formData.categoria}
                  onChange={e => setFormData({ ...formData, categoria: e.target.value as Servicio['categoria'] })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="precio">Precio (€)</Label>
                  <Input
                    id="precio"
                    type="number"
                    min="0"
                    value={formData.precio}
                    onChange={e => setFormData({ ...formData, precio: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duracion">Duración</Label>
                  <Input
                    id="duracion"
                    value={formData.duracion}
                    onChange={e => setFormData({ ...formData, duracion: e.target.value })}
                    placeholder="60 min"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción Corta</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcionLarga">Descripción Detallada</Label>
                <Textarea
                  id="descripcionLarga"
                  value={formData.descripcionLarga}
                  onChange={e => setFormData({ ...formData, descripcionLarga: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="beneficios">Beneficios (separados por coma)</Label>
                <Textarea
                  id="beneficios"
                  value={beneficiosText}
                  onChange={e => setBeneficiosText(e.target.value)}
                  placeholder="Beneficio 1, Beneficio 2, Beneficio 3"
                  rows={2}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  {editingServicio ? 'Guardar Cambios' : 'Crear Servicio'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={filterCategoria === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterCategoria(null)}
        >
          Todos ({serviciosAdmin.length})
        </Button>
        {categorias.map(cat => {
          const count = serviciosAdmin.filter(s => s.categoria === cat.id).length
          return (
            <Button
              key={cat.id}
              variant={filterCategoria === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterCategoria(cat.id)}
            >
              {cat.nombre} ({count})
            </Button>
          )
        })}
      </div>

      {/* Services Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Servicio
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Categoría
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Duración
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Precio
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredServicios.map((servicio, index) => (
                <tr
                  key={servicio.id}
                  className={index % 2 === 0 ? 'bg-card' : 'bg-muted/20'}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-card-foreground">{servicio.nombre}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {servicio.descripcion}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium capitalize text-secondary-foreground">
                      {servicio.categoria}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-card-foreground">
                    {servicio.duracion}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-primary">
                    {servicio.precio}€
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenEdit(servicio)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(servicio.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredServicios.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No hay servicios en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  )
}
