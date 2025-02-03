import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import { getBlogs } from "@/app/actions/blogs";
import BlogActions from "@/components/blog/BlogActions";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils/dates";

const BlogsPage = async (): Promise<ReactElement> => {
  const blogsData = await getBlogs();

  if (blogsData.status === "error") {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 mb-2">Failed to load blogs</div>
        <div className="text-gray-600">{blogsData.message}</div>
      </div>
    );
  }
  const blogs = blogsData.data ?? [];

  if (blogs.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <Link href="/admin/dashboard/blogs/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Blog Post
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">No blog posts found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Posts ({blogs.length})</h1>
        <Link href={`/admin/dashboard/blogs/new`}>
          <Button>
            <Plus className="h-4 w-4" />
            <span className="hidden md:block">Add Blog Post</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left">Cover</th>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Author</th>
                <th className="px-6 py-4 text-left">Categories</th>
                <th className="px-6 py-4 text-left">Featured</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Written</th>
                <th className="px-6 py-4 text-left">Read Time</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {blog.coverImage?.url ? (
                      <div className="relative w-16 h-16">
                        <Image
                          src={blog.coverImage.url}
                          alt={blog.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No image</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{blog.title}</div>
                    <div className="text-sm text-gray-500">{blog.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{blog.author}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {blog.categories.slice(0, 2).map((category: string) => (
                        <span
                          key={category}
                          className="px-2 py-1 text-xs bg-gray-100 rounded"
                        >
                          {category}
                        </span>
                      ))}
                      {blog.categories.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 rounded">
                          +{blog.categories.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        blog.featured
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {blog.featured ? "Featured" : "Standard"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        blog.status === "published"
                          ? "bg-green-100 text-green-800"
                          : blog.status === "draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {blog.status.charAt(0).toUpperCase() +
                        blog.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {blog.writtenAt ? (
                      <span className="text-sm">
                        {formatDate(blog.writtenAt)}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">
                        Not published
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{blog.readingTime} min read</span>
                  </td>
                  <td className="px-6 py-4">
                    <BlogActions blog={blog} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
