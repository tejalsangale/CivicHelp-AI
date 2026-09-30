import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateComplaint from "./pages/CreateComplaint";
import MyComplaints from "./pages/MyComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import CitizenAssistant from "./pages/CitizenAssistant";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/create-complaint"
          element={<CreateComplaint />}
        />
        <Route
          path="/my-complaints"
          element={<MyComplaints />}
        />
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/staff-dashboard"
          element={<StaffDashboard />}
        />
        <Route
           path="/citizen-assistant"
           element={<CitizenAssistant />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />


      </Routes>
    </>
  );
}

export default App;