const Complaint = require("../models/Complaint");
const ComplaintHistory = require("../models/ComplaintHistory");
const createComplaint = async (req, res) => {
  try {
    const { title, description, category, location, priority } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const complaint = await Complaint.create({
      title,
      description,
      category,
      location,
      priority,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      message: "Complaint created successfully",
      complaint,
    });
  } catch (error) {
    console.error("CREATE COMPLAINT ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      createdBy: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      complaints,
    });
  } catch (error) {
    console.error("GET COMPLAINTS ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getComplaintHistory = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    const history = await ComplaintHistory.find({
      complaint: req.params.id,
    })
      .populate("updatedBy", "fullName email")
      .sort({ createdAt: 1 });

    res.status(200).json({
      history,
    });
  } catch (error) {
    console.error("GET COMPLAINT HISTORY ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getComplaintHistory,
};