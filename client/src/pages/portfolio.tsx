import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import type { Project } from "@shared/schema";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: searchResults = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects/search", { q: searchQuery }],
    enabled: searchQuery.length > 2,
  });

  const filteredProjects = searchQuery.length > 2 
    ? searchResults 
    : selectedCategory === "all" 
      ? projects 
      : projects.filter(project => project.category === selectedCategory);

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
              <Button
                variant={selectedCategory === "all" ? "default" : "ghost"}
                onClick={() => setSelectedCategory("all")}
                className={selectedCategory === "all" ? "bg-bright-yellow text-bright-black" : "text-bright-gray hover:text-bright-black"}
              >
                All Projects
              </Button>
              {PROJECT_CATEGORIES.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "ghost"}
                  onClick={() => setSelectedCategory(category.value)}
                  className={selectedCategory === category.value ? "bg-bright-yellow text-bright-black" : "text-bright-gray hover:text-bright-black"}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Project Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
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
