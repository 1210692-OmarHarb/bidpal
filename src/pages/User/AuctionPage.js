import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../styles/general.css";
import "../../styles/queries.css";
import "../../styles/pages.css";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

function AuctionPage() {
  // Form state variables
  const [title, setTitle] = useState("");
  const [categoryID, setCategoryID] = useState(1); // Default to Fashion
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [condition, setCondition] = useState("New");
  const [tags, setTags] = useState("");
  const [reservePrice, setReservePrice] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [autoExtend, setAutoExtend] = useState(false);
  const [warranty, setWarranty] = useState("");
  const [shippingOption, setShippingOption] = useState("Local Pickup");
  const [shippingCost, setShippingCost] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("No Returns");
  const [extraFields, setExtraFields] = useState([]);

  // Category mapping
  const getCategoryID = (categoryName) => {
    const categories = {
      Fashion: 1,
      Electronics: 2,
      Collectibles: 3,
      Other: 4,
    };
    return categories[categoryName] || 1;
  };

  const addField = () => {
    setExtraFields([...extraFields, { name: "", description: "" }]);
  };

  const removeField = (index) => {
    const newFields = extraFields.filter((_, i) => i !== index);
    setExtraFields(newFields);
  };

  const handleFieldChange = (index, field, value) => {
    const newFields = [...extraFields];
    newFields[index][field] = value;
    setExtraFields(newFields);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // For now, we'll store file names. In production, you'd upload to a server
    const imageNames = files.map((file) => file.name);
    setImages(imageNames);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      alert("Please enter an auction title");
      return;
    }
    if (!description.trim()) {
      alert("Please enter a description");
      return;
    }
    if (!startingBid || parseFloat(startingBid) <= 0) {
      alert("Please enter a valid starting bid");
      return;
    }
    if (!startDate || !endDate) {
      alert("Please select start and end dates");
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      alert("End date must be after start date");
      return;
    }

    const auctionData = {
      title: title.trim(),
      categoryID: getCategoryID(categoryID),
      description: description.trim(),
      images: images, // Array of image names/URLs
      condition,
      tags: tags.trim(),
      reservePrice: reservePrice ? parseFloat(reservePrice) : null,
      startingBid: parseFloat(startingBid),
      startDate,
      endDate,
      autoExtend,
      warranty: warranty.trim(),
      shippingOption,
      shippingCost: shippingCost ? parseFloat(shippingCost) : 0,
      returnPolicy,
      sellerID: 1, // temp: logged-in user ID
      extraFields: extraFields.filter(
        (field) => field.name.trim() && field.description.trim()
      ),
    };

    try {
      console.log("Submitting auction data:", auctionData);

      const res = await fetch("http://localhost:5000/api/auctions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auctionData),
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (res.ok && data.success) {
        alert(`Auction created successfully! Auction ID: ${data.auctionID}`);
        // Reset form
        setTitle("");
        setDescription("");
        setImages([]);
        setTags("");
        setReservePrice("");
        setStartingBid("");
        setStartDate("");
        setEndDate("");
        setAutoExtend(false);
        setWarranty("");
        setShippingCost("");
        setExtraFields([]);
      } else {
        // Show detailed error information
        const errorMessage = data.details
          ? `${data.error}: ${data.details}`
          : data.error || "Unknown error";
        const suggestion = data.suggestion
          ? `\n\nSuggestion: ${data.suggestion}`
          : "";
        alert(`Failed to create auction: ${errorMessage}${suggestion}`);
        console.error("Detailed error:", data);
      }
    } catch (error) {
      console.error("Network error submitting auction:", error);
      alert(
        "Network error creating auction. Please check if the backend server is running and try again."
      );
    }
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
              <form onSubmit={handleSubmit}>
                <h2 className="personal-view-title">Create a New Auction</h2>
                <p className="personal-view-descreption">
                  Provide details about your item and auction settings.
                </p>

                <div className="acc-box">
                  <h4 className="acc-info-title">Item Information</h4>
                  <div className="acc-box-container-item">
                    <label className="ledit2">Auction Title *</label>
                    <input
                      className="input11"
                      type="text"
                      placeholder="e.g. Nike Air Jordans"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="acc-box-container-item">
                    <label className="ledit2">Category *</label>
                    <select
                      className="input11"
                      value={categoryID}
                      onChange={(e) => setCategoryID(e.target.value)}
                      required
                    >
                      <option value="Fashion">Fashion</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Collectibles">Collectibles</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {/* Description */}
                  <div className="acc-box-container-item">
                    <label className="ledit2">Description *</label>
                    <textarea
                      className="input11"
                      rows="4"
                      placeholder="Enter detailed description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="acc-box-container-item">
                    <label className="ledit2">Upload Images</label>
                    <input
                      className="input11"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    {images.length > 0 && (
                      <p
                        style={{
                          fontSize: "0.9em",
                          color: "#666",
                          marginTop: "0.5rem",
                        }}
                      >
                        {images.length} image(s) selected: {images.join(", ")}
                      </p>
                    )}
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
                        style={{ position: "relative" }}
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
                        <button
                          type="button"
                          onClick={() => removeField(index)}
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "10px",
                            background: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "25px",
                            height: "25px",
                            cursor: "pointer",
                          }}
                        >
                          ×
                        </button>
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
                      <label className="ledit2">Condition *</label>
                      <select
                        className="input11"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        required
                      >
                        <option value="New">New</option>
                        <option value="Like New">Like New</option>
                        <option value="Used">Used</option>
                        <option value="Vintage">Vintage</option>
                        <option value="Parts">Parts</option>
                      </select>
                    </div>
                    <div className="acc-box-container-item">
                      <label className="ledit2">Tags (comma separated)</label>
                      <input
                        className="input11"
                        type="text"
                        placeholder="sneakers, limited edition"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
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
                        min="0"
                        step="0.01"
                        placeholder="200"
                        value={reservePrice}
                        onChange={(e) => setReservePrice(e.target.value)}
                      />
                    </div>
                    <div className="acc-box-container-item">
                      <label className="ledit2">Starting Bid ($) *</label>
                      <input
                        className="input11"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="50"
                        value={startingBid}
                        onChange={(e) => setStartingBid(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="acc-box-container">
                    <div className="acc-box-container-item">
                      <label className="ledit2">Start Date *</label>
                      <input
                        className="input11"
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="acc-box-container-item">
                      <label className="ledit2">End Date *</label>
                      <input
                        className="input11"
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="acc-box-container-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={autoExtend}
                        onChange={(e) => setAutoExtend(e.target.checked)}
                      />{" "}
                      Auto-extend if last-minute bids arrive
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
                    <input
                      className="input11"
                      type="file"
                      accept="image/*,application/pdf"
                    />
                  </div>
                  <div className="acc-box-container-item">
                    <label className="ledit2">Warranty Info</label>
                    <input
                      className="input11"
                      type="text"
                      placeholder="e.g. 1-year warranty"
                      value={warranty}
                      onChange={(e) => setWarranty(e.target.value)}
                    />
                  </div>
                </div>

                <hr className="devider" />

                <div className="acc-box">
                  <h4 className="acc-info-title">Delivery & Payment</h4>
                  <div className="acc-box-container">
                    <div className="acc-box-container-item">
                      <label className="ledit2">Shipping Option *</label>
                      <select
                        className="input11"
                        value={shippingOption}
                        onChange={(e) => setShippingOption(e.target.value)}
                        required
                      >
                        <option value="Local Pickup">Local Pickup</option>
                        <option value="Domestic Shipping">
                          Domestic Shipping
                        </option>
                        <option value="Worldwide Shipping">
                          Worldwide Shipping
                        </option>
                      </select>
                    </div>
                    <div className="acc-box-container-item">
                      <label className="ledit2">
                        Estimated Shipping Cost ($)
                      </label>
                      <input
                        className="input11"
                        type="number"
                        min="0"
                        step="0.01"
                        value={shippingCost}
                        onChange={(e) => setShippingCost(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="acc-box-container-item">
                    <label className="ledit2">Return Policy *</label>
                    <select
                      className="input11"
                      value={returnPolicy}
                      onChange={(e) => setReturnPolicy(e.target.value)}
                      required
                    >
                      <option value="No Returns">No Returns</option>
                      <option value="7 Days">7 Days</option>
                      <option value="14 Days">14 Days</option>
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
