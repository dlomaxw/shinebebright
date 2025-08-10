import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ComparisonTool from "@/components/comparison-tool";
import ProjectCard from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import type { Project } from "@shared/schema";

const Comparison = () => {
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: searchResults = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects/search", { q: searchQuery }],
    enabled: searchQuery.length > 2,
  });

  const filteredProjects = searchQuery.length > 2 
    ? searchResults 
    : projects.filter(project => {
        if (selectedCategory !== "all" && project.category !== selectedCategory) {
          return false;
        }
        if (priceRange !== "all" && project.price) {
          const price = project.price;
          switch (priceRange) {
            case "under-200k":
              return price < 200000;
            case "200k-500k":
              return price >= 200000 && price < 500000;
            case "over-500k":
              return price >= 500000;
            default:
              return true;
          }
        }
        return true;
      });

  const addToComparison = (project: Project) => {
    if (selectedProjects.length < 4 && !selectedProjects.find(p => p.id === project.id)) {
      setSelectedProjects([...selectedProjects, project]);
    }
  };

  const removeFromComparison = (projectId: string) => {
    setSelectedProjects(selectedProjects.filter(p => p.id !== projectId));
  };

  const clearComparison = () => {
    setSelectedProjects([]);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-bright-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-bright-black mb-4">
              Compare Properties
            </h1>
            <p className="text-xl text-bright-gray max-w-3xl mx-auto">
              Use our advanced comparison tool to evaluate multiple properties side-by-side and make informed decisions.
            </p>
          </div>

          {/* Comparison Tool */}
          <ComparisonTool
            selectedProjects={selectedProjects}
            onRemoveProject={removeFromComparison}
            onClearAll={clearComparison}
          />
        </div>
      </section>

      {/* Property Selection */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-bright-black mb-4">
              Add Properties to Compare
            </h2>
            <p className="text-lg text-bright-gray max-w-3xl mx-auto">
              Browse and select up to 4 properties to compare their features, pricing, and specifications.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-yellow"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {PROJECT_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Range Filter */}
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-200k">Under $200K</SelectItem>
                  <SelectItem value="200k-500k">$200K - $500K</SelectItem>
                  <SelectItem value="over-500k">Over $500K</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Selected count */}
            <div className="flex justify-between items-center">
              <p className="text-bright-gray">
                {selectedProjects.length} of 4 properties selected for comparison
              </p>
              {selectedProjects.length > 0 && (
                <Button
                  variant="outline"
                  onClick={clearComparison}
                  className="text-bright-gray border-bright-gray hover:bg-bright-gray hover:text-white"
                >
                  Clear All
                </Button>
              )}
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
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => {
                const isSelected = selectedProjects.find(p => p.id === project.id);
                const canAdd = selectedProjects.length < 4 && !isSelected;
                
                return (
                  <div key={project.id} className="relative">
                    <ProjectCard project={project} />
                    <div className="absolute top-4 right-4">
                      {isSelected ? (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeFromComparison(project.id)}
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          disabled={!canAdd}
                          onClick={() => addToComparison(project)}
                          className="bg-bright-yellow text-bright-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {canAdd ? "Add to Compare" : "Max 4 Selected"}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-bright-gray text-lg">
                {searchQuery ? `No properties found for "${searchQuery}"` : "No properties found with the selected filters"}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Comparison;
