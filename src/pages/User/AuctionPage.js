import React from "react";
import "../../styles/general.css";
import "../../styles/queries.css";
import "../../styles/pages.css";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
function Home() {
  return (
    <>
      <Navigation />
      <main>
        <section className="section-hero">
          <div className="hero">
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

            <div className="hero-img-box">
              <div className="image-row1 ">
                <img src="/img/hero.jpg" className="row1-img" alt="auction" />
              </div>
              <div className="images-row2 ">
                <img
                  src="/img/hero.jpg"
                  className="row2-images"
                  alt="auction"
                />
                <img
                  src="/img/hero.jpg"
                  className="row2-images"
                  alt="auction"
                />
                <img
                  src="/img/hero.jpg"
                  className="row2-images"
                  alt="auction"
                />
                <img
                  src="/img/hero.jpg"
                  className="row2-images"
                  alt="auction"
                />
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
