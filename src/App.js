import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signin from "./components/Signin";

function App() {
  return (
    <Router>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:ital@0;1&display=swap"
            rel="stylesheet"
          />

          <link rel="stylesheet" href="styles/general.css" />
          <link rel="stylesheet" href="styles/queries.css" />

          <title>BiddPal</title>
        </head>
        <body>
          <header class="header">
            <img class="logo" alt="BidPal logo" src="img/omnifood-logo.png" />
            <nav class="main-nav">
              <ul class="main-nav-list">
                <li>
                  <Link className="main-nav-link" to="/Signin">
                    Sign in
                  </Link>
                </li>
                <li>
                  <a class="main-nav-link" href="#">
                    Section 1
                  </a>
                </li>
                <li>
                  <a class="main-nav-link" href="#">
                    Section 1
                  </a>
                </li>
                <li>
                  <a class="main-nav-link" href="#">
                    Section 1
                  </a>
                </li>
                <li>
                  <a class="main-nav-link nav-cta" href="#">
                    Section 1
                  </a>
                </li>
              </ul>
            </nav>
            <button class="btn-mobile-nav">
              <img
                src="img/menu-outline.png"
                class="menu-outline"
                alt="auction?"
              />
              <img
                src="img/close-outline.png"
                class="close-outline"
                alt="auction?"
              />
            </button>
          </header>

          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <section class="section-main">
                    <div class="main">
                      <div class="main-text-box">
                        <h1 class="heading-primary">
                          Your auction starts here – Bid. Win. Enjoy.
                        </h1>
                        <p class="main-descreption">
                          BidPal is the online auction platform where users can
                          join live auctions, place real-time bids, and win
                          products.
                        </p>
                        <a href="#" class="btn btn--full margin-right-sm">
                          Start your first Auction
                        </a>
                        <a href="#" class="btn btn--outline">
                          Learn more &darr;
                        </a>
                      </div>

                      <div class="main-img-box">
                        <img
                          src="img/hero.png"
                          class="main-img"
                          alt="auction?"
                        />
                      </div>
                    </div>
                  </section>
                }
              />
              <Route path="/signin" element={<Signin />} />
            </Routes>
          </main>

          <footer class="footer">
            <div class="container grid grid--footer">
              <div class="logo-col">
                <a href="#" class="footer-logo">
                  <img
                    class="logo"
                    alt="Omnifood logo"
                    src="img/omnifood-logo.png"
                  />
                </a>

                <ul class="social-links">
                  <li>
                    <a class="footer-link" href="#">
                      <ion-icon name="logo-instagram"></ion-icon>
                      <ion-icon
                        class="social-icon"
                        name="logo-instagram"
                      ></ion-icon>
                    </a>
                  </li>
                  <li>
                    <a class="footer-link" href="#">
                      <ion-icon
                        class="social-icon"
                        name="logo-facebook"
                      ></ion-icon>
                    </a>
                  </li>
                  <li>
                    <a class="footer-link" href="#">
                      <ion-icon
                        class="social-icon"
                        name="logo-twitter"
                      ></ion-icon>
                    </a>
                  </li>
                </ul>

                <p class="copyright">
                  Copyright &copy; 2027 by Omnifood, Inc. All rights reserved.
                </p>
              </div>
              <div class="address-col">
                <p class="footer-heading">Contact us</p>
                <address class="contacts">
                  <p class="address">
                    623 Harrison St., 2nd Floor, San Francisco, CA 94107
                  </p>
                  <p>
                    <a class="footer-link" href="tel:415-201-6370">
                      415-201-6370
                    </a>
                    <br />
                    <a class="footer-link" href="mailto:hello@omnifood.com">
                      hello@omnifood.com
                    </a>
                  </p>
                </address>
              </div>
              <nav class="nav-col">
                <p class="footer-heading">Account</p>
                <ul class="footer-nav">
                  <li>
                    <a class="footer-link" href="#">
                      Create account
                    </a>
                  </li>
                  <li>
                    <a class="footer-link" href="#">
                      Sign in
                    </a>
                  </li>
                  <li>
                    <a class="footer-link" href="#">
                      iOS app
                    </a>
                  </li>
                  <li>
                    <a class="footer-link" href="#">
                      Android app
                    </a>
                  </li>
                </ul>
              </nav>

              <nav class="nav-col">
                <p class="footer-heading">Company</p>
                <ul class="footer-nav">
                  <li>
                    <a class="footer-link" href="#">
                      About Omnifood
                    </a>
                  </li>
                  <li>
                    <a class="footer-link" href="#">
                      For Business
                    </a>
                  </li>
                  <li>
                    <a class="footer-link" href="#">
                      Cooking partners
                    </a>
                  </li>
                  <li>
                    <a class="footer-link" href="#">
                      Careers
                    </a>
                  </li>
                </ul>
              </nav>
              <nav class="nav-col">
                <p class="footer-heading">Resources</p>
                <ul class="footer-nav">
                  <li>
                    <a class="footer-link" href="#">
                      Recipe directory{" "}
                    </a>
                  </li>
                  <li>
                    <a class="footer-link" href="#">
                      Help center
                    </a>
                  </li>
                  <li>
                    <a class="footer-link" href="#">
                      Privacy & terms
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </footer>
        </body>
      </html>
    </Router>
  );
}

export default App;
