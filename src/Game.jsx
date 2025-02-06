import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { playSound } from "./App";

function Square({ filled=false }) {
  return (
    <Box width={16} height={16} bgcolor={filled ? "#ffffff" : "#000000"} />
  );
}

function Column({ squares }) {
  return (
    <Stack>
      {Array.from([...squares]).map((square) => (
        <Square filled={square} />
      ))}
    </Stack>
  );
}

function Grid({ grid }) {
  return (
    <Stack direction="row">
      {Array.from([...grid]).map((column) => (
        <Column squares={column} />
      ))}
    </Stack>
  );
}

function Game({ state, setState, isMuted }) {
  const [grid, setGrid] = useState([
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ]); // 25 x 25

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [direction, setDirection] = useState(0);
  const [playerSquares, setPlayerSquares] = useState([]);
  const [foodPosition, setFoodPosition] = useState([]);

  const [message, setMessage] = useState("WAITING FOR GAME TO START...");

  const randomPosition = () => [Math.floor(Math.random() * 25), Math.floor(Math.random() * 25)];

  useEffect(() => {
    if (state === 1) {
      setScore(0);
      setMessage("READY?");
      setTimeout(() => {
        setMessage("GO!");
        setTimeout(() => {
          setMessage("");
          setPlayerSquares([[12, 12]]);
          setFoodPosition(() => {
            let randPos = randomPosition();
            while (playerSquares.includes(randPos)) randPos = randomPosition();
            return randPos;
          });
        }, 1000);
      }, 2000);
    } else if (state === 2) {
      if (score > highScore) {
        setHighScore(score);
        setMessage("GAME OVER - NEW BEST!");
      } else setMessage("GAME OVER");
      setGrid((prevGrid) => prevGrid.map((column) => column.map(() => 0)));
      setDirection(0);
      setPlayerSquares([]);
      setFoodPosition([]);
      playSound("game-over.mp3", isMuted);
    }
  }, [state]);

  // Set direction based on user inputs
  useEffect(() => {
    if (state !== 1 || playerSquares.length === 0) return; // Only run when game starts

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
          if (direction !== 3) setDirection(1); // Checks for opposite direction
          break;
        case "ArrowLeft":
        case "a":
          if (direction !== 4) setDirection(2);
          break;
        case "ArrowDown":
        case "s":
          if (direction !== 1) setDirection(3);
          break;
        case "ArrowRight":
        case "d":
          if (direction !== 2) setDirection(4);
          break;
        default:
          // do nothing
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state, direction, playerSquares]);

  useEffect(() => {
    if (state !== 1 || playerSquares.length === 0) return; // Only run during game

    // Updates playerSquares per frame
    const interval = setInterval(() => {
      setPlayerSquares((prevPlayerSquares) =>
        prevPlayerSquares.map(([x, y]) => {
          switch (direction) {
            case 1: // Move up
              return [x, y-1];
            case 2: // Move left
              return [x-1, y];
            case 3: // Move down
              return [x, y+1];
            case 4: // Move right
              return [x+1, y];
            default:
              return [x, y];
          }
        })
      );

      // Snake eats food
      if (playerSquares[0][0] === foodPosition[0] && playerSquares[0][1] === foodPosition[1]) {
        /*
        setPlayerSquares((prevPlayerSquares) => {
          const [x, y, aim] = prevPlayerSquares[-1];
          switch (aim) { // Last player square direction
            case 1: // Up
              prevPlayerSquares.push([x, y+1, aim]);
              break;
            case 2: // Left
              prevPlayerSquares.push([x+1, y, aim]);
              break;
            case 3: // Down
              prevPlayerSquares.push([x, y-1, aim]);
              break;
            case 4: // Right
              prevPlayerSquares.push([x-1, y, aim]);
              break;
            default:
              // do nothing
          }
          return prevPlayerSquares;
        });
        */
        setScore((prevScore) => prevScore + 1);
        setFoodPosition(randomPosition);
        playSound("food.mp3", isMuted);
      }
    }, 64);

    // Update the grid based on new playerSquares
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((column) => column.map(() => 0)); // Reset grid

      for (let i = 0; i < playerSquares.length; i++) {
        const [x, y] = playerSquares[i];
        if (x >= 0 && x < 25 && y >= 0 && y < 25) newGrid[x][y] = 1;
        else setState(2);
      }

      const [x, y] = foodPosition;
      newGrid[x][y] = 1;
      
      return newGrid;
    });
  
    return () => clearInterval(interval);
  }, [direction, playerSquares, foodPosition]);

  return (
    <Box color="white">
      <Stack direction="row" spacing={2}>
        <Typography fontSize={18} fontFamily="pixelify sans">SCORE: {score}</Typography>
        <Typography fontSize={18} fontFamily="pixelify sans">HIGH SCORE: {highScore}</Typography>
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        border={2}
        borderColor="#ffffff"
      >
        <Typography fontSize={18} fontFamily="pixelify sans" position="absolute">{message}</Typography>
        <Grid grid={grid} />
      </Stack>
    </Box>
  );
}

export default Game;