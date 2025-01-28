import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import Game from "./Game";

function App() {
  const [gameState, setGameState] = React.useState(0);
  const [settingsWindowOpen, setSettingsWindowOpen] = React.useState(false);

  const handleGameState = () => {
    switch (gameState) {
      case 1:
        setGameState(2);
        break;
      default:
        setGameState(1);
    }
  }

  let buttonText = "Start Game";
  
  switch (gameState) {
    case 0:
      buttonText = "Start Game";
      break;
    case 1:
      buttonText = "End Game";
      break;
    case 2:
      buttonText = "Retry";
      break;
    default:
      buttonText = "Error";
  }

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
            onClick={handleGameState}
          >
            <Typography fontSize={24} fontFamily="pixelify sans">{buttonText}</Typography>
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
