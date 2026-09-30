import { useState } from "react";
import axios from "axios";

function CreateComplaint() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Other",
    location: "",
    priority: "Medium",
  });

  const [message, setMessage] = useState("");
  const [aiMessage, setAiMessage] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClassifyComplaint = async () => {
    if (!formData.title || !formData.description) {
      setAiMessage("Please enter title and description first.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/ai/classify",
        {
          title: formData.title,
          description: formData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        ...formData,
        category: response.data.category,
        priority: response.data.priority,
      });

      setAiMessage(
        `AI classified this complaint as ${response.data.category} with ${response.data.priority} priority.`
      );
    } catch (error) {
      setAiMessage(
        error.response?.data?.message ||
          "Failed to classify complaint"
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/complaints",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);

      setFormData({
        title: "",
        description: "",
        category: "Other",
        location: "",
        priority: "Medium",
      });

      setAiMessage("");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to create complaint"
      );
    }
  };

  return (
    <div>
      <h1>Report a Complaint</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Complaint Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Example: Road damage near my area"
            required
          />
        </div>

        <div>
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the issue"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleClassifyComplaint}
        >
          Classify Complaint with AI
        </button>

        {aiMessage && <p>{aiMessage}</p>}

        <div>
          <label>Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Road">Road</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Garbage">Garbage</option>
            <option value="Street Light">Street Light</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Location</label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter complaint location"
            required
          />
        </div>

        <div>
          <label>Priority</label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button type="submit">
          Submit Complaint
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateComplaint;