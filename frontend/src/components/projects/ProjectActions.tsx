"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProjectResponse } from "@portfolio-v3/shared";
import { ReactElement, useTransition } from "react";
import { deleteProject } from "@/app/actions/projects";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Link } from "@/i18n/routing";

type Props = {
  project: ProjectResponse;
};

const ProjectActions = ({ project }: Props): ReactElement => {
  const [isDeleting, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await deleteProject(project.slug, project._etag);
        if (result === null) {
          toast.success("Project deleted successfully");
          return;
        }
        if (result.status === "error") {
          toast.error(result.message);
          return;
        }
      } catch (error) {
        toast.error("Failed to delete project");
      }
    });
  };

  const onEdit = () => {
    console.log("edit");
  };

  return (
    <div className="flex justify-center gap-2">
      <Link href={`/projects/${project.slug}`} target="_blank">
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      <Button variant="outline" size="sm" onClick={onEdit}>
        <Pencil className="h-4 w-4" />
      </Button>
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
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{project.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectActions;
