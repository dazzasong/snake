import React from "react";
import { Box, Stack, Typography } from "@mui/material";

function Base() {
  return (
    <Box width={16} height={16} bgcolor="white" />
  );
}

function Player({ points }) {
  const body = Array.from(Array(points).keys()).map(() =>
    <Base />
  );

  return (
    <Stack spacing={0.5}>
      {body}
    </Stack>
  );
}

function Game({ state, points }) {
  return (
    <Stack justifyContent="center" alignItems="center" bgcolor="black" width={600} height={600}>
      <Typography color="white">Waiting for game to start...</Typography>
      <Player />
    </Stack>
  );
}

export default Game;