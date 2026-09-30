const classifyComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    let category = "Other";
    let priority = "Medium";

    const complaintText =
      `${title} ${description}`.toLowerCase();

    // Category detection
    if (
      complaintText.includes("road") ||
      complaintText.includes("pothole") ||
      complaintText.includes("traffic")
    ) {
      category = "Road";
    } else if (
      complaintText.includes("water") ||
      complaintText.includes("leak") ||
      complaintText.includes("pipeline")
    ) {
      category = "Water";
    } else if (
      complaintText.includes("electricity") ||
      complaintText.includes("power") ||
      complaintText.includes("electric")
    ) {
      category = "Electricity";
    } else if (
      complaintText.includes("garbage") ||
      complaintText.includes("waste") ||
      complaintText.includes("trash")
    ) {
      category = "Garbage";
    } else if (
      complaintText.includes("street light") ||
      complaintText.includes("streetlight") ||
      complaintText.includes("lamp")
    ) {
      category = "Street Light";
    }

    // Priority detection
    if (
      complaintText.includes("danger") ||
      complaintText.includes("accident") ||
      complaintText.includes("urgent") ||
      complaintText.includes("emergency")
    ) {
      priority = "High";
    } else if (
      complaintText.includes("minor") ||
      complaintText.includes("small")
    ) {
      priority = "Low";
    }

    res.status(200).json({
      message: "Complaint classified successfully",
      category,
      priority,
    });
  } catch (error) {
    console.error("AI CLASSIFICATION ERROR:", error);

    res.status(500).json({
      message: "Failed to classify complaint",
    });
  }
};


// Complaint Summary
const summarizeComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const summary = `${title}. ${description}`;

    res.status(200).json({
      message: "Complaint summarized successfully",
      summary,
    });
  } catch (error) {
    console.error("SUMMARY ERROR:", error);

    res.status(500).json({
      message: "Failed to summarize complaint",
    });
  }
};


module.exports = {
  classifyComplaint,
  summarizeComplaint,
};