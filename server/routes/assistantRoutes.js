const express = require("express");

const {
  askAssistant,
} = require("../controllers/assistantController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/ask", protect, askAssistant);

module.exports = router;