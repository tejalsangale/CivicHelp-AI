const express = require("express");

const {
  classifyComplaint,
  summarizeComplaint,
} = require("../controllers/aiController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/classify", protect, classifyComplaint);

router.post("/summarize", protect, summarizeComplaint);

module.exports = router;