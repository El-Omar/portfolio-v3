"use client";

import { motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { ReactElement, ReactNode, useState } from "react";

import Sidebar from "./Sidebar";
import { Button } from "../ui/Button";
import { Link } from "@/i18n/routing";

const Animation = ({ children }: { children: ReactNode }) => (
  <MotionConfig transition={{ ease: "circInOut", duration: 0.38 }}>
    {children}
  </MotionConfig>
);

const Navigation = (): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => setIsOpen((toggle) => !toggle);

  const navToggleClassName = `bg-primary transition-all duration-150 ease-in-out`;

  return (
    <>
      {isOpen && <Sidebar toggleSidebar={toggleSidebar} />}
      <nav className="z-50 border-22 sticky top-0 py-4 flex justify-between items-center">
        <Link href="/">
          <motion.figure
            className="flex items-center"
            animate={{ x: isOpen ? 25 : 0 }}
          >
            <Animation>
              <motion.strong
                className="text-2xl font-rakkas mt-6 -mr-0.5"
                animate={{ x: isOpen ? 0 : 10, opacity: isOpen ? 1 : 0 }}
              >
                ـمر
              </motion.strong>
            </Animation>
            <Image
              src="/img/logo@2x.png"
              alt="Logo"
              width={24.75}
              height={24.245}
              className="dark:invert"
            />
            <Animation>
              <motion.span
                className="text-2xl font-pacifico mt-0 -ml-0.5"
                animate={{ x: isOpen ? 0 : -10, opacity: isOpen ? 1 : 0 }}
              >
                omar
              </motion.span>
            </Animation>
          </motion.figure>
        </Link>
        <Button
          variant="link"
          className="group hover:no-underline flex flex-col gap-1 items-end px-6"
          onClick={toggleSidebar}
        >
          <div
            className={`${!isOpen ? "w-[21px] group-hover:w-[24px]" : "group-hover:w-[21px] w-[24px]"} h-[3px] ${navToggleClassName}`}
          />
          <div
            className={`${!isOpen ? "w-[18px] group-hover:w-[24px]" : "group-hover:w-[18px] w-[24px]"} h-[3px] ${navToggleClassName}`}
          />
          <div
            className={`${!isOpen ? "w-[19px] group-hover:w-[24px]" : "group-hover:w-[19px] w-[24px]"} h-[3px] ${navToggleClassName}`}
          />
        </Button>
      </nav>
    </>
  );
};

export default Navigation;
