"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { Button } from "@/components/ui/Button";

type Props = {
  isAnimating: boolean;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
};

const LanguageSwitcher = ({
  isAnimating,
  setIsAnimating,
}: Props): ReactElement => {
  const locale = useLocale();
  const router = useRouter();
  const newLocale = locale === "en" ? "ar" : "en";

  const toggleLanguage = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);

    const timeout = setTimeout(() => {
      router.push(`/${newLocale}`);
    }, 1300);

    return () => {
      clearTimeout(timeout);
    };
  };

  return (
    <Button
      onClick={toggleLanguage}
      onMouseEnter={() => router.prefetch(`/${newLocale}`)}
      disabled={isAnimating}
    >
      {locale === "en" ? "عربي" : "English"}
    </Button>
  );
};

export default LanguageSwitcher;
