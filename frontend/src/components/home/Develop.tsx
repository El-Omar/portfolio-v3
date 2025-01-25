import { useTranslations } from "next-intl";
import Image from "next/image";
import Title from "../ui/Title";
import Paragraph from "../ui/Paragraph";
import TitleAccent from "../ui/TitleAccent";
import { Link } from "@/i18n/routing";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";

const Develop = () => {
  const t = useTranslations("home.expertise");

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-20">
      {/* Left content */}
      <div className="flex-1 space-y-6 flex flex-col items-start lg:items-end">
        <Title className="lg:w-[470px] md:w-96 md:max-w-full max-w-96 w-full">
          {t.rich("developTitle", {
            br: () => <br />,
            accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
          })}
        </Title>
        <Paragraph className="text-neutral-600 dark:text-neutral-400 max-w-xl">
          {t.rich("developDescription", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </Paragraph>
        <div className="lg:w-[470px] md:w-96 md:max-w-full max-w-96 w-full">
          <Link href="/about" className="">
            <Button variant="fancy">
              {t("readMore")} <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>

      {/* Right image composition */}
      <div className="flex-1 relative order-1 lg:order-2 lg:block lg:w-auto flex w-full">
        <div className="relative aspect-[4/3] w-full max-w-[300px] lg:max-w-[420px] mx-auto">
          <Image
            src="/img/develop.jpeg"
            alt="Development process"
            fill
            className="object-cover z-20"
          />
          <div
            className="absolute 
              -bottom-[45px] sm:-bottom-[60px] lg:-bottom-[90px]
              -right-[5%] sm:-right-[8%] lg:-right-[12%]
              w-[60%] aspect-[4/3] bg-gold z-10"
          >
            <Image
              src="/img/wireframes.jpeg"
              alt="Development detail"
              fill
              className="object-cover"
            />
          </div>
          <div
            className="absolute 
              -bottom-12 sm:-bottom-16 lg:-bottom-24 
              left-4 sm:left-6 lg:left-8 
              w-24 sm:w-28 lg:w-32 
              h-24 sm:h-28 lg:h-32 
              bg-neutral-200 flex items-center justify-center z-30"
          >
            <Image
              src="/img/plants2.jpg"
              alt="Development detail"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Develop;
