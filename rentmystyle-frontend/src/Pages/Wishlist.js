// import React, { useContext } from "react";
// import "../styles/Wishlist.css";
// import { WishlistContext } from "../context/WishlistContext";
// import { CartContext } from "../context/CartContext";

// function Wishlist() {
//   const { wishlist, removeFromWishlist } = useContext(WishlistContext);
//   const { addToCart } = useContext(CartContext);

//   return (
//     <div className="wishlist-page">
//       <div className="wishlist-hero">
//         <h1>My Wishlist ❤️</h1>
//         <p>All your favorite items in one place</p>
//       </div>

//       {wishlist.length === 0 ? (
//         <p className="empty-msg">Your wishlist is empty 😢</p>
//       ) : (
//         <div className="wishlist-grid">
//           {wishlist.map((item) => (
//             <div key={item.id} className="wishlist-card">
//               <img src={item.img} alt={item.name} />
//               <h3>{item.name}</h3>
//               <p>{item.price}</p>

//               <div className="wishlist-buttons">
//                 <button
//                   className="cart-btn"
//                   onClick={() => addToCart(item)}
//                 >
//                   Add to Cart
//                 </button>

//                 <button
//                   className="remove-btn"
//                   onClick={() => removeFromWishlist(item.id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Wishlist;



import React, { useContext } from "react";
import "../styles/Wishlist.css";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart, cart } = useContext(CartContext);

  // Enhanced remove with animation
  const handleRemove = (wishlistId) => {
    const element = document.getElementById(`wish-${wishlistId}`);
    if (element) {
      element.classList.add("fade-out");
      setTimeout(() => removeFromWishlist(wishlistId), 300); 
    } else {
      removeFromWishlist(wishlistId);
    }
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-hero">
        <h1>My Wishlist ❤️</h1>
        <p>All your favorite items in one place</p>
      </div>

      {wishlist.length === 0 ? (
        <p className="empty-msg">Your wishlist is empty 😢</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => {
            const product = item.product || {};
            const productId = product.productId || product.id;
            const inCart = cart.some(c => (c.product?.productId || c.product?.id) === productId);

            return (
              <div key={item.wishlistId || item.id} id={`wish-${item.wishlistId || item.id}`} className="wishlist-card">
                <img src={product.img || "https://images.unsplash.com/photo-1593032465170-2d5d16ff9e7e?auto=format&fit=crop&w=800&q=80"} alt={product.title} className="wishlist-img" />
                <h3>{product.title || product.name}</h3>
                <p className="price">₹{product.pricePerDay || product.price}</p>

                <div className="wishlist-buttons">
                  <button
                    className={`cart-btn ${inCart ? "disabled" : ""}`}
                    onClick={() => addToCart(product)}
                    disabled={inCart}
                  >
                    {inCart ? "Added" : "Add to Cart"}
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.wishlistId || item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
