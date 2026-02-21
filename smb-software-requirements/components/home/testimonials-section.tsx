"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Nakamya",
    role: "CEO, Kampala Coffee Exports",
    location: "Kampala, Uganda",
    content:
      "AfricaSMB transformed how we manage our coffee export business. The AI market insights helped us identify new opportunities in European markets.",
    avatar: "SN",
    rating: 5,
  },
  {
    name: "James Okello",
    role: "Factory Manager, East Africa Textiles",
    location: "Jinja, Uganda",
    content:
      "The factory management features are incredible. We've improved our production efficiency by 40% since implementing AfricaSMB.",
    avatar: "JO",
    rating: 5,
  },
  {
    name: "Grace Achieng",
    role: "Import/Export Director, Nile Trading Co.",
    location: "Entebbe, Uganda",
    content:
      "Managing cross-border trade has never been easier. The platform understands the complexities of East African trade regulations.",
    avatar: "GA",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-orange-800">Testimonials</Badge>
          <h2 className="text-3xl font-bold mb-4">Trusted by East African Businesses</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how businesses across Uganda and East Africa are transforming their operations with AfricaSMB.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
