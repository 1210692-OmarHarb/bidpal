import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/general.css";
import "../styles/queries.css";
import "../styles/mobileNav.css";

function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/signin");
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Admin Navigation
  if (user?.userType === "admin") {
    return (
      <header className="header">
        <div className="header-left">
          <img className="logo" alt="BidPal logo" src="/img/bidpal-logo.png" />

          {/* Desktop Navigation */}
          <nav className="main-nav first desktop-nav">
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
          {/* Mobile Hamburger Button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <ion-icon name={mobileMenuOpen ? "close" : "menu"}></ion-icon>
          </button>

          {/* Desktop Right Nav */}
          <nav className="main-nav desktop-nav">
            <ul className="main-nav-list">
              <li>
                <button onClick={handleLogout} className="main-nav-link">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
            <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
              <ul className="mobile-nav-list">
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/manage-accounts"
                    onClick={closeMobileMenu}
                  >
                    Manage Accounts
                  </Link>
                </li>
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/reports"
                    onClick={closeMobileMenu}
                  >
                    Reports
                  </Link>
                </li>
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/validate-org"
                    onClick={closeMobileMenu}
                  >
                    Validate Organizations
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="mobile-nav-link logout-btn"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    );
  }

  // Organization Navigation
  if (user?.userType === "organization") {
    return (
      <header className="header">
        <div className="header-left">
          <img className="logo" alt="BidPal logo" src="/img/bidpal-logo.png" />

          {/* Desktop Navigation */}
          <nav className="main-nav first desktop-nav">
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
          {/* Mobile Hamburger Button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <ion-icon name={mobileMenuOpen ? "close" : "menu"}></ion-icon>
          </button>

          {/* Desktop Right Nav */}
          <nav className="main-nav main-nav-second desktop-nav">
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

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
            <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
              <ul className="mobile-nav-list">
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/homepage"
                    onClick={closeMobileMenu}
                  >
                    Auctions
                  </Link>
                </li>
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/auctionpage"
                    onClick={closeMobileMenu}
                  >
                    Create Auction
                  </Link>
                </li>
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/auctions"
                    onClick={closeMobileMenu}
                  >
                    My Auctions
                  </Link>
                </li>
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/notification"
                    onClick={closeMobileMenu}
                  >
                    <ion-icon name="notifications-outline"></ion-icon>{" "}
                    Notifications
                  </Link>
                </li>
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/profilepage"
                    onClick={closeMobileMenu}
                  >
                    <ion-icon name="person-circle-outline"></ion-icon> Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="mobile-nav-link logout-btn"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    );
  }

  // Customer Navigation
  if (user?.userType === "user") {
    return (
      <header className="header">
        <div className="header-left">
          <img className="logo" alt="BidPal logo" src="/img/bidpal-logo.png" />

          {/* Desktop Navigation */}
          <nav className="main-nav first desktop-nav">
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
          {/* Mobile Hamburger Button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <ion-icon name={mobileMenuOpen ? "close" : "menu"}></ion-icon>
          </button>

          {/* Desktop Right Nav */}
          <nav className="main-nav main-nav-second desktop-nav">
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

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
            <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
              <ul className="mobile-nav-list">
                <li>
                  <a
                    className="mobile-nav-link"
                    href="#"
                    onClick={closeMobileMenu}
                  >
                    Help & Contact
                  </a>
                </li>
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/homepage"
                    onClick={closeMobileMenu}
                  >
                    Auctions
                  </Link>
                </li>
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/auctionpage"
                    onClick={closeMobileMenu}
                  >
                    Sell
                  </Link>
                </li>
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/wishlist"
                    onClick={closeMobileMenu}
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/notification"
                    onClick={closeMobileMenu}
                  >
                    <ion-icon name="notifications-outline"></ion-icon>{" "}
                    Notifications
                  </Link>
                </li>
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/profilepage"
                    onClick={closeMobileMenu}
                  >
                    <ion-icon name="person-circle-outline"></ion-icon> Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="mobile-nav-link logout-btn"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
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
        {/* Mobile Hamburger Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <ion-icon name={mobileMenuOpen ? "close" : "menu"}></ion-icon>
        </button>

        {/* Desktop Nav */}
        <nav className="main-nav desktop-nav">
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

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            <ul className="mobile-nav-list">
              <li>
                <a
                  className="mobile-nav-link"
                  href="#"
                  onClick={closeMobileMenu}
                >
                  Help & Contact
                </a>
              </li>
              <li>
                <Link
                  className="mobile-nav-link"
                  to="/homepage"
                  onClick={closeMobileMenu}
                >
                  Auctions
                </Link>
              </li>
              <li>
                <Link
                  className="mobile-nav-link nav-cta"
                  to="/signin"
                  onClick={closeMobileMenu}
                >
                  Sign in
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navigation;
