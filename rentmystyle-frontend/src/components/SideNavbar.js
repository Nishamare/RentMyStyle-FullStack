// src/components/SideNavbar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SideNavbar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <div
      className="side-navbar-container"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <button className="side-navbar-toggle">☰</button>
      <div className={`side-navbar ${show ? "show" : ""}`}>
        <button onClick={() => navigate("/wishlist")}>💖 Wishlist</button>
        <button onClick={() => navigate("/cart")}>🛒 Cart</button>
        <button onClick={() => navigate("/orders")}>📦 Orders</button>
      </div>
    </div>
  );
}

export default SideNavbar;
