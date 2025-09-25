import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../styles/general.css";
import "../../styles/queries.css";
import "../../styles/pages.css";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

function AuctionPage() {
  const [extraFields, setExtraFields] = useState([]);

  const addField = () => {
    setExtraFields([...extraFields, { name: "", description: "" }]);
  };

  const handleFieldChange = (index, field, value) => {
    const newFields = [...extraFields];
    newFields[index][field] = value;
    setExtraFields(newFields);
  };
  return (
    <>
      <Navigation />
      <main>
        <section className="section personal-view">
          <div className="hero personal-menu">
            <div className="menu">
              <div className="menu-box">
                <li className="menu-box-nav-header">
                  Personal Data
                  <div className="menu-box-nav-link">
                    <Link to="/profilepage">Settings</Link>
                  </div>
                  <div className="menu-box-nav-link">
                    <Link to="/auctionpage">Create Auction</Link>
                  </div>
                  <div className="menu-box-nav-link">
                    <Link to="/auctions">My Auctions</Link>
                  </div>
                </li>
              </div>
              <hr />
              <div className="menu-box">
                <li className="menu-box-nav-header">
                  Payment
                  <div className="menu-box-nav-link">
                    <Link to="/bidhistory">Purchase history</Link>
                  </div>
                  <div className="menu-box-nav-link">
                    <Link to="/wishlist">Wishlist</Link>
                  </div>
                  <div className="menu-box-nav-link">
                    <Link to="/notifications">Notifications</Link>
                  </div>
                </li>
              </div>
              <div className="menu-box">
                <li className="menu-box-nav-header">
                  Groups
                  <div className="menu-box-nav-link">
                    <Link to="/creategrouppage">Create Group</Link>
                  </div>
                  <div className="menu-box-nav-link">
                    <Link to="/groupspage">My Group</Link>
                  </div>
                </li>
              </div>
              <hr />
            </div>

            <div className="menu-profile-info">
              <form>
                <h2 className="personal-view-title">Create a New Auction</h2>
                <p className="personal-view-descreption">
                  Provide details about your item and auction settings.
                </p>

                <div className="acc-box">
                  <h4 className="acc-info-title">Item Information</h4>
                  <div className="acc-box-container-item">
                    <label className="ledit2">Auction Title</label>
                    <input
                      className="input11"
                      type="text"
                      placeholder="e.g. Nike Air Jordans"
                    />
                  </div>
                  <div className="acc-box-container-item">
                    <label className="ledit2">Category</label>
                    <select className="input11">
                      <option>Fashion</option>
                      <option>Electronics</option>
                      <option>Collectibles</option>
                      <option>Other</option>
                    </select>
                  </div>
                  {/* Description */}
                  <div className="acc-box-container-item">
                    <label className="ledit2">Description</label>
                    <textarea
                      className="input11"
                      rows="4"
                      placeholder="Enter detailed description..."
                    />
                  </div>

                  <div className="acc-box-container-item">
                    <label className="ledit2">Upload Images</label>
                    <input className="input11" type="file" multiple />
                  </div>

                  <hr className="devider" />

                  {/* Additional Item Details */}
                  <div className="acc-box">
                    <h4 className="acc-info-title">Additional Item Details</h4>
                    <p className="personal-view-descreption">
                      Add custom fields (e.g., Developer, Color, Material, etc.)
                    </p>

                    {extraFields.map((field, index) => (
                      <div
                        key={index}
                        className="acc-box-container extra-field-box"
                      >
                        <input
                          className="input11"
                          type="text"
                          placeholder="Info Name (e.g., Developer)"
                          value={field.name}
                          onChange={(e) =>
                            handleFieldChange(index, "name", e.target.value)
                          }
                        />
                        <input
                          className="input11"
                          type="text"
                          placeholder="Description (e.g., Rogue Factor)"
                          value={field.description}
                          onChange={(e) =>
                            handleFieldChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addField}
                      className="btn1"
                      style={{ marginTop: "1rem" }}
                    >
                      + Add Additional Info
                    </button>
                  </div>
                  <hr className="devider" />

                  {/* Features (checkboxes) */}
                  <div className="acc-box">
                    <h4 className="acc-info-title">Item Features</h4>
                  </div>

                  <div className="acc-box-container">
                    <div className="acc-box-container-item">
                      <label className="ledit2">Condition</label>
                      <select className="input11">
                        <option>New</option>
                        <option>Like New</option>
                        <option>Used</option>
                        <option>Vintage</option>
                        <option>Parts</option>
                      </select>
                    </div>
                    <div className="acc-box-container-item">
                      <label className="ledit2">Tags (comma separated)</label>
                      <input
                        className="input11"
                        type="text"
                        placeholder="sneakers, limited edition"
                      />
                    </div>
                  </div>
                </div>

                <hr className="devider" />

                <div className="acc-box">
                  <h4 className="acc-info-title">Auction Settings</h4>
                  <div className="acc-box-container">
                    <div className="acc-box-container-item">
                      <label className="ledit2">Reserve Price ($)</label>
                      <input
                        className="input11"
                        type="number"
                        placeholder="200"
                      />
                    </div>
                    <div className="acc-box-container-item">
                      <label className="ledit2">Starting Bid ($)</label>
                      <input
                        className="input11"
                        type="number"
                        placeholder="50"
                      />
                    </div>
                  </div>

                  <div className="acc-box-container">
                    <div className="acc-box-container-item">
                      <label className="ledit2">Start Date</label>
                      <input className="input11" type="date" />
                    </div>
                    <div className="acc-box-container-item">
                      <label className="ledit2">End Date</label>
                      <input className="input11" type="date" />
                    </div>
                  </div>

                  <div className="acc-box-container-item">
                    <label>
                      <input type="checkbox" /> Auto-extend if last-minute bids
                      arrive
                    </label>
                  </div>
                </div>

                <hr className="devider" />

                <div className="acc-box">
                  <h4 className="acc-info-title">Seller & Trust</h4>
                  <div className="acc-box-container-item">
                    <label className="ledit2">
                      Proof of Authenticity (optional)
                    </label>
                    <input className="input11" type="file" />
                  </div>
                  <div className="acc-box-container-item">
                    <label className="ledit2">Warranty Info</label>
                    <input
                      className="input11"
                      type="text"
                      placeholder="e.g. 1-year warranty"
                    />
                  </div>
                </div>

                <hr className="devider" />

                <div className="acc-box">
                  <h4 className="acc-info-title">Delivery & Payment</h4>
                  <div className="acc-box-container">
                    <div className="acc-box-container-item">
                      <label className="ledit2">Shipping Option</label>
                      <select className="input11">
                        <option>Local Pickup</option>
                        <option>Domestic Shipping</option>
                        <option>Worldwide Shipping</option>
                      </select>
                    </div>
                    <div className="acc-box-container-item">
                      <label className="ledit2">
                        Estimated Shipping Cost ($)
                      </label>
                      <input className="input11" type="number" />
                    </div>
                  </div>
                  <div className="acc-box-container-item">
                    <label className="ledit2">Return Policy</label>
                    <select className="input11">
                      <option>No Returns</option>
                      <option>7 Days</option>
                      <option>14 Days</option>
                    </select>
                  </div>
                </div>

                <div className="page-btn button123">
                  <button className="update-user-info-btn btn1" type="submit">
                    Create Auction
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default AuctionPage;
