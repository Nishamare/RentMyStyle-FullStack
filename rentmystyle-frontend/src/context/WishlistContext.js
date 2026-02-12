import React, { createContext, useState, useEffect } from "react";
import { 
  addToWishlist as apiAddToWishlist, 
  removeFromWishlist as apiRemoveFromWishlist,
  getWishlistByUser
} from "../api";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, []);

  const fetchWishlist = async () => {
    if (!user) return;
    try {
      const res = await getWishlistByUser(user.userId);
      setWishlist(res.data);
    } catch (err) {
      console.error("Failed to sync wishlist:", err);
    }
  };

  const addToWishlist = async (product) => {
    if (!user) {
      alert("Please login first! 🔒");
      return;
    }

    try {
      await apiAddToWishlist({
        user: { userId: user.userId },
        product: { productId: product.productId || product.id }
      });
      await fetchWishlist(); // Sync with backend to get correct ID and structure
      alert("✅ Added to Wishlist!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add to Wishlist");
    }
  };

  const removeFromWishlist = async (wishlistId) => {
    try {
      await apiRemoveFromWishlist(wishlistId);
      setWishlist((prev) => prev.filter((item) => (item.wishlistId || item.id) !== wishlistId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
