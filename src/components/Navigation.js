import React from "react";
import { Link } from "react-router-dom";
import "../styles/general.css";
import "../styles/queries.css";
function Navigation({ isLoggedIn }) {
  return (
    <header className="header">
      {/* LEFT SIDE */}
      <div className="header-left">
        <img className="logo" alt="BidPal logo" src="/img/bidpal-logo.png" />

        {isLoggedIn && (
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
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="header-right">
        {!isLoggedIn && (
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
        )}

        {isLoggedIn && (
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
                <Link to="/notifications" className="icon-btn">
                  <ion-icon name="notifications-outline"></ion-icon>
                </Link>
              </li>

              <li>
                <Link to="/profilepage" className="icon-btn">
                  <ion-icon name="person-circle-outline"></ion-icon>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <button className="btn-mobile-nav">
        <ion-icon class="icon-mobile-nav" name="menu-outline"></ion-icon>
        <ion-icon class="icon-mobile-nav" name="close-outline"></ion-icon>
      </button>
    </header>
  );
}

export default Navigation;
