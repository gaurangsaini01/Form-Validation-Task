import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Level1 from "./pages/Home";
import Level2 from "./pages/Level2";
import Level3 from "./pages/Level3";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Level1 />}></Route>
        <Route path="/level2" element={<Level2 />}></Route>
        <Route path="/level3" element={<Level3 />}></Route>
      </Routes>
    </div>
  );
}

export default App;
