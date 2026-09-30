const Complaint = require("../models/Complaint");
const User = require("../models/User");

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("createdBy", "fullName email")
      .populate("assignedTo", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      complaints,
    });
  } catch (error) {
    console.error("GET ALL COMPLAINTS ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const assignComplaint = async (req, res) => {
  try {
    const { staffId } = req.body;

    if (!staffId) {
      return res.status(400).json({
        message: "Please select a staff member",
      });
    }

    const staff = await User.findOne({
      _id: staffId,
      role: "staff",
    });

    if (!staff) {
      return res.status(404).json({
        message: "Staff member not found",
      });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.assignedTo = staffId;
    complaint.status = "Assigned";

    await complaint.save();

    const updatedComplaint = await Complaint.findById(complaint._id)
      .populate("createdBy", "fullName email")
      .populate("assignedTo", "fullName email");

    res.status(200).json({
      message: "Complaint assigned successfully",
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error("ASSIGN COMPLAINT ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getComplaintStatistics = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();

    const submitted = await Complaint.countDocuments({
      status: "Submitted",
    });

    const assigned = await Complaint.countDocuments({
      status: "Assigned",
    });

    const inProgress = await Complaint.countDocuments({
      status: "In Progress",
    });

    const resolved = await Complaint.countDocuments({
      status: "Resolved",
    });

    res.status(200).json({
      total,
      submitted,
      assigned,
      inProgress,
      resolved,
    });
  } catch (error) {
    console.error("GET STATISTICS ERROR:", error);

    res.status(500).json({
      message: "Failed to load complaint statistics",
    });
  }
};

module.exports = {
  getAllComplaints,
  assignComplaint,
  getComplaintStatistics,
};