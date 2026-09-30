const express = require("express");

const {
  getAllComplaints,
  assignComplaint,
  getComplaintStatistics,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
  "/complaints",
  protect,
  adminOnly,
  getAllComplaints
);

router.get(
  "/statistics",
  protect,
  adminOnly,
  getComplaintStatistics
);

router.put(
  "/complaints/:id/assign",
  protect,
  adminOnly,
  assignComplaint
);

module.exports = router;