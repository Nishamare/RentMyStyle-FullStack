import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order; 
  const [method, setMethod] = useState("Credit Card");

  if (!order) {
    return <div className="payment-page"><h2>No order data found.</h2></div>;
  }

  const handlePayment = async () => {
    try {
      // Standardize to use centralized API or direct axios if not in api.js
      await axios.post("http://localhost:8081/payments/pay", {
        order: { orderId: order.orderId },
        amount: order.totalAmount,
        paymentMethod: method,
        status: "COMPLETED"
      });
      alert("✅ Payment Successful! Order Confirmed.");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("❌ Payment Failed.");
    }
  };

  return (
    <div className="payment-page">
      <h1>💰 Complete Payment</h1>
      <div className="payment-card">
        <h3>Order ID: #{order.orderId}</h3>
        <p>Total Amount: ₹{order.totalAmount}</p>
        
        <div className="input-box">
          <label>Payment Method</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
          </select>
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Confirm Payment 🚀
        </button>
      </div>
    </div>
  );
}

export default Payment;
