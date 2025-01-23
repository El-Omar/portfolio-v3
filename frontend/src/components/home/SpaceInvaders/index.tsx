"use client";

import { ReactElement, useEffect, useRef } from "react";

import InitGame from "./spaceInvaders";
import SpaceInvadersStyles from "./SpaceInvadersStyles";
import { Button } from "@/components/ui/Button";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { useTranslations } from "next-intl";

const SpaceInvaders = (): ReactElement | null => {
  const t = useTranslations("home.spaceInvaders");

  const spaceInvadersDivs = Array(225).fill("block");
  const spaceInvadersRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    InitGame(spaceInvadersRef);
  }, [spaceInvadersRef]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <SpaceInvadersStyles />
      <div className="spaceinvaders" ref={spaceInvadersRef}>
        <div className="game bg-neutral-200 border-[1px]">
          {spaceInvadersDivs.map((_, i) => (
            <div
              key={i}
              className="block border-separate border-2 bg-white"
            ></div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button
            className="btn-play bg-cool-red hover:bg-red-600 text-white border-none"
            variant="outline"
          >
            <span className="play">{t("play")}</span>
            <span className="result hidden"></span>
          </Button>
          <span className="high-score">
            {t("highScore")}: <span className="value font-dm-sans">0</span>
          </span>
        </div>
        <p className="mt-12  instructions instructions text-sm text-neutral-400 text-center">
          {t("instructions")}
        </p>
      </div>
    </>
  );
};

export default SpaceInvaders;
