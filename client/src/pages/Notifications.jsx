import { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(response.data.notifications);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to load notifications"
      );
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/notifications/${notificationId}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchNotifications();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to mark notification as read"
      );
    }
  };

  return (
    <div>
      <h1>Notifications</h1>

      {message && <p>{message}</p>}

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification._id}>
            <p>
              <strong>
                {notification.isRead ? "Read" : "New"}
              </strong>
            </p>

            <p>{notification.message}</p>

            {notification.complaint && (
              <p>
                <strong>Complaint:</strong>{" "}
                {notification.complaint.title}
              </p>
            )}

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                notification.createdAt
              ).toLocaleString()}
            </p>

            {!notification.isRead && (
              <button
                type="button"
                onClick={() =>
                  handleMarkAsRead(notification._id)
                }
              >
                Mark as Read
              </button>
            )}

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Notifications;