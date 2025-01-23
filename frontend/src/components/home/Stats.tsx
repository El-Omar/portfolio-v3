import { MapPin, Code2, PencilRuler, CalendarFold } from "lucide-react";

const cards = [
  {
    icon: <MapPin className="text-cool-red dark:text-neutral-400" size={26} />,
    title: "Based in",
    heading: "Belgium",
  },
  {
    icon: (
      <CalendarFold className="text-cool-red dark:text-neutral-400" size={26} />
    ),
    title: "Experience",
    heading: "6 Years",
  },
  {
    icon: (
      <PencilRuler className="text-cool-red dark:text-neutral-400" size={26} />
    ),
    title: "Designer",
    heading: "UI/UX",
    skills: {
      primary: ["Figma", "Photoshop"],
      secondary: ["Sketch", "Adobe XD"],
    },
  },
  {
    icon: <Code2 className="text-cool-red dark:text-neutral-400" size={26} />,
    title: "Developer",
    heading: "Fullstack Developer",
    skills: {
      primary: ["React.js", "TypeScript"],
      secondary: ["Node.js", "Express", "MongoDB"],
    },
  },
];

const Stats = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative group h-full w-full p-8 overflow-hidden
                bg-gradient-to-tr from-neutral-50 to-neutral-100 dark:bg-neutral-800"
            >
              <div className="absolute inset-0 transition-opacity duration-300 ease-out opacity-0 group-hover:opacity-50
                bg-gradient-to-tr from-neutral-100 to-neutral-200 dark:bg-neutral-700" 
              />
              <div className="relative z-10">
                <div className="space-y-3">
                  <div className="float-right">{card.icon}</div>

                  <h3 className="text-sm md:text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 group-hover:text-cool-red transition-all duration-300">
                    {card.title}
                  </h3>
                  <div className="h-px w-12 bg-neutral-300 dark:bg-neutral-600 group-hover:w-24 group-hover:bg-cool-red transition-all duration-300" />

                  <p className="text-xl font-medium">{card.heading}</p>

                  {card.skills && (
                    <div className="space-y-2 mt-3">
                      <div className="flex flex-wrap gap-2">
                        {card.skills.primary.map((skill, i) => (
                          <span
                            key={i}
                            className="text-sm px-2 py-1 bg-gold/20 dark:bg-gold/10 text-primary dark:text-white rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {card.skills.secondary.map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-0.5 bg-neutral-200/50 dark:bg-neutral-700/50 text-neutral-500 dark:text-neutral-500 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
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
