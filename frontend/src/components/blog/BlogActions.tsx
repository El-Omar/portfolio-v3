"use client";

import { BlogResponse } from "@portfolio-v3/shared";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deleteBlog } from "@/app/actions/blogs";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import ViewJson from "@/components/ui/ViewJson";

type Props = {
  blog: BlogResponse;
};

const BlogActions = ({ blog }: Props) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteBlog(blog.slug, blog._etag);
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }
      toast.success("Blog post deleted successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-center gap-2">
      <Link href={`/blogs/${blog.slug}`} target="_blank">
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>

      <Link href={`/admin/dashboard/blogs/edit/${blog.slug}`}>
        <Button variant="outline" size="sm">
          <Pencil className="h-4 w-4" />
        </Button>
      </Link>

      <ViewJson data={blog} title={`Blog: ${blog.title}`} />

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{blog.title}&quot;? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete Blog Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogActions;
