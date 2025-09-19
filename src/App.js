import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./public/Home";
import Signin from "./public/Signin";
import Signup from "./public/Signup";
import Product from "./public/Product";
import CheckoutPageWrapper from "./public/CheckoutForm";

import Homepage from "./pages/User/Homepage";
import AuctionPage from "./pages/User/AuctionPage";
import ProfilePage from "./pages/User/ProfilePage";
import Auctions from "./pages/User/Auctions";
import BidHistory from "./pages/User/BidHistory";

import GroupsPage from "./pages/User/GroupsPage";
import JoinGroupsPage from "./pages/User/JoinGroupsPage";
import CreateGroupPage from "./pages/User/CreateGroupPage";

import ManageAccounts from "./pages/Admin/ManageAccounts";
import ReportsDashboard from "./pages/Admin/ReportsDashboard";
import ValidateOrg from "./pages/Admin/ValidateOrg";
import "./styles/general.css";
import "./styles/queries.css";
import "./styles/pages.css";
import "./styles/productPage.css";
import "./styles/homePage.css";

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
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/bidhistory" element={<BidHistory />} />
        <Route path="/manage-accounts" element={<ManageAccounts />} />
        <Route path="/reports" element={<ReportsDashboard />} />
        <Route path="/validate-org" element={<ValidateOrg />} />
        <Route path="/groupspage" element={<GroupsPage />} />
        <Route path="/joingroupspage" element={<JoinGroupsPage />} />
        <Route path="/creategrouppage" element={<CreateGroupPage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/checkout" element={<CheckoutPageWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
