import React, { createContext, useState, useEffect } from "react";
import { 
  addToCart as apiAddToCart, 
  removeFromCart as apiRemoveFromCart,
  getCartByUser
} from "../api";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    if (!user) return;
    try {
      const res = await getCartByUser(user.userId);
      setCart(res.data);
    } catch (err) {
      console.error("Failed to sync cart:", err);
    }
  };

  const addToCart = async (product) => {
    if (!user) {
      alert("Please login first! 🔒");
      return;
    }

    try {
      await apiAddToCart({
        user: { userId: user.userId },
        product: { productId: product.productId || product.id },
        quantity: 1
      });
      await fetchCart(); // Sync with backend
      alert("✅ Added to Cart!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add to Cart");
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await apiRemoveFromCart(cartId);
      setCart((prev) => prev.filter((item) => (item.cartId || item.id) !== cartId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
