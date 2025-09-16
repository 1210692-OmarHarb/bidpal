import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import "../../styles/general.css";
import "../../styles/pages.css";

function BidHistory() {
  return (
    <>
      <Navigation />
      <main>
        <section className="section personal-view">
          <div className="hero personal-menu ">
            {/* Sidebar Menu */}
            <div className="menu">
              <div className="menu-box">
                <li className="menu-box-nav-header">
                  Personal Data
                  <div className="menu-box-nav-link">
                    <p>Settings</p>
                  </div>
                  <div className="menu-box-nav-link">
                    <p>Auctions</p>
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
            </div>

            <div className="section-auctions">
              <h2 className="heading-secondary">Bidding History</h2>

              <table className="auction-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Bid Price</th>
                    <th>Marketplace</th>
                    <th>Ended?</th>
                    <th>Winner</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2025-09-10</td>
                    <td>Nike Air Jordan</td>
                    <td>$250</td>
                    <td>Seller123</td>
                    <td>No</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>2025-08-20</td>
                    <td>Louis Vuitton Bag</td>
                    <td>$700</td>
                    <td>LuxuryHub</td>
                    <td>
                      <span className="ended-yes">Yes</span>
                    </td>
                    <td>User_Alice</td>
                  </tr>
                  <tr>
                    <td>2025-07-05</td>
                    <td>Bearbrick Camo Toy</td>
                    <td>$400</td>
                    <td>ToyCollectibles</td>
                    <td>
                      <span className="ended-no">No</span>
                    </td>
                    <td>User_Bob</td>
                  </tr>
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
