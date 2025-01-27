import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import Game from "./Game";

function App() {
  const [gameState, setGameState] = React.useState(0);
  const [settingsWindowOpen, setSettingsWindowOpen] = React.useState(false);

  return (
    <div>
      <Stack alignItems="center" spacing={4}>
        <Typography
          color="white"
          fontSize={30}
          fontWeight="bold"
          fontFamily="pixelify sans"
          sx={{ userSelect: "none" }}
        >
          Snake
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          bgcolor="darkgreen"
          width={460}
          height={100}
        >
          <Button
            variant="contained"
            color="inherit"
            onClick={() => setGameState(1)}
          >
            <Typography fontSize={24} fontFamily="pixelify sans">{gameState === 1 ? "End Game" : "Start Game"}</Typography>
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => setSettingsWindowOpen(true)}
          >
            <Typography fontSize={24} fontFamily="pixelify sans">Settings</Typography>
          </Button>
        </Stack>
        <Game state={gameState} />
      </Stack>
    </div>
  );
}

export default App;
