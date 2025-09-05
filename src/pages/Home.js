import React from "react";
import "../styles/general.css";
import "../styles/queries.css";

function Home() {
  return (
    <main>
      <section className="section-hero">
        <div className="hero">
          <div className="hero-text-box">
            <h1 className="heading-primary">
              Your auction starts here – Bid. Win. Enjoy.
            </h1>
            <p className="hero-descreption">
              BidPal is the online auction platform where users can join live
              auctions, place real-time bids, and win products.
            </p>
            <a href="#" className="btn btn--full margin-right-sm">
              Start your first Auction
            </a>
            <a href="#" className="btn btn--outline">
              Learn more &darr;
            </a>
          </div>

          <div className="hero-img-box">
            <img src="/img/hero.jpg" className="hero-img" alt="auction" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
