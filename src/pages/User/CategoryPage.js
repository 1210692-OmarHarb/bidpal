import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import axios from "axios";

function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/homepage/category/${categoryName}`)
      .then((res) => {
        setAuctions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching category auctions:", err);
        setError("Failed to load auctions for this category");
        setLoading(false);
      });
  }, [categoryName]);

  const handleAuctionClick = (auctionID) => {
    navigate(`/product/${auctionID}`);
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="category-page">
          <div className="loading-spinner">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <div className="category-page">
          <div className="error-message">{error}</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="category-page">
        <div className="category-header">
          <h1>{categoryName}</h1>
          <p className="category-count">{auctions.length} auctions found</p>
        </div>

        <div className="auctions-grid">
          {auctions.length === 0 ? (
            <div className="no-results">
              <p>No auctions found in this category.</p>
            </div>
          ) : (
            auctions.map((auction) => (
              <div
                key={auction.auctionID}
                className="auction-item"
                onClick={() => handleAuctionClick(auction.auctionID)}
              >
                <div className="auction-image-wrapper">
                  <img
                    src={auction.images[0]}
                    alt={auction.title}
                    className="auction-image"
                  />
                  <span className={`status-badge ${auction.status}`}>
                    {auction.status}
                  </span>
                </div>

                <div className="auction-details">
                  <h3 className="auction-title">{auction.title}</h3>
                  <p className="auction-description">{auction.description}</p>

                  <div className="auction-info">
                    {auction.status === "live" && (
                      <>
                        <div className="info-row">
                          <span className="label">Current Bid:</span>
                          <span className="value price">
                            $
                            {auction.currentHighestBid || auction.startingPrice}
                          </span>
                        </div>
                        <div className="info-row">
                          <span className="label">Ends:</span>
                          <span className="value">
                            {new Date(auction.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </>
                    )}

                    {auction.status === "upcoming" && (
                      <>
                        <div className="info-row">
                          <span className="label">Starting Price:</span>
                          <span className="value price">
                            ${auction.startingPrice}
                          </span>
                        </div>
                        <div className="info-row">
                          <span className="label">Starts:</span>
                          <span className="value">
                            {new Date(auction.startDate).toLocaleDateString()}
                          </span>
                        </div>
                      </>
                    )}

                    {auction.status === "ending" && (
                      <>
                        <div className="info-row">
                          <span className="label">Current Bid:</span>
                          <span className="value price">
                            $
                            {auction.currentHighestBid || auction.startingPrice}
                          </span>
                        </div>
                        <div className="info-row urgent">
                          <span className="label">Ending Soon!</span>
                          <span className="value">
                            {new Date(auction.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage;
