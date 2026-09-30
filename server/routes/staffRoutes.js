const express = require("express");

const {
  getStaffUsers,
  getAssignedComplaints,
  updateComplaintStatus,
} = require("../controllers/staffController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", protect, adminOnly, getStaffUsers);

router.get(
  "/complaints",
  protect,
  getAssignedComplaints
);

router.put(
  "/complaints/:id/status",
  protect,
  updateComplaintStatus
);

module.exports = router;