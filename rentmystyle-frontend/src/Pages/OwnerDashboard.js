import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, getOwnerOrders, getNotificationsByUser } from "../api";
import "../styles/OwnerDashboard.css";

function OwnerDashboard() {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeOrders: 0,
    pendingNotifications: 0,
    totalEarnings: 0,
    inventoryValue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    if (!loggedUser || loggedUser.role?.toLowerCase() !== "owner") {
      navigate("/");
      return;
    }

    // Fetch products
    getProducts().then(res => {
      const myProducts = res.data.filter(p => p.owner?.userId === loggedUser.userId);
      const invValue = myProducts.reduce((sum, p) => sum + (p.pricePerDay || 0), 0);
      setStats(prev => ({ 
        ...prev, 
        totalProducts: myProducts.length,
        inventoryValue: invValue 
      }));
    }).catch(console.error);
    
    // Fetch owner-specific orders
    getOwnerOrders(loggedUser.userId).then(res => {
      const earnings = res.data.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setStats(prev => ({ 
        ...prev, 
        activeOrders: res.data.length,
        totalEarnings: earnings
      }));
      setRecentOrders(res.data.slice(0, 5)); // Show last 5
    }).catch(console.error);

    // Fetch notifications
    getNotificationsByUser(loggedUser.userId).then(res => {
      const unreadCount = res.data.filter(n => !n.read).length;
      setStats(prev => ({ ...prev, pendingNotifications: unreadCount }));
    }).catch(console.error);
  }, []);

  return (
    <div className="owner-dashboard">
      <div className="dashboard-header">
        <h1>Owner Executive Dashboard 🎩</h1>
        <p>Welcome back, {loggedUser?.name || "Owner"}. Oversee your fashion empire.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>₹{stats.totalEarnings}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👗</div>
          <div className="stat-info">
            <h3>{stats.totalProducts}</h3>
            <p>Items Listed</p>
          </div>
        </div>
        <div className="stat-card" onClick={() => navigate("/my-orders")} style={{cursor: 'pointer'}}>
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{stats.activeOrders}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div className="stat-card" onClick={() => navigate("/notifications")} style={{cursor: 'pointer'}}>
          <div className="stat-icon">🔔</div>
          <div className="stat-info">
            <h3>{stats.pendingNotifications}</h3>
            <p>New Alerts</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content-grid">
        <div className="recent-requests-section">
          <h2>Recent Booking Activity</h2>
          {recentOrders.length === 0 ? (
            <p className="no-data">No bookings recorded yet.</p>
          ) : (
            <div className="requests-table-wrapper">
              <table className="requests-table">
                <thead>
                  <tr>
                    <th>Collection Item</th>
                    <th>Client</th>
                    <th>Booking Date</th>
                    <th>Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((item) => (
                    <tr key={item.orderItemId || item.id}>
                      <td>{item.product?.title}</td>
                      <td>{item.order?.user?.name || "Client"}</td>
                      <td>{item.order?.orderDate ? new Date(item.order.orderDate).toLocaleDateString() : "N/A"}</td>
                      <td>₹{item.price * item.quantity}</td>
                      <td>
                        <span className={`status-pill ${(item.order?.status || 'PENDING').toLowerCase()}`}>
                          {item.order?.status || 'PENDING'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="view-all-link" onClick={() => navigate("/my-orders")}>
                View Full Transaction History →
              </button>
            </div>
          )}
        </div>

        <div className="quick-actions-section">
          <h2>Management Console</h2>
          <div className="action-grid">
            <div className="action-card" onClick={() => navigate("/add-product")}>
              <div className="action-icon">✨</div>
              <h3>List New Apparel</h3>
              <p>Expand your rental collection</p>
            </div>
            <div className="action-card" onClick={() => navigate("/notifications")}>
              <div className="action-icon">📩</div>
              <h3>Communication</h3>
              <p>Review customer inquiries</p>
            </div>
            <div className="action-card" onClick={() => navigate("/products")}>
              <div className="action-icon">📂</div>
              <h3>Inventory</h3>
              <p>Manage existing listings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;
