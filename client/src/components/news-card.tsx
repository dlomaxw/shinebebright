import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

interface NewsCardProps {
  post: BlogPost;
}

const categoryColors = {
  'technology': 'bg-bright-yellow text-bright-black',
  'case-study': 'bg-green-500 text-white',
  'company-news': 'bg-blue-500 text-white',
};

const categoryLabels = {
  'technology': 'Technology',
  'case-study': 'Case Study',
  'company-news': 'Company News',
};

const NewsCard = ({ post }: NewsCardProps) => {
  const categoryColor = categoryColors[post.category as keyof typeof categoryColors] || 'bg-gray-500 text-white';
  const categoryLabel = categoryLabels[post.category as keyof typeof categoryLabels] || post.category;

  const formatDate = (date: string | Date | null) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  return (
    <Card className="bg-bright-light rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative">
        <img
          src={post.imageUrl || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge className={categoryColor}>
            {categoryLabel}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="text-bright-gray text-sm mb-2">
          {formatDate(post.publishedAt || post.createdAt)}
        </div>
        <h3 className="text-xl font-bold text-bright-black mb-3 line-clamp-2">{post.title}</h3>
        <p className="text-bright-gray mb-4 line-clamp-3">{post.excerpt}</p>
        <Button asChild variant="ghost" className="text-bright-yellow font-semibold hover:text-yellow-600 transition-colors p-0">
          <Link href={`/news/${post.slug}`} className="flex items-center">
            Read More <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
