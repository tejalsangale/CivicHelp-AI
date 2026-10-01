import { useEffect, useState } from "react";
import axios from "axios";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [history, setHistory] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://civichelp-ai-backend.onrender.com/api/complaints/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setComplaints(response.data.complaints);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Failed to load complaints"
        );
      }
    };

    fetchComplaints();
  }, []);

  const handleViewHistory = async (complaintId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `https://civichelp-ai-backend.onrender.com/api/complaints/${complaintId}/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory({
        ...history,
        [complaintId]: response.data.history,
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to load complaint history"
      );
    }
  };

  return (
    <div>
      <h1>My Complaints</h1>

      {message && <p>{message}</p>}

      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        complaints.map((complaint) => (
          <div key={complaint._id}>
            <h2>{complaint.title}</h2>

            <p>
              <strong>Description:</strong>{" "}
              {complaint.description}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {complaint.category}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {complaint.location}
            </p>

            <p>
              <strong>Priority:</strong>{" "}
              {complaint.priority}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {complaint.status}
            </p>

            <button
              type="button"
              onClick={() =>
                handleViewHistory(complaint._id)
              }
            >
              View Status History
            </button>

            {history[complaint._id] && (
              <div>
                <h3>Status History</h3>

                {history[complaint._id].length === 0 ? (
                  <p>No history available.</p>
                ) : (
                  history[complaint._id].map((item) => (
                    <div key={item._id}>
                      <p>
                        <strong>Status:</strong>{" "}
                        {item.status}
                      </p>

                      <p>
                        <strong>Updated By:</strong>{" "}
                        {item.updatedBy?.fullName}
                      </p>

                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(
                          item.createdAt
                        ).toLocaleString()}
                      </p>

                      <hr />
                    </div>
                  ))
                )}
              </div>
            )}

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default MyComplaints;