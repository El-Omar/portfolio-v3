import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";

const Testimonials = (): ReactElement => {
  const t = useTranslations("about.testimonials");

  return (
    <section className="w-full py-14 lg:py-20 relative">
      <Title className="md:leading-tight text-center mb-12">
        {t.rich("title", {
          accent: (chunk) => (
            <span className="font-baskerville text-cool-red">{chunk}</span>
          ),
        })}
      </Title>

      <div className="grid md:grid-cols-2 gap-8 relative">
        <div className="p-8 rounded-lg bg-gradient-to-r from-green-100 to-blue-50 dark:from-blue-950 dark:to-neutral-800">
          <Paragraph className="md:text-lg italic">
            "Nathan's ability to translate complex design requirements into
            polished, functional code is remarkable. His background in both
            design and development brings unique value to any project."
          </Paragraph>
          <div className="mt-4 flex items-center gap-4">
            <div>
              <p className="font-semibold">Yoshi De Schrijver</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Lead Designer at Studio Digital
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-lg shadow-sm bg-neutral-50 dark:bg-neutral-800">
          <Paragraph className="md:text-lg italic">
            "Elomar is an exceptional Frontend Engineer with a talent for
            designing user-friendly experiences that stand out. His strong
            communication skills and creative problem-solving consistently
            elevated our projects, and his collaborative and fun approach made
            him a joy to work with. I highly recommend him to any team!"
          </Paragraph>
          <div className="mt-4 flex items-center gap-4">
            <div>
              <p className="font-semibold">Mahdi Hadrich</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Frontend Developer @ Deliverect
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-lg shadow-sm bg-neutral-50 dark:bg-neutral-800">
          <Paragraph className="md:text-lg italic">
            "Elomar has an eye for detail and outstanding expertise in design
            and programming. His passion seamlessly translates into creative and
            efficient solutions!"
          </Paragraph>
          <div className="mt-4 flex items-center gap-4">
            <div>
              <p className="font-semibold">Jonas Vanhecke</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Backend Developer @ Skarabee
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-lg shadow-sm bg-gradient-to-r from-red-50 to-blue-50 dark:from-neutral-800 dark:to-blue-950">
          <Paragraph className="md:text-lg italic">
            "Working with Nathan was a game-changer for our project. His
            creative problem-solving and technical expertise helped us deliver
            an exceptional user experience."
          </Paragraph>
          <div className="mt-4 flex items-center gap-4">
            <div>
              <p className="font-semibold">Pieter</p>
              <p className="text-sm text-neutral-600">
                Project Manager at TechFlow
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-lg bg-gradient-to-r from-green-100 to-blue-50 dark:from-blue-950 dark:to-neutral-800">
          <Paragraph className="md:text-lg italic">
            "Nathan's ability to translate complex design requirements into
            polished, functional code is remarkable. His background in both
            design and development brings unique value to any project."
          </Paragraph>
          <div className="mt-4 flex items-center gap-4">
            <div>
              <p className="font-semibold">Yoshi De Schrijver</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Lead Designer at Studio Digital
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-lg shadow-sm bg-neutral-50 dark:bg-neutral-800">
          <Paragraph className="md:text-lg italic">
            "Working with Nathan was a game-changer for our project. His
            creative problem-solving and technical expertise helped us deliver
            an exceptional user experience."
          </Paragraph>
          <div className="mt-4 flex items-center gap-4">
            <div>
              <p className="font-semibold">Igor</p>
              <p className="text-sm text-neutral-600">
                Project Manager at TechFlow
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
