import { Stack, Typography } from "@mui/material";
import Game from "./Game";

function App() {
  return (
    <div>
      <Stack alignItems="center">
        <Typography fontSize={30} fontWeight="bold">Snake</Typography>
      </Stack>
      <Game />
    </div>
  );
}

export default App;
