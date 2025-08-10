import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink } from "lucide-react";

// Authentic portfolio data from shinebebright.com
const portfolioProjects = [
  {
    id: "1",
    title: "Uhome",
    category: "Graphics Design and Animation",
    subcategory: "Social Media Handling",
    image: "https://shinebebright.com/wp-content/uploads/2023/01/Untitled-design-5-1-890x664.png",
    url: "https://shinebebright.com/portfolio/uhome/"
  },
  {
    id: "2", 
    title: "Salama Springs",
    category: "Graphics Design and Animation",
    image: "https://shinebebright.com/wp-content/uploads/2023/01/Untitled-design-890x664.png",
    url: "https://shinebebright.com/portfolio/salama-springs/"
  },
  {
    id: "3",
    title: "The Looks Bespoke", 
    category: "Graphics Design and Animation",
    image: "https://shinebebright.com/wp-content/uploads/2023/01/Untitled-design-2-2-890x664.png",
    url: "https://shinebebright.com/portfolio/the-looks-bespoke/"
  },
  {
    id: "4",
    title: "Karveli Restaurant",
    category: "Branding",
    image: "https://shinebebright.com/wp-content/uploads/2023/01/Untitled-design-1-650x572.png",
    url: "https://shinebebright.com/portfolio/karveli-restaurant/"
  },
  {
    id: "5",
    title: "Eighth Wonder",
    category: "Branding", 
    image: "https://shinebebright.com/wp-content/uploads/2023/01/Untitled-design-2-1-650x572.png",
    url: "https://shinebebright.com/portfolio/eighth-wonder/"
  },
  {
    id: "6",
    title: "Icon 180",
    category: "Branding",
    image: "https://shinebebright.com/wp-content/uploads/2023/01/Untitled-design-4-650x572.png",
    url: "https://shinebebright.com/portfolio/icon-180/"
  },
  {
    id: "7",
    title: "Gracefoam Textiles",
    category: "Content Marketing",
    image: "https://shinebebright.com/wp-content/uploads/2020/05/Untitled-design-2-1-890x664.png",
    url: "https://shinebebright.com/portfolio/gracefoam-textiles/"
  },
  {
    id: "8",
    title: "Hotel Sojovalo",
    category: "Content Marketing",
    image: "https://shinebebright.com/wp-content/uploads/2023/01/Untitled-design-8-890x664.png",
    url: "https://shinebebright.com/portfolio/hotel-sojovalo/"
  },
  {
    id: "9",
    title: "Banana Phones",
    category: "Social Media Handling",
    image: "https://shinebebright.com/wp-content/uploads/2020/05/Untitled-design-4-1-650x572.png",
    url: "https://shinebebright.com/portfolio/banana-phones/"
  },
  {
    id: "10",
    title: "Unity Fitness",
    category: "Social Media Handling",
    image: "https://shinebebright.com/wp-content/uploads/2023/01/Untitled-design-3-650x572.png",
    url: "https://shinebebright.com/portfolio/unity-fitness/"
  },
  {
    id: "11",
    title: "Enclave Estates",
    category: "Social Media Handling",
    image: "https://shinebebright.com/wp-content/uploads/2023/01/Untitled-design-3-1-650x572.png",
    url: "https://shinebebright.com/portfolio/enclave-estates/"
  },
  {
    id: "12",
    title: "Ranchers Finest",
    category: "Website Design and Development",
    image: "https://shinebebright.com/wp-content/uploads/2020/05/Untitled-design-2-890x664.png",
    url: "https://shinebebright.com/portfolio/ranchers-finest/"
  },
  {
    id: "13",
    title: "Icon Heights",
    category: "Website Design and Development",
    subcategory: "Videography and Photography",
    image: "https://shinebebright.com/wp-content/uploads/2023/01/Untitled-design-7-890x664.png",
    url: "https://shinebebright.com/portfolio/icon-heights/"
  },
  {
    id: "14",
    title: "Sky Residency",
    category: "Website Design and Development",
    image: "https://shinebebright.com/wp-content/uploads/2023/01/Untitled-design-5-890x664.png",
    url: "https://shinebebright.com/portfolio/sky-residency/"
  },
  {
    id: "15",
    title: "Qwezi Beauty",
    category: "Videography and Photography",
    image: "https://shinebebright.com/wp-content/uploads/2020/05/Untitled-design-890x664.png",
    url: "https://shinebebright.com/portfolio/qwezi-beauty/"
  },
  {
    id: "16",
    title: "Billionaire Vodka",
    category: "Videography and Photography",
    image: "https://shinebebright.com/wp-content/uploads/2020/05/Untitled-design-1-890x664.png",
    url: "https://shinebebright.com/portfolio/billionaire-vodka/"
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
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
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
    </div>
  );
};

export default Portfolio;
