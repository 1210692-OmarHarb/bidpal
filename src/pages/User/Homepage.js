import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/general.css";
import "../../styles/queries.css";
import "../../styles/pages.css";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

function Homepage() {
  const [auctionstest, setAuctions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/bidpal-api/getHomepageAuctions.php")
      .then((res) => setAuctions(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <hr />

        <section className="section-hero home-page">
          <div className="hero carousel">
            <img
              src="/img/hero.jpg"
              className="main-list-img"
              alt="Auction banner"
            />
            <blockquote className="testimonial">
              <p className="testimonial-text">
                "BidPal – Join live auctions, place real-time bids, and win
                exclusive items!"
              </p>
              <p className="testimonial-author">BidPal Community</p>
              <p className="testimonial-job">Your trusted auction platform</p>
            </blockquote>
          </div>
        </section>

        <section className="section-featured">
          <div className="feat-module">
            <div className="feat-module-header">
              <h2 className="heading-primary">🔥 Featured Auctions</h2>
            </div>

            <div className="feat-module-filter">
              <nav className="feat-module-filter-nav grid">
                <ul className="feat-module-filter-nav-ul grid">
                  <li>Live</li>
                  <li>Ending Soon</li>
                  <li>Upcoming</li>
                </ul>
              </nav>
            </div>

            <div className="feat-module-list">
              <ul className="feat-module-list-ul grid">
                {auctionstest.length > 0 ? (
                  auctionstest.map((auction) => (
                    <div key={auction.id} className="product-card">
                      <li>{auction.title}</li>
                      <p>Status: {auction.status}</p>
                      <p>Reserve Price: ${auction.reserve_price}</p>
                      <button>Place Bid</button>
                    </div>
                  ))
                ) : (
                  <p>No auctions available yet.</p>
                )}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Homepage;
