import { Fab, Input, Stack, Switch, Typography } from "@mui/material";
import { playSound } from "./App";
import { Close } from "@mui/icons-material";

function Settings({ setSettingsWindowOpen, isMuted, setIsMuted, isGridEnabled, setIsGridEnabled, borderColor, setBorderColor }) {
  const labels = ["Mute sounds", "Enable grid", "Border color"];

  return (
    <Stack
      spacing={1}
      bgcolor="white"
      padding={1}
      border={2}
      position="absolute"
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography fontFamily="pixelify sans"><u>Settings</u></Typography>
        <Fab
          size="small"
          onClick={() => {
            setSettingsWindowOpen(false);
            playSound("button-click.mp3", isMuted);
          }}
        >
          <Close />
        </Fab>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Stack justifyContent="space-between">
          {labels.map((l) => <Typography fontFamily="pixelify sans">{l}:</Typography>)}
        </Stack>
        <Stack justifyContent="space-between">    
          <Switch checked={isMuted} color="success" onChange={() => setIsMuted((prevState) => !prevState)} />
          <Switch checked={isGridEnabled} color="success" onChange={() => setIsGridEnabled((prevState) => !prevState)} />
          <Input value={borderColor} type="color" fullWidth onChange={(e) => setBorderColor(e.target.value)} />
        </Stack>
      </Stack>
      <Typography fontFamily="pixelify sans">-- WASD or Arrow Keys to move --</Typography>
    </Stack>
  );
}

export default Settings;