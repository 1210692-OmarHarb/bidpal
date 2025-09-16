import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import "../../styles/general.css";
import "../../styles/pages.css";

function ValidateOrg() {
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
              <h2 className="heading-secondary">Validate Organizations</h2>
              <table className="auction-table">
                <thead>
                  <tr>
                    <th>Org ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Documents</th>
                    <th>Status</th>
                    <th>Validate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>O001</td>
                    <td>CharityWorld</td>
                    <td>info@charityworld.org</td>
                    <td>
                      <a href="#">View Docs</a>
                    </td>
                    <td>Pending</td>
                    <td>
                      <button>Approve</button>
                    </td>
                  </tr>
                  <tr>
                    <td>O002</td>
                    <td>EcoFund</td>
                    <td>support@ecofund.com</td>
                    <td>
                      <a href="#">View Docs</a>
                    </td>
                    <td>Approved</td>
                    <td>
                      <button>Revoke</button>
                    </td>
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

export default ValidateOrg;
