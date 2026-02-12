import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct, getCategories, getBrands } from "../api";
import "../styles/AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pricePerDay: "",
    size: "",
    conditionStatus: "Excellent",
    stock: 1,
    categoryId: "",
    brandId: "",
    imgUrl: "", // Just for demo, we'll store as part of product if backend supports image list
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is owner
    if (!loggedUser || loggedUser.role?.toLowerCase() !== "owner") {
      alert("Unauthorized! Only owners can add products.");
      navigate("/");
      return;
    }

    // Fetch dependencies
    getCategories().then((res) => setCategories(res.data)).catch(console.error);
    getBrands().then((res) => setBrands(res.data)).catch(console.error);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: formData.title,
      description: formData.description,
      pricePerDay: parseFloat(formData.pricePerDay),
      size: formData.size,
      conditionStatus: formData.conditionStatus,
      stock: parseInt(formData.stock),
      category: { categoryId: parseInt(formData.categoryId) },
      brand: { brandId: parseInt(formData.brandId) },
      owner: { userId: loggedUser.userId },
      status: "AVAILABLE",
    };

    try {
      await addProduct(payload);
      alert("✅ Product Added Successfully!");
      navigate("/owner-dashboard");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add product. Check if IDs are correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="form-container">
        <h1>🆕 List a New Item</h1>
        <p>Fill in the details to add your product to the rental catalog.</p>

        <form onSubmit={handleSubmit} className="premium-form">
          <div className="form-grid">
            <div className="input-group">
              <label>Product Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Wedding Lehenga"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Price / Day (₹)</label>
                <input
                  type="number"
                  name="pricePerDay"
                  placeholder="500"
                  value={formData.pricePerDay}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Size</label>
                <input
                  type="text"
                  name="size"
                  placeholder="M / XL / 32"
                  value={formData.size}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Category</label>
                <select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.categoryId} value={c.categoryId}>
                      {c.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Brand</label>
                <select name="brandId" value={formData.brandId} onChange={handleChange} required>
                  <option value="">Select Brand</option>
                  {brands.map((b) => (
                    <option key={b.brandId} value={b.brandId}>
                      {b.brandName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Condition</label>
              <select name="conditionStatus" value={formData.conditionStatus} onChange={handleChange}>
                <option value="Excellent">Excellent</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            <div className="input-group">
              <label>Description</label>
              <textarea
                name="description"
                rows="3"
                placeholder="Describe the material, occasion, etc."
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="input-group">
              <label>Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding..." : "🚀 Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
