import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./public/Home";
import Signin from "./public/Signin";
import Signup from "./public/Signup";
import Homepage from "./pages/User/Homepage";

import "./styles/general.css";
import "./styles/queries.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
