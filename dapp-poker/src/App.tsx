import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage/landingPage";
import Navbar from "./components/navbar/navbar";
import { SnackbarProvider } from "notistack";
import GamePage from "./components/game/clickRace";
import Footer from "./components/navbar/footer";
function App() {
  return (
    <>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
        <Footer />
      </SnackbarProvider>
    </>
  );
}

export default App;
