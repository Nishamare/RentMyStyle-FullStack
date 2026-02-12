// import React, { useContext } from "react";
// import { CartContext } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import "../styles/Cart.css";

// function Cart() {
//   const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   const totalPrice = cartItems.reduce((total, item) => {
//     const priceNum = parseInt(item.price.replace("₹", "").replace("/day", ""));
//     return total + priceNum;
//   }, 0);

//   return (
//     <div className="cart-page">
//       <h1>🛒 My Cart</h1>

//       {cartItems.length === 0 ? (
//         <p className="empty-cart">Your cart is empty</p>
//       ) : (
//         <div className="cart-grid">
//           {cartItems.map((item) => (
//             <div key={item.id} className="cart-card">
//               <img src={item.img} alt={item.name} />
//               <div className="cart-info">
//                 <h3>{item.name}</h3>
//                 <p>{item.price}</p>
//                 <button onClick={() => removeFromCart(item.id)}>Remove</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {cartItems.length > 0 && (
//         <div className="cart-footer">
//           <p>Total: ₹{totalPrice}/day</p>
//           <button className="checkout-btn" onClick={() => alert("Checkout not implemented")}>
//             Checkout
//           </button>
//           <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
//         </div>
//       )}

//       <button className="back-btn" onClick={() => navigate("/products")}>
//         ← Back to Products
//       </button>
//     </div>
//   );
// }

// export default Cart;



import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => {
    const price = item.product ? (item.product.pricePerDay || item.product.price) : 0;
    return total + (price * (item.quantity || 1));
  }, 0);

  return (
    <div className="cart-page">
      <h1>🛒 My Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty 😢</p>
      ) : (
        <div className="cart-grid">
          {cart.map((item) => {
            const product = item.product || {};
            const productTitle = product.title || product.name;
            const productImg = product.img || "https://images.unsplash.com/photo-1593032465170-2d5d16ff9e7e?auto=format&fit=crop&w=800&q=80";
            const productPrice = product.pricePerDay || product.price;

            return (
              <div key={item.cartId || item.id} className="cart-card">
                <img src={productImg} alt={productTitle} />
                <div className="cart-info">
                  <h3>{productTitle}</h3>
                  <p>₹{productPrice}/day x {item.quantity || 1}</p>
                  <button onClick={() => removeFromCart(item.cartId || item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-footer">
          <p>Total: ₹{totalPrice}/day</p>
          <button
            className="checkout-btn"
            onClick={() => navigate("/orders", { state: { items: cart, totalPrice } })}
          >
            Checkout 🚀
          </button>
        </div>
      )}

      <button className="back-btn" onClick={() => navigate("/products")}>
        ← Back to Products
      </button>
    </div>
  );
}

export default Cart;


