import { useQuery } from "@tanstack/react-query";
import TeamMember from "@/components/team-member";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Clock, Users } from "lucide-react";
import { Link } from "wouter";
import type { TeamMember as TeamMemberType } from "@shared/schema";

const About = () => {
  const { data: teamMembers = [] } = useQuery<TeamMemberType[]>({
    queryKey: ["/api/team"],
  });

  const values = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Client Partnership",
      description: "We view ourselves as an extension of your team, committed to your success through collaborative partnership.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Innovation Excellence",
      description: "We continuously push the boundaries of what's possible with immersive technology to deliver exceptional results.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Practical Solutions",
      description: "We focus on creating immersive experiences that solve real business challenges and deliver measurable ROI.",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-bright-light py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Our Story Section */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

              <Button asChild>
                <Link href="/contact" className="flex items-center">
                  Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Bright Team"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-lg overflow-hidden shadow-lg hidden md:block">
                <img
                  src="https://pixabay.com/get/g81583d29b86438604b85a7b2307ceded434f166158200718b6c81b864a3f453482b06564518757f3c35c7536693e0d05fc2a14ecfb13eeb25d7a32d9b794e918_1280.jpg"
                  alt="VR Development"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-24 bg-bright-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These core principles guide everything we do at Bright.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Meet the talented individuals who make Bright's immersive experiences possible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
