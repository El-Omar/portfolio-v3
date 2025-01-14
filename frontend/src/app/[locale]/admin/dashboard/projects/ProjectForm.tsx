"use client";

import { Upload } from "lucide-react";
import { ReactElement, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { Textarea } from "@/components/ui/Textarea";
import { Project, ProjectResponse, validateImageFile } from "@portfolio-v3/shared";
import { useRouter } from "@/i18n/routing";
import Editor from "@/components/ui/Editor";
import { X } from "lucide-react";

type Props = {
  onSubmit: (formData: FormData) => void;
  isPending: boolean;
  project?: ProjectResponse;
};

const initialState: Project = {
  title: "",
  description: "",
  content: "",
  technologies: [],
  imageUrl: "",
  additionalImages: [],
  githubUrl: "",
  liveUrl: "",
  featured: false,
  startDate: "",
  endDate: "",
  order: 0,
};

// Define the type for our additional image state
type AdditionalImage = {
  file: File;
  preview: string;
  caption?: string;
  className?: string;
};

const ProjectForm = ({ onSubmit, isPending, project }: Props): ReactElement => {
  const router = useRouter();
  const [formDataState, setFormDataState] = useState<Project | Record<string, any>>(
    project || initialState
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<AdditionalImage[]>([]);

  const handleSubmit = (submittedFormData: FormData) => {
    if (imageFile) {
      submittedFormData.set("imageUrl", imageFile);
    }

    if (formDataState.content) {
      submittedFormData.set("content", formDataState.content);
    }

    // Add additional images to formData with index
    additionalImages.forEach((image, index) => {
      submittedFormData.append(`additionalImages[${index}]`, image.file);
      submittedFormData.append(`additionalImageCaptions[${index}]`, image.caption || '');
      submittedFormData.append(`additionalImageClassNames[${index}]`, image.className || '');
    });

    onSubmit(submittedFormData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormDataState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      toast.error(`${file.name}: ${validation.error}`);
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

  const handleAdditionalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Validate and process each file
    Array.from(files).forEach((file) => {
      const validation = validateImageFile(file);
      if (!validation.isValid) {
        toast.error(`${file.name}: ${validation.error}`);
        return;
      }

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdditionalImages(prev => [...prev, {
          file,
          preview: reader.result as string,
          caption: '',
          className: ''
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
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

          {/* Additional Images */}
          <div className="space-y-2">
            <Label htmlFor="additional-images">Additional Images</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="additional-images-upload" className="cursor-pointer block">
                  <div className="flex items-center gap-2 p-2 border-2 border-dashed rounded-lg hover:bg-gray-50">
                    <Upload className="w-4 h-4" />
                    <span>Upload additional images</span>
                  </div>
                  <input
                    id="additional-images-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAdditionalImageChange}
                    className="hidden"
                  />
                </Label>
              </div>
            </div>
            {/* Preview additional images */}
            {additionalImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {additionalImages.map((image, index) => (
                  <div key={index} className="relative aspect-video group">
                    <Image
                      src={image.preview}
                      alt={`Additional image ${index + 1}`}
                      fill
                      className="object-cover rounded"
                    />
                    <div className="absolute inset-2 flex flex-col gap-2">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="self-end opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveAdditionalImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      
                      <Input
                        type="text"
                        placeholder="Add caption"
                        value={image.caption}
                        onChange={(e) => {
                          setAdditionalImages(prev => prev.map((img, i) => 
                            i === index ? { ...img, caption: e.target.value } : img
                          ));
                        }}
                        className="mt-auto bg-white/80 dark:bg-black/50 text-sm"
                      />
                      
                      <Input
                        type="text"
                        placeholder="Add className"
                        value={image.className}
                        onChange={(e) => {
                          setAdditionalImages(prev => prev.map((img, i) => 
                            i === index ? { ...img, className: e.target.value } : img
                          ));
                        }}
                        className="bg-white/80 dark:bg-black/50 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={formDataState.title}
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
              value={formDataState.description}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          {/* Content (Rich Text) */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Editor
              value={formDataState.content}
              onChange={(value) =>
                setFormDataState((prev) => ({ ...prev, content: value }))
              }
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
              value={formDataState.technologies}
              onChange={handleChange}
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
                value={formDataState.githubUrl}
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
                value={formDataState.liveUrl}
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
                value={formDataState.startDate}
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
                value={formDataState.endDate}
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
              value={formDataState.order}
              onChange={handleChange}
              min={0}
            />
          </div>

          {/* Featured Switch */}
          <div className="flex items-center gap-2">
            <Switch
              id="featured"
              checked={formDataState.featured}
              onCheckedChange={(checked) =>
                setFormDataState((prev) => ({ ...prev, featured: checked }))
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
              onClick={() => router.push("/admin/dashboard/projects")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
