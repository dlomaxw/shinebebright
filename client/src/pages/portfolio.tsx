import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink } from "lucide-react";

// Authentic portfolio data from shinebebright.com - Local images for faster loading
const portfolioProjects = [
  {
    id: "1",
    title: "Uhome",
    category: "Graphics Design and Animation",
    subcategory: "Social Media Handling",
    image: "/images/portfolio/u-home logo.jpg",
    url: "https://shinebebright.com/portfolio/uhome/"
  },
  {
    id: "2",
    title: "Salama Springs",
    category: "Graphics Design and Animation",
    image: "/images/portfolio/Salama Springs.jpg",
    url: "https://shinebebright.com/portfolio/salama-springs/"
  },
  {
    id: "3",
    title: "The Looks Bespoke",
    category: "Graphics Design and Animation",
    image: "/images/portfolio/The Looks Bespoke.jpg",
    url: "https://shinebebright.com/portfolio/the-looks-bespoke/"
  },
  {
    id: "4",
    title: "Karveli Restaurant",
    category: "Branding",
    image: "/images/portfolio/Karveli Restaurant.png",
    url: "https://shinebebright.com/portfolio/karveli-restaurant/"
  },
  {
    id: "5",
    title: "Eighth Wonder",
    category: "Branding",
    image: "/images/portfolio/Eighth Wonder.webp",
    url: "https://shinebebright.com/portfolio/eighth-wonder/"
  },

  {
    id: "7",
    title: "Gracefoam Textiles",
    category: "Content Marketing",
    image: "/images/portfolio/Gracefoam Textiles.jpg",
    url: "https://shinebebright.com/portfolio/gracefoam-textiles/"
  },
  {
    id: "8",
    title: "Hotel Sojovalo",
    category: "Content Marketing",
    image: "/images/portfolio/Hotel Sojovalo.jpg",
    url: "https://shinebebright.com/portfolio/hotel-sojovalo/"
  },
  {
    id: "9",
    title: "Banana Phones",
    category: "Social Media Handling",
    image: "/images/portfolio/Banana Phones.jpg",
    url: "https://shinebebright.com/portfolio/banana-phones/"
  },
  {
    id: "10",
    title: "Unity Fitness",
    category: "Social Media Handling",
    image: "/images/portfolio/Unity Fitness.webp",
    url: "https://shinebebright.com/portfolio/unity-fitness/"
  },
  {
    id: "11",
    title: "Enclave Estates",
    category: "Social Media Handling",
    image: "/images/portfolio/Enclave Estates.jpg",
    url: "https://shinebebright.com/portfolio/enclave-estates/"
  },



  {
    id: "15",
    title: "Qwezi Beauty",
    category: "Videography and Photography",
    image: "/images/portfolio/Qwezi Beauty.avif",
    url: "https://shinebebright.com/portfolio/qwezi-beauty/"
  },
  {
    id: "16",
    title: "Billionaire Vodka",
    category: "Videography and Photography",
    image: "/images/portfolio/Billionaire Vodka.jpg",
    url: "https://shinebebright.com/portfolio/billionaire-vodka/"
  },
  {
    id: "17",
    title: "Acorns International School",
    category: "Website Design and Development",
    image: "/images/portfolio/Acorns International School.png",
    url: "https://shinebebright.com/portfolio/acorns-international/"
  },
  {
    id: "18",
    title: "Kings Sports Bet",
    category: "Website Design and Development",
    image: "/images/portfolio/Kings Sports Bet.png",
    url: "https://shinebebright.com/portfolio/kings-sports-bet/"
  },
  {
    id: "19",
    title: "Frozen Basket",
    category: "Branding",
    image: "/images/portfolio/Frozen Basket.png",
    url: "https://shinebebright.com/portfolio/frozen-basket/"
  },
  {
    id: "20",
    title: "Pearl Marina",
    category: "Branding",
    image: "/images/portfolio/Pearl Marina.jpg",
    url: "https://shinebebright.com/portfolio/pearl-marina/"
  },
  {
    id: "21",
    title: "Veeram Healthcare",
    category: "Branding",
    image: "/images/portfolio/veeram healthcare.png",
    url: "https://shinebebright.com/portfolio/veeram-healthcare/"
  },
  {
    id: "22",
    title: "TMT Supermarket",
    category: "Website Design and Development",
    image: "/images/portfolio/tmt supermarket.jpg",
    url: "https://shinebebright.com/portfolio/tmt-supermarket/"
  },
  {
    id: "23",
    title: "A&M Executive Cleaning",
    category: "Branding",
    image: "/images/portfolio/a&m executive cleaning services.png",
    url: "https://shinebebright.com/portfolio/am-executive-cleaning/"
  },
  {
    id: "24",
    title: "Herman Padel Centre",
    category: "Website Design and Development",
    image: "/images/portfolio/herman padel centre.jpg",
    url: "https://shinebebright.com/portfolio/herman-padel-centre/"
  },
  {
    id: "25",
    title: "Kakira Distillery",
    category: "Branding",
    image: "/images/portfolio/kakira distillery.png",
    url: "https://shinebebright.com/portfolio/kakira-distillery/"
  },
  {
    id: "26",
    title: "Hima Cement",
    category: "Branding",
    image: "/images/portfolio/hima-cement.png",
    url: "https://shinebebright.com/portfolio/hima-cement/"
  }
];

// Our property development partners with authentic logos
const propertyDevelopers = [
  {
    id: "1",
    name: "VAAL",
    logo: "/images/developers/vaal_logo.svg",
    website: "https://vaal.co.ug",
    speciality: "Luxury Residential",
    description: "Africa's Gate to Real Estate - Premium developments in Kampala"
  },
  {
    id: "2",
    name: "HK Properties",
    logo: "/images/developers/hk_properties_logo.png",
    website: "https://hk-properties.com",
    speciality: "Affordable Luxury",
    description: "Quality housing solutions with flexible payment plans"
  },
  {
    id: "3",
    name: "Edifice Properties",
    logo: "/images/developers/edifice_properties_logo.png",
    website: "https://edificepropertiesug.com",
    speciality: "Modern Living",
    description: "Design-led real estate connecting people & properties perfectly"
  },
  {
    id: "4",
    name: "RF Developers",
    logo: "/images/developers/rf_developers_logo.png",
    website: "https://rfdevelopers.ug",
    speciality: "Luxury Development",
    description: "Premium luxury real estate development in Uganda"
  },
  {
    id: "5",
    name: "Novus Real Estate",
    logo: "/images/developers/novus_real_estate_logo.jpg",
    website: "https://novusrel.com",
    speciality: "High-End Residential",
    description: "Doing Well and Doing Good - Icon developments with panoramic views"
  },
  {
    id: "6",
    name: "Saif Real Estate",
    logo: "/images/developers/saif_real_estate_logo.png",
    website: "https://www.saifrealestateuganda.com",
    speciality: "Affordable Housing",
    description: "East African real estate with flexible financing solutions"
  }
];

const categories = [
  "All",
  "Graphics Design and Animation",
  "Branding",
  "Content Marketing",
  "Social Media Handling",
  "Website Design and Development",
  "Videography and Photography"
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = portfolioProjects.filter(project => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch = searchQuery.length < 2 ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-bright-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-bright-black mb-4">Our Portfolio</h1>
            <p className="text-xl text-bright-gray max-w-3xl mx-auto">
              Explore our latest projects and see how we're transforming industries with immersive technology.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-yellow"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-4 bg-white p-2 rounded-lg shadow-sm">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-bright-yellow text-bright-black" : "text-bright-gray hover:text-bright-black"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300 p-8 bg-gray-50"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `/api/placeholder/400/300?text=${encodeURIComponent(project.title)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 p-2 bg-bright-yellow text-bright-black rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <Badge variant="secondary" className="bg-bright-yellow/10 text-bright-black font-medium">
                        {project.category}
                      </Badge>
                      {project.subcategory && (
                        <Badge variant="outline" className="ml-2 border-bright-yellow/30">
                          {project.subcategory}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-bright-black mb-2 group-hover:text-bright-yellow transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bright-yellow hover:text-bright-black transition-colors duration-300 font-medium flex items-center gap-2"
                      >
                        View Project
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-bright-gray text-lg">
                {searchQuery ? `No projects found for "${searchQuery}"` : "No projects found in this category"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Property Developer Partners Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-bright-black mb-4">Our Property Development Partners</h2>
            <p className="text-xl text-bright-gray max-w-3xl mx-auto">
              Working with Uganda's leading real estate developers to deliver authentic, high-quality property solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {propertyDevelopers.map((developer) => (
              <div
                key={developer.id}
                className="flex flex-col items-center p-4 bg-bright-light rounded-lg hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-16 w-32 flex items-center justify-center mb-3 overflow-hidden">
                  <img
                    src={developer.logo}
                    alt={`${developer.name} logo`}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-bright-yellow/10 rounded text-bright-black font-semibold text-sm text-center">${developer.name}</div>`;
                      }
                    }}
                  />
                </div>
                <h3 className="text-sm font-semibold text-bright-black mb-1 text-center">{developer.name}</h3>
                <p className="text-xs text-bright-gray text-center mb-2">{developer.speciality}</p>
                <a
                  href={developer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-bright-yellow hover:text-bright-black transition-colors duration-300"
                >
                  Visit Website
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
