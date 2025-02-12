import Image from "next/image";
import Paragraph from "@/components/ui/Paragraph";
import { TestimonialType } from "@/types/Testimonial";

const TestimonialCard = ({
  review,
  author,
  role,
  image,
  gradient,
}: TestimonialType) => {
  const bg: string = (() => {
    const gradientGreen =
      "bg-gradient-to-r from-green-100/40 to-blue-50/40 dark:from-blue-950/40 dark:to-neutral-800/40";
    const gradientRed =
      "bg-gradient-to-r from-red-50/40 to-blue-50/40 dark:from-neutral-800/40 dark:to-blue-950/40";
    const bgNeutral = "bg-neutral-100/70 dark:bg-neutral-900/40";

    switch (gradient) {
      case "green":
        return gradientGreen;
      case "red":
        return gradientRed;
      default:
        return bgNeutral;
    }
  })();

  return (
    <div
      className={`${bg} backdrop-blur-sm p-8 rounded-xl lg:mb-8 mb-4 shadow-sm`}
    >
      <div className="space-y-6">
        <Paragraph className="lg:w-full italic">&quot;{review}&quot;</Paragraph>

        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-100/50 dark:bg-neutral-800/50">
            {image && (
              <Image
                src={`/img/testimonials/${image}`}
                alt={author}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-white">
              {author}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
