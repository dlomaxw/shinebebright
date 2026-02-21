"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Permission = {
  id: string
  name: string
  description: string
  module: string
}

type Role = {
  id: string
  name: string
  description: string
  users: number
  permissions: string[]
}

const mockPermissions: Permission[] = [
  { id: "p1", name: "view_dashboard", description: "View Dashboard", module: "Dashboard" },
  { id: "p2", name: "manage_clients", description: "Manage Clients", module: "Clients" },
  { id: "p3", name: "view_clients", description: "View Clients", module: "Clients" },
  { id: "p4", name: "manage_projects", description: "Manage Projects", module: "Projects" },
  { id: "p5", name: "view_projects", description: "View Projects", module: "Projects" },
  { id: "p6", name: "manage_tasks", description: "Manage Tasks", module: "Tasks" },
  { id: "p7", name: "view_tasks", description: "View Tasks", module: "Tasks" },
  { id: "p8", name: "manage_invoices", description: "Manage Invoices", module: "Invoices" },
  { id: "p9", name: "view_invoices", description: "View Invoices", module: "Invoices" },
  { id: "p10", name: "manage_team", description: "Manage Team", module: "Team" },
  { id: "p11", name: "view_analytics", description: "View Analytics", module: "Analytics" },
  { id: "p12", name: "manage_settings", description: "Manage Settings", module: "Settings" },
]

const mockRoles: Role[] = [
  {
    id: "r1",
    name: "Administrator",
    description: "Full access to all features",
    users: 2,
    permissions: mockPermissions.map((p) => p.id),
  },
  {
    id: "r2",
    name: "Project Manager",
    description: "Manage projects, tasks, and team members",
    users: 3,
    permissions: ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p9", "p11"],
  },
  {
    id: "r3",
    name: "Team Member",
    description: "Work on assigned tasks and projects",
    users: 8,
    permissions: ["p1", "p3", "p5", "p7", "p9"],
  },
  {
    id: "r4",
    name: "Client",
    description: "View assigned projects and invoices",
    users: 15,
    permissions: ["p3", "p5", "p9"],
  },
  {
    id: "r5",
    name: "Accountant",
    description: "Manage invoices and view analytics",
    users: 1,
    permissions: ["p1", "p3", "p8", "p9", "p11"],
  },
]

// Group permissions by module
const permissionsByModule = mockPermissions.reduce(
  (acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = []
    }
    acc[permission.module].push(permission)
    return acc
  },
  {} as Record<string, Permission[]>,
)

export function UserRoles() {
  const [roles, setRoles] = useState<Role[]>(mockRoles)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [newRole, setNewRole] = useState<Partial<Role>>({
    name: "",
    description: "",
    permissions: [],
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (editingRole) {
      const updatedPermissions = checked
        ? [...editingRole.permissions, permissionId]
        : editingRole.permissions.filter((id) => id !== permissionId)

      setEditingRole({
        ...editingRole,
        permissions: updatedPermissions,
      })
    } else {
      const updatedPermissions = checked
        ? [...(newRole.permissions || []), permissionId]
        : (newRole.permissions || []).filter((id) => id !== permissionId)

      setNewRole({
        ...newRole,
        permissions: updatedPermissions,
      })
    }
  }

  const handleSaveRole = () => {
    if (editingRole) {
      // Update existing role
      setRoles(roles.map((role) => (role.id === editingRole.id ? editingRole : role)))
    } else if (newRole.name) {
      // Add new role
      const newRoleWithId: Role = {
        id: `r${roles.length + 1}`,
        name: newRole.name,
        description: newRole.description || "",
        users: 0,
        permissions: newRole.permissions || [],
      }
      setRoles([...roles, newRoleWithId])
      setNewRole({
        name: "",
        description: "",
        permissions: [],
      })
    }

    setEditingRole(null)
    setIsDialogOpen(false)
  }

  const handleEditRole = (role: Role) => {
    setEditingRole({ ...role })
    setIsDialogOpen(true)
  }

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((role) => role.id !== roleId))
  }

  const handleOpenNewRoleDialog = () => {
    setEditingRole(null)
    setNewRole({
      name: "",
      description: "",
      permissions: [],
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">User Roles & Permissions</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenNewRoleDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingRole ? "Edit Role" : "Add New Role"}</DialogTitle>
              <DialogDescription>
                {editingRole
                  ? "Update the role details and permissions."
                  : "Create a new role with specific permissions."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Role Name</Label>
                <Input
                  id="name"
                  value={editingRole ? editingRole.name : newRole.name}
                  onChange={(e) => {
                    if (editingRole) {
                      setEditingRole({ ...editingRole, name: e.target.value })
                    } else {
                      setNewRole({ ...newRole, name: e.target.value })
                    }
                  }}
                  placeholder="Enter role name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={editingRole ? editingRole.description : newRole.description || ""}
                  onChange={(e) => {
                    if (editingRole) {
                      setEditingRole({ ...editingRole, description: e.target.value })
                    } else {
                      setNewRole({ ...newRole, description: e.target.value })
                    }
                  }}
                  placeholder="Enter role description"
                />
              </div>
              <div className="grid gap-2">
                <Label>Permissions</Label>
                <div className="space-y-4">
                  {Object.entries(permissionsByModule).map(([module, permissions]) => (
                    <div key={module} className="space-y-2">
                      <h4 className="font-medium">{module}</h4>
                      <div className="grid gap-2">
                        {permissions.map((permission) => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={permission.id}
                              checked={
                                editingRole
                                  ? editingRole.permissions.includes(permission.id)
                                  : (newRole.permissions || []).includes(permission.id)
                              }
                              onCheckedChange={(checked) => {
                                handlePermissionChange(permission.id, checked === true)
                              }}
                            />
                            <Label htmlFor={permission.id} className="flex-1">
                              {permission.description}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveRole}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Roles</CardTitle>
          <CardDescription>Define roles and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>{role.users}</TableCell>
                  <TableCell>{role.permissions.length}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditRole(role)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditRole(role)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteRole(role.id)}
                            disabled={role.users > 0 || role.name === "Administrator"}
                            className={
                              role.users > 0 || role.name === "Administrator" ? "text-muted-foreground" : "text-red-500"
                            }
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
