/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Blog, BlogResponse, validateImageFile } from "@portfolio-v3/shared";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { ReactElement, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Editor from "@/components/ui/Editor";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import LoadingWrapper from "@/components/ui/LoadingWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Textarea } from "@/components/ui/Textarea";
import { useRouter } from "@/i18n/routing";

type Props = {
  onSubmit: (formData: FormData) => void;
  isPending: boolean;
  blog?: BlogResponse;
};

const initialState: Blog = {
  title: "",
  slug: "",
  description: "",
  content: "",
  author: "Elomar",
  categories: [],
  tags: [],
  status: "draft",
  featured: false,
  order: 0,
  seoTitle: "",
  seoDescription: "",
  canonicalUrl: "",
  readingTime: 1,
  writtenAt: new Date().toISOString(),
  viewCount: 0,
  likeCount: 0,
  commentCount: 0,
};

const BlogForm = ({ onSubmit, isPending, blog }: Props): ReactElement => {
  const router = useRouter();
  const [formDataState, setFormDataState] = useState<
    Blog | Record<string, any>
  >(blog || initialState);

  const [imagePreview, setImagePreview] = useState<string | null>(
    blog?.coverImage?.url || null,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageCaption, setImageCaption] = useState<string>(
    blog?.coverImage?.caption || "",
  );
  const [imageClassName, setImageClassName] = useState<string>(
    blog?.coverImage?.className || "",
  );

  const handleSubmit = (submittedFormData: FormData) => {
    if (imageFile) {
      submittedFormData.set("coverImage", imageFile);
      submittedFormData.set("coverImageCaption", imageCaption);
      submittedFormData.set("coverImageClassName", imageClassName);
    }

    if (formDataState.content) {
      submittedFormData.set("content", formDataState.content as string);
    }

    onSubmit(submittedFormData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageCaption("");
    setImageClassName("");
    setFormDataState((prev) => ({ ...prev, coverImage: null }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {blog ? "Edit Blog Post" : "Create New Blog Post"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          {/* Cover Image upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Cover Image</Label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <div className="relative w-24 h-24 group">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex-1">
                <Label htmlFor="image-upload" className="cursor-pointer block">
                  <div className="flex items-center gap-2 p-2 border-2 border-dashed rounded-lg hover:bg-gray-50">
                    <Upload className="w-4 h-4" />
                    <span>
                      {imagePreview ? "Change image" : "Upload image"}
                    </span>
                  </div>
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Label>
              </div>
            </div>
            {imagePreview && (
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Image caption"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Image className"
                  value={imageClassName}
                  onChange={(e) => setImageClassName(e.target.value)}
                />
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
            <Label htmlFor="content">Content *</Label>
            <Editor
              value={formDataState.content}
              onChange={(value) =>
                setFormDataState((prev) => ({ ...prev, content: value }))
              }
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author">Author *</Label>
            <Input
              id="author"
              name="author"
              value={formDataState.author}
              onChange={handleChange}
              required
            />
          </div>

          {/* Categories & Tags */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="categories">Categories (comma-separated) *</Label>
              <Input
                id="categories"
                name="categories"
                value={formDataState.categories}
                onChange={handleChange}
                required
                placeholder="Technology, Programming, Web Development"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={formDataState.tags}
                onChange={handleChange}
                placeholder="React, TypeScript, NextJS"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Select
              name="status"
              value={formDataState.status}
              onValueChange={(value) =>
                setFormDataState((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Written Date */}
          <div className="space-y-2">
            <Label htmlFor="writtenAt">Written Date *</Label>
            <Input
              id="writtenAt"
              name="writtenAt"
              type="datetime-local"
              value={formDataState.writtenAt?.split(".")[0]} // Remove milliseconds for input compatibility
              onChange={handleChange}
              required
            />
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
              name="featured"
              checked={formDataState.featured}
              onCheckedChange={(checked) =>
                setFormDataState((prev) => ({ ...prev, featured: checked }))
              }
            />
            <Label htmlFor="featured">Featured Post</Label>
          </div>

          {/* SEO Section */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-medium">SEO Settings</h3>
            <div className="space-y-2">
              <Label htmlFor="seoTitle">SEO Title</Label>
              <Input
                id="seoTitle"
                name="seoTitle"
                value={formDataState.seoTitle}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seoDescription">SEO Description</Label>
              <Textarea
                id="seoDescription"
                name="seoDescription"
                value={formDataState.seoDescription}
                onChange={handleChange}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="canonicalUrl">Canonical URL</Label>
              <Input
                id="canonicalUrl"
                name="canonicalUrl"
                type="url"
                value={formDataState.canonicalUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isPending}>
              <LoadingWrapper isLoading={isPending}>
                {blog ? "Update blog post" : "Create blog post"}
              </LoadingWrapper>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/dashboard/blogs")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogForm;
