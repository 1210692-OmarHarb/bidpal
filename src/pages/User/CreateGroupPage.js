import React from "react";
import { Link } from "react-router-dom";

import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import "../../styles/general.css";
import "../../styles/pages.css";

function CreateGroupPage() {
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
                  <div className="menu-box-nav-link">
                    <Link to="/joingroupspage">Join a Group</Link>
                  </div>
                </li>
              </div>
              <hr />
            </div>

            <div className="section-groups">
              <h2 className="personal-view-title">Create a Group</h2>

              <p className="sub-text">
                You can only create **one group**. Once created, you will be the
                admin and manage it under <b>My Group</b>.
              </p>

              <form className="create-group-form">
                <div className="form-element">
                  <label>Group Name</label>
                  <input
                    type="text"
                    placeholder="Enter your group name"
                    required
                  />
                </div>

                <div className="form-element">
                  <label>Description</label>
                  <textarea
                    placeholder="Describe your group (e.g., Sneaker Collectors, Vintage Electronics)"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="form-element">
                  <label className="ledit2">Upload Group Image</label>
                  <input
                    className="input11"
                    type="file"
                    multiple
                    accept="image/*"
                  />
                </div>

                <div className="form-element-submit">
                  <button type="submit" className="create-btn">
                    Create Group
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default CreateGroupPage;
