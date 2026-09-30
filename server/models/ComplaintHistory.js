const mongoose = require("mongoose");

const complaintHistorySchema = new mongoose.Schema(
  {
    complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Submitted",
        "Assigned",
        "In Progress",
        "Resolved",
      ],
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ComplaintHistory = mongoose.model(
  "ComplaintHistory",
  complaintHistorySchema
);

module.exports = ComplaintHistory;