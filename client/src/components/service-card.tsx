import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ThreeDCard } from "@/components/animations/3d-card";
import { ArrowRight, Building2, Ruler, Palette, Camera, Users, Laptop } from "lucide-react";
import { Link } from "wouter";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface ServiceCardProps {
  service: Service;
}

const iconMap = {
  'building-2': Building2,
  'ruler': Ruler,
  'palette': Palette,
  'camera': Camera,
  'users': Users,
  'laptop': Laptop,
};

const colorMap = {
  blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-200",
  green: "bg-green-100 text-green-600 group-hover:bg-green-200",
  purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-200",
  red: "bg-red-100 text-red-600 group-hover:bg-red-200",
  orange: "bg-orange-100 text-orange-600 group-hover:bg-orange-200",
  indigo: "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200",
};

const ServiceCard = ({ service }: ServiceCardProps) => {
  const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Building2;
  const colorClass = colorMap[service.color as keyof typeof colorMap] || colorMap.blue;

  return (
    <ThreeDCard className="min-h-[320px]">
      <CardContent className="p-8 h-full flex flex-col justify-between">
        <div>
          <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 transition-colors ${colorClass}`}>
            <IconComponent className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-bright-black mb-4">{service.title}</h3>
          <p className="text-bright-gray mb-6">{service.description}</p>
        </div>
        <Button asChild variant="ghost" className="text-bright-yellow font-semibold hover:text-yellow-600 transition-colors p-0 justify-start">
          <Link href={`/services/${service.id}`} className="flex items-center">
            Learn More <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </ThreeDCard>
  );
};

export default ServiceCard;
