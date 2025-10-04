// src/public/VerifyEmail.js
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "../components/Navigation";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your email...");
  const [isOrganization, setIsOrganization] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link. No token provided.");
      return;
    }

    verifyEmail(token);
  }, [searchParams]);

  const verifyEmail = async (token) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/verify-email?token=${token}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setIsOrganization(data.isOrganization);

        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } else {
        setStatus("error");
        setMessage(data.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <>
      <Navigation />
      <main>
        <section className="section-hero">
          <div className="hero">
            <div className="hero-text-box signin-box verification-box">
              <h1 className="heading-primary">Email Verification</h1>

              <div className={`verification-status ${status}`}>
                {status === "verifying" && (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>{message}</p>
                  </div>
                )}

                {status === "success" && (
                  <div className="success-content">
                    <div className="success-icon">✓</div>
                    <h2>Email Verified Successfully!</h2>
                    <p>{message}</p>
                    {isOrganization && (
                      <div className="organization-notice">
                        <p>
                          <strong>Organization Account:</strong> Your account is
                          pending admin approval. You will be notified once
                          approved.
                        </p>
                      </div>
                    )}
                    <p className="redirect-message">
                      Redirecting to sign in page in 3 seconds...
                    </p>
                    <button
                      className="btn-primary"
                      onClick={() => navigate("/signin")}
                    >
                      Go to Sign In
                    </button>
                  </div>
                )}

                {status === "error" && (
                  <div className="error-content">
                    <div className="error-icon">✕</div>
                    <h2>Verification Failed</h2>
                    <p>{message}</p>
                    <div className="error-actions">
                      <button
                        className="btn-primary"
                        onClick={() => navigate("/signin")}
                      >
                        Go to Sign In
                      </button>
                      <button
                        className="btn-secondary"
                        onClick={() => navigate("/signup")}
                      >
                        Create New Account
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="hero-img-box">
              <img
                src="/img/hero.jpg"
                className="hero-img"
                alt="verification"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default VerifyEmail;
