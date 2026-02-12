import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { getProductById } from "../api";
import "../styles/ProductDetails.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-state"><h2>✨ Loading Elegance...</h2></div>;
  if (!product) return <div className="error-state"><h2>❌ Product not found!</h2></div>;

  const productTitle = product.title || product.name || "Premium Designer Wear";
  const productImg = product.img || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80";
  const productPrice = product.pricePerDay || product.price || "Contact for Price";
  const categoryName = product.category?.categoryName || "Premium Fashion";
  const brandName = product.brand?.brandName || "Designer Label";

  const handleRentNow = () => {
    navigate("/orders", { state: { product: { ...product, name: productTitle, price: productPrice } } });
  };

  return (
    <div className="product-details-container">
      <div className="pd-background-blur" style={{ backgroundImage: `url(${productImg})` }}></div>
      
      <div className="pd-glass-card">
        <div className="pd-grid">
          {/* Left Column: Image */}
          <div className="pd-image-section">
            <img src={productImg} alt={productTitle} className="pd-main-image" />
            <div className="pd-badge">{product.conditionStatus || "Pristine"}</div>
          </div>

          {/* Right Column: Info */}
          <div className="pd-info-section">
            <button className="pd-back-link" onClick={() => navigate("/products")}>
              ← Back to Collection
            </button>
            
            <div className="pd-header">
              <span className="pd-category-tag">{categoryName}</span>
              <h1 className="pd-title">{productTitle}</h1>
              <p className="pd-brand">{brandName}</p>
            </div>

            <div className="pd-price-row">
              <span className="pd-price">₹{productPrice}</span>
              <span className="pd-price-unit">/ Day</span>
            </div>

            <div className="pd-meta-grid">
              <div className="pd-meta-item">
                <label>Size</label>
                <p>{product.size || "Standard"}</p>
              </div>
              <div className="pd-meta-item">
                <label>Condition</label>
                <p>{product.conditionStatus || "Excellent"}</p>
              </div>
              <div className="pd-meta-item">
                <label>Availability</label>
                <p>{product.stock > 0 ? "In Stock" : "Reserved"}</p>
              </div>
              <div className="pd-meta-item">
                <label>Product ID</label>
                <p>#{product.productId || id}</p>
              </div>
            </div>

            <div className="pd-description">
              <h3>About the Item</h3>
              <p>{product.description || "No description available for this premium piece."}</p>
            </div>

            <div className="pd-actions-grid">
              <button className="pd-btn-primary pay-now" onClick={handleRentNow}>
                Pay Now 🚀
              </button>
              <button className="pd-btn-secondary" onClick={() => addToCart(product)}>
                Add to Cart 🛒
              </button>
              <button className="pd-btn-outline" onClick={() => addToWishlist(product)}>
                Wishlist 💝
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
