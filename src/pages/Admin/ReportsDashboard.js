import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import "../../styles/general.css";
import "../../styles/pages.css";

function ReportsDashboard() {
  return (
    <>
      <Navigation />
      <main>
        <section className="section personal-view">
          <div className="hero personal-menu">
            {/* Sidebar */}
            <div className="menu">
              <div className="menu-box">
                <li className="menu-box-nav-header">
                  Admin Menu
                  <div className="menu-box-nav-link">
                    <p>Manage Accounts</p>
                  </div>
                  <div className="menu-box-nav-link">
                    <p>Reports</p>
                  </div>
                  <div className="menu-box-nav-link">
                    <p>Validate Orgs</p>
                  </div>
                </li>
              </div>
            </div>

            {/* MAIN SECTION */}
            <div className="section-auctions">
              <h2 className="heading-secondary">Reports Dashboard</h2>
              <table className="auction-table">
                <thead>
                  <tr>
                    <th>Report ID</th>
                    <th>User</th>
                    <th>Reason</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>R001</td>
                    <td>John</td>
                    <td>Fraudulent bidding</td>
                    <td>2025-09-10</td>
                    <td>Open</td>
                  </tr>
                  <tr>
                    <td>R002</td>
                    <td>OrgY</td>
                    <td>Inappropriate listing</td>
                    <td>2025-09-12</td>
                    <td>Resolved</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ReportsDashboard;
