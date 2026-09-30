const askAssistant = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        message: "Please enter a question",
      });
    }

    const text = question.toLowerCase();

    let answer =
      "I can help you with complaints, complaint status, categories, priorities, and the complaint process.";

    if (
      text.includes("how") &&
      (text.includes("complaint") || text.includes("report"))
    ) {
      answer =
        "To report a complaint, go to Create Complaint, enter the complaint title, description, and location, then submit it.";
    } else if (
      text.includes("status") ||
      text.includes("track")
    ) {
      answer =
        "You can track your complaint from the My Complaints section. It shows the current complaint status and status history.";
    } else if (
      text.includes("category") ||
      text.includes("type")
    ) {
      answer =
        "Civic complaints can be categorized as Road, Water, Electricity, Garbage, Street Light, or Other.";
    } else if (
      text.includes("priority") ||
      text.includes("urgent")
    ) {
      answer =
        "Complaint priority can be Low, Medium, or High. Urgent, dangerous, emergency, or accident-related complaints can receive High priority.";
    } else if (
      text.includes("road") ||
      text.includes("pothole")
    ) {
      answer =
        "For road problems such as potholes or damaged roads, create a complaint under the Road category and provide the exact location.";
    } else if (
      text.includes("water") ||
      text.includes("leak")
    ) {
      answer =
        "For water-related problems such as leakage or pipeline issues, create a complaint under the Water category and mention the affected location.";
    } else if (
      text.includes("garbage") ||
      text.includes("waste")
    ) {
      answer =
        "For garbage or waste-related issues, create a complaint under the Garbage category and provide the location.";
    } else if (
      text.includes("electricity") ||
      text.includes("power")
    ) {
      answer =
        "For electricity or power-related problems, create a complaint under the Electricity category and provide the affected location.";
    }

    res.status(200).json({
      message: "Assistant response generated successfully",
      answer,
    });
  } catch (error) {
    console.error("ASSISTANT ERROR:", error);

    res.status(500).json({
      message: "Failed to generate assistant response",
    });
  }
};

module.exports = {
  askAssistant,
};