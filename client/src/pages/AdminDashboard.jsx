import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [staffUsers, setStaffUsers] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState({});
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [summaries, setSummaries] = useState({});
  const [statistics, setStatistics] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 5;

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const complaintResponse = await axios.get(
        "https://civichelp-ai-backend.onrender.com/api/admin/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const staffResponse = await axios.get(
        "https://civichelp-ai-backend.onrender.com/api/staff",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const statisticsResponse = await axios.get(
        "https://civichelp-ai-backend.onrender.com/api/admin/statistics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(complaintResponse.data.complaints);
      setStaffUsers(staffResponse.data.staffUsers);
      setStatistics(statisticsResponse.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to load dashboard data"
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStaffChange = (complaintId, staffId) => {
    setSelectedStaff({
      ...selectedStaff,
      [complaintId]: staffId,
    });
  };

  const handleAssignComplaint = async (complaintId) => {
    const staffId = selectedStaff[complaintId];

    if (!staffId) {
      setMessage("Please select a staff member first");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `https://civichelp-ai-backend.onrender.com/api/admin/complaints/${complaintId}/assign`,
        {
          staffId: staffId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);

      await fetchData();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to assign complaint"
      );
    }
  };

  const handleGenerateSummary = async (complaint) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://civichelp-ai-backend.onrender.com/api/ai/summarize",
        {
          title: complaint.title,
          description: complaint.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSummaries({
        ...summaries,
        [complaint._id]: response.data.summary,
      });

      setMessage("Complaint summary generated successfully");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to generate complaint summary"
      );
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch = complaint.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" ||
      complaint.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(
    filteredComplaints.length / complaintsPerPage
  );

  const startIndex = (currentPage - 1) * complaintsPerPage;

  const paginatedComplaints = filteredComplaints.slice(
    startIndex,
    startIndex + complaintsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const chartData = statistics
    ? [
        {
          status: "Submitted",
          count: statistics.submitted,
        },
        {
          status: "Assigned",
          count: statistics.assigned,
        },
        {
          status: "In Progress",
          count: statistics.inProgress,
        },
        {
          status: "Resolved",
          count: statistics.resolved,
        },
      ]
    : [];

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {statistics && (
        <div>
          <h2>Complaint Statistics</h2>

          <p>
            <strong>Total Complaints:</strong>{" "}
            {statistics.total}
          </p>

          <p>
            <strong>Submitted:</strong>{" "}
            {statistics.submitted}
          </p>

          <p>
            <strong>Assigned:</strong>{" "}
            {statistics.assigned}
          </p>

          <p>
            <strong>In Progress:</strong>{" "}
            {statistics.inProgress}
          </p>

          <p>
            <strong>Resolved:</strong>{" "}
            {statistics.resolved}
          </p>

          <h2>Complaint Status Chart</h2>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <hr />

      <p>Search Complaints:</p>

      <input
        type="text"
        placeholder="Search complaints..."
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          setCurrentPage(1);
        }}
      />

      <br />
      <br />

      <select
        value={selectedStatus}
        onChange={(event) => {
          setSelectedStatus(event.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="All">All Status</option>
        <option value="Submitted">Submitted</option>
        <option value="Assigned">Assigned</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>

      {message && <p>{message}</p>}

      {filteredComplaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <>
          {paginatedComplaints.map((complaint) => (
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
                <strong>Status:</strong>{" "}
                {complaint.status}
              </p>

              <p>
                <strong>Assigned Staff:</strong>{" "}
                {complaint.assignedTo
                  ? `${complaint.assignedTo.fullName} - ${complaint.assignedTo.email}`
                  : "Not assigned"}
              </p>

              <label>
                <strong>Assign to Staff:</strong>{" "}
              </label>

              <select
                value={selectedStaff[complaint._id] || ""}
                onChange={(event) =>
                  handleStaffChange(
                    complaint._id,
                    event.target.value
                  )
                }
              >
                <option value="">Select Staff</option>

                {staffUsers.map((staff) => (
                  <option key={staff._id} value={staff._id}>
                    {staff.fullName} - {staff.email}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() =>
                  handleAssignComplaint(complaint._id)
                }
              >
                Assign Complaint
              </button>

              <br />
              <br />

              <button
                type="button"
                onClick={() =>
                  handleGenerateSummary(complaint)
                }
              >
                Generate Summary
              </button>

              {summaries[complaint._id] && (
                <div>
                  <h3>Complaint Summary</h3>
                  <p>{summaries[complaint._id]}</p>
                </div>
              )}

              <hr />
            </div>
          ))}

          <div>
            <button
              type="button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span>
              {" "}
              Page {currentPage} of {totalPages}{" "}
            </span>

            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;