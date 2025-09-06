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
          <div class="carousel">
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

            <button class="btn btn--left">
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
            <button class="btn btn--right">
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
      </main>
      <Footer />
    </>
  );
}

export default Homepage;
