import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <header className="header">
      <div className="container">
        <nav className="main-nav">
          <Link to="/" className="logo">
            BidPal
          </Link>

          <ul className="main-nav-list">
            <li>
              <Link to="/" className="main-nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/auctions" className="main-nav-link">
                Auctions
              </Link>
            </li>
            <li>
              <Link to="/login" className="main-nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="main-nav-link">
                Register
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="main-nav-link">
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
