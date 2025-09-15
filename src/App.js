import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./public/Home";
import Signin from "./public/Signin";
import Signup from "./public/Signup";
import Homepage from "./pages/User/Homepage";
import AuctionPage from "./pages/User/AuctionPage";
import ProfilePage from "./pages/User/ProfilePage";

import "./styles/general.css";
import "./styles/queries.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/auctionpage" element={<AuctionPage />} />
        <Route path="/profilepage" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
