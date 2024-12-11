import { Download } from "lucide-react";
import { ReactElement } from "react";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import { useTranslations } from "next-intl";

const DownloadResume = (): ReactElement => {
  const t = useTranslations("about.resume");

  return (
    <section className="py-14 px-5 lg:p-20 relative w-full bg-gradient-to-r from-cool-red/20 to-sky-100 dark:from-red-950 dark:to-sky-950 rounded-lg">
      <div className="relative flex flex-col lg:flex-row gap-10 items-center justify-between">
        <div className="text-center lg:text-left">
          <Title className="md:leading-tight">
            {t.rich("title", {
              accent: (chunk) => (
                <span className="font-baskerville text-cool-red">{chunk}</span>
              ),
            })}
          </Title>
          <Paragraph className="ml-0 lg:ml-1 md:text-lg mt-4">
            {t("description")}
          </Paragraph>
          <Paragraph className="ml-0 lg:ml-1 md:text-sm text-slate-500 dark:text-slate-400 mt-2">
            {t("lastUpdate")}
          </Paragraph>
        </div>
        <a
          href="/Web_Resume-Elomar_Sami-Dec_2024.pdf"
          download
          className="px-8 py-4 bg-cool-red text-white rounded-lg hover:bg-cool-red/90 transition-colors flex items-center gap-2"
        >
          {t("download")}
          <Download size={20} />
        </a>
      </div>
    </section>
  );
};

export default DownloadResume;
