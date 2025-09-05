import React from "react";

function Signin() {
  return (
    <main>
      <section class="section-hero">
        <div class="hero">
          <div class="hero-text-box">
            <h1 class="heading-primary">Create an Account</h1>
            <div className="signin-page">
              <form>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Sign in</button>
              </form>
            </div>
          </div>
          <div class="hero-img-box">
            <img src="img/hero.png" class="hero-img" alt="auction?" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signin;
