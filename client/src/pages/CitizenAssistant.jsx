import { useState } from "react";
import axios from "axios";

function CitizenAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  const handleAskAssistant = async (event) => {
    event.preventDefault();

    if (!question.trim()) {
      setMessage("Please enter a question.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/assistant/ask",
        {
          question: question,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnswer(response.data.answer);
      setMessage("");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to get assistant response"
      );
    }
  };

  return (
    <div>
      <h1>CivicHelp AI Assistant</h1>

      <p>
        Ask questions about reporting and tracking civic complaints.
      </p>

      <form onSubmit={handleAskAssistant}>
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Example: How can I report a road complaint?"
        />

        <button type="submit">
          Ask Assistant
        </button>
      </form>

      {message && <p>{message}</p>}

      {answer && (
        <div>
          <h2>Assistant Response</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default CitizenAssistant;