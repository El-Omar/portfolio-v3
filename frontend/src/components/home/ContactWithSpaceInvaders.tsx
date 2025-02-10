import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import SpaceInvaders from "./SpaceInvaders";
import { Button } from "../ui/Button";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";

const ContactWithSpaceInvaders = (): ReactElement => {
  const t = useTranslations("home.contact");

  return (
    <article className="w-full py-16 lg:py-32 relative">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-20 mb-16">
        <div className="flex-1 space-y-6">
          <Title>
            {t.rich("title", {
              br: () => <br />,
              accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
            })}
          </Title>
          <Paragraph className="text-neutral-600 dark:text-neutral-400 max-w-xl">
            {t("description")}
          </Paragraph>
          <div className="flex gap-4 items-center">
            <Button variant="fancy" asChild>
              <a href="mailto:elomar.sami@gmail.com">
                {t("getInTouch")} <Send className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-sm">
            <SpaceInvaders />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ContactWithSpaceInvaders;
