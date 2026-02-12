
//           totalAmount: days * product.pricePerDay,
//         }));
//       }
//     }
//   }, [order.startDate, order.endDate, product, order.userId]); // userId added to avoid warning if it changes

//   // Handle Input Change
//   const handleChange = (e) => {
//     setOrder({
//       ...order,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Submit Order
//   const placeOrder = async (e) => {
//     e.preventDefault();

//     const payload = {
//       userId: order.userId,
//       startDate: order.startDate,
//       endDate: order.endDate,
//       totalAmount: order.totalAmount,
//       status: order.status,
//       orderDate: new Date().toISOString(),
//     };

//     try {
//       await axios.post("http://localhost:8080/api/orders", payload);

//       alert("✅ Order Placed Successfully!");
//     } catch (error) {
//       alert("❌ Order Failed!");
//       console.log(error);
//     }
//   };






import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { placeOrder, getWishlistByUser, getCartByUser } from "../api";
import "../styles/Orders.css";

function SideNavbar({ navigate, wishlist, cart }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`side-navbar-wrapper ${isOpen ? "is-open" : ""}`}>
      <div className="side-navbar-box">
        <button className="side-navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "Quick Access 💖"}
        </button>
        
        <div className="side-navbar-content">
          <h2>Your Collection</h2>
          <button className="side-nav-btn" onClick={() => navigate("/products")}>
            <span>🛍️</span> Shop
          </button>
          <button className="side-nav-btn" onClick={() => navigate("/wishlist")}>
            <span>💖</span> Wishlist ({wishlist.length})
          </button>
          <button className="side-nav-btn" onClick={() => navigate("/cart")}>
            <span>🛒</span> Cart ({cart.length})
          </button>
          <button className="side-nav-btn" onClick={() => navigate("/my-orders")}>
            <span>📦</span> My Orders
          </button>

          {wishlist.length > 0 && (
            <div className="side-preview-section">
              <h4>Pinned Items</h4>
              <ul>
                {wishlist.slice(0, 5).map((item, idx) => (
                  <li key={idx} onClick={() => navigate(`/product/${item.product?.productId}`)}>
                    {item.product?.title || "Product"}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Orders() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product; // single product checkout
  const cartItems = location.state?.items; // cart checkout
  const initialTotal = location.state?.totalPrice || product?.price || 0;

  // Get current user
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (loggedUser) {
      getWishlistByUser(loggedUser.userId).then(res => setWishlist(res.data)).catch(console.error);
      getCartByUser(loggedUser.userId).then(res => setCart(res.data)).catch(console.error);
    }
  }, []);

  const [order, setOrder] = useState({
    userId: loggedUser ? loggedUser.userId : "",
    startDate: "",
    endDate: "",
    totalAmount: initialTotal,
    status: "PLACED",
  });

  // Calculate Total Amount Automatically based on days
  useEffect(() => {
    if (order.startDate && order.endDate) {
      const start = new Date(order.startDate);
      const end = new Date(order.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

      let basePrice = 0;
      if (cartItems) {
        basePrice = cartItems.reduce((sum, item) => sum + (item.product?.pricePerDay || item.product?.price || 0), 0);
      } else if (product) {
        basePrice = product.pricePerDay || product.price || 0;
      }

      setOrder((prev) => ({
        ...prev,
        totalAmount: basePrice * diffDays,
      }));
    }
  }, [order.startDate, order.endDate, product, cartItems]);

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let itemsPayload = [];
    if (cartItems) {
      itemsPayload = cartItems.map(item => ({
        product: { productId: item.product?.productId || item.productId },
        quantity: item.quantity || 1,
        price: item.product?.pricePerDay || item.product?.price || 0
      }));
    } else if (product) {
      itemsPayload = [
        {
          product: { productId: product.productId || product.id },
          quantity: 1,
          price: product.pricePerDay || product.price || 0
        },
      ];
    }

    const payload = {
      user: { userId: order.userId },
      startDate: order.startDate,
      endDate: order.endDate,
      totalAmount: order.totalAmount,
      status: order.status,
      orderItems: itemsPayload,
    };

    try {
      const response = await placeOrder(payload);
      alert("✅ Order Placed Successfully! Proceeding to Payment...");
      navigate("/payment", { state: { order: response.data } });
    } catch (error) {
      alert("❌ Order Failed!");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="order-page">
      <SideNavbar navigate={navigate} wishlist={wishlist} cart={cart} />
      <div className="order-card">
        <h2>✨ Place Your Rental Order ✨</h2>

        <div className="order-summary-box">
          <h3>Order Summary</h3>
          {cartItems ? (
            <ul>
              {cartItems.map((item, idx) => (
                <li key={idx}>
                  {item.product?.title || item.product?.name} (₹{item.product?.pricePerDay || item.product?.price}/day)
                </li>
              ))}
            </ul>
          ) : product ? (
            <p>Product: {product.title || product.name} (₹{product.pricePerDay || product.price}/day)</p>
          ) : (
            <p>No items selected.</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>User ID</label>
            <input
              type="number"
              name="userId"
              value={order.userId}
              onChange={handleChange}
              readOnly={!!loggedUser}
              required
            />
          </div>

          <div className="input-group">
            <div className="input-box">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={order.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={order.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="total-display">
            <h3>Estimated Total: ₹{order.totalAmount}</h3>
          </div>

          <button type="submit" className="order-btn">
            Confirm & Pay 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default Orders;
