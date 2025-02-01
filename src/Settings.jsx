import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import { playSound } from "./App";

function Settings({ setSettingsWindowOpen, isMuted, setIsMuted }) {
  return (
    <Stack
      alignItems="center"
      bgcolor="white"
      padding={1}
      border={2}
      position="absolute"
    >
      <Typography fontFamily="pixelify sans">Settings</Typography>
      <Box position="absolute" top={0} right={0}>
        <Button
          color="error"
          size="small"
          onClick={() => {
            setSettingsWindowOpen(false);
            playSound("beep.mp3", isMuted);
          }}
        >
          x
        </Button>
      </Box>
      <Box>
        <Stack direction="row" alignItems="center">
          <Typography fontFamily="pixelify sans">Mute sounds:</Typography>
          <Switch checked={isMuted} onChange={() => setIsMuted(!isMuted)} />
        </Stack>
        <Typography fontFamily="pixelify sans">-- WASD or Arrow Keys to move --</Typography>
      </Box>
    </Stack>
  );
}

export default Settings;