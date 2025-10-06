import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

function Signup() {
  const [accountType, setAccountType] = useState("personal");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    organizationName: "",
    organizationContactEmail: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (accountType === "personal") {
      if (!formData.firstName.trim())
        newErrors.firstName = "Please enter your first name";
      if (!formData.lastName.trim())
        newErrors.lastName = "Please enter your last name";
      if (!formData.email.trim()) {
        newErrors.email = "Please enter your email";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
    } else {
      if (!formData.organizationName.trim())
        newErrors.organizationName = "Please enter your organization name";
      if (!formData.organizationContactEmail.trim()) {
        newErrors.organizationContactEmail =
          "Please enter organization contact email";
      } else if (!/\S+@\S+\.\S+/.test(formData.organizationContactEmail)) {
        newErrors.organizationContactEmail = "Please enter a valid email";
      }
    }

    if (!formData.username.trim())
      newErrors.username = "Please enter your username";
    if (!formData.password) newErrors.password = "Please enter your password";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setSuccessMessage("");

    if (!validateForm()) {
      console.log("Validation failed:", errors);
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        accountType === "personal"
          ? "http://localhost:5000/api/signup/signup"
          : "http://localhost:5000/api/org-signup/org-signup";

      const payload =
        accountType === "personal"
          ? {
              firstName: formData.firstName,
              lastName: formData.lastName,
              username: formData.username,
              email: formData.email,
              password: formData.password,
              userType: "user",
            }
          : {
              organizationName: formData.organizationName,
              organizationContactEmail: formData.organizationContactEmail,
              username: formData.username,
              password: formData.password,
            };

      console.log("Sending request to:", endpoint);
      console.log("Payload:", payload);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Server response:", response.status, data);

      if (!response.ok) {
        const errorMsg =
          data.message || data.errors?.[0]?.msg || "Registration failed";
        setErrors({ submit: errorMsg });
        setLoading(false);
        return;
      }

      if (accountType === "personal") {
        setSuccessMessage(
          "Registration successful! Please check your email to verify your account before signing in."
        );

        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          organizationName: "",
          organizationContactEmail: "",
        });

        setTimeout(() => navigate("/signin"), 3000);
      } else {
        setSuccessMessage(
          "Organization registered successfully! Admin will review and approve your account."
        );

        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          organizationName: "",
          organizationContactEmail: "",
        });
      }
    } catch (err) {
      console.error("Network error:", err);
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main>
        <section className="section-hero">
          <div className="hero">
            <div className="hero-text-box user-box">
              <h1 className="heading-primary">Create account</h1>

              {successMessage && (
                <div className="success-message-box">
                  <p>{successMessage}</p>
                </div>
              )}

              {errors.submit && (
                <div className="error-message-box">
                  <p>{errors.submit}</p>
                </div>
              )}

              <div className="user">
                <div className="user-form user-form--new">
                  <button
                    type="button"
                    onClick={() => setAccountType("personal")}
                    className={accountType === "personal" ? "active" : ""}
                  >
                    Personal
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType("organization")}
                    className={accountType === "organization" ? "active" : ""}
                  >
                    Organization
                  </button>
                </div>
              </div>

              <div className="user">
                {accountType === "personal" && (
                  <form className="user-form" onSubmit={handleSubmit}>
                    <div className="form-element-firstname">
                      <span>
                        <span className="floating-label">
                          <span className="textbox">
                            <input
                              type="text"
                              name="firstName"
                              placeholder="First Name"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              maxLength="63"
                            />
                          </span>
                        </span>
                        <span className="error-message">
                          <div>
                            <span className="firstname-error">
                              {errors.firstName}
                            </span>
                          </div>
                        </span>
                      </span>
                    </div>

                    <div className="form-element-lastname">
                      <span>
                        <span className="floating-label">
                          <span className="textbox">
                            <input
                              type="text"
                              name="lastName"
                              placeholder="Last Name"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              maxLength="63"
                            />
                          </span>
                        </span>
                        <span className="error-message">
                          <div>
                            <span className="lastname-error">
                              {errors.lastName}
                            </span>
                          </div>
                        </span>
                      </span>
                    </div>

                    <div className="form-element-username">
                      <span>
                        <span className="floating-label">
                          <span className="textbox">
                            <input
                              type="text"
                              name="username"
                              placeholder="username"
                              value={formData.username}
                              onChange={handleInputChange}
                            />
                          </span>
                        </span>
                        <span className="error-message">
                          <div>
                            <span className="username-error">
                              {errors.username}
                            </span>
                          </div>
                        </span>
                      </span>
                    </div>

                    <div className="form-element-email">
                      <span>
                        <span className="floating-label">
                          <span className="textbox">
                            <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </span>
                        </span>
                        <span className="error-message">
                          <div>
                            <span className="email-error">{errors.email}</span>
                          </div>
                        </span>
                      </span>
                    </div>

                    <div className="form-element-password">
                      <span>
                        <span className="floating-label">
                          <span className="textbox">
                            <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={formData.password}
                              onChange={handleInputChange}
                            />
                          </span>
                        </span>
                        <span className="error-message">
                          <div>
                            <span className="password-error">
                              {errors.password}
                            </span>
                          </div>
                        </span>
                      </span>
                    </div>

                    <div className="form-element-submit">
                      <button type="submit" disabled={loading}>
                        {loading ? "Creating Account..." : "Continue"}
                      </button>
                    </div>
                  </form>
                )}

                {accountType === "organization" && (
                  <form className="user-form" onSubmit={handleSubmit}>
                    <div className="form-element-orgname">
                      <span>
                        <span className="floating-label">
                          <span className="textbox">
                            <input
                              type="text"
                              name="organizationName"
                              placeholder="Organization Name"
                              value={formData.organizationName}
                              onChange={handleInputChange}
                              maxLength="63"
                            />
                          </span>
                        </span>
                        <span className="error-message">
                          <div>
                            <span className="orgname-error">
                              {errors.organizationName}
                            </span>
                          </div>
                        </span>
                      </span>
                    </div>

                    <div className="form-element-orgemail">
                      <span>
                        <span className="floating-label">
                          <span className="textbox">
                            <input
                              type="email"
                              name="organizationContactEmail"
                              placeholder="contact@organization.com"
                              value={formData.organizationContactEmail}
                              onChange={handleInputChange}
                            />
                          </span>
                        </span>
                        <span className="error-message">
                          <div>
                            <span className="orgemail-error">
                              {errors.organizationContactEmail}
                            </span>
                          </div>
                        </span>
                      </span>
                    </div>

                    <div className="form-element-username">
                      <span>
                        <span className="floating-label">
                          <span className="textbox">
                            <input
                              type="text"
                              name="username"
                              placeholder="username"
                              value={formData.username}
                              onChange={handleInputChange}
                            />
                          </span>
                        </span>
                        <span className="error-message">
                          <div>
                            <span className="username-error">
                              {errors.username}
                            </span>
                          </div>
                        </span>
                      </span>
                    </div>

                    <div className="form-element-password">
                      <span>
                        <span className="floating-label">
                          <span className="textbox">
                            <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={formData.password}
                              onChange={handleInputChange}
                            />
                          </span>
                        </span>
                        <span className="error-message">
                          <div>
                            <span className="password-error">
                              {errors.password}
                            </span>
                          </div>
                        </span>
                      </span>
                    </div>

                    <div className="form-element-submit">
                      <button type="submit" disabled={loading}>
                        {loading ? "Creating Account..." : "Continue"}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="user-form user-form--new">
                <span>already a user? &nbsp;</span>
                <Link to="/signin" className="main-nav-link-sign101">
                  Sign in
                </Link>
              </div>
            </div>

            <div className="hero-img-box">
              <img src="/img/hero.jpg" className="hero-img" alt="auction" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Signup;
