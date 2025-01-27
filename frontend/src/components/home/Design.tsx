import Image from "next/image";
import { useTranslations } from "next-intl";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";

const Design = () => {
  const t = useTranslations("home.expertise");

  return (
    <div className="relative w-full flex flex-col lg:flex-row justify-start items-start lg:items-center gap-20">
      {/* Left image composition */}
      <div
        className="relative w-full lg:w-1/2
        flex flex-col items-center justify-center
        order-1 lg:-order-1"
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
            src="/img/design.jpg"
            alt="Design process"
            fill
            className="object-cover z-20"
          />
        </div>
        <div
          className="absolute 
            -bottom-10 sm:-bottom-16 lg:-bottom-20 left-0
            w-[60%] aspect-[4/3] bg-neutral-200 z-10"
        >
          <Image
            src="/img/notes.jpg"
            alt="Design detail"
            fill
            className="object-cover"
          />
        </div>
        <div
          className="absolute 
            -bottom-10 sm:-bottom-16 lg:-bottom-20 
            right-0 
            w-24 sm:w-28 lg:w-32 
            h-24 sm:h-28 lg:h-32 
            bg-neutral-200 flex items-center justify-center z-30"
        >
          <Image
            src="/img/plants.jpg"
            alt="Design detail"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Dot */}
      <div className="absolute bottom-[calc(50%_-_8rem)] rounded-full right-0 w-64 h-64 bg-neutral-200 opacity-50 z-50"></div>

      <div className="space-y-6 relative z-50">
        <Title>
          {t.rich("designTitle", {
            br: () => <br />,
            accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
          })}
        </Title>
        <Paragraph>
          {t.rich("designDescription", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </Paragraph>
      </div>
    </div>
  );
};

export default Design;
