import "./global.css";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes/Routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FakeWebsocketProvider } from "./modules/ws/FakeWebSocketProvider";

let theme = createTheme({
  palette: {
    background: {
      default: "#f5f7fb",
    },
    primary: {
      main: "#0052cc",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
});

function App() {
  return (
    <FakeWebsocketProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes />
          <CssBaseline />
        </ThemeProvider>
      </BrowserRouter>
    </FakeWebsocketProvider>
  );
}

export default App;
