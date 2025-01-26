import { twMerge } from "tailwind-merge";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";

interface SectionTransitionProps {
  title: string;
  titleAccent?: string;
  subtitle?: string;
  subtitleAccent?: string;
  className?: string;
  align?: "left" | "right" | "center";
  ref?: React.RefObject<HTMLDivElement>;
}

const SectionTransition = ({
  title,
  titleAccent,
  subtitle,
  subtitleAccent,
  className = "",
  align = "left",
  ref,
}: SectionTransitionProps) => {
  return (
    <div className={twMerge(`w-full py-16 lg:py-40 ${className}`)} ref={ref}>
      <div
        className={`space-y-2 text-center lg:text-left ${align === "right" ? "lg:text-right" : align === "center" ? "lg:text-center" : ""}`}
      >
        <Title className="text-3xl md:text-4xl lg:text-5xl">
          {title} {titleAccent && <TitleAccent>{titleAccent}</TitleAccent>}
        </Title>
        {subtitle && (
          <Title className="text-3xl md:text-4xl lg:text-5xl opacity-50">
            {subtitle}{" "}
            {subtitleAccent && (
              <TitleAccent className="">{subtitleAccent}</TitleAccent>
            )}
          </Title>
        )}
      </div>
    </div>
  );
};

export default SectionTransition;
