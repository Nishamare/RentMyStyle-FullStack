// import React from "react";

// function Navbar({ role, onLogout }) {
//   // role: null = guest, "customer", "owner"
//   const navLinks = role === "owner"
//     ? ["Add Product", "Notifications", "Orders"]
//     : role === "customer"
//     ? ["Products", "Cart", "Orders"]
//     : ["About", "Products", "Login", "Register"];

//   return React.createElement(
//     "nav",
//     { className: "navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3" },
//     React.createElement("a", { className: "navbar-brand fw-bold", href: "/" }, "RentMyStyle"),
//     React.createElement(
//       "div",
//       { className: "collapse navbar-collapse" },
//       React.createElement(
//         "ul",
//         { className: "navbar-nav me-auto" },
//         navLinks.map((link) =>
//           React.createElement(
//             "li",
//             { key: link, className: "nav-item mx-2" },
//             React.createElement("a", { className: "nav-link", href: "#" }, link)
//           )
//         )
//       )
//     ),
//     role
//       ? React.createElement(
//           "button",
//           { className: "btn btn-outline-danger", onClick: onLogout },
//           "Logout"
//         )
//       : null
//   );
// }

// export default Navbar;




import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ role, onLogout }) {
  const navigate = useNavigate();

  // Role-based links
  const navLinks =
    role === "owner"
      ? ["Dashboard", "Add Product", "Orders", "Notifications"]
      : role === "customer"
      ? ["Dashboard", "Products", "Wishlist", "Cart", "Orders", "Notifications"]
      : ["About", "Products", "Login", "Register"];

  return React.createElement(
    "nav",
    { className: "navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3" },
    // Brand
    React.createElement(
      "a",
      {
        className: "navbar-brand fw-bold",
        style: { cursor: "pointer" },
        onClick: () => navigate("/"),
      },
      "RentMyStyle"
    ),

    // Links
    React.createElement(
      "div",
      { className: "collapse navbar-collapse" },
      React.createElement(
        "ul",
        { className: "navbar-nav me-auto" },
        navLinks.map((link) => {
          // Handle Login/Register differently
          const handleClick = () => {
            if (link === "Login") navigate("/login");
            else if (link === "Register") navigate("/register");
            else if (link === "About") navigate("/about");
            else if (link === "Products") navigate("/products");
            else if (link === "Cart") navigate("/cart");
            else if (link === "Wishlist") navigate("/wishlist");
            else if (link === "Orders") navigate("/my-orders");
            else if (link === "Add Product") navigate("/add-product");
            else if (link === "Notifications") navigate("/notifications");
            else if (link === "Dashboard") {
              if (role === "owner") navigate("/owner-dashboard");
              else navigate("/customer-dashboard");
            }
          };

          return React.createElement(
            "li",
            { key: link, className: "nav-item mx-2" },
            React.createElement(
              "span",
              {
                className: "nav-link",
                style: { cursor: "pointer" },
                onClick: handleClick,
              },
              link
            )
          );
        })
      )
    ),

    // Logout button for logged-in roles
    role
      ? React.createElement(
          "button",
          { className: "btn btn-outline-danger", onClick: onLogout },
          "Logout"
        )
      : null
  );
}

export default Navbar;
