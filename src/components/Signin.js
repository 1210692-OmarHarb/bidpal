import React from "react";

function Signin() {
  return (
    <main>
      <section class="section-main">
        <div class="main">
          <div class="main-text-box">
            <h1 class="heading-primary">Create an Account</h1>
            <div className="signin-page">
              <form>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Sign in</button>
              </form>
            </div>
          </div>
          <div class="main-img-box">
            <img src="img/hero.png" class="main-img" alt="auction?" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signin;
