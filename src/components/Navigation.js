import React, { useState } from "react";
import "../styles/general.css";

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <nav className="main-nav">
          <div className="logo">BidPal</div>

          <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          <ul className={`main-nav-list ${menuOpen ? "show-menu" : ""}`}>
            <li>Home</li>
            <li>Auctions</li>
            <li>Login</li>
            <li>Register</li>
            <li>Dashboard</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
