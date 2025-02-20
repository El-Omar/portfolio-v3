"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ReactElement, useCallback, useState } from "react";
import { Toggle } from "../ui/Toggle";
import Logo from "@/components/assets/logo.svg";
import { usePathname } from "@/i18n/routing";
import { wait } from "@/lib/utils/wait";
import { useThemeStore } from "@/stores/themeStore";

const customEaseIn = [0.32, 0, 0.15, 1];
const customEaseOut = [0.43, 0.1, 0.25, 1];
const slideEase = [0.33, 0.1, 0.25, 1];
const initialDelay = 0.75;
const logoSlideDelay = 0.4;

const layerColors = [{ color: "bg-neutral-950" }, { color: "bg-cool-red" }];

const ThemeLanguageToggles = (): ReactElement => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const switchToArabic = locale === "en";
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [isAnimating, setIsAnimating] = useState(false);

  const switchLanguage = useCallback(async () => {
    const newLocale = switchToArabic ? "ar" : "en";
    const newPath = `/${newLocale}${pathname}`;

    router.prefetch(newPath);

    setIsAnimating(true);

    await wait(2500);

    router.push(newPath);

    setIsAnimating(false);
  }, [pathname, router, switchToArabic]);

  const className = `border bg-white min-w-auto min-h-auto w-7 h-7
    hover:bg-neutral-50 transition-colors rounded-full`;

  const arabicLetters = "ـمر".split("");
  const englishLetters = "omar".split("");

  return (
    <>
      {isAnimating && (
        <>
          {/* Background layers */}
          {layerColors.map(({ color }, i) => (
            <motion.div
              key={i}
              initial={{ x: switchToArabic ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: switchToArabic ? "100%" : "-100%" }}
              transition={{
                duration: initialDelay * 0.25,
                delay: i * 0.08,
                ease: slideEase,
              }}
              className={`fixed inset-0 h-screen w-screen ${color} z-[${9995 + i}]`}
            />
          ))}

          {/* Main container */}
          <motion.div
            initial={{ x: switchToArabic ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: switchToArabic ? "100%" : "-100%" }}
            transition={{
              duration: initialDelay,
              delay: 0.16,
              ease: slideEase,
            }}
            className="fixed inset-0 h-screen w-screen text-white
              bg-[#161616] z-[9999] flex items-center justify-center"
          >
            {/* Gradient background */}
            <motion.div
              className={`
                h-[40vmax]
                aspect-square
                absolute
                -translate-x-1/2
                -translate-y-1/2
                top-1/2
                left-1/2
                origin-top-left
                rounded-full
                bg-gradient-to-r from-[#ffc100] to-[rgb(240,87,74)]
                animate-[rotate_5s_infinite]
              `}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              transition={{
                duration: 0.8,
                delay: initialDelay * 0.7,
                ease: customEaseOut,
              }}
            />

            {/* Logo and text */}
            <motion.figure
              className="w-full z-20 flex justify-center items-center rtl:flex-row-reverse"
              initial={{ x: 0, opacity: 0 }}
              animate={{
                x: switchToArabic ? 50 : -50,
                opacity: 1,
              }}
              transition={{
                opacity: {
                  duration: 0.3,
                  delay: initialDelay * 0.3,
                  ease: customEaseOut,
                },
                x: {
                  duration: 1.2,
                  delay: initialDelay + logoSlideDelay,
                  ease: slideEase,
                },
              }}
            >
              <motion.strong
                className={`lg:text-8xl text-5xl font-rakkas self-end lg:-mb-6 mb-2 lg:-mr-5 -mr-[0.625rem] leading-[0]`}
              >
                {arabicLetters.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: switchToArabic ? 0 : 1 }}
                    animate={{
                      opacity: switchToArabic ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: switchToArabic
                        ? initialDelay + logoSlideDelay + i * 0.15
                        : initialDelay +
                          logoSlideDelay +
                          (arabicLetters.length - 1 - i) * 0.15,
                      ease: switchToArabic ? customEaseOut : customEaseIn,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.strong>

              <span className="lg:w-32 w-16 aspect-square flex items-center justify-center">
                <Logo fill="currentColor" />
              </span>

              <span
                className="lg:text-8xl text-5xl font-pacifico mt-0 lg:-ml-5 -ml-2 
                  leading-[0] flex rtl:flex-row-reverse"
              >
                {englishLetters.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: switchToArabic ? 1 : 0 }}
                    animate={{
                      opacity: switchToArabic ? 0 : 1,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: switchToArabic
                        ? initialDelay +
                          logoSlideDelay +
                          (englishLetters.length - 1 - i) * 0.15
                        : initialDelay + logoSlideDelay + i * 0.15,
                      ease: switchToArabic ? customEaseIn : customEaseOut,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.figure>
          </motion.div>
        </>
      )}
      <div className="flex items-center gap-2 pl-4 lg:pl-0 border-l lg:border-l-0 border-neutral-200">
        <Toggle
          onPressedChange={toggleTheme}
          pressed={isDarkMode}
          size="sm"
          className={className}
        >
          <span className="sr-only">Theme</span>
          <span className="w-3 h-3 [&_svg]:w-3 [&_svg]:h-3">
            {isDarkMode ? <Moon size={12} /> : <Sun size={12} />}
          </span>
        </Toggle>

        <Toggle
          onPressedChange={switchLanguage}
          size="sm"
          className={className}
        >
          <span className="sr-only">Language</span>
          <span className="text-xs font-bold">
            {locale === "ar" ? "En" : "ع"}
          </span>
        </Toggle>
      </div>
    </>
  );
};

export default ThemeLanguageToggles;
