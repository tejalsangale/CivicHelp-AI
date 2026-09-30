const express = require("express");

const {
  createComplaint,
  getMyComplaints,
  getComplaintHistory,
} = require("../controllers/complaintController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createComplaint);

router.get("/my", protect, getMyComplaints);
router.get("/:id/history", protect, getComplaintHistory);

module.exports = router;