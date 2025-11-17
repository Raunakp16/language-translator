import { Routes, Route } from "react-router-dom";
import "./App.css";

import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Home from "./Components/Home/Home";

function App() {
  return (
   <div className="hero" >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
  );
}

export default App;
