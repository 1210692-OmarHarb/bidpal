import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

function Signin() {
  return (
    <>
      <Navigation />
      <main>
        <section class="section-hero">
          <div class="hero">
            <div class="hero-text-box">
              <h1 class="heading-primary">Sign in to BidPal</h1>
              <div className="signin-page">
                <form>
                  <input type="email" placeholder="Email or username" />
                  <button type="submit">Continue</button>
                </form>
              </div>
              <div className="signin-page signin-page--new">
                <span>new to BidPal? &nbsp;</span>

                <Link to="/signup" className="btn btn--full margin-right-sm">
                  Create an Account
                </Link>
              </div>
            </div>
            <div class="hero-img-box">
              <img src="img/hero.png" class="hero-img" alt="auction?" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Signin;
