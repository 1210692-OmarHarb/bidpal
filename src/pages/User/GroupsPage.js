import React, { useState } from "react";
import { Link } from "react-router-dom";

import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import "../../styles/general.css";
import "../../styles/pages.css";

function GroupsPage() {
  const [activeTab, setActiveTab] = useState("members");

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
              <h2 className="personal-view-title">My Group Management</h2>

              <div className="group-tabs">
                <button
                  className={`tab-btn ${
                    activeTab === "members" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("members")}
                >
                  Members
                </button>
                <button
                  className={`tab-btn ${
                    activeTab === "invitations" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("invitations")}
                >
                  Invitations
                </button>
              </div>

              {activeTab === "members" && (
                <div className="group-table">
                  <div className="group-row">
                    <div className="group-col">Admin: You</div>
                    <div className="group-col">Owner</div>
                    <div className="group-col">—</div>
                  </div>
                  <div className="group-row">
                    <div className="group-col">User123</div>
                    <div className="group-col">Member</div>
                    <div className="group-col">
                      <button className="deny-btn">Kick</button>
                    </div>
                  </div>
                  <div className="group-row">
                    <div className="group-col">User456</div>
                    <div className="group-col">Member</div>
                    <div className="group-col">
                      <button className="deny-btn">Kick</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "invitations" && (
                <div className="group-table">
                  <div className="group-row">
                    <div className="group-col">Invite Link</div>
                    <div className="group-col">https://bidpal.com/join/123</div>
                    <div className="group-col">
                      <button className="join-btn">Copy Link</button>
                    </div>
                  </div>
                  <div className="group-row">
                    <div className="group-col">Join Request: User789</div>
                    <div className="group-col">Pending</div>
                    <div className="group-col">
                      <button className="approve-btn">Accept</button>
                      <button className="deny-btn">Reject</button>
                    </div>
                  </div>
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

export default GroupsPage;
