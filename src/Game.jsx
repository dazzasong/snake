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
      {Array.from(Array(...squares)).map((square) => (
        <Square filled={square} />
      ))}
    </Stack>
  );
}

function Grid({ grid }) {
  return (
    <Stack direction="row">
      {Array.from(Array(...grid)).map((column) => (
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

  const [playerSquares, setPlayerSquares] = useState([[11,12], [12,12], [13,12]]);
  const [points, setPoints] = useState(0);
  const [direction, setDirection] = useState(0); // 0=stopped, 1=up, 2=right, 3=down, 4=left

  useEffect(() => {
    const interval = setInterval(() => {
      let updatedPlayerSquares = [...playerSquares];

      switch (direction) {
        case 1:
          updatedPlayerSquares.map((pos) => pos[1] += 1);
          break;
        case 2:
          updatedPlayerSquares.map((pos) => pos[0] += 1);
            break;
        case 3:
          updatedPlayerSquares.map((pos) => pos[1] -= 1);
          break;
        case 4:
          updatedPlayerSquares.map((pos) => pos[0] -= 1);
          break;
        default:
          break;
      }

      setPlayerSquares(updatedPlayerSquares);
    }, 1000);

    let updatedGrid = [...grid];
    // kefiejgfe

    return () => clearInterval(interval);
  }, [direction, playerSquares, grid]);

  return (
    <Stack justifyContent="center" alignItems="center">
      { state === 0 &&
        <Typography color="white" fontFamily="pixelify sans" position="absolute">Waiting for game to begin...</Typography>
      }
      <Box border={2} borderColor="#ff00ff">
        <Grid grid={grid} />
      </Box>
    </Stack>
  );
}

export default Game;