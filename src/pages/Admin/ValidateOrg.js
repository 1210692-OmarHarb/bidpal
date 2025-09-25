import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import "../../styles/general.css";
import "../../styles/pages.css";

function ValidateOrg() {
  // Dummy org data (later fetched from DB)
  const orgs = [
    {
      id: "ORG001",
      name: "SneakerHub",
      email: "contact@sneakerhub.com",
      documents: "Business License.pdf",
      status: "Pending",
    },
    {
      id: "ORG002",
      name: "LuxuryCars Ltd",
      email: "sales@luxurycars.com",
      documents: "Company Registration.pdf",
      status: "Pending",
    },
    {
      id: "ORG003",
      name: "VintageElectro",
      email: "info@vintageelec.com",
      documents: "ID Verification.pdf",
      status: "Approved",
    },
  ];

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

            {/* MAIN CONTENT */}
            <div className="validate-org-page">
              <h2 className="page-title">Validate Organizations</h2>
              <p className="personal-view-descreption">
                Review pending organization accounts and approve or reject them.
              </p>

              <div className="section-auctions">
                <table className="auction-table">
                  <thead>
                    <tr>
                      <th>Org ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Documents</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orgs.map((org) => (
                      <tr key={org.id}>
                        <td>{org.id}</td>
                        <td>{org.name}</td>
                        <td>{org.email}</td>
                        <td>
                          <a href="#">{org.documents}</a>
                        </td>
                        <td>
                          <span
                            className={`status ${
                              org.status === "Approved"
                                ? "in-progress"
                                : "upcoming"
                            }`}
                          >
                            {org.status}
                          </span>
                        </td>
                        <td>
                          {org.status === "Pending" ? (
                            <>
                              <div className="btnsorg">
                                <button className="approve-btn">Approve</button>
                                <button className="deny-btn">Reject</button>
                              </div>
                            </>
                          ) : (
                            <span className="status success">✔ Verified</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ValidateOrg;
