import { Box, Typography } from "@mui/material";
import { APP_NAME } from "../constants/app";

export function HomePage() {
  return (
    <Box
      p="var(--spacing--3)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100%">
      <Typography variant="h1">{APP_NAME}</Typography>
      <img
        src="https://cdn-icons-png.flaticon.com/512/892/892749.png"
        width="100%"
        height="auto"
        style={{ display: "block", maxWidth: "300px" }}
      />
    </Box>
  );
}
