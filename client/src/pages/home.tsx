import { useQuery } from "@tanstack/react-query";
import HeroCarousel from "@/components/hero-carousel";
import ServiceCard from "@/components/service-card";
import ProjectCard from "@/components/project-card";
import NewsCard from "@/components/news-card";
import NewsletterForm from "@/components/forms/newsletter-form";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Users, Award, Clock } from "lucide-react";
import { Link } from "wouter";
import { SERVICES } from "@/lib/constants";
import { 
  SectionTransition, 
  SlideInLeft, 
  SlideInRight, 
  FadeInUp, 
  ScaleIn,
  StaggerContainer,
  StaggerChild
} from "@/components/animations/page-transition";
import { FloatingLogo } from "@/components/animations/animated-logo";
import type { Project, BlogPost } from "@shared/schema";

const Home = () => {
  const { data: featuredProjects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects", { featured: true }],
  });

  const { data: recentNews = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog", { published: true }],
  });

  const stats = [
    {
      title: "Projects Completed",
      value: "200+",
      change: "+12.5%",
      trend: "up",
      icon: <Eye className="h-5 w-5" />,
    },
    {
      title: "Happy Clients",
      value: "150+",
      change: "+8.2%",
      trend: "up",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Team Members",
      value: "50+",
      change: "+9.1%",
      trend: "up",
      icon: <Award className="h-5 w-5" />,
    },
    {
      title: "Years Experience",
      value: "6+",
      change: "Growing",
      trend: "up",
      icon: <Clock className="h-5 w-5" />,
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Services Section */}
      <SectionTransition>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-bright-black mb-4">
                Our Industry Solutions
              </h2>
              <p className="text-xl text-bright-gray max-w-3xl mx-auto">
                Bright delivers cutting-edge immersive experiences and services tailored to your industry needs.
              </p>
            </FadeInUp>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service, index) => (
                <StaggerChild key={service.id}>
                  <ScaleIn delay={index * 0.1}>
                    <ServiceCard service={service} />
                  </ScaleIn>
                </StaggerChild>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </SectionTransition>

      {/* Featured Projects */}
      <SectionTransition>
        <section className="py-20 bg-bright-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SlideInLeft className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-bright-black mb-4">
                Featured Projects
              </h2>
              <p className="text-xl text-bright-gray max-w-3xl mx-auto">
                Explore our latest projects and see how we're transforming industries with immersive technology.
              </p>
            </SlideInLeft>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.slice(0, 6).map((project, index) => (
                <StaggerChild key={project.id}>
                  <FadeInUp delay={index * 0.15}>
                    <ProjectCard project={project} />
                  </FadeInUp>
                </StaggerChild>
              ))}
            </StaggerContainer>
            
            <ScaleIn className="text-center mt-12" delay={0.8}>
              <Button asChild className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold text-lg px-8 py-4">
                <Link href="/portfolio">
                  View All Projects <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </ScaleIn>
          </div>
        </section>
      </SectionTransition>

      {/* Stats Section */}
      <SectionTransition>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StaggerChild key={index}>
                  <ScaleIn delay={index * 0.2} className="text-center">
                    <div className="w-16 h-16 bg-bright-yellow rounded-lg flex items-center justify-center mx-auto mb-4">
                      <div className="text-bright-black">{stat.icon}</div>
                    </div>
                    <div className="text-4xl font-bold text-bright-black mb-2">{stat.value}</div>
                    <div className="text-bright-gray">{stat.title}</div>
                    <div className="text-sm text-green-600 mt-1">{stat.change}</div>
                  </ScaleIn>
                </StaggerChild>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </SectionTransition>

      {/* Latest News */}
      <SectionTransition>
        <section className="py-20 bg-bright-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SlideInRight className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-bright-black mb-4">
                Latest News & Insights
              </h2>
              <p className="text-xl text-bright-gray max-w-3xl mx-auto">
                Stay updated with the latest developments in immersive technology and our company milestones.
              </p>
            </SlideInRight>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentNews.slice(0, 3).map((post, index) => (
                <StaggerChild key={post.id}>
                  <FadeInUp delay={index * 0.2}>
                    <NewsCard post={post} />
                  </FadeInUp>
                </StaggerChild>
              ))}
            </StaggerContainer>
            
            <ScaleIn className="text-center mt-12" delay={0.6}>
              <Button asChild className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold text-lg px-8 py-4">
                <Link href="/news">
                  View All News <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </ScaleIn>
          </div>
        </section>
      </SectionTransition>

      {/* Newsletter Section */}
      <SectionTransition>
        <section className="py-20 bg-bright-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp className="text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Stay in the Loop</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and get the latest updates on immersive technology trends and Bright's innovations.
              </p>
              <NewsletterForm />
            </FadeInUp>
          </div>
        </section>
      </SectionTransition>
    </div>
  );
};


export default Home;
