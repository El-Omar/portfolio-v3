import { useLocale, useTranslations } from "next-intl";
import { ReactElement } from "react";
import SpaceInvaders from "./SpaceInvaders";
import { Button } from "../ui/Button";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";

const ContactWithSpaceInvaders = (): ReactElement => {
  const t = useTranslations("home.contact");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <article className="flex flex-col gap-4 items-center w-full md:px-12 md:py-20 xl:p-20 px-4 py-10">
      <header>
        <Title className="text-center">
          {t.rich("title", {
            space: () => (isArabic ? null : <>&nbsp;</>),
            accent: (chunk) => <TitleAccent>{chunk}</TitleAccent>,
          })}
        </Title>
      </header>
      <Paragraph className="text-center">{t("description")}</Paragraph>
      <Button className="mt-4">{t("getInTouch")}</Button>
      <div className="mt-8">
        <SpaceInvaders />
      </div>
    </article>
  );
};

export default ContactWithSpaceInvaders;
