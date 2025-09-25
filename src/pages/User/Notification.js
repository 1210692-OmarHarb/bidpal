import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import "../../styles/pages.css";

function Notifications() {
  // Dummy notifications (later these come from DB/API)
  const notifications = [
    {
      id: 1,
      type: "bid",
      message: "Someone placed a higher bid on your Vintage Rolex auction.",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "win",
      message: "Congrats! You won the Nike Air Jordan Rare Edition auction.",
      time: "Yesterday",
    },
    {
      id: 3,
      type: "invite",
      message: "You’ve been invited to join Sneakerheads Auction Group.",
      time: "3 days ago",
    },
    {
      id: 4,
      type: "system",
      message: "Auction for MacBook Pro is ending in 1 hour.",
      time: "5 min ago",
    },
  ];

  return (
    <>
      <Navigation />
      <main className="notifications-page">
        <h2 className="page-title">Notifications</h2>

        {notifications.length === 0 ? (
          <p className="empty-msg">You have no notifications right now.</p>
        ) : (
          <ul className="notifications-list">
            {notifications.map((note) => (
              <li key={note.id} className={`notification-card ${note.type}`}>
                <div className="notification-text">{note.message}</div>
                <span className="notification-time">{note.time}</span>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Notifications;
