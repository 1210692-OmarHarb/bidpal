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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (accountType === "personal") {
      if (!formData.firstName.trim())
        newErrors.firstName = "Please enter your first name";
      if (!formData.lastName.trim())
        newErrors.lastName = "Please enter your last name";
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
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Please enter your password";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          userType: accountType === "organization" ? "organization" : "user",
          organizationContactEmail: formData.organizationContactEmail,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.message || "Registration failed" });
        setLoading(false);
        return;
      }

      // Success message based on account type
      if (accountType === "organization") {
        setSuccessMessage(
          "Registration successful! Please check your email to verify your account. Your organization account is pending admin approval."
        );
      } else {
        setSuccessMessage(
          "Registration successful! Please check your email to verify your account before signing in."
        );
      }

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        organizationName: "",
        organizationContactEmail: "",
      });

      // Redirect to signin after 3 seconds
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (error) {
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
            <div className="hero-text-box signin-box">
              <h1 className="heading-primary">Create an account</h1>

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

              <div className="signup-picks">
                <button
                  onClick={() => setAccountType("personal")}
                  className={accountType === "personal" ? "active" : ""}
                >
                  Personal
                </button>
                <button
                  onClick={() => setAccountType("organization")}
                  className={accountType === "organization" ? "active" : ""}
                >
                  Organization
                </button>
              </div>

              <div className="user-form">
                {accountType === "personal" && (
                  <form className="user-signin-form" onSubmit={handleSubmit}>
                    <div className="form-element-firstname">
                      <span>
                        <span className="floating-label">
                          <span className="textbox">
                            <input
                              type="text"
                              name="firstName"
                              placeholder="firstname"
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
                              placeholder="lastname"
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
                          <label>Username</label>
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
                  <form className="user-signin-form" onSubmit={handleSubmit}>
                    <div className="form-element-orgname">
                      <span>
                        <span className="floating-label">
                          <span className="textbox">
                            <input
                              type="text"
                              name="organizationName"
                              placeholder="Organization"
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
                          <label>Organization Contact Email</label>
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
                          <label>Username</label>
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
                          <label>Email</label>
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
                          <label>Password</label>
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
                <Link to="/signin" className="main-nav-link">
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
