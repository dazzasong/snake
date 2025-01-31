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

function Game({ state, setState }) {
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
  const [direction, setDirection] = useState(0);
  const [playerSquares, setPlayerSquares] = useState([]);
  const [foodPosition, setFoodPosition] = useState([]);

  const [message, setMessage] = useState("WAITING FOR GAME TO START...");

  const randomPosition = () => [Math.floor(Math.random() * 25), Math.floor(Math.random() * 25)];

  useEffect(() => {
    if (state === 1) {
      setPlayerSquares([[12,12]]);
      setFoodPosition(randomPosition());
      setMessage("READY?");
      setTimeout(() => {
        setMessage("GO!");
        setTimeout(() => {
          setMessage("");
        }, 1000);
      }, 2000);
    } else if (state === 2) {
      setPlayerSquares([]);
      setFoodPosition([]);
      setDirection(0);
      setMessage("GAME OVER");
      playSound("game-over.mp3");
    }
  }, [state]);

  useEffect(() => {
    if (state !== 1) return; // Only run during game

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
  
      // Update the grid based on new playerSquares
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((column) => column.map(() => 0)); // Reset grid

        for (let i = 0; i < playerSquares.length; i++) {
          const [x,y] = playerSquares[i];
          if (x >= 0 && x < 25 && y >= 0 && y < 25) newGrid[x][y] = 1;
          else setState(2);
        }

        const [x,y] = foodPosition;
        newGrid[x][y] = 1;
        
        if (playerSquares[0][0] === foodPosition[0] && playerSquares[0][1] === foodPosition[1]) {
          //playerSquares.push();
          setScore((prevScore) => prevScore + 1);
          setFoodPosition(randomPosition);
          playSound("food.mp3");
          console.log("consumed food!")
        }
        
        return newGrid;
      });
    }, 100);
  
    return () => clearInterval(interval);
  // eslint-disable-next-line
  }, [direction, playerSquares]);
  
  // Set direction based on user inputs
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "w":
          if (direction !== 3) setDirection(1);
          break;
        case "a":
          if (direction !== 4) setDirection(2);
          break;
        case "s":
          if (direction !== 1) setDirection(3);
          break;
        case "d":
          if (direction !== 2) setDirection(4);
          break;
        default:
          // do nothing
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [direction]);

  return (
    <Box>
      <Typography color="white" fontSize={18} fontFamily="pixelify sans">SCORE: {score}</Typography>
      <Stack
        justifyContent="center"
        alignItems="center"
        border={2}
        borderColor="#ffffff"
      >
        <Typography color="white" fontSize={18} fontFamily="pixelify sans" position="absolute">{message}</Typography>
        <Grid grid={grid} />
      </Stack>
    </Box>
  );
}

export default Game;