import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUserOrders } from "../api";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import "../styles/CustomerDashboard.css";

function CustomerDashboard() {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    if (!loggedUser || loggedUser.role?.toLowerCase() === "owner") {
      navigate("/");
      return;
    }

    // Fetch order history for count
    getUserOrders(loggedUser.userId)
      .then((res) => {
        setOrderCount(res.data.length);
      })
      .catch(console.error);
  }, []);

  const stats = [
    {
      title: "My Wishlist",
      count: wishlist.length,
      icon: "💖",
      path: "/wishlist",
      desc: "Items you're eyeing"
    },
    {
      title: "My Cart",
      count: cart.length,
      icon: "🛒",
      path: "/cart",
      desc: "Ready for checkout"
    },
    {
      title: "Rental History",
      count: orderCount,
      icon: "📦",
      path: "/my-orders",
      desc: "Track your fashion"
    }
  ];

  return (
    <div className="customer-dashboard">
      <div className="dashboard-overlay"></div>
      <div className="dashboard-container">
        <header className="dashboard-header-modern">
          <h1>Hello, {loggedUser?.name || "Fashionista"}! ✨</h1>
          <p>Your premium fashion portal is ready. Explore, rent, and slay.</p>
        </header>

        <div className="customer-stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="customer-stat-card" onClick={() => navigate(stat.path)}>
              <div className="stat-card-inner">
                <div className="stat-icon-wrap">{stat.icon}</div>
                <div className="stat-content">
                  <h3>{stat.count}</h3>
                  <p className="stat-label">{stat.title}</p>
                  <p className="stat-desc">{stat.desc}</p>
                </div>
              </div>
              <div className="stat-hover-arrow">→</div>
            </div>
          ))}
        </div>

        <div className="explore-section-modern">
          <div className="explore-content">
            <h2>Ready for a new look?</h2>
            <p>Browse through thousands of premium designer outfits.</p>
            <button className="primary-explore-btn" onClick={() => navigate("/products")}>
              Browse Collection 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
