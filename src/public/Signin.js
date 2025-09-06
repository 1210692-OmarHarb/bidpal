import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

function Signin() {
  return (
    <>
      <Navigation />
      <main>
        <section className="section-hero">
          <div class="hero">
            <div class="hero-text-box user-box ">
              <h1 class="heading-primary">Sign in to BidPal</h1>
              <div>
                <form class="user-form">
                  <div class="form-element-email-username">
                    <span>
                      <span class="floating-label">
                        <label>Email or username</label>
                        <span class="textbox">
                          <input
                            type="text"
                            placeholder="Email or username"
                            required
                            maxLength="63"
                          />
                        </span>
                      </span>
                      <span class="error-message">
                        <div>
                          <span class="Email-username-error">
                            please enter your Email or UserName
                          </span>
                        </div>
                      </span>
                    </span>
                  </div>
                  <div class="form-element-password">
                    <span>
                      <span class="floating-label">
                        <label>Password</label>
                        <span class="textbox">
                          <input
                            type="text"
                            placeholder="Password"
                            required
                            maxLength="63"
                          />
                        </span>
                      </span>
                      <span class="error-message">
                        <div>
                          <span class="password-error">
                            please enter your password
                          </span>
                        </div>
                      </span>
                    </span>
                  </div>
                  <div class="form-element-submit">
                    <button type="submit">Continue</button>
                  </div>
                </form>
              </div>

              <div className="user-form user-form--new">
                <span>new to BidPal? &nbsp;</span>

                <Link to="/signup" className="main-nav-link">
                  Create an Account
                </Link>
              </div>
            </div>

            <div className="hero-img-box">
              <img src="/img/hero.jpg" className="hero-img" alt="auction" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Signin;
