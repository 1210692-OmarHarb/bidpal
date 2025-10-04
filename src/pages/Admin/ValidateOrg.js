import React, { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import "../../styles/general.css";
import "../../styles/pages.css";

function ValidateOrg() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(null);

  useEffect(() => {
    fetchPendingOrgs();
  }, []);

  const fetchPendingOrgs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/admin/pending-organizations"
      );
      const data = await response.json();

      if (response.ok) {
        setOrgs(data.organizations);
      } else {
        setError(data.message || "Failed to fetch organizations");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userID, orgName) => {
    if (!window.confirm(`Are you sure you want to approve "${orgName}"?`)) {
      return;
    }

    try {
      setProcessingId(userID);
      const response = await fetch(
        `http://localhost:5000/api/admin/approve-organization/${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminNotes: "", // Optional admin notes
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`Organization "${orgName}" approved successfully!`);
        // Refresh the list
        fetchPendingOrgs();
      } else {
        alert(data.message || "Failed to approve organization");
      }
    } catch (err) {
      alert("Network error. Please try again.");
      console.error("Error:", err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (userID, orgName) => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }

    try {
      setProcessingId(userID);
      const response = await fetch(
        `http://localhost:5000/api/admin/reject-organization/${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rejectionReason: rejectionReason,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`Organization "${orgName}" rejected successfully!`);
        setShowRejectModal(null);
        setRejectionReason("");
        // Refresh the list
        fetchPendingOrgs();
      } else {
        alert(data.message || "Failed to reject organization");
      }
    } catch (err) {
      alert("Network error. Please try again.");
      console.error("Error:", err);
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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

              {error && (
                <div className="error-message-box">
                  <p>{error}</p>
                </div>
              )}

              {loading ? (
                <div className="loading-container">
                  <p>Loading organizations...</p>
                </div>
              ) : orgs.length === 0 ? (
                <div className="no-data-message">
                  <p>No pending organizations to review.</p>
                </div>
              ) : (
                <div className="section-auctions">
                  <table className="auction-table">
                    <thead>
                      <tr>
                        <th>Org ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Contact Email</th>
                        <th>Joined Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orgs.map((org) => (
                        <tr key={org.userID}>
                          <td>{org.organizationID}</td>
                          <td>{org.username}</td>
                          <td>{org.email}</td>
                          <td>
                            <a href={`mailto:${org.organizationContactEmail}`}>
                              {org.organizationContactEmail}
                            </a>
                          </td>
                          <td>{formatDate(org.joinedDate)}</td>
                          <td>
                            <span className="status upcoming">
                              {org.verificationStatus}
                            </span>
                          </td>
                          <td>
                            <div className="btnsorg">
                              <button
                                className="approve-btn"
                                onClick={() =>
                                  handleApprove(org.userID, org.username)
                                }
                                disabled={processingId === org.userID}
                              >
                                {processingId === org.userID
                                  ? "Processing..."
                                  : "Approve"}
                              </button>
                              <button
                                className="deny-btn"
                                onClick={() => setShowRejectModal(org.userID)}
                                disabled={processingId === org.userID}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Rejection Modal */}
        {showRejectModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowRejectModal(null)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Reject Organization</h3>
              <p>Please provide a reason for rejecting this organization:</p>
              <textarea
                className="rejection-textarea"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter rejection reason..."
                rows="4"
              ></textarea>
              <div className="modal-actions">
                <button
                  className="btn-cancel"
                  onClick={() => {
                    setShowRejectModal(null);
                    setRejectionReason("");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn-confirm-reject"
                  onClick={() => {
                    const org = orgs.find((o) => o.userID === showRejectModal);
                    handleReject(showRejectModal, org?.username);
                  }}
                  disabled={
                    !rejectionReason.trim() || processingId === showRejectModal
                  }
                >
                  {processingId === showRejectModal
                    ? "Processing..."
                    : "Confirm Reject"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default ValidateOrg;
