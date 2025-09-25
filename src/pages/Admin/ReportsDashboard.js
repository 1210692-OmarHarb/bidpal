import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import "../../styles/general.css";
import "../../styles/pages.css";

function ReportsDashboard() {
  const stats = {
    totalAuctions: 145,
    totalBids: 1200,
    totalRevenue: "$75,000",
    activeUsers: 350,
  };

  const recentReports = [
    { id: 1, title: "Top Auction: Rolex Daytona", revenue: "$20,000" },
    { id: 2, title: "Most Active User: JohnDoe123", revenue: "$5,000" },
    { id: 3, title: "Highest Bids: Tesla Roadster", revenue: "$15,500" },
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
            <div className="reports-dashboard-page">
              <h2 className="page-title">Reports Dashboard</h2>

              <div className="pew">
                {/* Quick Stats */}
                <div className="reports-stats">
                  <div className="stat-card">
                    <h3>Total Auctions</h3>
                    <p>{stats.totalAuctions}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Total Bids</h3>
                    <p>{stats.totalBids}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Total Revenue</h3>
                    <p>{stats.totalRevenue}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Active Users</h3>
                    <p>{stats.activeUsers}</p>
                  </div>
                </div>

                {/* Recent Reports */}
                <h3 className="sub-title">Recent Highlights</h3>
                <ul className="recent-reports">
                  {recentReports.map((report) => (
                    <li key={report.id} className="report-card">
                      <span>{report.title}</span>
                      <span className="report-revenue">{report.revenue}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* MAIN SECTION */}
              <div className="section-auctions">
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ReportsDashboard;
