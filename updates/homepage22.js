import React, { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

import "../../styles/general.css";
import "../../styles/queries.css";
import "../../styles/pages.css";
import "../../styles/productPage.css";
import "../../styles/homePage.css";

import { ChevronLeft, ChevronRight } from "lucide-react";

function Homepage() {
  const [activeTab, setActiveTab] = useState("live");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featuredSlideIndex, setFeaturedSlideIndex] = useState(0);
  const [tabSlideIndex, setTabSlideIndex] = useState(0);

  const carouselItems = [
    {
      img: "/img/auction1.png",
      title: "Nike Air Jordan Rare Edition",
      desc: "Exclusive drop — limited quantity.",
    },
    {
      img: "/img/auction2.png",
      title: "Louis Vuitton Collector's Bag",
      desc: "Luxury piece for premium collectors.",
    },
    {
      img: "/img/auction3.png",
      title: "Vintage Rolex Watch",
      desc: "Timeless design, exclusive drop.",
    },
    {
      img: "/img/auction4.png",
      title: "Rare Comic Book",
      desc: "Marvel #1, iconic collectible.",
    },
    {
      img: "/img/auction5.png",
      title: "MacBook Pro 2025",
      desc: "Powerful performance for creators.",
    },
  ];

  // Featured auctions data
  const featuredAuctions = [
    { img: "/img/auction2.png", title: "Louis Vuitton Bag", price: "$500" },
    { img: "/img/auction3.png", title: "Vintage Rolex", price: "$5,000" },
    { img: "/img/auction1.png", title: "Nike Air Jordan", price: "$350" },
    { img: "/img/auction4.png", title: "Rare Comic Book", price: "$200" },
    { img: "/img/auction5.png", title: "MacBook Pro", price: "$1,200" },
    { img: "/img/auction2.png", title: "Designer Watch", price: "$800" },
    { img: "/img/auction1.png", title: "Vintage Sneakers", price: "$450" },
    { img: "/img/auction1.png", title: "Nike Air Jordan", price: "$350" },
    { img: "/img/auction4.png", title: "Rare Comic Book", price: "$200" },
    { img: "/img/auction5.png", title: "MacBook Pro", price: "$1,200" },
    { img: "/img/auction2.png", title: "Designer Watch", price: "$800" },
    { img: "/img/auction1.png", title: "Vintage Sneakers", price: "$450" },
  ];

  // Tab auctions data
  const tabAuctions = {
    live: [
      {
        img: "/img/auction4.png",
        title: "Rare Comic Book",
        bid: "$300",
        time: "2h 30m",
      },
      {
        img: "/img/auction1.png",
        title: "Nike Air Jordan",
        bid: "$450",
        time: "1h 15m",
      },
      {
        img: "/img/auction3.png",
        title: "Vintage Rolex",
        bid: "$4,800",
        time: "3h 45m",
      },
      {
        img: "/img/auction2.png",
        title: "Designer Bag",
        bid: "$650",
        time: "30m",
      },
      {
        img: "/img/auction5.png",
        title: "Gaming Laptop",
        bid: "$900",
        time: "4h 20m",
      },
      {
        img: "/img/auction4.png",
        title: "Marvel Comics Set",
        bid: "$180",
        time: "2h 10m",
      },
    ],
    upcoming: [
      {
        img: "/img/auction5.png",
        title: "MacBook Pro",
        price: "$1,200",
        start: "Tomorrow",
      },
      {
        img: "/img/auction1.png",
        title: "Limited Sneakers",
        price: "$400",
        start: "2 days",
      },
      {
        img: "/img/auction3.png",
        title: "Luxury Watch",
        price: "$3,000",
        start: "3 days",
      },
      {
        img: "/img/auction2.png",
        title: "Designer Handbag",
        price: "$750",
        start: "Tomorrow",
      },
      {
        img: "/img/auction4.png",
        title: "Vintage Comics",
        price: "$150",
        start: "1 week",
      },
      {
        img: "/img/auction5.png",
        title: "Tech Bundle",
        price: "$800",
        start: "5 days",
      },
    ],
    ending: [
      {
        img: "/img/auction1.png",
        title: "Luxury Car Auction",
        bid: "$50,000",
        status: "Ending Soon",
      },
      {
        img: "/img/auction3.png",
        title: "Diamond Ring",
        bid: "$2,500",
        status: "2 hours left",
      },
      {
        img: "/img/auction2.png",
        title: "Vintage Purse",
        bid: "$800",
        status: "1 hour left",
      },
      {
        img: "/img/auction4.png",
        title: "Signed Comic",
        bid: "$450",
        status: "30 min left",
      },
      {
        img: "/img/auction5.png",
        title: "Pro Camera",
        bid: "$1,100",
        status: "4 hours left",
      },
      {
        img: "/img/auction1.png",
        title: "Sport Car Parts",
        bid: "$750",
        status: "Ending Soon",
      },
      {
        img: "/img/auction1.png",
        title: "Nike Air Jordan",
        bid: "$450",
        time: "1h 15m",
      },
      {
        img: "/img/auction1.png",
        title: "Nike Air Jordan",
        bid: "$450",
        time: "1h 15m",
      },
      {
        img: "/img/auction1.png",
        title: "Nike Air Jordan",
        bid: "$450",
        time: "1h 15m",
      },
      {
        img: "/img/auction1.png",
        title: "Nike Air Jordan",
        bid: "$450",
        time: "1h 15m",
      },
    ],
  };

  // Auto-change carousel every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  // Reset tab slider when switching tabs
  useEffect(() => {
    setTabSlideIndex(0);
  }, [activeTab]);

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

  // Tab auctions slider controls
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
        <div className="auction-search-bar">
          <input type="text" placeholder="Search auctions..." />
          <select>
            <option>All Categories</option>
            <option>Fashion</option>
            <option>Electronics</option>
            <option>Collectibles</option>
          </select>
          <select>
            <option>Status</option>
            <option>Live</option>
            <option>Upcoming</option>
            <option>Ended</option>
          </select>
          <button className="search-btn">Search</button>
        </div>

        <section className="hero-carousel">
          <div className="carousel-item">
            <img
              src={carouselItems[currentIndex].img}
              alt={carouselItems[currentIndex].title}
              className="carousel-item-img"
            />
            <div className="carousel-info">
              <h2>{carouselItems[currentIndex].title}</h2>
              <p>{carouselItems[currentIndex].desc}</p>
              <button>Place Bid</button>
              <button>Add to Watchlist</button>
            </div>
          </div>
        </section>

        {/* Featured Auctions with Slider */}
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
              {featuredAuctions.map((auction, index) => (
                <div key={index} className="auction-card">
                  <img src={auction.img} alt={auction.title} />
                  <h3>{auction.title}</h3>
                  <p>Starting Price: {auction.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Auction Categories (Tabs) with Slider */}
        <section className="auction-tabs">
          <nav className="tabs-nav">
            <button
              className={activeTab === "live" ? "active" : ""}
              onClick={() => setActiveTab("live")}
            >
              Live
            </button>
            <button
              className={activeTab === "upcoming" ? "active" : ""}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={activeTab === "ending" ? "active" : ""}
              onClick={() => setActiveTab("ending")}
            >
              Ending Soon
            </button>
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
              {tabAuctions[activeTab].map((auction, index) => (
                <div key={index} className="auction-card tab-card">
                  <img src={auction.img} alt={auction.title} />
                  <h3>{auction.title}</h3>
                  {activeTab === "live" && (
                    <>
                      <p>Highest Bid: {auction.bid}</p>
                      <p>Ends in: {auction.time}</p>
                    </>
                  )}
                  {activeTab === "upcoming" && (
                    <>
                      <p>Reserve Price: {auction.price}</p>
                      <p>Starts: {auction.start}</p>
                    </>
                  )}
                  {activeTab === "ending" && (
                    <>
                      <p>Highest Bid: {auction.bid}</p>
                      <p>{auction.status}</p>
                    </>
                  )}
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
