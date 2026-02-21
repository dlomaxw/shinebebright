"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from "lucide-react"
import { useState } from "react"

export function CompanyProfile() {
  const [companyProfile, setCompanyProfile] = useState({
    name: "Acme Business Solutions",
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://www.acmebusiness.com",
    email: "contact@acmebusiness.com",
    phone: "(555) 123-4567",
    address: "123 Business Ave, Suite 200, San Francisco, CA 94107",
    description:
      "Acme Business Solutions provides comprehensive business management software for small and medium-sized businesses. Our platform helps streamline operations, improve collaboration, and drive growth.",
    taxId: "12-3456789",
    industry: "Software & Technology",
    foundedYear: "2015",
    employees: "25-50",
  })

  const handleInputChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompanyProfile({
      ...companyProfile,
      [key]: e.target.value,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Manage your company profile and details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={companyProfile.logo || "/placeholder.svg"} alt="Company Logo" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload Logo
              </Button>
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" value={companyProfile.name} onChange={handleInputChange("name")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-website">Website</Label>
                <Input id="company-website" value={companyProfile.website} onChange={handleInputChange("website")} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email</Label>
                  <Input id="company-email" value={companyProfile.email} onChange={handleInputChange("email")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Phone</Label>
                  <Input id="company-phone" value={companyProfile.phone} onChange={handleInputChange("phone")} />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-address">Address</Label>
            <Input id="company-address" value={companyProfile.address} onChange={handleInputChange("address")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-description">Description</Label>
            <Textarea
              id="company-description"
              value={companyProfile.description}
              onChange={handleInputChange("description")}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
          <CardDescription>Additional information about your business</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
              <Input id="tax-id" value={companyProfile.taxId} onChange={handleInputChange("taxId")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" value={companyProfile.industry} onChange={handleInputChange("industry")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="founded-year">Founded Year</Label>
              <Input id="founded-year" value={companyProfile.foundedYear} onChange={handleInputChange("foundedYear")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employees">Number of Employees</Label>
              <Input id="employees" value={companyProfile.employees} onChange={handleInputChange("employees")} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Branding</CardTitle>
          <CardDescription>Customize your company branding</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-md bg-primary" />
                  <Input defaultValue="#0284c7" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Secondary Color</Label>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-md bg-secondary" />
                  <Input defaultValue="#64748b" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email Signature</Label>
                <Textarea
                  rows={4}
                  defaultValue={`Best regards,\n\nAcme Business Solutions\n(555) 123-4567\nwww.acmebusiness.com`}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
