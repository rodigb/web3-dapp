import ClickRace from "./components/clickRace";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <ClickRace />
      </div>
    </>
  );
}

export default App;
