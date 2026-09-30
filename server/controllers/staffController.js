const User = require("../models/User");
const Complaint = require("../models/Complaint");
const ComplaintHistory = require("../models/ComplaintHistory");
const Notification = require("../models/Notification");
const getStaffUsers = async (req, res) => {
  try {
    const staffUsers = await User.find(
      { role: "staff" },
      "fullName email"
    ).sort({ fullName: 1 });

    res.status(200).json({
      staffUsers,
    });
  } catch (error) {
    console.error("GET STAFF USERS ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getAssignedComplaints = async (req, res) => {
  try {

    console.log("STAFF USER ID:", req.user.userId);
    const complaints = await Complaint.find({
      assignedTo: req.user.userId,
    })
      .populate("createdBy", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      complaints,
    });
  } catch (error) {
    console.error("GET ASSIGNED COMPLAINTS ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Assigned",
      "In Progress",
      "Resolved",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid complaint status",
      });
    }

    const complaint = await Complaint.findOne({
      _id: req.params.id,
      assignedTo: req.user.userId,
    });

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found or not assigned to you",
      });
    }
    if (complaint.status === status) {
      return res.status(400).json({
     message: "Complaint is already in this status",
    });
   }

    complaint.status = status;

    await complaint.save();

    await ComplaintHistory.create({
        complaint: complaint._id,
        status: status,
        updatedBy: req.user.userId,
});

    await Notification.create({
      user: complaint.createdBy,
      complaint: complaint._id,
      message: `Your complaint "${complaint.title}" status has been updated to ${status}.`,
});

    const updatedComplaint = await Complaint.findById(
      complaint._id
    )
      .populate("createdBy", "fullName email")
      .populate("assignedTo", "fullName email");

    res.status(200).json({
      message: "Complaint status updated successfully",
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error("UPDATE COMPLAINT STATUS ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getStaffUsers,
  getAssignedComplaints,
  updateComplaintStatus,
};