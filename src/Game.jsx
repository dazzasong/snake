import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { playSound } from "./App";

function Square({ filled=false, isGridEnabled, snakeColor, foodColor }) {
  return (
    <Box width={16} height={16} bgcolor={filled ? "white" : "black"} border={isGridEnabled ? 1 : 0} />
  );
}

function Column({ squares, isGridEnabled, snakeColor, foodColor }) {
  return (
    <Stack>
      {Array.from([...squares]).map((square) => (
        <Square filled={square} isGridEnabled={isGridEnabled} />
      ))}
    </Stack>
  );
}

function Grid({ grid, isGridEnabled, snakeColor, foodColor }) {
  return (
    <Stack direction="row">
      {Array.from([...grid]).map((column) => (
        <Column squares={column} isGridEnabled={isGridEnabled} />
      ))}
    </Stack>
  );
}

function Game({ state, setState, isMuted, isGridEnabled, snakeColor, foodColor, borderColor }) {
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
  const [snakeSquares, setSnakeSquares] = useState([]);
  const [foodPosition, setFoodPosition] = useState([]);

  const [message, setMessage] = useState("WAITING FOR GAME TO START...");

  const randomPosition = () => [Math.floor(Math.random() * 25), Math.floor(Math.random() * 25)];

  function includesPos(arr2D, targetArr) {
    return arr2D.some((subArr) => {
      Array.isArray(subArr) && subArr.length === targetArr.length && subArr.every((val, index) => val === targetArr[index])
    });
  }

  useEffect(() => {
    if (state === 1) {
      setScore(0);
      setMessage("READY?");
      setTimeout(() => {
        setMessage("GO!");
        setTimeout(() => {
          setMessage("");
          setSnakeSquares([[12, 12]]);
          setFoodPosition(() => {
            let randPos = randomPosition();
            while (snakeSquares.includes(randPos)) randPos = randomPosition();
            return randPos;
          });
        }, 1000);
      }, 2000);
    } else if (state === 2) {
      if (score > highScore) {
        setHighScore(score);
        setMessage("GAME OVER - NEW BEST!");
      } else setMessage("GAME OVER");
      setGrid((prevGrid) => prevGrid.map((column) => column.map(() => 0))); // Reset grid
      setDirection(0);
      setSnakeSquares([]);
      setFoodPosition([]);
      playSound("game-over.mp3", isMuted);
    }
  }, [state]);

  // Set direction based on user inputs
  useEffect(() => {
    if (state !== 1 || snakeSquares.length === 0) return; // Only run when game starts

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
  }, [state, direction, snakeSquares]);

  // Updates snakeSquares per frame
  useEffect(() => {
    if (state !== 1 || snakeSquares.length === 0) return; // Only run during game

    const interval = setInterval(() => {
      setSnakeSquares((prevPlayerSquares) => {
        let newPlayerSquares = [...prevPlayerSquares];
        let newPlayerHead = [...newPlayerSquares[0]]; // Create a copy of the head
        switch (direction) {
          case 1: newPlayerHead[1]--; break; // Up
          case 2: newPlayerHead[0]--; break; // Left
          case 3: newPlayerHead[1]++; break; // Down
          case 4: newPlayerHead[0]++; break; // Right
          default: return prevPlayerSquares;
        }
        newPlayerSquares.unshift(newPlayerHead); // Adds new playerHead to start

        // Unless food is consumed, remove the end of snakeSquares
        if (newPlayerHead[0] === foodPosition[0] && newPlayerHead[1] === foodPosition[1]) {
          setScore((prevScore) => prevScore + 1);
          setFoodPosition(randomPosition);
          playSound("food.mp3", isMuted);
        } else newPlayerSquares.pop();

        // If snake goes out of bounds or hits itself, game over
        if (newPlayerHead[0] < 0 ||
            newPlayerHead[0] > 24 ||
            newPlayerHead[1] < 0 ||
            newPlayerHead[1] > 24 ||
            prevPlayerSquares.some((pos) => Array.isArray(pos) && pos.length === newPlayerHead.length && pos.every((val, index) => val === newPlayerHead[index]))
        ) {
          setState(2);
          return prevPlayerSquares;
        }

        return newPlayerSquares;
      });
    }, 75);
  
    return () => clearInterval(interval);
  }, [state, direction, snakeSquares, foodPosition]);

  // Update the grid based on new snakeSquares
  useEffect(() => {
    if (state !== 1 || snakeSquares.length === 0) return; // Only run during game

    setGrid((prevGrid) => {
      const updatedGrid = prevGrid.map((column) => column.map(() => 0)); // Reset grid  
      for (let i = 0; i < snakeSquares.length; i++) {
        const [x, y] = snakeSquares[i];
        updatedGrid[x][y] = 1;
      }
  
      const [x, y] = foodPosition;
      updatedGrid[x][y] = 1;
      
      return updatedGrid;
    });
  }, [state, snakeSquares, foodPosition])

  return (
    <Box color={borderColor}>
      <Stack direction="row" spacing={2}>
        <Typography fontSize={18} fontFamily="pixelify sans">SCORE: {score}</Typography>
        <Typography fontSize={18} fontFamily="pixelify sans">HIGH SCORE: {highScore}</Typography>
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        border={2}
      >
        <Typography fontSize={18} fontFamily="pixelify sans" position="absolute">{message}</Typography>
        <Grid grid={grid} isGridEnabled={isGridEnabled} snakeColor={snakeColor} foodColor={foodColor} />
      </Stack>
    </Box>
  );
}

export default Game;