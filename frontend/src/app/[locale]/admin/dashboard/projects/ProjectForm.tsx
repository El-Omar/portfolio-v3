"use client";

import { Upload } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { createProject } from "@/app/actions/projects";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { Textarea } from "@/components/ui/Textarea";
import { Project } from "@portfolio-v3/shared";

// Submit Button with automatic pending state
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create Project"}
    </Button>
  );
}

const initialState: Project = {
  title: "test",
  description: "test",
  technologies: ["test"],
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
  const [formData, setFormData] = useState<Project>(initialState);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setImageFile(file);

    // Preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only split into array when there are commas
    const techs = value.includes(",")
      ? value
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [value.trim()].filter(Boolean);

    setFormData((prev) => ({
      ...prev,
      technologies: techs,
    }));
  };

  async function handleSubmit(formData: FormData) {
    // Create FormData with all fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "technologies") {
        formData.set(key, JSON.stringify(value));
      }
    });

    // Add image if exists
    if (imageFile) {
      formData.set("image", imageFile);
    }

    try {
      const result = await createProject(null, formData);

      if (result.status === "error") {
        const error = result.message || "Failed to create project";
        toast.error(error);
        setError(error);
        return;
      }

      toast.success("Project created successfully");
      router.push("/admin/dashboard/projects");
      router.refresh();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to create project");
      setError("Failed to create project: " + JSON.stringify(error));
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500">{error}</p>}
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
                <Label htmlFor="image-upload" className="cursor-pointer block">
                  <div className="flex items-center gap-2 p-2 border-2 border-dashed rounded-lg hover:bg-gray-50">
                    <Upload className="w-4 h-4" />
                    <span>Upload image</span>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </Label>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          {/* Technologies */}
          <div className="space-y-2">
            <Label htmlFor="technologies">
              Technologies (comma-separated) *
            </Label>
            <Input
              id="technologies"
              name="technologies"
              value={formData.technologies.join(", ")}
              onChange={handleTechChange}
              required
              placeholder="React, TypeScript, Node.js"
            />
          </div>

          {/* URLs */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                type="url"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input
                id="liveUrl"
                name="liveUrl"
                type="url"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
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

          {/* Order */}
          <div className="space-y-2">
            <Label htmlFor="order">Display Order</Label>
            <Input
              id="order"
              name="order"
              type="number"
              value={formData.order}
              onChange={handleChange}
              min={0}
            />
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
            <SubmitButton />
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/dashboard/projects")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
