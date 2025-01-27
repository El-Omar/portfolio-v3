"use client";

import {
  ArrowDownRight,
  CalendarFold,
  Code2,
  IdCard,
  Minus,
  PencilRuler,
} from "lucide-react";
import { useState } from "react";

const yearsOfExperience = Math.floor(
  (new Date().getTime() - new Date("2018-06-01").getTime()) /
    (1000 * 60 * 60 * 24 * 365.25),
);

const cards = [
  {
    icon: <IdCard className="text-cool-red dark:text-neutral-400" size={26} />,
    title: "Profile",
    info: {
      primary: {
        value: "Belgium",
      },
      secondary: {
        label: "Languages",
        items: ["Arabic", "Dutch", "English"],
      },
    },
    description:
      "I was born in Jordan, was raised between Jordan and Egypt, and have been living in Belgium since my teenage years.",
  },
  {
    icon: (
      <CalendarFold className="text-cool-red dark:text-neutral-400" size={26} />
    ),
    title: "Experience",
    info: {
      primary: {
        value: `${yearsOfExperience} Years`,
      },
      secondary: {
        label: "Focus Areas",
        items: ["Web Apps", "UI/UX Design"],
      },
    },
    description:
      "Started my journey in 2018, working with startups and companies to create solutions that make a difference.",
  },
  {
    icon: (
      <PencilRuler className="text-cool-red dark:text-neutral-400" size={26} />
    ),
    title: "Design",
    info: {
      primary: {
        label: "Specialty",
        value: "UI/UX Designer",
      },
      secondary: {
        label: "Tools",
        items: ["Figma", "Photoshop", "Sketch"],
      },
    },
    description:
      "Expert in UX, with a strong background in graphic design & photo editing, and experience beyond the professional.",
  },
  {
    icon: <Code2 className="text-cool-red dark:text-neutral-400" size={26} />,
    title: "Development",
    info: {
      primary: {
        label: "Focus",
        value: "Fullstack Developer",
      },
      secondary: {
        label: "Technologies",
        items: ["React", "TypeScript", "Node.js"],
      },
    },
    description:
      "Specializing primarily in frontend development, while maintaining a strong foundation in backend technologies.",
  },
];

const Stats = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}>
          {cards.map((card, index) => (
            <div
              key={index}
              className={`
                relative cursor-pointer h-full group
                transition-all duration-500 ease-in-out
                ${expandedCard === index ? "" : ""}
              `}
              onClick={() =>
                setExpandedCard(expandedCard === index ? null : index)
              }
            >
              {/* Corner Circle */}
              <div
                className={`
                  absolute overflow-hidden z-20 rounded-full
                  w-7 h-7 -top-3 -left-3 md:scale-75 
                  group-hover:scale-100
                  ${expandedCard === index ? "scale-100" : "group-hover:bg-cool-red"}
                  md:bg-neutral-800 bg-cool-red
                  transition-all duration-200 ease-in-out
                `}
              >
                <ArrowDownRight
                  className={`
                    absolute text-white top-1 left-1
                    md:opacity-0 opacity-100 group-hover:opacity-100 transition-all duration-300
                    motion-translate-x-loop-[15%] motion-translate-y-loop-[15%]
                    ${expandedCard === index ? "translate-x-4 translate-y-4 opacity-100" : ""}
                  `}
                  size={16}
                />
                <Minus
                  className={`
                    absolute text-white top-1.5 left-1.5
                    opacity-0 transition-all duration-200
                    ${expandedCard === index ? "opacity-100 delay-100 translate-x-0" : "-translate-x-1"}
                  `}
                  size={16}
                />
              </div>

              <div className="relative overflow-hidden h-full">
                {/* Expanding Circle Background */}
                <div
                  className={`
                  absolute bg-gold-light rounded-full z-10
                  -top-3 -left-3
                  transition-all duration-500 ease-in-out delay-100
                  ${
                    expandedCard === index
                      ? "w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4"
                      : "w-7 h-7 group-hover:w-9 group-hover:h-9"
                  }
                `}
                />

                {/* Card Content */}
                <div className="relative h-full p-8 bg-gradient-to-tr from-neutral-50 to-neutral-100 dark:bg-neutral-800">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="relative z-20">
                      <h3 className="text-sm md:text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 group-hover:text-cool-red transition-all duration-300">
                        <div className="absolute -top-[5px] right-0">
                          {card.icon}
                        </div>
                        <strong
                          className={
                            expandedCard === index ? "text-cool-red" : ""
                          }
                        >
                          {card.title}
                        </strong>
                      </h3>
                      <div
                        className={`
                        relative z-20 h-px dark:bg-neutral-600 
                        group-hover:w-24 group-hover:bg-cool-red 
                        ${expandedCard === index ? "bg-cool-red w-24" : "bg-neutral-300 w-12"}
                        transition-all duration-300
                      `}
                      />
                    </div>

                    {/* Content */}
                    <div className="relative z-20">
                      {/* Main Value */}
                      <div className="mb-6">
                        <p className="xl:text-2xl text-lg font-medium text-neutral-900 dark:text-white">
                          {card.info.primary.value}
                        </p>
                      </div>

                      {/* Tags Section */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                          {card.info.secondary.label}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {card.info.secondary.items.map((item, i) => (
                            <span
                              key={i}
                              className="
                                px-2 py-0.5 rounded-sm text-sm 
                                bg-neutral-100 dark:bg-neutral-800 
                                text-neutral-600 dark:text-neutral-400
                                border border-neutral-200 dark:border-neutral-700
                                transition-colors duration-200
                                hover:border-neutral-300 dark:hover:border-neutral-600
                              "
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Description Section with Height Animation Wrapper */}
                    <div
                      className={`
                        relative z-20 overflow-hidden transition-[height] duration-300
                        ${expandedCard !== null ? "h-32" : "h-0"}
                      `}
                    >
                      {/* Description Content with Fade/Slide Animation */}
                      <div
                        className={`
                          pt-4 mt-2 border-t border-neutral-400 dark:border-neutral-800
                          ${
                            expandedCard === index
                              ? "motion-fade-in motion-translate-y-in-25 motion-duration-500 motion-ease-spring-smooth"
                              : "opacity-0 motion-translate-y-out-25 motion-duration-300"
                          }
                        `}
                      >
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
