"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

const Acknowledgments = (): ReactElement => {
  const t = useTranslations("footer");

  return (
    <Dialog>
      <DialogTrigger className="underline underline-offset-2">
        {t("acknowledgments")}.
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("acknowledgments")}</DialogTitle>
          <DialogDescription>
            {t.rich("credits", {
              lucideLink: (chunks) => (
                <Link
                  href="https://lucide.dev"
                  className="underline hover:text-blue-500"
                  target="_blank"
                >
                  {chunks}
                </Link>
              ),
              illustrationLink: (chunks) => (
                <Link
                  href="https://storyset.com"
                  className="underline hover:text-blue-500"
                  target="_blank"
                >
                  {chunks}
                </Link>
              ),
            })}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Acknowledgments;
