import ClickRace from "./components/game/clickRace";
import Navbar from "./components/navbar/navbar";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <Navbar />
        <div style={{ padding: "1rem" }}>
          <ClickRace />
        </div>
      </SnackbarProvider>
    </>
  );
}

export default App;
