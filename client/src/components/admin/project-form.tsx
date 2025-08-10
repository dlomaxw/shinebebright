import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProjectSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import type { InsertProject } from "@shared/schema";

const ProjectForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InsertProject>({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      status: "active",
      featured: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertProject) => {
      await apiRequest("POST", "/api/projects", data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Project created successfully.",
      });
      reset();
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create project.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertProject) => {
    mutation.mutate(data);
  };

  const featured = watch("featured");

  return (
    <Card className="border-bright-yellow/10 bg-bright-black/50">
      <CardHeader>
        <CardTitle className="text-bright-white">Add New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div>
              <label className="block text-sm font-medium text-bright-white mb-2">
                Category *
              </label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger className="bg-bright-black/30 border-bright-yellow/20 text-bright-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_CATEGORIES.map((category) => (
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
              Description
            </label>
            <Textarea
              {...register("description")}
              rows={4}
              className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-bright-white mb-2">
                Image URL
              </label>
              <Input
                {...register("imageUrl")}
                className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-bright-white mb-2">
                Video URL
              </label>
              <Input
                {...register("videoUrl")}
                className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-bright-white mb-2">
                Price
              </label>
              <Input
                {...register("price", { valueAsNumber: true })}
                type="number"
                className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-bright-white mb-2">
                Bedrooms
              </label>
              <Input
                {...register("bedrooms", { valueAsNumber: true })}
                type="number"
                className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-bright-white mb-2">
                Bathrooms
              </label>
              <Input
                {...register("bathrooms", { valueAsNumber: true })}
                type="number"
                className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-bright-white mb-2">
                Area (sq ft)
              </label>
              <Input
                {...register("area", { valueAsNumber: true })}
                type="number"
                className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-bright-white mb-2">
                Location
              </label>
              <Input
                {...register("location")}
                className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={featured}
              onCheckedChange={(checked) => setValue("featured", !!checked)}
            />
            <label htmlFor="featured" className="text-sm font-medium text-bright-white">
              Featured Project
            </label>
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold"
          >
            {mutation.isPending ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
