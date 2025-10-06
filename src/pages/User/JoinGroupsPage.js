import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/general.css";
import "../../styles/pages.css";

function JoinGroupsPage() {
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
              <h2 className="personal-view-title">Join a Group</h2>

              <div className="group-table">
                <div className="group-row">
                  <div className="group-col">
                    Sneaker Squad
                    <div className="auction-image-wrapper101">
                      <img
                        src="./img/auction1.png"
                        alt="static"
                        className="auction-image"
                      />
                    </div>
                  </div>

                  <div className="group-col">
                    We pool money for sneaker auctions
                  </div>
                  <div className="group-col">12 Members</div>
                  <div className="group-col">
                    <button className="join-btn">Request to Join</button>
                  </div>
                </div>

                <div className="group-row">
                  <div className="group-col">
                    Camera Collectors
                    <div className="auction-image-wrapper101">
                      <img
                        src="./img/auction1.png"
                        alt="static"
                        className="auction-image"
                      />
                    </div>
                  </div>
                  <div className="group-col">
                    Dedicated to vintage cameras & lenses
                  </div>
                  <div className="group-col">6 Members</div>
                  <div className="group-col">
                    <button className="join-btn">Request to Join</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default JoinGroupsPage;
