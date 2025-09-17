import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import "../../styles/general.css";
import "../../styles/pages.css";

function JoinGroupsPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="section groups-view">
          <div className="hero groups-join">
            <h1 className="heading-primary">Join a Group</h1>

            <div className="section-groups">
              <div className="group-table">
                <div className="group-row">
                  <div className="group-col">Sneaker Squad</div>
                  <div className="group-col">
                    We pool money for sneaker auctions
                  </div>
                  <div className="group-col">12 Members</div>
                  <div className="group-col">
                    <button className="join-btn">Request to Join</button>
                  </div>
                </div>

                <div className="group-row">
                  <div className="group-col">Camera Collectors</div>
                  <div className="group-col">
                    Dedicated to vintage cameras & lenses
                  </div>
                  <div className="group-col">6 Members</div>
                  <div className="group-col">
                    <button className="join-btn">Request to Join</button>
                  </div>
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

export default JoinGroupsPage;
