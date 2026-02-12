import axios from "axios";

const BASE_URL = "http://localhost:8081";

// User APIs
export const registerUser = (user) => {
  return axios.post(`${BASE_URL}/users/register`, user);
};

export const loginUser = (user) => {
  return axios.post(`${BASE_URL}/users/login`, user);
};

// Product APIs
export const getProducts = () => axios.get(`${BASE_URL}/products/all`);
export const getProductById = (id) => axios.get(`${BASE_URL}/products/${id}`);
export const addProduct = (product) => axios.post(`${BASE_URL}/products/add`, product);

// Category & Brand APIs
export const getCategories = () => axios.get(`${BASE_URL}/categories/all`);
export const getBrands = () => axios.get(`${BASE_URL}/brands/all`);

// Wishlist APIs
export const getWishlistByUser = (userId) => 
  axios.get(`${BASE_URL}/wishlist/user/${userId}`);

export const addToWishlist = (wishlistData) =>
  axios.post(`${BASE_URL}/wishlist/add`, wishlistData);

export const removeFromWishlist = (wishlistId) =>
  axios.delete(`${BASE_URL}/wishlist/${wishlistId}`);

// Cart APIs
export const getCartByUser = (userId) =>
  axios.get(`${BASE_URL}/cart/user/${userId}`);

export const addToCart = (cartData) =>
  axios.post(`${BASE_URL}/cart/add`, cartData);

export const removeFromCart = (cartId) =>
  axios.delete(`${BASE_URL}/cart/${cartId}`);

// Order APIs
export const placeOrder = (order) =>
  axios.post(`${BASE_URL}/orders/place`, order);

export const getUserOrders = (userId) =>
  axios.get(`${BASE_URL}/orders/user/${userId}`);

export const getOwnerOrders = (ownerId) =>
  axios.get(`${BASE_URL}/orders/owner/${ownerId}`);

export const getOrderById = (orderId) =>
  axios.get(`${BASE_URL}/orders/${orderId}`);

// Notification APIs
export const getNotificationsByUser = (userId) =>
  axios.get(`${BASE_URL}/notifications/user/${userId}`);

export const markNotificationAsRead = (notificationId) =>
  axios.put(`${BASE_URL}/notifications/${notificationId}/read`);

