// // import React from "react";
// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // import Navbar from "./components/Navbar";
// // import Home from "./Pages/Home";
// // import Login from "./Pages/Login";
// // import Register from "./Pages/Register";
// // import Products from "./Pages/Products";          // Products page
// // import ProductDetail from "./Pages/ProductDetails"; // Product Detail page
// // import Wishlist from "./Pages/Wishlist"; // ✅ Wishlist page
// // import { WishlistProvider } from "./context/WishlistContext";
// // import { CartProvider } from "./context/CartContext"; //Cart Page 

// // function App() {
// //   return React.createElement(
// //     WishlistProvider, // ✅ Wrap everything inside WishlistProvider
// //     null,
// //     React.createElement(
// //       BrowserRouter,
// //       null,

// //       // Navbar visible on all pages
// //       React.createElement(Navbar, null),

// //       React.createElement(
// //         Routes,
// //         null,

// //         React.createElement(Route, {
// //           path: "/",
// //           element: React.createElement(Home),
// //         }),

// //         React.createElement(Route, {
// //           path: "/home",
// //           element: React.createElement(Home),
// //         }),

// //         React.createElement(Route, {
// //           path: "/login",
// //           element: React.createElement(Login),
// //         }),

// //         React.createElement(Route, {
// //           path: "/register",
// //           element: React.createElement(Register),
// //         }),

// //         React.createElement(Route, {
// //           path: "/products",
// //           element: React.createElement(Products),
// //         }),

// //         // Product Detail route
// //         React.createElement(Route, {
// //           path: "/product/:id",
// //           element: React.createElement(ProductDetail),
// //         }),

// //         // Wishlist page route
// //         React.createElement(Route, {
// //           path: "/wishlist",
// //           element: React.createElement(Wishlist),
// //         }),

// //         // Redirect any wrong URL to Home
// //         React.createElement(Route, {
// //           path: "*",
// //           element: React.createElement(Navigate, { to: "/" }),
// //         })
// //       )
// //     )
// //   );
// // }

// // export default App;



// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Home from "./Pages/Home";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import Products from "./Pages/Products";          // Products page
// import ProductDetail from "./Pages/ProductDetails"; // Product Detail page
// import Wishlist from "./Pages/Wishlist"; // Wishlist page
// import Cart from "./Pages/Cart"; // Cart page
// import { WishlistProvider } from "./context/WishlistContext";
// import { CartProvider } from "./context/CartContext"; // Cart context

// function App() {
//   return React.createElement(
//     WishlistProvider,
//     null,
//     React.createElement(
//       CartProvider, // ✅ Added CartProvider
//       null,
//       React.createElement(
//         BrowserRouter,
//         null,

//         // Navbar visible on all pages
//         React.createElement(Navbar, null),

//         React.createElement(
//           Routes,
//           null,

//           React.createElement(Route, {
//             path: "/",
//             element: React.createElement(Home),
//           }),

//           React.createElement(Route, {
//             path: "/home",
//             element: React.createElement(Home),
//           }),

//           React.createElement(Route, {
//             path: "/login",
//             element: React.createElement(Login),
//           }),

//           React.createElement(Route, {
//             path: "/register",
//             element: React.createElement(Register),
//           }),

//           React.createElement(Route, {
//             path: "/products",
//             element: React.createElement(Products),
//           }),

//           // Product Detail route
//           React.createElement(Route, {
//             path: "/product/:id",
//             element: React.createElement(ProductDetail),
//           }),

//           // Wishlist page route
//           React.createElement(Route, {
//             path: "/wishlist",
//             element: React.createElement(Wishlist),
//           }),

//           // ✅ Cart page route
//           React.createElement(Route, {
//             path: "/cart",
//             element: React.createElement(Cart),
//           }),

//           // Redirect any wrong URL to Home
//           React.createElement(Route, {
//             path: "*",
//             element: React.createElement(Navigate, { to: "/" }),
//           })
//         )
//       )
//     )
//   );
// }

// export default App;





import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetails";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import Order from "./Pages/Orders"; // ✅ ORDER PAGE IMPORT
import Notifications from "./Pages/Notifications";
import Payment from "./Pages/Payment";
import MyOrders from "./Pages/MyOrders";
import AddProduct from "./Pages/AddProduct";
import OwnerDashboard from "./Pages/OwnerDashboard";
import CustomerDashboard from "./Pages/CustomerDashboard";

import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    window.location.href = "/login";
  };

  return React.createElement(
    WishlistProvider,
    null,
    React.createElement(
      CartProvider,
      null,
      React.createElement(
        BrowserRouter,
        null,

        // Navbar visible on all pages - pass role and logout
        React.createElement(Navbar, { 
          role: user ? (user.role ? user.role.toLowerCase() : "customer") : null, 
          onLogout: handleLogout 
        }),

        React.createElement(
          Routes,
          null,
          React.createElement(Route, {
            path: "/",
            element: user 
              ? (user.role?.toLowerCase() === "owner" 
                  ? React.createElement(Navigate, { to: "/owner-dashboard" }) 
                  : React.createElement(Navigate, { to: "/customer-dashboard" }))
              : React.createElement(Home),
          }),

          React.createElement(Route, {
            path: "/home",
            element: React.createElement(Home),
          }),

          React.createElement(Route, {
            path: "/login",
            element: React.createElement(Login),
          }),

          React.createElement(Route, {
            path: "/register",
            element: React.createElement(Register),
          }),

          React.createElement(Route, {
            path: "/products",
            element: React.createElement(Products),
          }),

          React.createElement(Route, {
            path: "/product/:id",
            element: React.createElement(ProductDetail),
          }),

          React.createElement(Route, {
            path: "/wishlist",
            element: React.createElement(Wishlist),
          }),

          React.createElement(Route, {
            path: "/cart",
            element: React.createElement(Cart),
          }),

          // ✅ ORDER PAGE ROUTE ADDED HERE
          React.createElement(Route, {
            path: "/orders",
            element: React.createElement(Order),
          }),

          React.createElement(Route, {
            path: "/my-orders",
            element: React.createElement(MyOrders),
          }),
          
          React.createElement(Route, {
            path: "/notifications",
            element: React.createElement(Notifications),
          }),

          React.createElement(Route, {
            path: "/payment",
            element: React.createElement(Payment),
          }),

          React.createElement(Route, {
            path: "/add-product",
            element: React.createElement(AddProduct),
          }),

          React.createElement(Route, {
            path: "/owner-dashboard",
            element: React.createElement(OwnerDashboard),
          }),

          React.createElement(Route, {
            path: "/customer-dashboard",
            element: React.createElement(CustomerDashboard),
          }),

          // Redirect wrong URL
          React.createElement(Route, {
            path: "*",
            element: React.createElement(Navigate, { to: "/" }),
          })
        )
      )
    )
  );
}

export default App;
