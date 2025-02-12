"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import { Button } from "../ui/Button";
import { useRouter } from "@/i18n/routing";

type Props = {
  label?: string;
};

const BackButton = ({ label: _label }: Props): ReactElement => {
  const { back } = useRouter();
  const t = useTranslations("navigation");
  const label = _label || t("goBack");

  return (
    <Button
      variant="plain"
      onClick={back}
      className="group inline-flex items-center gap-3 p-0"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm text-neutral-600 hover:text-primary">
        {label}
      </span>
    </Button>
  );
};

export default BackButton;
