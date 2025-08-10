import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTeamMemberSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertTeamMember } from "@shared/schema";

const TeamForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InsertTeamMember>({
    resolver: zodResolver(insertTeamMemberSchema),
    defaultValues: {
      order: 0,
      active: true,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertTeamMember) => {
      await apiRequest("POST", "/api/team", data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Team member added successfully.",
      });
      reset();
      queryClient.invalidateQueries({ queryKey: ["/api/team"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add team member.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertTeamMember) => {
    mutation.mutate(data);
  };

  return (
    <Card className="border-bright-yellow/10 bg-bright-black/50">
      <CardHeader>
        <CardTitle className="text-bright-white">Add Team Member</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-bright-white mb-2">
                Name *
              </label>
              <Input
                {...register("name")}
                className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-bright-white mb-2">
                Role *
              </label>
              <Input
                {...register("role")}
                className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
              />
              {errors.role && (
                <p className="text-red-400 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-bright-white mb-2">
              Bio
            </label>
            <Textarea
              {...register("bio")}
              rows={4}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-bright-white mb-2">
                LinkedIn URL
              </label>
              <Input
                {...register("linkedinUrl")}
                className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-bright-white mb-2">
                Twitter URL
              </label>
              <Input
                {...register("twitterUrl")}
                className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-bright-white mb-2">
              Order
            </label>
            <Input
              {...register("order", { valueAsNumber: true })}
              type="number"
              className="bg-bright-black/30 border-bright-yellow/20 text-bright-white"
            />
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="bg-bright-yellow text-bright-black hover:bg-yellow-400 font-semibold"
          >
            {mutation.isPending ? "Adding..." : "Add Team Member"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TeamForm;
