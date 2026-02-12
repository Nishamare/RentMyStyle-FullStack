import React, { useEffect, useState } from "react";
import { getUserOrders, getOwnerOrders } from "../api";
import "../styles/MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const isOwner = loggedUser?.role?.toLowerCase() === "owner";

  useEffect(() => {
    if (!loggedUser) {
      setLoading(false);
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let res;
      if (isOwner) {
        res = await getOwnerOrders(loggedUser.userId);
      } else {
        res = await getUserOrders(loggedUser.userId);
      }
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setLoading(false);
    }
  };

  if (loading) return <div className="orders-page"><h2>Loading...</h2></div>;

  return (
    <div className="orders-page">
      <h1>{isOwner ? "📝 Rental Requests Received" : "📦 My Rental History"}</h1>
      {orders.length === 0 ? (
        <p>{isOwner ? "No one has rented your items yet." : "You haven't placed any orders yet."}</p>
      ) : (
        <div className="orders-list">
          {orders.map((item) => {
            // If owner, the item is an OrderItem. If customer, it's an Order.
            const uniqueId = isOwner ? item.orderItemId : item.orderId;
            const orderDate = isOwner ? (item.order?.orderDate) : item.orderDate;
            const status = isOwner ? (item.order?.status || "PENDING") : item.status;
            
            return (
              <div key={uniqueId} className="order-item-card">
                <div className="order-header">
                  <h3>{isOwner ? `Request #${uniqueId}` : `Order #${uniqueId}`}</h3>
                  <span className={`status-badge ${status.toLowerCase()}`}>
                    {status}
                  </span>
                </div>
                <div className="order-details">
                  <p><strong>Date:</strong> {new Date(orderDate).toLocaleDateString()}</p>
                  
                  {isOwner ? (
                    <div className="owner-order-info">
                      <p><strong>Product:</strong> {item.product?.title}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Customer:</strong> {item.order?.user?.name || "Anonymous"}</p>
                      <p><strong>Earnings:</strong> ₹{item.price * item.quantity}</p>
                    </div>
                  ) : (
                    <>
                      <p><strong>Total Amount:</strong> ₹{item.totalAmount}</p>
                      <div className="order-products">
                        <h4>Items:</h4>
                        <ul>
                          {item.orderItems && item.orderItems.map((oi, idx) => (
                            <li key={idx}>
                              {oi.product?.title || "Product"} (x{oi.quantity})
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
