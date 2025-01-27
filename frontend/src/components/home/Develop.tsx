import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "../ui/Button";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";
import { Link } from "@/i18n/routing";

const Develop = () => {
  const t = useTranslations("home.expertise");

  return (
    <div className="relative w-full flex flex-col lg:flex-row justify-start items-start lg:items-center gap-20">
      {/* Dot */}
      <div className="absolute bottom-[calc(50%_-_8rem)] rounded-full left-0 w-64 h-64 bg-neutral-200 opacity-50 z-50"></div>

      {/* Left content */}
      <div className="space-y-6 relative z-50">
        <Title>
          {t.rich("developTitle", {
            br: () => <br />,
            accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
          })}
        </Title>
        <Paragraph>
          {t.rich("developDescription", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </Paragraph>
        <div className="">
          <Link href="/about" className="">
            <Button variant="fancy">
              {t("readMore")} <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>

      {/* Right image composition */}
      <div
        className="relative w-full lg:w-1/2
        flex flex-col items-center justify-center"
      >
        <div className="relative w-[80%] aspect-[4/3] bg-neutral-200">
          {/* Dot */}
          <div
            className="absolute rounded-full bg-primary z-30
            lg:-top-8 lg:-right-8 lg:w-16 lg:h-16
            -top-6 -right-6 w-12 h-12
            "
          ></div>

          {/* Main image */}
          <Image
            src="/img/develop.jpeg"
            alt="Development process"
            fill
            className="object-cover z-20"
          />
        </div>
        <div
          className="absolute 
              right-0 -bottom-10 sm:-bottom-16 lg:-bottom-20
              w-[60%] aspect-[4/3] bg-neutral-200 z-10"
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
              left-0 -bottom-12 sm:-bottom-16 lg:-bottom-24 
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
  );
};

export default Develop;
