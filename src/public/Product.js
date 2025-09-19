import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  });
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showBidHistory, setShowBidHistory] = useState(false);

  // Product data
  const product = {
    title: "Hell is Us - Limited Collector's Edition",
    subtitle: "Exclusive Gaming Collectible",
    images: [
      "/img/hellisus1.jpg",
      "/img/hellisus2.jpg",
      "/img/hellisus3.jpg",
      "/img/hellisus4.jpg",
      "/img/hellisus5.jpg",
    ],
    currentBid: 245.0,
    startingPrice: 99.99,
    buyNowPrice: 399.99,
    bidIncrement: 5.0,
    totalBids: 18,
    watchers: 47,
    condition: "Brand New",
    seller: {
      name: "GameCollector_Pro",
      rating: 4.8,
      reviews: 342,
      memberSince: "2019",
    },
    description: `A year is the closest we get to hell on earth, it's because Earth harbours the worst of demons: humankind. In an isolated country ravaged by infighting, discover the secrets of your past and deal with the repercussions of a mysterious calamity.

This limited collector's edition includes:
• Premium steel book case
• Exclusive art book (120 pages)
• Soundtrack vinyl record
• Collectible figurine
• Digital wallpapers and concept art
• Season pass for all DLC content`,
    features: ["Cloud Saves", "Controller Support", "Single Player"],
    category: "Gaming",
    platform: "PC/Console",
    releaseDate: "Q2 2024",
    publisher: "Nacon",
    developer: "Rogue Factor",
  };

  const bidHistory = [
    { bidder: "User***23", amount: 245.0, time: "2 minutes ago" },
    { bidder: "Collect***89", amount: 240.0, time: "5 minutes ago" },
    { bidder: "Game***45", amount: 235.0, time: "12 minutes ago" },
    { bidder: "Retro***67", amount: 230.0, time: "18 minutes ago" },
    { bidder: "User***23", amount: 225.0, time: "25 minutes ago" },
  ];

  const relatedAuctions = [
    {
      img: "/img/auction1.png",
      title: "Vintage Gaming Console",
      price: "$180",
      time: "2d 4h",
    },
    {
      img: "/img/auction2.png",
      title: "Rare Collectible Figure",
      price: "$95",
      time: "1d 12h",
    },
    {
      img: "/img/auction3.png",
      title: "Limited Edition Art Book",
      price: "$45",
      time: "3h 20m",
    },
    {
      img: "/img/auction4.png",
      title: "Gaming Merchandise Bundle",
      price: "$75",
      time: "5d 8h",
    },
  ];

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
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleBid = () => {
    const bid = parseFloat(bidAmount);
    if (
      bid > product.currentBid &&
      bid >= product.currentBid + product.bidIncrement
    ) {
      alert(`Bid placed successfully for $${bid}!`);
      setBidAmount("");
    } else {
      alert(`Minimum bid is $${product.currentBid + product.bidIncrement}`);
    }
  };

  const handleBuyNow = () => {
    // Redirect to Checkout page with product info
    navigate("/checkout", {
      state: { productTitle: product.title, amount: product.buyNowPrice },
    });
  };

  return (
    <>
      <Navigation />
      <div className="product-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <span>Home</span> &gt; <span>Gaming</span> &gt;{" "}
          <span>Collectibles</span> &gt; <span>{product.title}</span>
        </nav>

        <div className="product-container">
          {/* Image Gallery */}
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

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1>{product.title}</h1>
              <p className="subtitle">{product.subtitle}</p>
              <div className="product-meta">
                <span className="condition">{product.condition}</span>
                <div className="ratings">
                  <Star className="star filled" size={16} />
                  <span>{product.seller.rating}</span>
                  <span>({product.seller.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Auction Details */}
            <div className="auction-details">
              <div className="price-section">
                <div className="current-bid">
                  <span className="label">Current Bid</span>
                  <span className="amount">
                    ${product.currentBid.toFixed(2)}
                  </span>
                </div>
                <div className="buy-now-price">
                  <span className="label">Buy It Now</span>
                  <span className="amount">
                    ${product.buyNowPrice.toFixed(2)}
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

            {/* Bidding Section */}
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
              <button onClick={handleBuyNow} className="buy-now-btn">
                Buy It Now - ${product.buyNowPrice.toFixed(2)}
              </button>
            </div>

            {/* Action Buttons */}
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

            {/* Seller Info */}
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

        {/* Tabs Section */}
        <div className="product-tabs">
          <div className="tab-buttons">
            <button className="tab-btn active">Description</button>
            <button
              className="tab-btn"
              onClick={() => setShowBidHistory(!showBidHistory)}
            >
              Bid History ({product.totalBids})
            </button>
            <button className="tab-btn">Shipping & Returns</button>
          </div>

          <div className="tab-content">
            {!showBidHistory ? (
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
                      <span className="spec-label">Platform:</span>
                      <span>{product.platform}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Publisher:</span>
                      <span>{product.publisher}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Developer:</span>
                      <span>{product.developer}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Release Date:</span>
                      <span>{product.releaseDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bid-history">
                <h3>Bidding History</h3>
                <div className="bid-list">
                  {bidHistory.map((bid, index) => (
                    <div key={index} className="bid-item">
                      <span className="bidder">{bid.bidder}</span>
                      <span className="amount">${bid.amount.toFixed(2)}</span>
                      <span className="time">{bid.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Auctions */}
        <div className="related-auctions">
          <h2>Related Auctions</h2>
          <div className="related-grid">
            {relatedAuctions.map((auction, index) => (
              <div key={index} className="related-card">
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
