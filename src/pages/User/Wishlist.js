import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

import "../../styles/general.css";
import "../../styles/queries.css";
import "../../styles/pages.css";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

function Wishlist() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.userID) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/wishlist/${user.userID}`
      );
      setWishlistItems(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setError("Failed to load wishlist");
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistID) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/wishlist/remove/${wishlistID}`
      );

      // Remove item from state
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.wishlistID !== wishlistID)
      );
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      alert("Failed to remove item from wishlist");
    }
  };

  const goToAuction = (auctionID) => {
    navigate(`/product/${auctionID}`);
  };

  if (loading) {
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
                <p className="personal-view-descreption">Loading...</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

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
                    <Link to="/notification">Notifications</Link>
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

              {error && <p className="error-msg">{error}</p>}

              {wishlistItems.length === 0 ? (
                <p className="empty-msg">Your wishlist is empty.</p>
              ) : (
                <div className="wishlist-grid">
                  {wishlistItems.map((item) => (
                    <div key={item.wishlistID} className="wishlist-card">
                      <img
                        src={item.images[0] || "/img/placeholder.png"}
                        alt={item.title}
                        className="wishlist-img"
                      />
                      <h3>{item.title}</h3>
                      <p className="wishlist-category">{item.categoryName}</p>
                      <p className="wishlist-price">
                        $
                        {item.currentHighestBid > 0
                          ? item.currentHighestBid
                          : item.startingPrice}
                      </p>
                      <p className="wishlist-status">
                        Status:{" "}
                        <span className={`status-${item.status}`}>
                          {item.status}
                        </span>
                      </p>
                      {item.endDate && (
                        <p className="wishlist-enddate">
                          Ends: {new Date(item.endDate).toLocaleDateString()}
                        </p>
                      )}
                      <div className="wishlist-actions">
                        <button
                          className="remove-btn"
                          onClick={() => removeFromWishlist(item.wishlistID)}
                        >
                          Remove
                        </button>
                        <button
                          className="view-btn"
                          onClick={() => goToAuction(item.auctionID)}
                        >
                          Go to Auction
                        </button>
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
