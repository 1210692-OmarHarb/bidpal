import React, { useState } from "react";
import { Link } from "react-router-dom";

import Navigation from "../components/Navigation";

function Signup() {
  const [accountType, setAccountType] = useState("personal");

  return (
    <>
      <Navigation />
      <main>
        <section className="section-hero">
          <div class="hero">
            <div class="hero-text-box signin-box ">
              <h1 class="heading-primary">Create an account</h1>
              <div className="signup-picks">
                <button onClick={() => setAccountType("personal")}>
                  Personal
                </button>
                <button onClick={() => setAccountType("organization")}>
                  Organization
                </button>
              </div>
              <div className="user-form">
                {accountType === "personal" && (
                  <form class="user-signin-form" link>
                    <div class="form-element-firstname">
                      <span>
                        <span class="floating-label">
                          <span class="textbox">
                            <input
                              type="text"
                              placeholder="firstname"
                              required
                              maxLength="63"
                            />
                          </span>
                        </span>
                        <span class="error-message">
                          <div>
                            <span class="firstname-error">
                              Please enter your first name
                            </span>
                          </div>
                        </span>
                      </span>
                    </div>
                    <div class="form-element-lastname">
                      <span>
                        <span class="floating-label">
                          <span class="textbox">
                            <input
                              type="text"
                              placeholder="lastname"
                              required
                              maxLength="63"
                            />
                          </span>
                        </span>
                        <span class="error-message">
                          <div>
                            <span class="lastname-error"></span>
                          </div>
                        </span>
                      </span>
                    </div>
                    <div class="form-element-username">
                      <span>
                        <span class="floating-label">
                          <label>Username</label>
                          <span class="textbox">
                            <input
                              type="text"
                              placeholder="username"
                              required
                            />
                          </span>
                        </span>
                        <span class="error-message">
                          <div>
                            <span class="username-error">
                              Please enter your username
                            </span>
                          </div>
                        </span>
                      </span>
                    </div>
                    <div class="form-element-email">
                      <span>
                        <span class="floating-label">
                          <span class="textbox">
                            <input
                              type="text"
                              placeholder="Email or username"
                              required
                            />
                          </span>
                        </span>
                        <span class="error-message">
                          <div>
                            <span class="email-error">
                              Please enter your Email
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
                              placeholder="Password"
                              required
                            />
                          </span>
                        </span>
                        <span class="error-message">
                          <div>
                            <span class="password-error">
                              Please enter your password
                            </span>
                          </div>
                        </span>
                      </span>
                    </div>
                    <div class="form-element-submit">
                      <button type="submit">Continue</button>
                    </div>
                  </form>
                )}

                {accountType === "organization" && (
                  <form class="user-signin-form" link>
                    <div class="form-element-orgname">
                      <span>
                        <span class="floating-label">
                          <span class="textbox">
                            <input
                              type="text"
                              placeholder="Organization"
                              required
                              maxLength="63"
                            />
                          </span>
                        </span>
                        <span class="error-message">
                          <div>
                            <span class="orgname-error">
                              Please enter your Organization name
                            </span>
                          </div>
                        </span>
                      </span>
                    </div>
                    <div class="form-element-username">
                      <span>
                        <span class="floating-label">
                          <label>Username</label>
                          <span class="textbox">
                            <input
                              type="text"
                              placeholder="username"
                              required
                            />
                          </span>
                        </span>
                        <span class="error-message">
                          <div>
                            <span class="username-error">
                              Please enter your username
                            </span>
                          </div>
                        </span>
                      </span>
                    </div>
                    <div class="form-element-email">
                      <span>
                        <span class="floating-label">
                          <label>Email</label>
                          <span class="textbox">
                            <input
                              type="text"
                              placeholder="Email or username"
                              required
                            />
                          </span>
                        </span>
                        <span class="error-message">
                          <div>
                            <span class="email-error">
                              Please enter your Email
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
                            />
                          </span>
                        </span>
                        <span class="error-message">
                          <div>
                            <span class="password-error">
                              Please enter your password
                            </span>
                          </div>
                        </span>
                      </span>
                    </div>
                    <div class="form-element-submit">
                      <button type="submit">Continue</button>
                    </div>
                  </form>
                )}
              </div>

              <div className="user-form user-form--new">
                <span>already a user? &nbsp;</span>

                <Link to="/signin" className="main-nav-link">
                  Sing in
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

export default Signup;
