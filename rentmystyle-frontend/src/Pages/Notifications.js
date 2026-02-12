import React, { useEffect, useState } from "react";
import { getNotificationsByUser, markNotificationAsRead } from "../api";
import "../styles/Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (!loggedUser) {
      setLoading(false);
      return;
    }
    fetchNotifications();
  }, [loggedUser]); 

  const fetchNotifications = async () => {
    try {
      const res = await getNotificationsByUser(loggedUser.userId);
      setNotifications(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.notificationId === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  if (loading) return <div className="notifications-page"><h2>Loading notifications...</h2></div>;

  return (
    <div className="notifications-page">
      <h1>🔔 Notifications</h1>
      {notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        <div className="notifications-list">
          {notifications.map((n) => (
            <div key={n.notificationId} className={`notification-item ${n.read ? "read" : "unread"}`}>
              <p>{n.message}</p>
              <small>{new Date(n.createdAt).toLocaleString()}</small>
              {!n.read && (
                <button onClick={() => handleMarkAsRead(n.notificationId)}>
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;
