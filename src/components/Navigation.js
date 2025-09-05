import React from "react";
import { Link } from "react-router-dom";
import "../styles/general.css";
import "../styles/queries.css";

function Navigation() {
  return (
    <header className="header">
      <img className="logo" alt="BidPal logo" src="/img/bidpal-logo.png" />

      <nav className="main-nav">
        <ul className="main-nav-list">
          <li>
            <a className="main-nav-link" href="#">
              Help & Contact
            </a>
          </li>
          <li>
            <a className="main-nav-link" href="#">
              Auction
            </a>
          </li>
          <li>
            <Link className="main-nav-link nav-cta" to="/signin">
              Sign in
            </Link>
          </li>
        </ul>
      </nav>
      <button class="btn-mobile-nav">
        <ion-icon class="icon-mobile-nav" name="menu-outline"></ion-icon>
        <ion-icon class="icon-mobile-nav" name="close-outline"></ion-icon>
      </button>
    </header>
  );
}

export default Navigation;
