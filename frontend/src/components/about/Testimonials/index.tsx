import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import TestimonialCard from "./TestimonialCard";
import Title from "../../ui/Title";
import TitleAccent from "../../ui/TitleAccent";

const Testimonials = (): ReactElement => {
  const t = useTranslations("about.testimonials");

  return (
    <section className="w-full py-14 lg:py-20 relative">
      <Title className="md:leading-tight text-center mb-12">
        {t.rich("title", {
          accent: (chunk) => <TitleAccent>{chunk}</TitleAccent>,
        })}
      </Title>

      <div className="grid md:grid-cols-2 gap-8 relative">
        <TestimonialCard
          review="Elomar is an exceptional Frontend Engineer with a talent for
            designing user-friendly experiences that stand out. His strong
            communication skills and creative problem-solving consistently
            elevated our projects, and his collaborative and fun approach made
            him a joy to work with. I highly recommend him to any team!"
          author="Mahdi Hadrich"
          image="mahdi.jpeg"
          role="Software Engineer @ Deliverect"
          gradient="red"
        />

        <TestimonialCard
          review="Elomar has an eye for detail and outstanding expertise in design
            and programming. His passion seamlessly translates into creative and
            efficient solutions!"
          author="Jonas Vanhecke"
          image="jonas.jpeg"
          role="Software Engineer @ Skarabee"
        />

        <TestimonialCard
          review="Working with Elomar at Deliverect was an absolute pleasure. 
            As a Front-End Developer, his attention to detail and ability 
            to deliver high-quality work were impressive. We collaborated on
            a few projects, and I was always impressed by his problem-solving
            skills and commitment to bringing the best user experience to 
            life. Elomar is a true team player and a fantastic asset to any
            project."
          author="Igor Sinchuk"
          image="igor.jpeg"
          role="Product Manager @ Deliverect"
        />

        <TestimonialCard
          review="Working with Elomar has been a fantastic experience as a designer.
            As a programmer, he has a remarkable ability to think alongside the 
            design process, quickly grasping what is expected and offering valuable
            input. His insights often highlight how small tweaks in the design can
            significantly streamline development, saving time without compromising
            quality. Elomar's collaborative mindset and practical recommendations
            make him an invaluable partner in creating designs that are both visually
            compelling and technically efficient to implement."
          author="Karel van Haeverbeek"
          image="karel.jpeg"
          role="UI/UX Designer @ Deliverect"
          gradient="green"
        />

        {/* <TestimonialCard
          review="Working with Elomar has been a fantastic experience as a designer.
            As a programmer, he has a remarkable ability to think alongside the 
            design process, quickly grasping what is expected and offering valuable
            input. His insights often highlight how small tweaks in the design can
            significantly streamline development, saving time without compromising
            quality. Elomar's collaborative mindset and practical recommendations
            make him an invaluable partner in creating designs that are both visually
            compelling and technically efficient to implement."
          author="Pieter De Clercq"
          image="pieter.jpeg"
          role="Software Engineer @ Deliverect"
          gradient="red"
        />

        <TestimonialCard
          review="Working with Elomar at Deliverect was an absolute pleasure. 
            As a Front-End Developer, his attention to detail and ability 
            to deliver high-quality work were impressive. We collaborated on
            a few projects, and I was always impressed by his problem-solving
            skills and commitment to bringing the best user experience to 
            life. Elomar is a true team player and a fantastic asset to any
            project."
          author="Davy Maddelein"
          image="igor.jpeg"
          role="Teamlead @ Deliverect"
        />

        <TestimonialCard
          review="Working with Elomar at Deliverect was an absolute pleasure. 
            As a Front-End Developer, his attention to detail and ability 
            to deliver high-quality work were impressive. We collaborated on
            a few projects, and I was always impressed by his problem-solving
            skills and commitment to bringing the best user experience to 
            life. Elomar is a true team player and a fantastic asset to any
            project."
          author="Yoshi"
          image="yoshi.jpeg"
          role="Digital Designer & Marketeer"
        />

        <TestimonialCard
          review="Working with Elomar at Deliverect was an absolute pleasure. 
            As a Front-End Developer, his attention to detail and ability 
            to deliver high-quality work were impressive. We collaborated on
            a few projects, and I was always impressed by his problem-solving
            skills and commitment to bringing the best user experience to 
            life. Elomar is a true team player and a fantastic asset to any
            project."
          author="Alvaro"
          image="alvaro.jpeg"
          role="Software Engineer @ Deliverect"
          gradient="green"
        /> */}
      </div>
    </section>
  );
};

export default Testimonials;
