import { useTranslations } from "next-intl";
import Image from "next/image";
import Title from "../ui/Title";
import Paragraph from "../ui/Paragraph";
import TitleAccent from "../ui/TitleAccent";

const Design = () => {
  const t = useTranslations("home.expertise");

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-20">
      {/* Left image composition */}
      <div className="flex-1 relative order-1 lg:-order-1 lg:block lg:w-auto flex w-full">
        <div className="relative aspect-[4/3] w-full max-w-[300px] lg:max-w-[420px] mx-auto lg:ml-auto">
          <Image
            src="/img/design.jpg"
            alt="Design process"
            fill
            className="object-cover z-20"
          />
          <div
            className="absolute 
            -bottom-[45px] sm:-bottom-[60px] lg:-bottom-[90px] 
            -left-[5%] sm:-left-[8%] lg:-left-[10%] 
            w-[60%] aspect-[4/3] bg-red-500 z-10"
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
            -bottom-12 sm:-bottom-16 lg:-bottom-20 
            right-4 sm:right-6 lg:right-8 
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
      </div>

      {/* Left content */}
      <div className="flex-1 space-y-6">
        <Title>
          {t.rich("designTitle", {
            br: () => <br />,
            accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
          })}
        </Title>
        <Paragraph className="text-neutral-600 dark:text-neutral-400 max-w-xl">
          {t.rich("designDescription", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </Paragraph>
      </div>
    </div>
  );
};

export default Design;
