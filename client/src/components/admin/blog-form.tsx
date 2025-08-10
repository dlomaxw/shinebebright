import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBlogPostSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { BLOG_CATEGORIES } from "@/lib/constants";
import type { InsertBlogPost } from "@shared/schema";

const BlogForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InsertBlogPost>({
    resolver: zodResolver(insertBlogPostSchema),
    defaultValues: {
      published: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertBlogPost) => {
      await apiRequest("POST", "/api/blog", data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Blog post created successfully.",
      });
      reset();
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create blog post.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBlogPost) => {
    // Generate slug from title if not provided
    if (!data.slug && data.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    if (data.published) {
      data.publishedAt = new Date();
    }
    
    mutation.mutate(data);
  };

  const published = watch("published");

  return (
    <Card className="border-bright-yellow/10 bg-bright-black/50">
      <CardHeader>
        <CardTitle className="text-bright-white">Create Blog Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-bright-white mb-2">
              Title *
            </label>
            <Input
              {...register("title")}
              className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-bright-white mb-2">
                Slug *
              </label>
              <Input
                {...register("slug")}
                className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
              />
              {errors.slug && (
                <p className="text-red-400 text-sm mt-1">{errors.slug.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-bright-white mb-2">
                Category *
              </label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger className="bg-bright-black/30 border-bright-yellow/20 text-bright-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {BLOG_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-bright-white mb-2">
              Excerpt
            </label>
            <Textarea
              {...register("excerpt")}
              rows={3}
              className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-bright-white mb-2">
              Content
            </label>
            <Textarea
              {...register("content")}
              rows={10}
              className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-bright-white mb-2">
              Image URL
            </label>
            <Input
              {...register("imageUrl")}
              className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="published"
              checked={published}
              onCheckedChange={(checked) => setValue("published", !!checked)}
            />
            <label htmlFor="published" className="text-sm font-medium text-bright-white">
              Publish immediately
            </label>
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold"
          >
            {mutation.isPending ? "Creating..." : "Create Blog Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogForm;
