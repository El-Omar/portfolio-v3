"use client";

import { Code2 } from "lucide-react";
import { ReactElement } from "react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

type Props = {
  data: unknown;
  title?: string;
};

const ViewJson = ({ data, title = "JSON Data" }: Props): ReactElement => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Code2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <pre className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto">
          <code className="text-sm">{JSON.stringify(data, null, 2)}</code>
        </pre>
      </DialogContent>
    </Dialog>
  );
};

export default ViewJson;
