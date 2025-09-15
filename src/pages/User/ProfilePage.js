import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import "../../styles/general.css";
import "../../styles/queries.css";

function ProfilePage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="section-hero">
          <div className="hero profile">
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

            <div className="hero-text-box">
              <h1 className="heading-primary">Create an auction !</h1>

              {/*
         
         
         
         
         
         
         
         
         
         
         
         */}

              <div>
                <form class="user-form">
                  <div class="form-element-email-username">
                    <span>
                      <span class="floating-label">
                        <span class="textbox">
                          <input
                            type="text"
                            placeholder="Name"
                            required
                            maxLength="63"
                          />
                        </span>
                      </span>
                      <span class="error-message">
                        <div>
                          <span class="Email-username-error">
                            please enter Auctions Name
                          </span>
                        </div>
                      </span>
                    </span>
                  </div>
                  <div class="form-element-password">
                    <span>
                      <span class="floating-label">
                        <span class="textbox">
                          <input
                            type="text"
                            placeholder="info"
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

              {/*
         
         
         
         
         
         
         
         
         
         
         
         */}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ProfilePage;
