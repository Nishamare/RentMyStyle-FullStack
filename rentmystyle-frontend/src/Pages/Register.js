// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Register.css";

// function Register() {
//   const navigate = useNavigate();
//   const [role, setRole] = useState(""); // "" | "customer" | "owner"
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   function handleChange(e) {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     // Example: payload to backend
//     const payload = { ...formData, role: role.toUpperCase() };
//     console.log("Register Payload:", payload);

//     // TODO: send payload to backend API
//     alert(`Registered as ${role}`);
//     navigate("/login");
//   }

//   // Step 1: Role Selection
//   if (!role) {
//     return React.createElement(
//       "div",
//       { className: "register-page" },
//       React.createElement(
//         "div",
//         { className: "register-box" },
//         React.createElement("h2", null, "Create Account"),
//         React.createElement(
//           "p",
//           null,
//           "Join RentMyStyle and start renting fashion"
//         ),
//         React.createElement(
//           "div",
//           { style: { display: "flex", justifyContent: "space-around", marginTop: "20px" } },
//           React.createElement(
//             "button",
//             {
//               className: "role-btn",
//               onClick: () => setRole("customer")
//             },
//             "Customer"
//           ),
//           React.createElement(
//             "button",
//             {
//               className: "role-btn",
//               onClick: () => setRole("owner")
//             },
//             "Owner"
//           )
//         ),
//         React.createElement(
//           "p",
//           { style: { marginTop: "15px", fontSize: "0.85rem" } },
//           "Already have an account? ",
//           React.createElement(
//             "span",
//             {
//               className: "login-link",
//               onClick: () => navigate("/login")
//             },
//             "Login"
//           )
//         )
//       )
//     );
//   }

//   // Step 2: Registration Form (dynamic by role)
//   return React.createElement(
//     "div",
//     { className: "register-page" },
//     React.createElement(
//       "div",
//       { className: "register-box" },
//       React.createElement(
//         "h2",
//         null,
//         `Register as ${role.charAt(0).toUpperCase() + role.slice(1)}`
//       ),
//       React.createElement(
//         "p",
//         null,
//         "Fill in your details to create account"
//       ),
//       React.createElement(
//         "form",
//         { onSubmit: handleSubmit },

//         React.createElement("input", {
//           type: "text",
//           placeholder: "Full Name",
//           name: "name",
//           value: formData.name,
//           onChange: handleChange,
//           required: true,
//         }),

//         React.createElement("input", {
//           type: "email",
//           placeholder: "Email Address",
//           name: "email",
//           value: formData.email,
//           onChange: handleChange,
//           required: true,
//         }),

//         React.createElement("input", {
//           type: "text",
//           placeholder: "Phone Number",
//           name: "phone",
//           value: formData.phone,
//           onChange: handleChange,
//           required: true,
//         }),

//         React.createElement("input", {
//           type: "password",
//           placeholder: "Password",
//           name: "password",
//           value: formData.password,
//           onChange: handleChange,
//           required: true,
//         }),

//         React.createElement("input", {
//           type: "password",
//           placeholder: "Confirm Password",
//           name: "confirmPassword",
//           value: formData.confirmPassword,
//           onChange: handleChange,
//           required: true,
//         }),

//         React.createElement("input", {
//           type: "text",
//           placeholder: "Address",
//           name: "address",
//           value: formData.address,
//           onChange: handleChange,
//           required: true,
//         }),

//         React.createElement("input", {
//           type: "text",
//           placeholder: "City",
//           name: "city",
//           value: formData.city,
//           onChange: handleChange,
//           required: true,
//         }),

//         React.createElement("input", {
//           type: "text",
//           placeholder: "State",
//           name: "state",
//           value: formData.state,
//           onChange: handleChange,
//           required: true,
//         }),

//         React.createElement("input", {
//           type: "text",
//           placeholder: "Pincode",
//           name: "pincode",
//           value: formData.pincode,
//           onChange: handleChange,
//           required: true,
//         }),

//         React.createElement(
//           "button",
//           { type: "submit" },
//           "Register"
//         )
//       ),

//       React.createElement(
//         "span",
//         {
//           className: "login-link",
//           onClick: () => navigate("/login")
//         },
//         "Already have an account? Login"
//       )
//     )
//   );
// }

// export default Register;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { registerUser } from "../api"; // ✅ added

function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState(""); // "" | "customer" | "owner"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      role: role.toUpperCase(),
    };

    registerUser(payload)
      .then((res) => {
        console.log("Registration success:", res.data);
        alert("Registration successful. Please login.");
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        alert("Registration failed. Try again.");
      });
  }

  // Step 1: Role Selection
  if (!role) {
    return React.createElement(
      "div",
      { className: "register-page" },
      React.createElement(
        "div",
        { className: "register-box" },
        React.createElement("h2", null, "Create Account"),
        React.createElement(
          "p",
          null,
          "Join RentMyStyle and start renting fashion"
        ),
        React.createElement(
          "div",
          { style: { display: "flex", justifyContent: "space-around", marginTop: "20px" } },
          React.createElement(
            "button",
            {
              className: "role-btn",
              onClick: () => setRole("customer")
            },
            "Customer"
          ),
          React.createElement(
            "button",
            {
              className: "role-btn",
              onClick: () => setRole("owner")
            },
            "Owner"
          )
        ),
        React.createElement(
          "p",
          { style: { marginTop: "15px", fontSize: "0.85rem" } },
          "Already have an account? ",
          React.createElement(
            "span",
            {
              className: "login-link",
              onClick: () => navigate("/login")
            },
            "Login"
          )
        )
      )
    );
  }

  // Step 2: Registration Form
  return React.createElement(
    "div",
    { className: "register-page" },
    React.createElement(
      "div",
      { className: "register-box" },
      React.createElement(
        "h2",
        null,
        `Register as ${role.charAt(0).toUpperCase() + role.slice(1)}`
      ),
      React.createElement(
        "p",
        null,
        "Fill in your details to create account"
      ),
      React.createElement(
        "form",
        { onSubmit: handleSubmit },

        React.createElement("input", {
          type: "text",
          placeholder: "Full Name",
          name: "name",
          value: formData.name,
          onChange: handleChange,
          required: true,
        }),

        React.createElement("input", {
          type: "email",
          placeholder: "Email Address",
          name: "email",
          value: formData.email,
          onChange: handleChange,
          required: true,
        }),

        React.createElement("input", {
          type: "text",
          placeholder: "Phone Number",
          name: "phone",
          value: formData.phone,
          onChange: handleChange,
          required: true,
        }),

        React.createElement("input", {
          type: "password",
          placeholder: "Password",
          name: "password",
          value: formData.password,
          onChange: handleChange,
          required: true,
        }),

        React.createElement("input", {
          type: "password",
          placeholder: "Confirm Password",
          name: "confirmPassword",
          value: formData.confirmPassword,
          onChange: handleChange,
          required: true,
        }),

        React.createElement("input", {
          type: "text",
          placeholder: "Address",
          name: "address",
          value: formData.address,
          onChange: handleChange,
          required: true,
        }),

        React.createElement("input", {
          type: "text",
          placeholder: "City",
          name: "city",
          value: formData.city,
          onChange: handleChange,
          required: true,
        }),

        React.createElement("input", {
          type: "text",
          placeholder: "State",
          name: "state",
          value: formData.state,
          onChange: handleChange,
          required: true,
        }),

        React.createElement("input", {
          type: "text",
          placeholder: "Pincode",
          name: "pincode",
          value: formData.pincode,
          onChange: handleChange,
          required: true,
        }),

        React.createElement(
          "button",
          { type: "submit" },
          "Register"
        )
      ),

      React.createElement(
        "span",
        {
          className: "login-link",
          onClick: () => navigate("/login")
        },
        "Already have an account? Login"
      )
    )
  );
}

export default Register;
