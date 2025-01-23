import { useLocale, useTranslations } from "next-intl";
import { ReactElement } from "react";
import SpaceInvaders from "./SpaceInvaders";
import { Button } from "../ui/Button";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";
import { Send } from "lucide-react";

const ContactWithSpaceInvaders = (): ReactElement => {
  const t = useTranslations("home.contact");
  const locale = useLocale();
  const isArabic = locale === "ar";

  // TODO: remove this
  console.log(isArabic, t);

  return (
    <article className="w-full py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20 mb-16">
          <div className="flex-1 space-y-6">
            <Title>
              Let's create <br />
              <TitleAccent>something together</TitleAccent>
            </Title>
            <Paragraph className="text-neutral-600 dark:text-neutral-400 max-w-xl">
              Have a project in mind or just want to chat? I'm always open to new ideas 
              and collaborations. Or you can try beating my Space Invaders high score.
            </Paragraph>
            <div className="flex gap-4 items-center">
              <Button variant="fancy" asChild>
                <a href="mailto:elomar.sami@gmail.com">
                  Get in touch <Send className="w-4 h-4" />
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
      </div>
    </article>
  );
};

export default ContactWithSpaceInvaders;
