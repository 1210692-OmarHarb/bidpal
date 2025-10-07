import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Notification from "../pages/User/Notification";

import "../styles/mobileNav.css";

import "../styles/general.css";
import "../styles/queries.css";

function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const userId = user?.userID;
  const [showNotifications, setShowNotifications] = useState(false);
  // Navigation.js
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/notifications/list/${userId}`
        );
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(
          (data.notifications || []).filter((n) => n.isRead === 0).length
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifications();
  }, [userId]);

  const markAsRead = async (notificationID) => {
    try {
      await fetch(
        `http://localhost:5000/api/notifications/mark-read/${notificationID}`,
        {
          method: "POST",
        }
      );
      setNotifications((prev) =>
        prev.map((n) =>
          n.notificationID === notificationID ? { ...n, isRead: 1 } : n
        )
      );
      setUnreadCount((prev) => prev - 1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userId) return;
    const fetchUnread = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/notifications/unread-count/${userId}`
        );
        const data = await res.json();
        setUnreadCount(data.count || 0);
      } catch (err) {
        console.error("Error fetching unread count:", err);
      }
    };
    fetchUnread();

    // Optional: auto-refresh every 30s
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [userId]);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

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
        {/* Notifications Sidebar Overlay */}
        {showNotifications && (
          <div
            className="notifications-page-overlay"
            onClick={() => setShowNotifications(false)}
          >
            <div
              className="notifications-sidebar"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Notifications</h2>
              <p>
                You have {unreadCount} unread notification
                {unreadCount !== 1 && "s"}.
              </p>
              <Link
                to="/notification"
                onClick={() => setShowNotifications(false)}
                className="btn-open-full"
              >
                Open full notifications
              </Link>
            </div>
          </div>
        )}

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
                  <div className="notification-icon-wrapper">
                    <ion-icon name="notifications-outline"></ion-icon>
                    {unreadCount > 0 && (
                      <span className="notification-badge">{unreadCount}</span>
                    )}
                  </div>
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
        {/* Notifications Sidebar Overlay */}
        {showNotifications && (
          <div
            className="notifications-page-overlay"
            onClick={() => setShowNotifications(false)}
          >
            <div
              className="notifications-sidebar"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Notifications</h2>
              <p>
                You have {unreadCount} unread notification
                {unreadCount !== 1 && "s"}.
              </p>
              <Link
                to="/notification"
                onClick={() => setShowNotifications(false)}
                className="btn-open-full"
              >
                Open full notifications
              </Link>
            </div>
          </div>
        )}

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
                  <Link to="/notification" className="icon-btn">
                    <div className="notification-icon-wrapper">
                      <ion-icon name="notifications-outline"></ion-icon>
                      {unreadCount > 0 && (
                        <span className="notification-badge">
                          {unreadCount}
                        </span>
                      )}
                    </div>
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
                <Link
                  to="#"
                  className="icon-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowNotifications(true); // open sidebar if needed
                  }}
                >
                  <div className="notification-icon-wrapper">
                    <ion-icon name="notifications-outline"></ion-icon>
                    {unreadCount > 0 && (
                      <span className="notification-badge">{unreadCount}</span>
                    )}
                  </div>
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
        {/* Notifications Sidebar Overlay */}

        {showNotifications && (
          <div
            className="notifications-page-overlay"
            onClick={() => setShowNotifications(false)}
          >
            <div
              className="notifications-sidebar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="notifications-header">
                <h2>Notifications</h2>
                <button
                  className="btn-close-sidebar"
                  onClick={() => setShowNotifications(false)}
                >
                  ✕
                </button>
              </div>
              <button
                className="btn-full-notifications"
                onClick={() => {
                  setShowNotifications(false);
                  navigate("/notification");
                }}
              >
                See full notifications
                <span className="notification-badge2">{unreadCount}</span>{" "}
              </button>
              <ul className="notifications-preview-list">
                {notifications.slice(0, 5).map((note) => (
                  <li
                    key={note.notificationID}
                    className={`notification-preview-item ${
                      note.isRead
                        ? "read"
                        : note.relatedAuctionID
                        ? "unread-auction"
                        : "unread-other"
                    }`}
                  >
                    <Link
                      to="/notification"
                      className="notification-link"
                      onClick={() => {
                        markAsRead(note.notificationID);
                        setShowNotifications(false); // close sidebar
                      }}
                    >
                      <li className="notification-preview-item">
                        <strong>{note.title}</strong>
                      </li>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

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
                  <Link to="/notification" className="icon-btn">
                    <div className="notification-icon-wrapper">
                      <ion-icon name="notifications-outline"></ion-icon>
                      {unreadCount > 0 && (
                        <span className="notification-badge">
                          {unreadCount}
                        </span>
                      )}
                    </div>
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
      {/* Notifications Sidebar Overlay */}
      {showNotifications && (
        <div
          className="notifications-page-overlay"
          onClick={() => setShowNotifications(false)}
        >
          <div
            className="notifications-sidebar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="notifications-header">
              <h2>Notifications</h2>
              <button
                className="btn-close-sidebar"
                onClick={() => setShowNotifications(false)}
              >
                ✕
              </button>
            </div>
            <button
              className="btn-full-notifications"
              onClick={() => {
                setShowNotifications(false);
                navigate("/notification"); // navigate to full page
              }}
            >
              See full notifications
            </button>

            {notifications.length === 0 ? (
              <p className="empty-msg">No notifications</p>
            ) : (
              <ul className="notifications-list-sidebar">
                {notifications.map((note) => (
                  <li
                    key={note.notificationID}
                    className={`notification-card-sidebar ${
                      note.isRead
                        ? "read"
                        : note.relatedAuctionID
                        ? "unread-auction"
                        : "unread-other"
                    }`}
                    onClick={() => markAsRead(note.notificationID)}
                  >
                    {note.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

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
