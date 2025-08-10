import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
      <CardContent className="p-0">
        <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 transition-colors ${colorClass}`}>
          <IconComponent className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-bright-black mb-4">{service.title}</h3>
        <p className="text-bright-gray mb-6">{service.description}</p>
        <Button asChild variant="ghost" className="text-bright-yellow font-semibold hover:text-yellow-600 transition-colors p-0">
          <Link href={`/services/${service.id}`} className="flex items-center">
            Learn More <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
