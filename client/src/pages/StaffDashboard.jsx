import { useEffect, useState } from "react";
import axios from "axios";

function StaffDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState({});
  const [history, setHistory] = useState({});
  const fetchAssignedComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/staff/complaints",
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
          "Failed to load assigned complaints"
      );
    }
  };

  useEffect(() => {
    fetchAssignedComplaints();
  }, []);

  const handleViewHistory = async (complaintId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:5000/api/complaints/${complaintId}/history`,
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
  
  
  
  const handleStatusChange = (complaintId, status) => {
    setSelectedStatus({
      ...selectedStatus,
      [complaintId]: status,
    });
  };

  const handleUpdateStatus = async (complaintId) => {
    const status = selectedStatus[complaintId];

    if (!status) {
      setMessage("Please select a status");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/staff/complaints/${complaintId}/status`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);

      await fetchAssignedComplaints();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to update complaint status"
      );
    }
  };

  return (
    <div>
      <h1>Staff Dashboard</h1>

      {message && <p>{message}</p>}

      {complaints.length === 0 ? (
        <p>No complaints assigned to you.</p>
      ) : (
        complaints.map((complaint) => (
          <div key={complaint._id}>
            <h2>{complaint.title}</h2>

            <p>
              <strong>Citizen:</strong>{" "}
              {complaint.createdBy?.fullName}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {complaint.createdBy?.email}
            </p>

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
              <strong>Current Status:</strong>{" "}
              {complaint.status}
            </p>

            <label>
              <strong>Update Status:</strong>{" "}
            </label>

            <select
              value={selectedStatus[complaint._id] || ""}
              onChange={(event) =>
                handleStatusChange(
                  complaint._id,
                  event.target.value
                )
              }
            >
              <option value="">Select Status</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <button
              type="button"
              onClick={() =>
                handleUpdateStatus(complaint._id)
              }
            >
              Update Status
            </button>

            <button
              type="button"
              onClick={() =>
              handleViewHistory(complaint._id)
  }
>
  View Status History

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
            {new Date(item.createdAt).toLocaleString()}
          </p>

          <hr />
        </div>
      ))
    )}
  </div>
)}

</button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default StaffDashboard;