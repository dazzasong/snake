import { Box, Button, Slider, Stack, Typography } from "@mui/material";

function Settings({ setSettingsWindowOpen }) {
  const clickSfx = new Audio("click.mp3");

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
            clickSfx.play();
          }}
        >
          x
        </Button>
      </Box>
      <Box width={260}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography fontFamily="pixelify sans">Volume:</Typography>
          <Slider step={20} />
        </Stack>
      </Box>
    </Stack>
  );
}

export default Settings;