import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "./TestimonialList";
import Title from "../../ui/Title";
import TitleAccent from "../../ui/TitleAccent";
import MasonryLayout from "@/components/ui/MasonryLayout";

const Testimonials = (): ReactElement => {
  const t = useTranslations("about.testimonials");

  return (
    <section className="w-full py-14 lg:py-20 relative">
      <Title className="md:leading-tight text-center mb-12">
        {t.rich("title", {
          accent: (chunk) => <TitleAccent>{chunk}</TitleAccent>,
        })}
      </Title>

      <div className="container mx-auto px-4">
        <MasonryLayout columns={{ default: 2, md: 2 }}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} {...testimonial} />
          ))}
        </MasonryLayout>
      </div>
    </section>
  );
};

export default Testimonials;
