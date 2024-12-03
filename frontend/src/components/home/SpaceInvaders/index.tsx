"use client";

import { ReactElement, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

import InitGame from "./spaceInvaders";
import SpaceInvadersStyles from "./SpaceInvadersStyles";

const SpaceInvaders = (): ReactElement => {
  const spaceInvadersDivs = Array(225).fill("block");
  const spaceInvadersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    InitGame(spaceInvadersRef);
  }, [spaceInvadersRef]);

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
            <span className="play">Play</span>
            <span className="result hidden"></span>
          </Button>
          <span className="high-score">
            High score: <span className="value font-dm-sans">0</span>
          </span>
        </div>
        <p className="my-12 instructions instructions text-sm text-neutral-400 text-center">
          [Space-bar] to shoot, [&#8592;] and [&#8594;] to move
        </p>
      </div>
    </>
  );
};

export default SpaceInvaders;
