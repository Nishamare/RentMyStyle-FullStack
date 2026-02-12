



import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Products.css";
import { getProducts, getCategories } from "../api";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

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
          <button className="side-nav-btn" onClick={() => navigate("/wishlist")}>
            <span>💖</span> Wishlist ({wishlist.length})
          </button>
          <button className="side-nav-btn" onClick={() => navigate("/cart")}>
            <span>🛒</span> Cart ({cart.length})
          </button>
          <button className="side-nav-btn" onClick={() => navigate("/my-orders")}>
            <span>📦</span> My Orders
          </button>
          <button className="side-nav-btn" onClick={() => navigate("/notifications")}>
            <span>🔔</span> Alerts
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

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const { addToWishlist, wishlist } = useContext(WishlistContext);
  const { addToCart, cart } = useContext(CartContext);

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err));

    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || 
      (p.category && (p.category.categoryName === selectedCategory || p.category.name === selectedCategory));
    const matchesSearch = p.title && p.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="products-page">
      {loggedUser && loggedUser.role?.toLowerCase() === "customer" && (
        <SideNavbar navigate={navigate} wishlist={wishlist} cart={cart} />
      )}

      <div className="hero-section">
        <h1>Rent Premium Fashion at Your Fingertips</h1>
        <p>Choose from a wide range of designer outfits and accessories</p>
      </div>

      <div className="product-search-category">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {categories.map(cat => (
            <option key={cat.categoryId} value={cat.categoryName}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.productId} className="product-card animate-product">
              <img src={product.img || "https://images.unsplash.com/photo-1593032465170-2d5d16ff9e7e?auto=format&fit=crop&w=800&q=80"} alt={product.title} />
              <h3>{product.title}</h3>
              <p>₹{product.pricePerDay}/day</p>

              <div className="product-actions">
                <button
                  className="view-details-btn"
                  onClick={() => handleViewDetails(product.productId)}
                >
                  View Details
                </button>
                <div className="icon-btns">
                  <button onClick={() => handleAddToWishlist(product)}>💖</button>
                  <button onClick={() => handleAddToCart(product)}>🛒</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Products;

