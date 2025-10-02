import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/general.css";
import "../styles/queries.css";

function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  // Admin Navigation
  if (user?.userType === "admin") {
    return (
      <header className="header">
        <div className="header-left">
          <img className="logo" alt="BidPal logo" src="/img/bidpal-logo.png" />
          <nav className="main-nav first">
            <ul className="main-nav-list">
              <li>
                <Link className="main-nav-link" to="/manage-accounts">
                  Manage Accounts
                </Link>
              </li>
              <li>
                <Link className="main-nav-link" to="/reports">
                  Reports
                </Link>
              </li>
              <li>
                <Link className="main-nav-link" to="/validate-org">
                  Validate Organizations
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <nav className="main-nav">
            <ul className="main-nav-list">
              <li>
                <button onClick={handleLogout} className="main-nav-link">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }

  // Organization Navigation
  if (user?.userType === "organization") {
    return (
      <header className="header">
        <div className="header-left">
          <img className="logo" alt="BidPal logo" src="/img/bidpal-logo.png" />
          <nav className="main-nav first">
            <ul className="main-nav-list">
              <li>
                <Link className="main-nav-link" to="/homepage">
                  Auctions
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <nav className="main-nav main-nav-second">
            <ul className="main-nav-list main-nav-list-second">
              <li>
                <Link className="main-nav-link" to="/auctionpage">
                  Create Auction
                </Link>
              </li>
              <li>
                <Link className="main-nav-link" to="/auctions">
                  My Auctions
                </Link>
              </li>
              <li>
                <Link to="/notification" className="icon-btn">
                  <ion-icon name="notifications-outline"></ion-icon>
                </Link>
              </li>
              <li>
                <Link to="/profilepage" className="icon-btn">
                  <ion-icon name="person-circle-outline"></ion-icon>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="main-nav-link">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }

  // Customer Navigation
  if (user?.userType === "user") {
    return (
      <header className="header">
        <div className="header-left">
          <img className="logo" alt="BidPal logo" src="/img/bidpal-logo.png" />
          <nav className="main-nav first">
            <ul className="main-nav-list">
              <li>
                <a className="main-nav-link" href="#">
                  Help & Contact
                </a>
              </li>
              <li>
                <Link className="main-nav-link" to="/homepage">
                  Auctions
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <nav className="main-nav main-nav-second">
            <ul className="main-nav-list main-nav-list-second">
              <li>
                <Link className="main-nav-link" to="/auctionpage">
                  Sell
                </Link>
              </li>
              <li>
                <Link className="main-nav-link" to="/wishlist">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/notification" className="icon-btn">
                  <ion-icon name="notifications-outline"></ion-icon>
                </Link>
              </li>
              <li>
                <Link to="/profilepage" className="icon-btn">
                  <ion-icon name="person-circle-outline"></ion-icon>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="main-nav-link">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }

  // Not logged in
  return (
    <header className="header">
      <div className="header-left">
        <img className="logo" alt="BidPal logo" src="/img/bidpal-logo.png" />
      </div>
      <div className="header-right">
        <nav className="main-nav">
          <ul className="main-nav-list">
            <li>
              <a className="main-nav-link" href="#">
                Help & Contact
              </a>
            </li>
            <li>
              <Link className="main-nav-link" to="/homepage">
                Auctions
              </Link>
            </li>
            <li>
              <Link className="main-nav-link nav-cta" to="/signin">
                Sign in
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
