import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to CivicHelp AI</h1>

      <p>
        Report civic issues, track complaints, and stay updated
        with your community services.
      </p>

      <Link to="/create-complaint">
        <button>Report a Complaint</button>
      </Link>
    </div>
  );
}

export default Home;