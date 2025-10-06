import React from "react";
import { Link } from "react-router-dom";

import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import "../../styles/general.css";
import "../../styles/pages.css";

function BidHistory() {
  const history = [
    {
      id: 101,
      title: "Nike Air Jordan",
      price: "$220",
      status: "No",
      date: "2025-09-15",
    },
    {
      id: 102,
      title: "Vintage Rolex",
      price: "$5,200",
      status: "Yes",
      date: "2025-09-10",
    },
    {
      id: 103,
      title: "Louis Vuitton Bag",
      price: "$750",
      status: "Yes",
      date: "2025-08-30",
    },
  ];

  return (
    <>
      <Navigation />
      <main>
        <section className="section personal-view">
          <div className="hero personal-menu ">
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

            <div className="section-auctions">
              <h2 className="heading-secondary">Bidding History</h2>
              <table className="auction-table">
                <thead>
                  <tr>
                    <th>Auction ID</th>
                    <th>Item</th>
                    <th>Final Price</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                      <td>
                        <span
                          className={`status-label ${
                            item.status === "Yes" ? "ended-no" : "ended-yes"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default BidHistory;
