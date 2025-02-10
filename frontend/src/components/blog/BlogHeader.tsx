import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";

const BlogHeader = (): ReactElement => {
  const t = useTranslations("blog");

  return (
    <div>
      <Title className="md:text-3xl mb-4">
        {t.rich("title", {
          br: () => <br />,
          accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
        })}
      </Title>
      <Paragraph className="md:text-sm">{t("description")}</Paragraph>
    </div>
  );
};

export default BlogHeader;
