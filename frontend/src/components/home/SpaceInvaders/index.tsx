"use client";

import { ReactElement, useEffect, useRef } from "react";
import SpaceInvadersStyles from "./SpaceInvadersStyles";
import { Button } from "@/components/ui/Button";

import InitGame from "./spaceInvaders";

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
        <div className="flex justify-between items-center mt-2">
          <Button
            className="btn-play bg-cool-red hover:bg-red-600 text-white"
            variant="outline"
          >
            <span className="play">Play</span>
            <span className="result hidden"></span>
          </Button>
          <span className="high-score">
            High score: <span className="value font-khula">0</span>
          </span>
        </div>
        <p className="instructions instructions text-sm text-neutral-400 text-center my-8">
          Space to shoot, left and right arrow to move
        </p>
      </div>
    </>
  );
};

export default SpaceInvaders;
