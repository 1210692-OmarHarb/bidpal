import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useAuth } from "../context/AuthContext";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        login(data.user); // save user in context + localStorage

        // Redirect by role
        if (data.user.userType === "admin") navigate("/manage-accounts");
        else navigate("/homepage");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <>
      <Navigation />

      <main>
        <section className="section-hero">
          <div class="hero">
            <div class="hero-text-box user-box ">
              <h1 class="heading-primary">Sign in to BidPal</h1>
              <div className="user">
                <form className="user-form" onSubmit={handleSubmit}>
                  <div class="form-element-email-username">
                    <span>
                      <span class="floating-label">
                        <span class="textbox">
                          <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email or username"
                            required
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
                        <span class="textbox">
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
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
                    <div className="form-element-submit">
                      <button type="submit">Continue</button>
                    </div>
                  </div>
                </form>

                <div className="user-form user-form--new">
                  <span>new to BidPal? &nbsp;</span>

                  <Link to="/signup" className="main-nav-link-sign101">
                    Create an Account
                  </Link>
                </div>
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
