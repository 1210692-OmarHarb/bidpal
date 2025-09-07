import React from "react";
import "../../styles/general.css";
import "../../styles/queries.css";
import "../../styles/pages.css";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
function Homepage() {
  return (
    <>
      <Navigation />
      <main>
        <hr></hr>
        <section className="section-hero home-page">
          <div class="hero carousel">
            <img
              src="/img/hero.jpg"
              className="main-list-img"
              alt="Maria de Almeida"
            />
            <blockquote class="testimonial">
              <p class="testimonial-text">
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Officia nesciunt aliquid ex atque quibusdam. Rerum officia unde
                suscipit quo sunt hic illo fugit."
              </p>
              <p class="testimonial-author">Maria de Almeida</p>
              <p class="testimonial-job">
                Senior Product Manager at EDP Comercial
              </p>
            </blockquote>

            <button class="btncta btn--left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="btn-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button class="btncta btn--right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="btn-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <div class="dots">
              <button class="dot dot--fill">&nbsp;</button>
              <button class="dot">&nbsp;</button>
              <button class="dot">&nbsp;</button>
              <button class="dot">&nbsp;</button>
            </div>
          </div>
        </section>

        <section className="section-featured">
          <div class="feat-module">
            <div class="feat-module-header">
              <h2 class="heading-primary"></h2>
            </div>
            <div class="feat-module-filter">
              <nav class="feat-module-filter-nav grid">
                <ul class="feat-module-filter-nav-ul grid">
                  <li>Live</li>
                  <li>Ending Soon</li>
                  <li>Upcoming</li>
                </ul>
              </nav>
            </div>
            <div class="feat-module-list">
              <ul class="feat-module-list-ul grid">
                <div class="product1">
                  <li>Productone</li>
                  <button>place bid</button>
                </div>
                <div class="product2">
                  <li>Producttwo</li>
                  <button>place bid</button>
                </div>
                <div class="product3">
                  <li>Productthree</li>
                  <button>place bid</button>
                </div>
                ... .. ...
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
