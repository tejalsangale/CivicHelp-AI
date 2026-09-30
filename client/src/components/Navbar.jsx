import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div>
        <Link to="/">CivicHelp AI</Link>
      </div>

      <div>
        <Link to="/">Home</Link>
        <Link to="/create-complaint">Create Complaint</Link>
        <Link to="/my-complaints">My Complaints</Link>
        <Link to="/citizen-assistant">AI Assistant</Link>
        <Link to="/notifications">Notifications</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;