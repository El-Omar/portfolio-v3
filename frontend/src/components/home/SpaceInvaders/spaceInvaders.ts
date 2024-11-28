import { RefObject } from "react";

const SpaceInvaders = (spaceInvaderRef: RefObject<HTMLDivElement>) => {
  if (!spaceInvaderRef.current) {
    return;
  }

  const $spaceInvaders = spaceInvaderRef.current;

  const squares = $spaceInvaders.querySelectorAll(`.block`);
  const resultDisplay = $spaceInvaders.querySelector(`.result`);
  const playBtn = $spaceInvaders.querySelector(`.btn-play`);
  const $highScore = $spaceInvaders.querySelector(`.high-score .value`);
  const instructions = $spaceInvaders.querySelector(".instructions");

  if (!resultDisplay || !playBtn || !$highScore) {
    return;
  }

  const width = 15;
  let currentShooterIndex = 202;
  let currentInvaderIndex = 0;
  let alienInvadersTakenDown: number[] = [];
  let result = 0;
  let highScore = 0;
  let direction = 1;
  let invaderId: NodeJS.Timeout;
  let isPlaying = false;
  let isGameOver = false;
  let howManyTimesDidPlayerWin = 0;
  const alienSpeed = 500; // ms

  //define the alien invaders
  const alienInvadersStartingPosition = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39,
  ];

  let alienInvaders = alienInvadersStartingPosition;

  //draw the alien invaders
  alienInvaders.forEach((invader) =>
    squares[currentInvaderIndex + invader].classList.add("invader"),
  );

  //draw the shooter
  squares[currentShooterIndex].classList.add("shooter");

  //move the shooter along a line
  const moveShooter = ({ keyCode }: { keyCode: number }) => {
    squares[currentShooterIndex].classList.remove("shooter");
    if (keyCode === 37) {
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
    } else if (keyCode === 39) {
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
    }

    squares[currentShooterIndex].classList.add("shooter");
  };

  const gameOver = () => {
    if (
      squares[currentShooterIndex].classList.contains("invader") &&
      squares[currentShooterIndex].classList.contains("shooter")
    ) {
      resultDisplay.textContent = "Game Over";
      squares[currentShooterIndex].classList.add("boom");
      clearInterval(invaderId);
      isPlaying = false;
      isGameOver = true;
      result = 0;
      howManyTimesDidPlayerWin = 0;
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      if (alienInvaders[i] > squares.length - (width - 1)) {
        resultDisplay.textContent = "Game Over";
        clearInterval(invaderId);
        isPlaying = false;
        isGameOver = true;
        result = 0;
        howManyTimesDidPlayerWin = 0;
      }
    }

    if (alienInvadersTakenDown.length === alienInvaders.length) {
      resultDisplay.textContent = "You Win! Play again";
      clearInterval(invaderId);
      isPlaying = false;
      isGameOver = false;
      howManyTimesDidPlayerWin++;
      if (result > highScore) highScore = result;
      $highScore.textContent = `${highScore}`;
    }
  };

  //move the alien invaders
  const moveInvaders = () => {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge =
      alienInvaders[alienInvaders.length - 1] % width === width - 1;

    if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
      direction = width;
    } else if (direction === width) {
      if (leftEdge) direction = 1;
      else direction = -1;
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      squares[alienInvaders[i]].classList.remove("invader");
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      alienInvaders[i] += direction;
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      //ADD IF LATER
      if (!alienInvadersTakenDown.includes(i)) {
        squares[alienInvaders[i]].classList.add("invader");
      }
    }

    gameOver();
  };

  //shoot at aliens
  const shoot = ({ keyCode }: { keyCode: number }) => {
    let laserId: NodeJS.Timeout;
    let currentLaserIndex = currentShooterIndex;
    //move the laser from the shooter to the alien invader
    const moveLaser = () => {
      squares[currentLaserIndex].classList.remove("laser");
      currentLaserIndex -= width;
      squares[currentLaserIndex].classList.add("laser");
      if (squares[currentLaserIndex].classList.contains("invader")) {
        squares[currentLaserIndex].classList.remove("laser");
        squares[currentLaserIndex].classList.remove("invader");
        squares[currentLaserIndex].classList.add("boom");

        setTimeout(
          () => squares[currentLaserIndex].classList.remove("boom"),
          150,
        );
        clearInterval(laserId);

        const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
        alienInvadersTakenDown.push(alienTakenDown);
        result++;
        if (isPlaying) {
          resultDisplay.textContent = `Score: ${result}`;
        }
      }

      if (currentLaserIndex < width) {
        clearInterval(laserId);
        setTimeout(
          () => squares[currentLaserIndex].classList.remove("laser"),
          100,
        );
      }
    };

    if (keyCode === 32) {
      if (isPlaying) {
        laserId = setInterval(moveLaser, 100);
        return false;
      } else {
        // @ts-expect-error false positive
        clearInterval(laserId);
      }
    }
  };

  const startGame = () => {
    isPlaying = true;
    alienInvadersTakenDown = [];
    currentInvaderIndex = 0;
    direction = 1;
    currentShooterIndex = 202;
    alienInvaders = [...alienInvadersStartingPosition];
    const difficulty = !isGameOver
      ? Math.max(alienSpeed - alienSpeed * howManyTimesDidPlayerWin * 0.2, 50)
      : alienSpeed;

    squares.forEach((square) =>
      square.classList.remove(`invader`, `shooter`, `boom`),
    );
    squares[currentShooterIndex].classList.add("shooter");
    alienInvaders.forEach((invader) =>
      squares[currentInvaderIndex + invader].classList.add("invader"),
    );

    resultDisplay.textContent = `Score: ${result > 0 ? result : ``}`;
    document.addEventListener("keyup", shoot);
    document.addEventListener("keydown", moveShooter);
    invaderId = setInterval(moveInvaders, difficulty);
  };

  // @ts-expect-error not needed
  const playBtnHandler = ({ currentTarget }) => {
    if (!isPlaying || (isGameOver && !isPlaying)) {
      currentTarget.classList.add(`is-playing`);
      resultDisplay.classList.remove(`hidden`);
      instructions?.classList.add("invisible");
      startGame();
      currentTarget.blur();
    }
  };

  playBtn.addEventListener(`click`, playBtnHandler);
};

export default SpaceInvaders;
