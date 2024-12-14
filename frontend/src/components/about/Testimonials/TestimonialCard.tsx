import Image from "next/image";
import { ReactElement } from "react";
import Paragraph from "@/components/ui/Paragraph";
import { TestimonialType } from "@/types/Testimonial";

type Props = TestimonialType;

const TestimonialCard = ({
  review,
  author,
  role,
  image,
  gradient,
}: Props): ReactElement => {
  const bg: string = (() => {
    const gradientGreen =
      "bg-gradient-to-r from-green-100 to-blue-50 dark:from-blue-950 dark:to-neutral-800";
    const gradientRed =
      "bg-gradient-to-r from-red-50 to-blue-50 dark:from-neutral-800 dark:to-blue-950";
    const bgNeutral = "bg-neutral-50 dark:bg-neutral-800";

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
    <article
      className={`p-8 rounded-lg ${bg} flex flex-col justify-between shadow-md`}
    >
      <Paragraph className="md:text-lg italic">&quot;{review}&quot;</Paragraph>
      <div className="mt-4 flex items-center gap-4">
        <Image
          width={50}
          height={50}
          className="rounded-full"
          alt={author}
          src={`/img/testimonials/${image}`}
        />
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {role}
          </p>
        </div>
      </div>
    </article>
  );
};

export default TestimonialCard;
