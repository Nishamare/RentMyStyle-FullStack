import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { loginUser } from "../api"; // correct path

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
  e.preventDefault();

  const userData = {
    email,
    password,
  };

  loginUser(userData)
    .then((res) => {
      console.log("Login Success:", res.data);

      // Store logged-in user in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(res.data));

      alert("Login successful ✅");

      // Role-based redirection
      if (res.data.role?.toLowerCase() === "owner") {
        navigate("/owner-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
      
      // Force refresh to update navbar (App.js listens to storage in some cases, 
      // but a window reload is safer for Navbar state if not using global context for user)
      window.location.reload();
    })
    .catch((err) => {
      console.error("Login Failed:", err);
      alert("Invalid email or password ❌");
    });
}





  return React.createElement(
    "div",
    { className: "login-page" },

    React.createElement(
      "div",
      { className: "login-box" },

      /* TITLE */
      React.createElement("h2", null, "Welcome Back 👗"),
      React.createElement(
        "p",
        null,
        "Login to continue renting premium fashion"
      ),

      /* FORM */
      React.createElement(
        "form",
        { onSubmit: handleSubmit },

        React.createElement("input", {
          type: "email",
          placeholder: "Email Address",
          required: true,
          value: email,
          onChange: (e) => setEmail(e.target.value),
        }),

        React.createElement("input", {
          type: "password",
          placeholder: "Password",
          required: true,
          value: password,
          onChange: (e) => setPassword(e.target.value),
        }),

        React.createElement(
          "button",
          { type: "submit" },
          "Login"
        )
      ),

      /* LINK */
      React.createElement(
        "span",
        {
          className: "register-link",
          onClick: () => navigate("/register"),
        },
        "Don't have an account? Register"
      )
    )
  );
}

export default Login;
