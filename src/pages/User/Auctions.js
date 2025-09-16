import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import "../../styles/general.css";
import "../../styles/pages.css";

function Auctions() {
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
                    <p>Settings</p>
                  </div>
                  <div className="menu-box-nav-link">
                    <p>Auctions</p>
                  </div>
                </li>
              </div>
              <hr></hr>
              <div className="menu-box">
                <li className="menu-box-nav-header">
                  Payment
                  <div className="menu-box-nav-link">
                    <p>Purshace history</p>
                  </div>
                  <div className="menu-box-nav-link">
                    <p>wishlist</p>
                  </div>
                  <div className="menu-box-nav-link">
                    <p>notifications</p>
                  </div>
                </li>
              </div>
            </div>
            <div className="section-auctions">
              <h2 className="heading-secondary">Auction Search</h2>

              <div className="auction-filters">
                <label>
                  Category:
                  <select>
                    <option>All</option>
                    <option>Fashion</option>
                    <option>Electronics</option>
                    <option>Collectibles</option>
                  </select>
                </label>

                <label>
                  Status:
                  <select>
                    <option>All</option>
                    <option>Live</option>
                    <option>Upcoming</option>
                    <option>Ended</option>
                  </select>
                </label>

                <label>
                  Start Date:
                  <input type="date" />
                </label>

                <label>
                  End Date:
                  <input type="date" />
                </label>

                <label>
                  Auction Name:
                  <input type="text" placeholder="Search by name" />
                </label>

                <button className="search-btn">Search</button>
              </div>

              <table className="auction-table">
                <thead>
                  <tr>
                    <th>AUCTION ID</th>
                    <th>TITLE</th>
                    <th>CATEGORY</th>
                    <th>STATUS</th>
                    <th>RESERVE PRICE</th>
                    <th>START DATE</th>
                    <th>END DATE</th>
                    <th>BIDS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a href="#">101</a>
                    </td>
                    <td>Nike Air Jordan</td>
                    <td>Sneakers</td>
                    <td>
                      <span className="status in-progress">Live</span>
                    </td>
                    <td>$200</td>
                    <td>2025-09-01</td>
                    <td>2025-09-30</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">102</a>
                    </td>
                    <td>Louis Vuitton Bag</td>
                    <td>Fashion</td>
                    <td>
                      <span className="status upcoming">Upcoming</span>
                    </td>
                    <td>$500</td>
                    <td>2025-10-10</td>
                    <td>2025-11-10</td>
                    <td>0</td>
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

export default Auctions;
