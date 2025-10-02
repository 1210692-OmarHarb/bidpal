import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/general.css";
import "../styles/queries.css";
import "../styles/pages.css";
import "../styles/productPage.css";
import "../styles/homePage.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Eye,
  Clock,
  Users,
  Shield,
  Star,
} from "lucide-react";

function Product() {
  const navigate = useNavigate();
  const { auctionID } = useParams();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showBidHistory, setShowBidHistory] = useState(false);
  const [loading, setLoading] = useState(true);

  // Product data from API
  const [product, setProduct] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);
  const [relatedAuctions, setRelatedAuctions] = useState([]);
  const [activeTab, setActiveTab] = useState("description");

  // Fetch product data on mount
  useEffect(() => {
    fetchProductData();
  }, [auctionID]);

  const fetchProductData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/product/${auctionID}`);
      const data = await res.json();

      if (data.success) {
        setProduct(data.data);
        setBidHistory(data.data.bidHistory);
        setRelatedAuctions(data.data.relatedAuctions);
        setTimeLeft(data.data.timeLeft);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [product]);

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  const handleBid = async () => {
    const bid = parseFloat(bidAmount);
    const minBid = product.currentBid + product.bidIncrement;

    if (bid < minBid) {
      alert(`Minimum bid is $${minBid.toFixed(2)}`);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/product/${auctionID}/bid`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userID: 1, // TODO: Get from auth context
            bidAmount: bid,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Bid placed successfully!");
        fetchProductData(); // Refresh data
        setBidAmount("");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("Failed to place bid");
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div style={{ padding: "50px", textAlign: "center" }}>Loading...</div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navigation />
        <div style={{ padding: "50px", textAlign: "center" }}>
          Product not found
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="product-page">
        <nav className="breadcrumb">
          <span>Home</span> &gt;
          <span>{product.category}</span> &gt; <span>{product.title}</span>
        </nav>

        <div className="product-container">
          <div className="image-gallery">
            <div className="main-image">
              <img
                src={product.images[currentImageIndex]}
                alt={product.title}
              />
              <button className="nav-btn prev" onClick={prevImage}>
                <ChevronLeft size={24} />
              </button>
              <button className="nav-btn next" onClick={nextImage}>
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="thumbnail-strip">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  className={currentImageIndex === index ? "active" : ""}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="product-info">
            <div className="product-header">
              <h1>{product.title}</h1>
              <div className="product-meta">
                <span className="condition">{product.condition}</span>
                <div className="ratings">
                  <Star className="star filled" size={16} />
                  <span>{product.seller.rating}</span>
                  <span>({product.seller.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="auction-details">
              <div className="price-section">
                <div className="current-bid">
                  <span className="label">Current Bid</span>
                  <span className="amount">
                    ${product.currentBid.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="auction-stats">
                <div className="stat">
                  <Users size={16} />
                  <span>{product.totalBids} bids</span>
                </div>
                <div className="stat">
                  <Eye size={16} />
                  <span>{product.watchers} watchers</span>
                </div>
                <div className="countdown">
                  <Clock size={16} />
                  <span>
                    {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                    left
                  </span>
                </div>
              </div>
            </div>

            <div className="bidding-section">
              <div className="bid-input-group">
                <input
                  type="number"
                  placeholder={`Min bid: $${(
                    product.currentBid + product.bidIncrement
                  ).toFixed(2)}`}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  step={product.bidIncrement}
                  min={product.currentBid + product.bidIncrement}
                />
                <button onClick={handleBid} className="bid-btn">
                  Place Bid
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button
                className={`watchlist-btn ${isWatchlisted ? "active" : ""}`}
                onClick={() => setIsWatchlisted(!isWatchlisted)}
              >
                <Heart size={16} fill={isWatchlisted ? "#169976" : "none"} />
                {isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
              </button>
              <button className="share-btn">
                <Share2 size={16} />
                Share
              </button>
            </div>

            <div className="seller-info">
              <h3>Seller Information</h3>
              <div className="seller-details">
                <div className="seller-name">
                  <Shield size={16} />
                  <span>{product.seller.name}</span>
                </div>
                <div className="seller-stats">
                  <span>
                    {product.seller.rating} ★ ({product.seller.reviews})
                  </span>
                  <span>Member since {product.seller.memberSince}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${
                !showBidHistory && activeTab === "description" ? "active" : ""
              }`}
              onClick={() => {
                setShowBidHistory(false);
                setActiveTab("description");
              }}
            >
              Description
            </button>
            <button
              className={`tab-btn ${showBidHistory ? "active" : ""}`}
              onClick={() => setShowBidHistory(true)}
            >
              Bid History ({product.totalBids})
            </button>
            <button
              className={`tab-btn ${
                !showBidHistory && activeTab === "shipping" ? "active" : ""
              }`}
              onClick={() => {
                setShowBidHistory(false);
                setActiveTab("shipping");
              }}
            >
              Shipping & Returns
            </button>
          </div>

          <div className="tab-content">
            {showBidHistory ? (
              <div className="bid-history">
                <h3>Bidding History</h3>
                <div className="bid-list">
                  {bidHistory.length > 0 ? (
                    bidHistory.map((bid, index) => (
                      <div key={index} className="bid-item">
                        <span className="bidder">{bid.bidder}</span>
                        <span className="amount">${bid.amount.toFixed(2)}</span>
                        <span className="time">{bid.time}</span>
                      </div>
                    ))
                  ) : (
                    <p>No bids yet. Be the first to bid!</p>
                  )}
                </div>
              </div>
            ) : activeTab === "description" ? (
              <div className="description-content">
                <h3>Product Description</h3>
                <p>{product.description}</p>

                <div className="product-specifications">
                  <h4>Specifications</h4>
                  <div className="spec-grid">
                    <div className="spec-item">
                      <span className="spec-label">Category:</span>
                      <span>{product.category}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Condition:</span>
                      <span>{product.condition}</span>
                    </div>
                    {product.warranty && (
                      <div className="spec-item">
                        <span className="spec-label">Warranty:</span>
                        <span>{product.warranty}</span>
                      </div>
                    )}
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div className="spec-item" key={key}>
                          <span className="spec-label">{key}:</span>
                          <span>{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="shipping-content">
                <h3>Shipping Information</h3>
                <div className="spec-grid">
                  <div className="spec-item">
                    <span className="spec-label">Shipping Method:</span>
                    <span>
                      {product.shipping.option === "local"
                        ? "Local Pickup Only"
                        : product.shipping.option === "domestic"
                        ? "Domestic Shipping"
                        : "Worldwide Shipping"}
                    </span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Shipping Cost:</span>
                    <span>
                      {product.shipping.cost === 0
                        ? "Free"
                        : `$${product.shipping.cost.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <h3 style={{ marginTop: "2rem" }}>Return Policy</h3>
                <div className="spec-grid">
                  <div className="spec-item">
                    <span className="spec-label">Returns Accepted:</span>
                    <span>
                      {product.returnPolicy === "none"
                        ? "No Returns"
                        : product.returnPolicy === "7_days"
                        ? "Within 7 Days"
                        : "Within 14 Days"}
                    </span>
                  </div>
                  {product.returnPolicy !== "none" && (
                    <div className="spec-item">
                      <span className="spec-label">Return Shipping:</span>
                      <span>Buyer pays return shipping</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="related-auctions">
          <h2>Related Auctions</h2>
          <div className="related-grid">
            {relatedAuctions.map((auction) => (
              <div
                key={auction.auctionID}
                className="related-card"
                onClick={() => navigate(`/product/${auction.auctionID}`)}
              >
                <img src={auction.img} alt={auction.title} />
                <h3>{auction.title}</h3>
                <p>Current Bid: {auction.price}</p>
                <p>Time Left: {auction.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Product;
