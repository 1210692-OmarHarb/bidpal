import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import "../../styles/homePage.css";

function Homepage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);
  const [featuredAuctions, setFeaturedAuctions] = useState([]);
  const [tabAuctions, setTabAuctions] = useState({
    live: [],
    upcoming: [],
    ending: [],
  });

  const [activeTab, setActiveTab] = useState("live");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [featuredSlideIndex, setFeaturedSlideIndex] = useState(0);
  const [tabSlideIndex, setTabSlideIndex] = useState(0);

  const [imageProgress, setImageProgress] = useState(0);
  const [wishlist, setWishlist] = useState(new Set());
  const [sparklingItems, setSparklingItems] = useState(new Set());

  // Create flat array of all images from all carousel items
  const allImages = carouselItems.flatMap((item, itemIdx) =>
    item.images.map((img, imgIdx) => ({
      src: img,
      auctionIndex: itemIdx,
      imageIndex: imgIdx,
      title: item.title,
      description: item.description,
    }))
  );

  // Fetch all homepage data
  useEffect(() => {
    // Fetch categories
    axios
      .get("http://localhost:5000/api/homepage/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));

    // Fetch statuses
    axios
      .get("http://localhost:5000/api/homepage/statuses")
      .then((res) => setStatuses(res.data))
      .catch((err) => console.error("Error fetching statuses:", err));

    // Fetch carousel items
    axios
      .get("http://localhost:5000/api/homepage/carousel")
      .then((res) => setCarouselItems(res.data))
      .catch((err) => console.error("Error fetching carousel:", err));

    // Fetch featured auctions
    axios
      .get("http://localhost:5000/api/homepage/featured")
      .then((res) => setFeaturedAuctions(res.data))
      .catch((err) => console.error("Error fetching featured:", err));

    // Fetch tab auctions - Fixed endpoint URLs
    ["live", "upcoming", "ending"].forEach((status) => {
      axios
        .get(`http://localhost:5000/api/homepage/tabs/${status}`)
        .then((res) =>
          setTabAuctions((prev) => ({ ...prev, [status]: res.data }))
        )
        .catch((err) =>
          console.error(`Error fetching ${status} auctions:`, err)
        );
    });
  }, []);

  useEffect(() => {
    if (allImages.length > 0) {
      const DURATION = 5000;
      const UPDATE_INTERVAL = 100;
      const INCREMENT = 100 / (DURATION / UPDATE_INTERVAL);

      const progressInterval = setInterval(() => {
        setImageProgress((prev) => {
          const newProgress = prev + INCREMENT;

          if (newProgress >= 100) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
            return 0;
          }
          return newProgress;
        });
      }, UPDATE_INTERVAL);

      return () => clearInterval(progressInterval);
    }
  }, [allImages.length]);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setImageProgress(0);
  };

  // Navigate to product page
  const handleBid = (auctionID) => {
    navigate(`/product/${auctionID}`);
  };

  // Handle wishlist toggle
  const handleWishlist = (auctionID) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(auctionID)) {
        newWishlist.delete(auctionID);
      } else {
        newWishlist.add(auctionID);
        // Add sparkling effect
        setSparklingItems((prev) => new Set(prev).add(auctionID));
        setTimeout(() => {
          setSparklingItems((prev) => {
            const newSet = new Set(prev);
            newSet.delete(auctionID);
            return newSet;
          });
        }, 1000);
      }
      return newWishlist;
    });
  };

  // Featured auctions slider controls
  const nextFeatured = () => {
    setFeaturedSlideIndex((prev) =>
      prev + 3 >= featuredAuctions.length ? 0 : prev + 3
    );
  };

  const prevFeatured = () => {
    setFeaturedSlideIndex((prev) =>
      prev - 3 < 0 ? Math.max(0, featuredAuctions.length - 3) : prev - 3
    );
  };

  const nextTab = () => {
    const currentAuctions = tabAuctions[activeTab];
    setTabSlideIndex((prev) =>
      prev + 3 >= currentAuctions.length ? 0 : prev + 3
    );
  };

  const prevTab = () => {
    const currentAuctions = tabAuctions[activeTab];
    setTabSlideIndex((prev) =>
      prev - 3 < 0 ? Math.max(0, currentAuctions.length - 3) : prev - 3
    );
  };

  return (
    <>
      <Navigation />
      <div className="homepage">
        {/* === Search bar === */}
        <div className="auction-search-bar">
          <input type="text" placeholder="Search auctions..." />
          <select>
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.categoryID}>{c.name}</option>
            ))}
          </select>
          <select>
            <option value="">Status</option>
            {statuses.map((s, idx) => (
              <option key={idx}>{s}</option>
            ))}
          </select>
          <button className="search-btn">Search</button>
        </div>

        {/* === Hero carousel === */}

        <div className="groupdiv101">
          {allImages.length > 0 && (
            <section className="hero-carousel">
              <div className="carousel-item">
                <img
                  src={allImages[currentIndex].src}
                  alt={allImages[currentIndex].title}
                  className="carousel-item-img clickable-image"
                  onClick={() =>
                    handleBid(
                      carouselItems[allImages[currentIndex].auctionIndex]
                        .auctionID
                    )
                  }
                />
                <div className="carousel-info">
                  <h2>{allImages[currentIndex].title}</h2>
                  <p>{allImages[currentIndex].description}</p>

                  <button
                    onClick={() =>
                      handleBid(
                        carouselItems[allImages[currentIndex].auctionIndex]
                          .auctionID
                      )
                    }
                  >
                    Place Bid
                  </button>
                  <button
                    className={`wishlist-btn ${
                      wishlist.has(
                        carouselItems[allImages[currentIndex].auctionIndex]
                          .auctionID
                      )
                        ? "added"
                        : ""
                    } ${
                      sparklingItems.has(
                        carouselItems[allImages[currentIndex].auctionIndex]
                          .auctionID
                      )
                        ? "sparkling"
                        : ""
                    }`}
                    onClick={() =>
                      handleWishlist(
                        carouselItems[allImages[currentIndex].auctionIndex]
                          .auctionID
                      )
                    }
                  >
                    {wishlist.has(
                      carouselItems[allImages[currentIndex].auctionIndex]
                        .auctionID
                    )
                      ? "Added to Wishlist"
                      : "Add to Wishlist"}
                  </button>
                </div>
              </div>
            </section>
          )}

          {allImages.length > 0 && (
            <div className="nextImageSlider">
              {allImages.map((imgData, idx) => (
                <div
                  key={idx}
                  onClick={() => handleThumbnailClick(idx)}
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  <img
                    src={imgData.src}
                    alt={`${imgData.title} ${idx + 1}`}
                    className="nextImage101"
                    style={{
                      opacity: currentIndex === idx ? 1 : 0.6,
                      border:
                        currentIndex === idx
                          ? "3px solid #007bff"
                          : "2px solid transparent",
                      transition: "all 0.3s ease",
                    }}
                  />
                  {currentIndex === idx && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: "4px",
                        width: `${imageProgress}%`,
                        backgroundColor: "#007bff",
                        transition: "width 0.1s linear",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <section className="featured-auctions">
          <div className="section-header">
            <h2>Discover New Featured Auctions</h2>
            <div className="slider-controls">
              <button onClick={prevFeatured} className="slider-btn">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextFeatured} className="slider-btn">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="slider-container">
            <div
              className="auction-slider"
              style={{
                transform: `translateX(-${featuredSlideIndex * (100 / 3)}%)`,
                transition: "transform 0.3s ease-in-out",
              }}
            >
              {featuredAuctions.map((a) => (
                <div key={a.auctionID} className="auction-card">
                  <img
                    src={a.images[0]}
                    alt={a.title}
                    className="clickable-image"
                    onClick={() => handleBid(a.auctionID)}
                  />

                  {/* Category + Title */}
                  <p className="auction-category">{a.categoryName}</p>
                  <h3>{a.title}</h3>

                  {/* Conditional logic */}
                  {a.status === "upcoming" ? (
                    <>
                      <p>
                        Available: {new Date(a.startDate).toLocaleDateString()}
                      </p>
                      <p>Starting Price: ${a.startingPrice}</p>
                    </>
                  ) : a.status === "live" ? (
                    <p>Starting Price: ${a.startingPrice}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === Tabs === */}
        <section className="auction-tabs">
          <nav className="tabs-nav">
            {["live", "upcoming", "ending"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
          <div className="section-header">
            <h3>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Auctions
            </h3>
            <div className="slider-controls">
              <button onClick={prevTab} className="slider-btn">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextTab} className="slider-btn">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="slider-container">
            <div
              className="auction-slider"
              style={{
                transform: `translateX(-${tabSlideIndex * (100 / 3)}%)`,
                transition: "transform 0.3s ease-in-out",
              }}
            >
              {tabAuctions[activeTab].map((a) => (
                <div key={a.auctionID} className="auction-card">
                  <img
                    src={a.images[0]}
                    alt={a.title}
                    className="clickable-image"
                    onClick={() => handleBid(a.auctionID)}
                  />
                  <h3>{a.title}</h3>
                  <p>Highest Bid: ${a.currentHighestBid}</p>
                  <p>Ends: {a.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
