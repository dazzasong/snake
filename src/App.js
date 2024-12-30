import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import Game from "./Game";

function App() {
  const [gameState, setGameState] = React.useState(0);
  const [settingsWindowOpen, setSettingsWindowOpen] = React.useState(false);

  return (
    <div>
      <Stack alignItems="center" spacing={4}>
        <Typography fontSize={30} fontWeight="bold">Snake</Typography>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          bgcolor="gray"
          width={600}
          height={60}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => setGameState(1)}
          >
            Start Game
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => setSettingsWindowOpen(true)}
          >
            Settings
          </Button>
        </Stack>
        <Game />
      </Stack>
    </div>
  );
}

export default App;
