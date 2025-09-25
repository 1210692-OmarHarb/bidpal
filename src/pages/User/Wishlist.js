import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../styles/general.css";
import "../../styles/queries.css";
import "../../styles/pages.css";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

function Wishlist() {
  // Convert dummy data to state
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      title: "Louis Vuitton Bag",
      price: "$500",
      img: "/img/auction2.png",
    },
    {
      id: 2,
      title: "Vintage Rolex Watch",
      price: "$5,000",
      img: "/img/auction3.png",
    },
    {
      id: 3,
      title: "Rare Comic Book",
      price: "$300",
      img: "/img/auction4.png",
    },
    {
      id: 4,
      title: "Rare Comic Book",
      price: "$300",
      img: "/img/auction4.png",
    },
  ]);

  // Function to handle removing an item from wishlist
  const removeFromWishlist = (itemId) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <>
      <Navigation />

      <main>
        <section className="section personal-view">
          <div className="hero personal-menu">
            <div className="menu">
              <div className="menu-box">
                <li className="menu-box-nav-header">
                  Personal Data
                  <div className="menu-box-nav-link">
                    <Link to="/profilepage">Settings</Link>
                  </div>
                  <div className="menu-box-nav-link">
                    <Link to="/auctionpage">Create Auction</Link>
                  </div>
                  <div className="menu-box-nav-link">
                    <Link to="/auctions">My Auctions</Link>
                  </div>
                </li>
              </div>
              <hr />
              <div className="menu-box">
                <li className="menu-box-nav-header">
                  Payment
                  <div className="menu-box-nav-link">
                    <Link to="/bidhistory">Purchase history</Link>
                  </div>
                  <div className="menu-box-nav-link">
                    <Link to="/wishlist">Wishlist</Link>
                  </div>
                  <div className="menu-box-nav-link">
                    <Link to="/notifications">Notifications</Link>
                  </div>
                </li>
              </div>
              <div className="menu-box">
                <li className="menu-box-nav-header">
                  Groups
                  <div className="menu-box-nav-link">
                    <Link to="/creategrouppage">Create Group</Link>
                  </div>
                  <div className="menu-box-nav-link">
                    <Link to="/groupspage">My Group</Link>
                  </div>
                </li>
              </div>
              <hr />
            </div>

            <div className="menu-profile-info">
              <h2 className="personal-view-title">My Wishlist</h2>

              <p className="personal-view-descreption">
                Manage your account's wishlist
              </p>

              {wishlistItems.length === 0 ? (
                <p className="empty-msg">Your wishlist is empty.</p>
              ) : (
                <div className="wishlist-grid">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="wishlist-card">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="wishlist-img"
                      />
                      <h3>{item.title}</h3>
                      <p className="wishlist-price">{item.price}</p>
                      <div className="wishlist-actions">
                        <button
                          className="remove-btn"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          Remove
                        </button>
                        <button className="view-btn">Go to Auction</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Wishlist;
