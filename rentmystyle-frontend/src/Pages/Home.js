// import React from "react";
// import "../styles/Home.css";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const navigate = useNavigate();

//   return React.createElement(
//     "div",
//     null,

//     /* ================= HERO SECTION ================= */
//     React.createElement(
//       "div",
//       {
//         className: "container-fluid d-flex align-items-center text-white",
//         style: {
//           background:
//             "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://www.vecteezy.com/photo/66348315-elegant-boutique-display-showcases-evening-dresses-in-an-urban-shopping-district-during-nighttime')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         },
//       },
//       React.createElement(
//         "div",
//         { className: "container text-center py-5" },
//         React.createElement(
//           "h1",
//           { className: "display-4 fw-bold" },
//           "RentMyStyle"
//         ),
//         React.createElement(
//           "p",
//           { className: "lead mt-3" },
//           "Rent premium fashion. Wear once. Return with ease."
//         ),
//         React.createElement(
//           "button",
//           {
//             className: "btn btn-light btn-lg mt-4",
//             onClick: function () {
//               navigate("/login");
//             },
//           },
//           "Explore Collection"
//         )
//       )
//     ),

//     /* ================= ABOUT SECTION ================= */
//     React.createElement(
//       "div",
//       { className: "about-bg" },
//       React.createElement(
//         "div",
//         { className: "container" },
//         React.createElement(
//           "div",
//           { className: "row align-items-center" },

//           React.createElement(
//             "div",
//             { className: "col-md-6 mb-4" },
//             React.createElement(
//               "div",
//               { className: "about-card" },
//               React.createElement(
//                 "h2",
//                 null,
//                 "About RentMyStyle"
//               ),
//               React.createElement(
//                 "p",
//                 null,
//                 "RentMyStyle is an online clothing rental platform that allows users to rent stylish and premium outfits for weddings, parties, and special occasions."
//               ),
//               React.createElement(
//                 "p",
//                 null,
//                 "Instead of buying expensive clothes worn only once, users can rent fashionable outfits at affordable prices while supporting sustainable fashion."
//               )
//             )
//           ),

//           React.createElement(
//             "div",
//             { className: "col-md-6 text-center" },
//             React.createElement("img", {
//               src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
//               className: "img-fluid",
//               alt: "Clothing fashion",
//             })
//           )
//         )
//       )
//     ),

//     /* ================= HOW IT WORKS ================= */
//     React.createElement(
//       "div",
//       { className: "container py-5" },
//       React.createElement(
//         "h2",
//         { className: "text-center fw-bold mb-5" },
//         "How It Works"
//       ),
//       React.createElement(
//         "div",
//         { className: "row text-center" },
//         createStep("1", "Browse Outfits", "Choose outfits from our wide collection"),
//         createStep("2", "Rent Easily", "Select rental duration and place order"),
//         createStep("3", "Wear & Return", "Enjoy the look and return with ease")
//       )
//     ),

//     /* ================= BENEFITS ================= */
//     React.createElement(
//       "div",
//       { className: "container py-5 bg-light" },
//       React.createElement(
//         "h2",
//         { className: "text-center fw-bold mb-4" },
//         "Why Choose RentMyStyle?"
//       ),
//       React.createElement(
//         "div",
//         { className: "row text-center" },
//         createBenefit("Affordable Fashion"),
//         createBenefit("Latest Trends"),
//         createBenefit("Eco-Friendly"),
//         createBenefit("Easy Returns")
//       )
//     ),

//     /* ================= FOOTER ================= */
//     React.createElement(
//       "footer",
//       { className: "text-center py-3 mt-5" },
//       "© 2026 RentMyStyle | Online Clothing Rental Platform"
//     )
//   );
// }

// /* ================= HELPERS ================= */

// function createStep(number, title, desc) {
//   return React.createElement(
//     "div",
//     { className: "col-md-4 mb-4" },
//     React.createElement(
//       "div",
//       { className: "card h-100 shadow-sm" },
//       React.createElement(
//         "div",
//         { className: "card-body" },
//         React.createElement(
//           "h3",
//           { className: "fw-bold text-primary" },
//           number
//         ),
//         React.createElement("h5", { className: "fw-bold" }, title),
//         React.createElement("p", { className: "text-muted" }, desc)
//       )
//     )
//   );
// }

// function createBenefit(text) {
//   return React.createElement(
//     "div",
//     { className: "col-md-3 mb-3" },
//     React.createElement(
//       "div",
//       { className: "p-3 border rounded shadow-sm bg-white" },
//       React.createElement("p", { className: "fw-semibold" }, text)
//     )
//   );
// }

// export default Home;





import React from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return React.createElement(
    "div",
    null,

    /* ================= HERO SECTION ================= */
    React.createElement(
      "div",
      {
        className: "container-fluid d-flex align-items-center text-white",
        style: {
          background:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://static.vecteezy.com/system/resources/previews/006/634/831/non_2x/elegant-boutique-display-showcases-evening-dresses-in-an-urban-shopping-district-during-nighttime-free-photo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      },
      React.createElement(
        "div",
        { className: "container text-center py-5" },
        React.createElement(
          "h1",
          { className: "display-4 fw-bold" },
          "RentMyStyle"
        ),
        React.createElement(
          "p",
          { className: "lead mt-3" },
          "Rent premium fashion. Wear once. Return with ease."
        ),
        React.createElement(
          "button",
          {
            className: "btn btn-light btn-lg mt-4",
            onClick: function () {
              navigate("/login");
            },
          },
          "Explore Collection"
        )
      )
    ),

    /* ================= ABOUT SECTION ================= */
    React.createElement(
      "div",
      { className: "about-bg" },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "row align-items-center" },

          React.createElement(
            "div",
            { className: "col-md-6 mb-4" },
            React.createElement(
              "div",
              { className: "about-card" },
              React.createElement(
                "h2",
                null,
                "About RentMyStyle"
              ),
              React.createElement(
                "p",
                null,
                "RentMyStyle is an online clothing rental platform that allows users to rent stylish and premium outfits for weddings, parties, and special occasions."
              ),
              React.createElement(
                "p",
                null,
                "Instead of buying expensive clothes worn only once, users can rent fashionable outfits at affordable prices while supporting sustainable fashion."
              )
            )
          ),

          React.createElement(
            "div",
            { className: "col-md-6 text-center" },
            React.createElement("img", {
              src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
              className: "img-fluid",
              alt: "Clothing fashion",
            })
          )
        )
      )
    ),

    /* ================= HOW IT WORKS ================= */
    React.createElement(
      "div",
      { className: "container py-5" },
      React.createElement(
        "h2",
        { className: "text-center fw-bold mb-5" },
        "How It Works"
      ),
      React.createElement(
        "div",
        { className: "row text-center" },
        createStep("1", "Browse Outfits", "Choose outfits from our wide collection"),
        createStep("2", "Rent Easily", "Select rental duration and place order"),
        createStep("3", "Wear & Return", "Enjoy the look and return with ease")
      )
    ),

    /* ================= BENEFITS ================= */
    React.createElement(
      "div",
      { className: "container py-5 bg-light" },
      React.createElement(
        "h2",
        { className: "text-center fw-bold mb-4" },
        "Why Choose RentMyStyle?"
      ),
      React.createElement(
        "div",
        { className: "row text-center" },
        createBenefit("Affordable Fashion"),
        createBenefit("Latest Trends"),
        createBenefit("Eco-Friendly"),
        createBenefit("Easy Returns")
      )
    ),

    /* ================= FOOTER ================= */
    React.createElement(
      "footer",
      { className: "text-center py-3 mt-5 bg-dark text-white" },
      "© 2026 RentMyStyle | Online Clothing Rental Platform"
    )
  );
}

/* ================= HELPERS ================= */

function createStep(number, title, desc) {
  return React.createElement(
    "div",
    { className: "col-md-4 mb-4" },
    React.createElement(
      "div",
      { className: "card h-100 shadow-sm" },
      React.createElement(
        "div",
        { className: "card-body" },
        React.createElement(
          "h3",
          { className: "fw-bold text-primary" },
          number
        ),
        React.createElement("h5", { className: "fw-bold" }, title),
        React.createElement("p", { className: "text-muted" }, desc)
      )
    )
  );
}

function createBenefit(text) {
  return React.createElement(
    "div",
    { className: "col-md-3 mb-3" },
    React.createElement(
      "div",
      { className: "p-3 border rounded shadow-sm bg-white" },
      React.createElement("p", { className: "fw-semibold" }, text)
    )
  );
}

export default Home;
