import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import "../../styles/general.css";
import "../../styles/pages.css";

function ManageAccounts() {
  return (
    <>
      <Navigation />
      <main>
        <section className="section personal-view-admin12">
          <div className="hero personal-menu-admin123">
            <div className="menu personal-menu-admin123">
              <div className="menu-box personal-menu-admin123">
                <li className="menu-box-nav-header menu-admin123">
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
              <h2 className="heading-secondary">Manage Accounts</h2>
              <table className="auction-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Alice</td>
                    <td>alice@example.com</td>
                    <td>User</td>
                    <td>Active</td>
                    <td>
                      <button>Deactivate</button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>OrgX</td>
                    <td>contact@orgx.com</td>
                    <td>Organization</td>
                    <td>Pending</td>
                    <td>
                      <button>Approve</button>
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

export default ManageAccounts;
