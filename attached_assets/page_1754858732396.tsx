import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Clock, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import ContactCTA from "@/components/contact-cta"

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="bg-slate-50 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Bright</h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                We're on a mission to bridge physical spaces and digital innovation through immersive technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Founded in 2018, Bright began with a simple vision: to make immersive technology accessible and
                practical for businesses across industries.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                What started as a small team of VR enthusiasts has grown into a comprehensive immersive technology
                company with expertise spanning real estate, media production, training, and digital solutions.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Today, we're proud to work with leading companies around the world, helping them leverage the power of
                immersive technology to transform their operations and customer experiences.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">50+</p>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">200+</p>
                  <p className="text-sm text-muted-foreground">Projects Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">15+</p>
                  <p className="text-sm text-muted-foreground">Industry Awards</p>
                </div>
              </div>

              <Button>
                <Link href="/contact" className="flex items-center">
                  Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Bright Team"
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-lg overflow-hidden shadow-lg hidden md:block">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="VR Development"
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These core principles guide everything we do at Bright.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Client Partnership",
                description:
                  "We view ourselves as an extension of your team, committed to your success through collaborative partnership.",
              },
              {
                icon: <Award className="h-10 w-10 text-primary" />,
                title: "Innovation Excellence",
                description:
                  "We continuously push the boundaries of what's possible with immersive technology to deliver exceptional results.",
              },
              {
                icon: <Clock className="h-10 w-10 text-primary" />,
                title: "Practical Solutions",
                description:
                  "We focus on creating immersive experiences that solve real business challenges and deliver measurable ROI.",
              },
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Meet the talented individuals who make Bright's immersive experiences possible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Michael Chen",
                role: "CTO",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Priya Patel",
                role: "Creative Director",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "David Wilson",
                role: "Head of Real Estate Solutions",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Emma Rodriguez",
                role: "Lead VR Developer",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "James Kim",
                role: "Head of Media Production",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Olivia Thompson",
                role: "UX/UI Designer",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Marcus Johnson",
                role: "Business Development",
                image: "/placeholder.svg?height=400&width=400",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  )
}
