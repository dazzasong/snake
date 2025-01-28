import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

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

function Game({ state }) {
  const [grid, setGrid] = useState([
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ]);

  const [playerSquares, setPlayerSquares] = useState([]);
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    switch (state) {
      case 1:
        setPlayerSquares([[12,12]]);
        break;
      default:
        setDirection(0);
    }
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerSquares((prevPlayerSquares) =>
        prevPlayerSquares.map(([x, y]) => {
          switch (direction) {
            case 1: // Move up
              return [x, y-1];
            case 2: // Move right
              return [x+1, y];
            case 3: // Move down
              return [x, y+1];
            case 4: // Move left
              return [x-1, y];
            default:
              return [x, y];
          }
        })
      );
  
      // Update the grid based on new playerSquares
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((column) => column.map(() => 0)); // Reset grid
        for (let i = 0; i < playerSquares.length; i++) {
          const [x, y] = playerSquares[i];
          newGrid[x][y] = 1;
        }        
        return newGrid;
      });
    }, 100);
  
    return () => clearInterval(interval);
  }, [direction, playerSquares]);
  

  return (
    <Box>
      <Typography color="white" fontSize={20} fontFamily="pixelify sans">Score: {score}</Typography>
      <Stack justifyContent="center" alignItems="center" border={2} borderColor="#ffffff">
        { state === 0 &&
          <Typography color="white" fontFamily="pixelify sans" position="absolute">Waiting for game to begin...</Typography>
        }
        <Grid grid={grid} />
      </Stack>
    </Box>
  );
}

export default Game;