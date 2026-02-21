"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type TeamMember = {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "invited" | "inactive"
  avatar?: string
  initials: string
  department?: string
  joinDate: string
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Administrator",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JD",
    department: "Management",
    joinDate: "2022-01-15",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Project Manager",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
    department: "Project Management",
    joinDate: "2022-02-10",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Team Member",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MB",
    department: "Development",
    joinDate: "2022-03-05",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Team Member",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ED",
    department: "Design",
    joinDate: "2022-04-20",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert@example.com",
    role: "Team Member",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RW",
    department: "Development",
    joinDate: "2022-05-12",
  },
  {
    id: "6",
    name: "Jennifer Lee",
    email: "jennifer@example.com",
    role: "Accountant",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JL",
    department: "Finance",
    joinDate: "2022-06-08",
  },
  {
    id: "7",
    name: "David Chen",
    email: "david@example.com",
    role: "Team Member",
    status: "invited",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DC",
    department: "Marketing",
    joinDate: "2023-01-10",
  },
  {
    id: "8",
    name: "Lisa Taylor",
    email: "lisa@example.com",
    role: "Project Manager",
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "LT",
    department: "Project Management",
    joinDate: "2022-07-15",
  },
]

const roles = ["Administrator", "Project Manager", "Team Member", "Client", "Accountant"]
const departments = ["Management", "Project Management", "Development", "Design", "Marketing", "Finance", "Sales"]

export function TeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: "",
    email: "",
    role: "",
    department: "",
    status: "invited",
  })

  let filteredMembers = [...members]

  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredMembers = filteredMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        (member.department && member.department.toLowerCase().includes(query)),
    )
  }

  const handleEditMember = (member: TeamMember) => {
    setEditingMember({ ...member })
    setIsDialogOpen(true)
  }

  const handleOpenNewMemberDialog = () => {
    setEditingMember(null)
    setNewMember({
      name: "",
      email: "",
      role: "",
      department: "",
      status: "invited",
    })
    setIsDialogOpen(true)
  }

  const handleSaveMember = () => {
    if (editingMember) {
      // Update existing member
      setMembers(members.map((member) => (member.id === editingMember.id ? editingMember : member)))
    } else if (newMember.name && newMember.email && newMember.role) {
      // Add new member
      const initials = newMember.name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

      const newMemberWithId: TeamMember = {
        id: `${members.length + 1}`,
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
        department: newMember.department,
        status: "invited",
        initials,
        joinDate: new Date().toISOString().split("T")[0],
      }
      setMembers([...members, newMemberWithId])
      setNewMember({
        name: "",
        email: "",
        role: "",
        department: "",
        status: "invited",
      })
    }

    setEditingMember(null)
    setIsDialogOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "invited":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "inactive":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Team Members</h3>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenNewMemberDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
                <DialogDescription>
                  {editingMember
                    ? "Update the team member's information."
                    : "Add a new team member to your organization."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editingMember ? editingMember.name : newMember.name}
                    onChange={(e) => {
                      if (editingMember) {
                        setEditingMember({ ...editingMember, name: e.target.value })
                      } else {
                        setNewMember({ ...newMember, name: e.target.value })
                      }
                    }}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editingMember ? editingMember.email : newMember.email || ""}
                    onChange={(e) => {
                      if (editingMember) {
                        setEditingMember({ ...editingMember, email: e.target.value })
                      } else {
                        setNewMember({ ...newMember, email: e.target.value })
                      }
                    }}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={editingMember ? editingMember.role : newMember.role}
                    onValueChange={(value) => {
                      if (editingMember) {
                        setEditingMember({ ...editingMember, role: value })
                      } else {
                        setNewMember({ ...newMember, role: value })
                      }
                    }}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={editingMember ? editingMember.department : newMember.department}
                    onValueChange={(value) => {
                      if (editingMember) {
                        setEditingMember({ ...editingMember, department: value })
                      } else {
                        setNewMember({ ...newMember, department: value })
                      }
                    }}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem key={department} value={department}>
                          {department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {editingMember && (
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={editingMember.status}
                      onValueChange={(value: "active" | "invited" | "inactive") => {
                        setEditingMember({ ...editingMember, status: value })
                      }}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="invited">Invited</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveMember}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Directory</CardTitle>
          <CardDescription>Manage your team members and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.department || "-"}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditMember(member)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditMember(member)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          {member.status === "active" ? (
                            <DropdownMenuItem>Deactivate</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>Activate</DropdownMenuItem>
                          )}
                          {member.status === "invited" && <DropdownMenuItem>Resend Invitation</DropdownMenuItem>}
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
