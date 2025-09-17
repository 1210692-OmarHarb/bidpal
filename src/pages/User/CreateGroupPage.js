import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import "../../styles/general.css";
import "../../styles/pages.css";

function CreateGroupPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="section groups-view">
          <div className="hero groups-menu">
            <div className="menu">
              <div className="menu-box">
                <li className="menu-box-nav-header">
                  Personal Data
                  <div className="menu-box-nav-link">
                    <p>Settings</p>
                  </div>
                  <div className="menu-box-nav-link">
                    <p>Create Auction</p>
                  </div>
                  <div className="menu-box-nav-link">
                    <p>My Auctions</p>
                  </div>
                </li>
              </div>
              <hr />
              <div className="menu-box">
                <li className="menu-box-nav-header">
                  Payment
                  <div className="menu-box-nav-link">
                    <p>Purchase history</p>
                  </div>
                  <div className="menu-box-nav-link">
                    <p>Wishlist</p>
                  </div>
                  <div className="menu-box-nav-link">
                    <p>Notifications</p>
                  </div>
                </li>
              </div>
              <div className="menu-box">
                <li className="menu-box-nav-header">
                  Groups
                  <div className="menu-box-nav-link">
                    <p>Create Group</p>
                  </div>
                  <div className="menu-box-nav-link">
                    <p>My Group</p>
                  </div>
                </li>
              </div>
              <hr />
            </div>

            <div className="section-groups">
              <h2 className="heading-secondary">Create a Group</h2>
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
