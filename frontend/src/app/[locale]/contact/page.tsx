import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import { Button } from "@/components/ui/Button";
import Paragraph from "@/components/ui/Paragraph";
import Title from "@/components/ui/Title";
import TitleAccent from "@/components/ui/TitleAccent";

const Contact = (): ReactElement => {
  const t = useTranslations("contact");
  const email = "elomar.sami@gmail.com";
  const subject = t("helloThere");
  const body = t("dadJoke");

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <main className="flex flex-col gap-4 items-center container">
      <article className="bg-none md:bg-gradient-to-tr md:from-neutral-100 md:to-transparent flex flex-col items-center gap-4 w-full md:px-12 md:py-20 xl:p-20 xl:py-28 px-4 py-0">
        <header>
          <Title className="mb-4">
            {t.rich("dropMessage", {
              accent: (chunk) => <TitleAccent>{chunk}</TitleAccent>,
            })}
          </Title>
        </header>
        <div className="max-w-2xl mx-auto px-4  text-center">
          <Paragraph className="text-lg mb-8">{t("desciption")}</Paragraph>

          <Button size="lg" asChild>
            <a
              href={mailtoLink}
              aria-label={t("sendEmail")}
              rel="noopener noreferrer"
            >
              <Mail className="w-5 h-5 mr-2" />
              {t("sendEmail")}
            </a>
          </Button>
        </div>
        <section className="flex justify-between gap-8 mt-8 flex-wrap"></section>
      </article>
    </main>
  );
};

export default Contact;
