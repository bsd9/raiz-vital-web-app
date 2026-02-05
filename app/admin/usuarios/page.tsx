"use client"

import { useState } from "react"
import { usuarios as initialUsuarios, type Usuario } from "@/data/usuarios"
import { reservas } from "@/data/agendas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, User, Mail, Calendar, Eye } from "lucide-react"

export default function AdminUsuariosPage() {
  const [usuarios] = useState<Usuario[]>(initialUsuarios)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const filteredUsuarios = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getUsuarioReservas = (usuarioId: string) => {
    return reservas.filter((r) => r.usuarioId === usuarioId)
  }

  const handleViewDetails = (usuario: Usuario) => {
    setSelectedUsuario(usuario)
    setIsDetailOpen(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-forest">Gestión de Usuarios</h1>
        <p className="text-muted-foreground">
          Vista de usuarios registrados y sus reservas
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-forest">{usuarios.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <User className="h-4 w-4 text-sage" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sage">
              {usuarios.filter((u) => u.rol === "cliente").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administradores</CardTitle>
            <User className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gold">
              {usuarios.filter((u) => u.rol === "admin").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reservas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-forest">{reservas.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead className="text-center">Reservas</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsuarios.map((usuario) => {
              const userReservas = getUsuarioReservas(usuario.id)
              return (
                <TableRow key={usuario.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-sage/20 flex items-center justify-center">
                        <User className="h-5 w-5 text-sage" />
                      </div>
                      <span className="font-medium text-forest">{usuario.nombre}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {usuario.email}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {usuario.telefono || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        usuario.rol === "admin"
                          ? "bg-gold/20 text-gold border-gold"
                          : "bg-sage/20 text-sage border-sage"
                      }
                    >
                      {usuario.rol === "admin" ? "Administrador" : "Cliente"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-medium">{userReservas.length}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(usuario)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalles del Usuario</DialogTitle>
          </DialogHeader>
          {selectedUsuario && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-sage/20 flex items-center justify-center">
                  <User className="h-8 w-8 text-sage" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-forest">
                    {selectedUsuario.nombre}
                  </h3>
                  <p className="text-muted-foreground">{selectedUsuario.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                  <p className="font-medium">{selectedUsuario.telefono || "No registrado"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rol</p>
                  <Badge
                    className={
                      selectedUsuario.rol === "admin"
                        ? "bg-gold/20 text-gold"
                        : "bg-sage/20 text-sage"
                    }
                  >
                    {selectedUsuario.rol === "admin" ? "Administrador" : "Cliente"}
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-forest mb-3">Historial de Reservas</h4>
                {getUsuarioReservas(selectedUsuario.id).length > 0 ? (
                  <div className="space-y-2">
                    {getUsuarioReservas(selectedUsuario.id).map((reserva) => (
                      <div
                        key={reserva.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-sand/50"
                      >
                        <div>
                          <p className="font-medium text-forest text-sm">
                            {reserva.servicioNombre}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(reserva.fecha)} - {reserva.hora}
                          </p>
                        </div>
                        <Badge
                          className={
                            reserva.estado === "confirmada"
                              ? "bg-green-100 text-green-800"
                              : reserva.estado === "pendiente"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {reserva.estado}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Este usuario no tiene reservas registradas.
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
