"use client";

import { ReactElement } from "react";
import { Button } from "../ui/Button";

import IconDark from "@/components/assets/dark.svg";
import { useThemeStore } from "@/stores/themeStore";
import Image from "next/image";

const Navigation = (): ReactElement => {
  const { toggleTheme } = useThemeStore();

  const navToggleClassName =
    "bg-primary group-hover:w-[23px] transition-all duration-150 ease-in-out";

  return (
    <nav className="z-10 border-22 sticky top-0 p-4 flex justify-between items-center">
      <Button variant="link" className="group">
        <Image
          src="/img/logo@2x.png"
          alt="Logo"
          width={24.75}
          height={24.245}
          className="dark:invert"
        />
        <div className="flex flex-col gap-1 items-start">
          <div className={`w-[21px] h-[3px] ${navToggleClassName}`}></div>
          <div className={`w-[18px] h-[3px] ${navToggleClassName}`}></div>
          <div className={`w-[19px] h-[3px] ${navToggleClassName}`}></div>
        </div>
      </Button>
      <Button
        className="w-6 h-6 p-4 rounded-full border-none group bg-neutral-200 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-600"
        variant="outline"
        onClick={toggleTheme}
      >
        <IconDark className="fill-primary scale-75" />
      </Button>
    </nav>
  );
};

export default Navigation;
