import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const { user } = useAuth();
  const userId = user?.userID;

  // Fetch notifications
  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/notifications/list/${userId}`
        );
        const data = await res.json();
        setNotifications(data.notifications || []);
        // Count unread
        setUnreadCount(
          (data.notifications || []).filter((n) => n.isRead === 0).length
        );
      } catch (err) {
        console.error(err);
        setError("Failed to fetch notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  // Mark notification as read
  const markAsRead = async (notificationID) => {
    try {
      await fetch(
        `http://localhost:5000/api/notifications/mark-read/${notificationID}`,
        { method: "POST" }
      );
      setNotifications((prev) =>
        prev.map((n) =>
          n.notificationID === notificationID ? { ...n, isRead: 1 } : n
        )
      );
      setUnreadCount((prev) => prev - 1);
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  return (
    <>
      {/* Navigation with bell */}
      <Navigation
        showNotifications={showSidebar}
        setShowNotifications={setShowSidebar}
        unreadCount={unreadCount}
      />
      <main className="notifications-page">
        <h2 className="page-title">Notifications</h2>

        {loading ? (
          <p>Loading notifications...</p>
        ) : error ? (
          <p>{error}</p>
        ) : notifications.length === 0 ? (
          <p className="empty-msg">You have no notifications right now.</p>
        ) : (
          <ul className="notifications-list">
            {notifications.map((note) => (
              <li
                key={note.notificationID}
                className={`notification-card ${
                  note.isRead
                    ? "read"
                    : note.relatedAuctionID
                    ? "unread-auction"
                    : "unread-other"
                }`}
              >
                {note.actionURL ? (
                  <Link
                    to={note.actionURL}
                    className="notification-link"
                    onClick={() => markAsRead(note.notificationID)}
                  >
                    <div className="notification-content">
                      <strong>{note.title}</strong>: {note.message}
                    </div>
                    <span className="notification-time">
                      {new Date(note.createdAt).toLocaleString()}
                    </span>
                  </Link>
                ) : (
                  <div
                    onClick={() => markAsRead(note.notificationID)}
                    className="notification-content-wrapper"
                  >
                    <div className="notification-content">
                      <strong>{note.title}</strong>: {note.message}
                    </div>
                    <span className="notification-time">
                      {new Date(note.createdAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Notification;
