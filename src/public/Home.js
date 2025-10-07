import React from "react";
import "../styles/general.css";
import "../styles/queries.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navigation />
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

        <section className="section-hero">
          <div className="hero">
            <div className="hero-img-box">
              <img src="/img/how.png" className="hero-img" alt="auction" />
            </div>
            <div className="hero-text-box">
              <h1 className="heading-primary">How BidPal Works?.</h1>
              <p className="hero-descreption">
                BidPal enables Users and businesse User around the world to run
                an online auction.
              </p>
              <div className="btns-func">
                <a href="#" className="btns-func btn101">
                  <div className="btns-func div101">
                    <ion-icon name="person-circle-outline"></ion-icon>
                    <p>Create An Account</p>
                  </div>
                </a>
                <a href="#" className="btns-func btn101">
                  <div className="btns-func div101">
                    <ion-icon name="person-circle-outline"></ion-icon>

                    <p>Browse Auctions </p>
                  </div>
                </a>
                <a href="#" className="btns-func btn101">
                  <div className="btns-func div101">
                    <ion-icon name="person-circle-outline"></ion-icon>
                    <p>Create Auctions </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
