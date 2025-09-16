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
        <section className="section personal-view">
          <div className="hero personal-menu">
            {/*
         
         
         
         
         
         
         
         
         
         
         
         */}

            <div className="menu-profile-info">
              <form>
                <h2 className="personal-view-title">Create an auction</h2>
                <p className="personal-view-descreption">
                  Manage your account's details
                </p>
                <div className="acc-box">
                  <h4 className="acc-info-title">Account information</h4>
                  <p className="personal-view-descreption">ID:</p>

                  <div className="acc-box-container">
                    <div className="acc-box-container-item ">
                      <label className="displayName-label ledit1">
                        Display Name
                      </label>
                      <div className="acc-box-container-item-input">
                        <input className="input-data-displayName input11"></input>
                        <ion-icon name="create-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="acc-box-container-item">
                      <label className="email-label ledit1">
                        Email Address
                      </label>
                      <div className="acc-box-container-item-input">
                        <input className="input-data-email input11"></input>
                        <ion-icon name="create-outline"></ion-icon>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="devider"></hr>

                <h4 className="acc-info-title">Personal details</h4>
                <p className="personal-view-descreption">
                  Manage your name and contact info. These personal details are
                  private and will not be displayed to other users.
                </p>

                <div className="acc-box-container">
                  <div className="acc-box-container-item">
                    <label className="firstName-label ledit2">First Name</label>
                    <input className="input-data-firstName input11"></input>
                  </div>
                  <div className="acc-box-container-item">
                    <label className="lastName-label ledit2">Last Name</label>
                    <input className="input-data-lastName input11"></input>
                  </div>
                </div>

                <p className="acc-info-address para1">Address</p>
                <div className="acc-box-container">
                  <div className="acc-box-container-item">
                    <label className="address-label ledit2">Address line</label>
                    <input className="input-data-address input11"></input>
                  </div>
                  <div className="acc-box-container-item">
                    <label className="city-label ledit2">City</label>
                    <input className="input-data-city input11"></input>
                  </div>
                </div>

                <div className="page-btn button123">
                  <button
                    className="update-user-info-btn btn1"
                    type="submit"
                    desa
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            {/*
         
         
         
         
         
         
         
         
         
         
         
         */}
            <div className="hero personal-menu">
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
