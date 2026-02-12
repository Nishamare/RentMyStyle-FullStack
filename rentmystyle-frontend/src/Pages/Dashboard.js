import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="overlay">
        <h1 className="title">RentMyStyle</h1>
        <p className="tagline">
          Rent Fashion. Wear Confidence. Return Happiness.
        </p>

        <div className="button-group">
          <button
            className="btn login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="btn register-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
