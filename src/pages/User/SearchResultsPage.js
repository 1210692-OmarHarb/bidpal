import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import axios from "axios";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const status = searchParams.get("status") || "";

  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (category) params.append("category", category);
    if (status) params.append("status", status);

    axios
      .get(`http://localhost:5000/api/homepage/search?${params.toString()}`)
      .then((res) => {
        setAuctions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching search results:", err);
        setError("Failed to load search results");
        setLoading(false);
      });
  }, [query, category, status]);

  const handleAuctionClick = (auctionID) => {
    navigate(`/product/${auctionID}`);
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="search-results-page">
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
        <div className="search-results-page">
          <div className="error-message">{error}</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="search-results-page">
        <div className="search-header">
          <h1>Search Results</h1>
          <div className="search-filters">
            {query && (
              <span className="filter-tag">
                Search: <strong>"{query}"</strong>
              </span>
            )}
            {category && (
              <span className="filter-tag">
                Category: <strong>{category}</strong>
              </span>
            )}
            {status && (
              <span className="filter-tag">
                Status: <strong>{status}</strong>
              </span>
            )}
          </div>
          <p className="results-count">{auctions.length} auctions found</p>
        </div>

        <div className="auctions-grid">
          {auctions.length === 0 ? (
            <div className="no-results">
              <h2>No auctions found</h2>
              <p>
                Try adjusting your search criteria or browse our categories.
              </p>
              <button className="back-home-btn" onClick={() => navigate("/")}>
                Back to Home
              </button>
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
                  <p className="auction-category">{auction.categoryName}</p>
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

export default SearchResultsPage;
