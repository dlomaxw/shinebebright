import { useQuery } from "@tanstack/react-query";
import NewsCard from "@/components/news-card";
import NewsletterForm from "@/components/forms/newsletter-form";
import { Badge } from "@/components/ui/badge";
import { BLOG_CATEGORIES } from "@/lib/constants";
import type { BlogPost } from "@shared/schema";

const News = () => {
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog", { published: true }],
  });

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1);

  const formatDate = (date: string | Date | null) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'technology': 'bg-bright-yellow text-bright-black',
      'case-study': 'bg-green-500 text-white',
      'company-news': 'bg-blue-500 text-white',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500 text-white';
  };

  const getCategoryLabel = (category: string) => {
    const found = BLOG_CATEGORIES.find(cat => cat.value === category);
    return found ? found.label : category;
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-bright-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-bright-black mb-4">
              Latest News & Insights
            </h1>
            <p className="text-xl text-bright-gray max-w-3xl mx-auto">
              Stay updated with the latest developments in immersive technology and our company milestones.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={featuredPost.imageUrl || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"}
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <Badge className={getCategoryColor(featuredPost.category)}>
                      {getCategoryLabel(featuredPost.category)}
                    </Badge>
                    <div className="text-bright-gray text-sm mt-4 mb-2">
                      {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                    </div>
                    <h2 className="text-3xl font-bold text-bright-black mb-4">{featuredPost.title}</h2>
                    <p className="text-bright-gray mb-6">{featuredPost.excerpt}</p>
                    <button className="text-bright-yellow font-semibold hover:text-yellow-600 transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Posts Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-bright-gray text-lg">No blog posts available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-bright-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Stay in the Loop</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest updates on immersive technology trends and Bright's innovations.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
