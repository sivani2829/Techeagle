import "./App.css";
import Participants from "./components/Participants";
import RaceTrack from "./components/RaceTrack";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Participants />} />
          <Route path="/racetrack" element={<RaceTrack />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
