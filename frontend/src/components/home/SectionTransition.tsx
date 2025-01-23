import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";

interface SectionTransitionProps {
  title: string;
  titleAccent?: string;
  subtitle?: string;
  subtitleAccent?: string;
  className?: string;
  align?: 'left' | 'right';
}

const SectionTransition = ({
  title,
  titleAccent,
  subtitle,
  subtitleAccent,
  className = "",
  align = 'left'
}: SectionTransitionProps) => {
  return (
    <div className={`w-full py-40 ${className}`}>
      <div className="container mx-auto px-6">
        <div className={`space-y-2 ${align === 'right' ? 'text-right' : ''}`}>
          <Title className="text-3xl md:text-4xl lg:text-5xl">
            {title} {titleAccent && <TitleAccent>{titleAccent}</TitleAccent>}
          </Title>
          {subtitle && (
            <Title className="text-3xl md:text-4xl lg:text-5xl opacity-50">
              {subtitle}{" "}
              {subtitleAccent && (
                <TitleAccent className="">{subtitleAccent}.</TitleAccent>
              )}
            </Title>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionTransition; 