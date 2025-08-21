"use client"

import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Camera,
  Headset,
  Laptop,
  Users,
  Zap,
  Code,
  Lightbulb,
  Ruler,
  Palette,
} from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import IndustryCard from "@/components/industry-card"
import FeatureSection from "@/components/feature-section"
import TestimonialSection from "@/components/testimonial-section"
import ContactCTA from "@/components/contact-cta"
import Marquee from "@/components/marquee"
import ThreeDShowcaseSection from "@/components/3d-showcase-section"
import FuturisticCard from "@/components/futuristic-card"
import StandaloneCarousel from "@/components/standalone-carousel"
import EnhancedVideoCarousel from "@/components/enhanced-video-carousel"

export default function Home() {
  // Fixed carousel images with proper paths and descriptions
  const carouselImages = [
    {
      src: "/images/horizon-residency-front.jpeg",
      alt: "The Horizon Residency - Luxury Living in the Heart of Bugolobi on Luthuli Avenue",
    },
    {
      src: "/images/skyrise-aerial-view.jpeg",
      alt: "Skyrise Apartments - Luxury Living in Prestigious Kololo with golf course views",
    },
    {
      src: "/images/building1.webp",
      alt: "Modern building with balconies and pool - Contemporary residential design",
    },
    {
      src: "/images/building2.webp",
      alt: "Curved white high-rise building - Innovative architectural design",
    },
    {
      src: "/images/building3.webp",
      alt: "Tall modern building with unique silhouette - Urban development",
    },
    {
      src: "/images/modern-house-1.jpeg",
      alt: "Modern minimalist house with black and white design - Contemporary living",
    },
    {
      src: "/images/night-building.jpeg",
      alt: "Modern building with colorful night lighting - Evening architectural showcase",
    },
    {
      src: "/images/waterfront-complex.jpeg",
      alt: "Luxury waterfront apartment complex - Premium lakeside living",
    },
  ]

  // Fixed project videos with proper paths and complete information
  const projectVideos = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/horizon%20residencyV1-pX4FFwA4bPYXhHK937BJ1oajcitg5A.webm",
      poster: "/images/horizon-residency-front.jpeg",
      alt: "Horizon Residency Development Showcase",
      title: "The Horizon Residency",
      description:
        "Luxury residential complex in Bugolobi featuring 1, 2, and 3 bedroom apartments with premium amenities",
      owner: "Bright Thought Services",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/skyriseinsta-ou61xLfPnC9SGnbyqMj0Y5H0vakI8b.webm",
      poster: "/images/skyrise-aerial-view.jpeg",
      alt: "Skyrise Apartments Marketing Video",
      title: "Skyrise Apartments",
      description: "Prestigious Kololo development with golf course views and modern amenities",
      owner: "Bright Thought Services",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/topaz%20court-IarahXii0RQiQnxicNfBPprqR1bM6w.webm",
      poster: "/images/building1.webp",
      alt: "Topaz Court Luxury Apartments",
      title: "Topaz Court",
      description: "Luxury apartment complex featuring modern amenities and elegant design",
      owner: "Bright Thought Services",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SEPAL%20GARDEN-Jv919x59xk5JOoiioE6rACqtfDf0Mi.webm",
      poster: "/images/building2.webp",
      alt: "Sepal Garden Residential Complex",
      title: "Sepal Garden",
      description: "Beautiful garden-themed residential development with lush landscaping",
      owner: "Bright Thought Services",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gates%20spring%201-6QMh83Ksu3HDdVNpJaIp7banpIRJ6u.webm",
      poster: "/images/building3.webp",
      alt: "Gates Spring Residential Community",
      title: "Gates Spring",
      description: "Family-oriented residential community with landscaped environments",
      owner: "Bright Thought Services",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sky%20resident%20pre-glYYw1X6QY4LTVLPzsYjEIsVJR4UvI.webm",
      poster: "/images/modern-house-1.jpeg",
      alt: "Sky Resident Pre-Launch Visualization",
      title: "Sky Resident",
      description: "Pre-launch architectural visualization for luxury residential development",
      owner: "Bright Thought Services",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/joosie%20mango%20juice%203-xd7wW2LE8DlbmSmq5cqhSllI5El2Nv.webm",
      poster: "/images/night-building.jpeg",
      alt: "Joosie Mango Juice Commercial Project",
      title: "Joosie Mango Juice",
      description: "Commercial marketing video showcasing product visualization and branding",
      owner: "Bright Thought Services",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col bg-bright-black text-bright-white">
      {/* Hero Section with Fixed Carousel */}
      <section className="relative min-h-screen">
        <StandaloneCarousel
          images={carouselImages}
          autoplay={true}
          interval={6000}
          showControls={true}
          showIndicators={true}
          overlay={true}
        />

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="container mx-auto px-4 text-center"
          >
            <div className="max-w-4xl mx-auto bg-bright-black/60 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-lg border border-bright-yellow/20">
              <h1
                className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-bright-white leading-tight"
                style={{ textShadow: "0px 0px 8px rgba(0,0,0,0.8)" }}
              >
                <span className="relative inline-block">
                  <span className="relative z-10">Where Reality Meets</span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-bright-yellow"></span>
                </span>
                <br />
                <span className="text-gradient relative inline-block">
                  <span className="relative z-10">Immersive Technology</span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-bright-yellow"></span>
                </span>
              </h1>
              <p
                className="text-base sm:text-lg md:text-xl text-bright-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto"
                style={{ textShadow: "0px 0px 4px rgba(0,0,0,0.8)" }}
              >
                Bright delivers seamless experiences that bridge physical spaces and digital innovation across
                industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/real-estate">
                  <Button
                    size="lg"
                    className="bg-bright-yellow text-bright-black hover:bg-bright-yellow/90 group relative overflow-hidden w-full sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center">
                      Explore Solutions{" "}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  </Button>
                </Link>
                <Link href="/book-demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-bright-white text-bright-white hover:bg-bright-white/10 mt-3 sm:mt-0 relative overflow-hidden group w-full sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center">
                      <Zap className="mr-2 h-5 w-5" /> Book a Demo
                    </span>
                    <span className="absolute inset-0 bg-bright-yellow/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-9 sm:w-8 sm:h-12 border-2 border-bright-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-bright-yellow rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="py-4 sm:py-6 bg-bright-yellow text-bright-black overflow-hidden">
        <Marquee speed="normal" repeat={3}>
          <div className="flex items-center mx-4 sm:mx-8">
            <Zap className="h-4 w-4 sm:h-6 sm:w-6 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-lg font-bold">IMMERSIVE EXPERIENCES</span>
          </div>
          <div className="flex items-center mx-4 sm:mx-8">
            <Code className="h-4 w-4 sm:h-6 sm:w-6 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-lg font-bold">CUTTING-EDGE TECHNOLOGY</span>
          </div>
          <div className="flex items-center mx-4 sm:mx-8">
            <Lightbulb className="h-4 w-4 sm:h-6 sm:w-6 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-lg font-bold">CREATIVE SOLUTIONS</span>
          </div>
        </Marquee>
      </div>

      {/* Industry Verticals Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-bright-black">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold mb-4 text-bright-yellow relative inline-block"
            >
              <span className="relative z-10">Our Industry Solutions</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-bright-yellow"></span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-bright-white/70 max-w-3xl mx-auto"
            >
              Bright delivers cutting-edge immersive experiences and services tailored to your industry needs.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <IndustryCard
              icon={<Building2 className="h-8 w-8" />}
              title="Real Estate"
              description="Virtual property tours, 3D visualizations, and interactive floor plans to revolutionize property marketing and sales."
              href="/real-estate"
              gradient="from-blue-500 to-cyan-500"
            />
            <IndustryCard
              icon={<Ruler className="h-8 w-8" />}
              title="Architecture"
              description="Architectural visualization services bringing designs to life with photorealistic renderings and immersive experiences."
              href="/architecture"
              gradient="from-green-500 to-emerald-500"
            />
            <IndustryCard
              icon={<Palette className="h-8 w-8" />}
              title="Interior Design"
              description="Virtual staging and interior visualization to transform spaces and showcase design potential."
              href="/interior-design"
              gradient="from-purple-500 to-pink-500"
            />
            <IndustryCard
              icon={<Camera className="h-8 w-8" />}
              title="Media & Entertainment"
              description="Immersive content creation, video production, and interactive experiences for engaging storytelling."
              href="/media"
              gradient="from-red-500 to-orange-500"
            />
            <IndustryCard
              icon={<Users className="h-8 w-8" />}
              title="Training"
              description="VR/AR training solutions that improve retention, safety, and skills development across industries."
              href="/training"
              gradient="from-indigo-500 to-purple-500"
            />
            <IndustryCard
              icon={<Building2 className="h-8 w-8" />}
              title="Corporate"
              description="Virtual meetings, collaborative spaces, and immersive presentations for modern business communication."
              href="/corporate"
              gradient="from-gray-500 to-slate-500"
            />
            <IndustryCard
              icon={<Laptop className="h-8 w-8" />}
              title="Digital"
              description="Custom digital solutions, web development, and interactive applications for your business needs."
              href="/digital"
              gradient="from-yellow-500 to-orange-500"
            />
            <IndustryCard
              icon={<Headset className="h-8 w-8" />}
              title="Custom Solutions"
              description="Bespoke immersive technology solutions tailored to your specific business challenges."
              href="/custom"
              gradient="from-teal-500 to-cyan-500"
            />
          </div>
        </div>
      </section>

      {/* 3D Building Showcase Section */}
      <ThreeDShowcaseSection />

      <FeatureSection />
      <TestimonialSection />

      {/* Portfolio Preview with Fixed Images */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-bright-black/90">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold mb-4 text-bright-yellow relative inline-block"
              >
                <span className="relative z-10">Our Work</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-bright-yellow"></span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-bright-white/70 max-w-2xl"
              >
                Explore our portfolio of immersive experiences and projects across various industries.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/portfolio" className="mt-6 md:mt-0">
                <Button
                  variant="outline"
                  className="group border-bright-yellow text-bright-yellow hover:bg-bright-yellow hover:text-bright-black"
                >
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FuturisticCard
              title="The Horizon Residency"
              description="Luxury Living in the Heart of Bugolobi - Premium 1, 2, and 3 bedroom apartments starting at $78,000"
              category="Real Estate Development"
              image="/images/horizon-residency-front.jpeg"
              href="/real-estate/horizon-residency"
              glowColor="rgba(255, 225, 0, 0.3)"
            />
            <FuturisticCard
              title="Skyrise Apartments"
              description="Luxury Living in Prestigious Kololo with breathtaking golf course views"
              category="Real Estate"
              image="/images/skyrise-aerial-view.jpeg"
              href="/real-estate/skyrise-apartments"
              glowColor="rgba(255, 225, 0, 0.3)"
            />
            <FuturisticCard
              title="Topaz Court"
              description="Luxury apartment complex featuring modern amenities and elegant design"
              category="Residential"
              image="/images/building1.webp"
              href="/real-estate/topaz-court"
              glowColor="rgba(255, 225, 0, 0.3)"
            />
            <FuturisticCard
              title="Sepal Garden"
              description="Beautiful garden-themed residential development with lush landscaping"
              category="Architecture"
              image="/images/building2.webp"
              href="/real-estate/sepal-garden"
              glowColor="rgba(255, 225, 0, 0.3)"
            />
            <FuturisticCard
              title="Gates Spring"
              description="Family-oriented residential community with landscaped environments"
              category="Commercial"
              image="/images/building3.webp"
              href="/real-estate/gates-spring"
              glowColor="rgba(255, 225, 0, 0.3)"
            />
            <FuturisticCard
              title="Sky Resident"
              description="Pre-launch architectural visualization for luxury residential development"
              category="Residential"
              image="/images/modern-house-1.jpeg"
              href="/real-estate/sky-resident"
              glowColor="rgba(255, 225, 0, 0.3)"
            />
          </div>
        </div>
      </section>

      {/* Project Videos Showcase */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-bright-black">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold mb-4 text-bright-yellow relative inline-block"
            >
              <span className="relative z-10">Featured Projects</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-bright-yellow"></span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-bright-white/70 max-w-3xl mx-auto"
            >
              Watch our latest architectural visualizations and real estate marketing videos showcasing immersive
              experiences.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Video Carousel with Real Project Videos */}
      <EnhancedVideoCarousel
        videos={projectVideos}
        height="h-[60vh] sm:h-[70vh] lg:h-[80vh]"
        autoplay={true}
        interval={8000}
        showControls={true}
        showIndicators={true}
        overlay={true}
        showOwnerCard={true}
      />

      <ContactCTA />
    </main>
  )
}
