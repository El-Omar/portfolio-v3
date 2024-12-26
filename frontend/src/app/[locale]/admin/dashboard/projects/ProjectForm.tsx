"use client";

import { AlertCircle, Upload } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";
import { createProject } from "@/app/actions/projects";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ProjectFormData, projectSchema } from "@/schemas/project.schema";

const initialState: ProjectFormData = {
  title: "",
  description: "",
  technologies: [],
  imageUrl: "",
  githubUrl: "",
  liveUrl: "",
  featured: false,
  startDate: "",
  endDate: "",
  order: 0,
};

export function ProjectForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createProject, null);
  const [formData, setFormData] = useState<ProjectFormData>(initialState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProjectFormData, string>>
  >({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name as keyof ProjectFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setFormData((prev) => ({ ...prev, imageUrl: file.name }));
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techs = e.target.value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setFormData((prev) => ({ ...prev, technologies: techs }));
  };

  const handleSubmit = async (formData: FormData) => {
    // Validate with Zod
    const result = projectSchema.safeParse({
      ...formData,
      featured: formData.get("featured") === "true",
      order: Number(formData.get("order")) || 0,
      technologies:
        formData
          .get("technologies")
          ?.toString()
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean) || [],
    });

    if (!result.success) {
      const zodErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          zodErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(zodErrors);
      return;
    }

    try {
      const result = await formAction(formData);
      if (result?.error) {
        toast.error(
          typeof result.error === "string"
            ? result.error
            : "Failed to create project",
        );
        return;
      }
      toast.success("Project created successfully");
      router.push("/dashboard/projects");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to create project");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          {/* Image upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Project Image</Label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <div className="relative w-24 h-24">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              <div className="flex-1">
                <label className="cursor-pointer">
                  <div className="flex items-center gap-2 p-2 border-2 border-dashed rounded-lg hover:bg-gray-50">
                    <Upload className="w-4 h-4" />
                    <span>Upload image</span>
                  </div>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Technologies */}
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies (comma-separated)</Label>
            <Input
              id="technologies"
              name="technologies"
              value={formData.technologies.join(", ")}
              onChange={handleTechChange}
              className={errors.technologies ? "border-red-500" : ""}
            />
            {errors.technologies && (
              <p className="text-sm text-red-500">{errors.technologies}</p>
            )}
          </div>

          {/* URLs */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className={errors.githubUrl ? "border-red-500" : ""}
              />
              {errors.githubUrl && (
                <p className="text-sm text-red-500">{errors.githubUrl}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input
                id="liveUrl"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                className={errors.liveUrl ? "border-red-500" : ""}
              />
              {errors.liveUrl && (
                <p className="text-sm text-red-500">{errors.liveUrl}</p>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className={errors.startDate ? "border-red-500" : ""}
              />
              {errors.startDate && (
                <p className="text-sm text-red-500">{errors.startDate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Featured Switch */}
          <div className="flex items-center gap-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, featured: checked }))
              }
            />
            <Label htmlFor="featured">Featured Project</Label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Project"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/projects")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
