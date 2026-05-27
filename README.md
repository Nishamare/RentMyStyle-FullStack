A full-stack web application for renting clothes online. Users can browse clothes, register/login, add items to cart, place orders, and manage rentals
Built using React, Spring Boot, and MySQL.

Frontend:  
https://rentmystyle.netlify.app
Frontend:
- React.js
- React Router
- Axios
- CSS / Bootstrap

Backend:
- Spring Boot (Java)
- Spring Security (Authentication)
- REST APIs
 Database:
- MySQL

Frontend: Netlify
Backend: (To be deployed - Render)

project Striucture 
RentMyStyle-FullStack/
│
├── rentmystyle-frontend/ → React Frontend
│
├── ClothRent/ → Spring Boot Backend
│ ├── src/
│ ├── pom.xml
│
└── README.md

Features

 User Features:
- User Registration & Login
- Browse Clothes
- Add to Cart
- Place Orders
- View Order History

Admin Features:
- Add New Products
- Manage Inventory
- View Orders
Authentication
- Login system implemented using Spring Boot backend
- Secure API endpoints
- Session/JWT based authentication (based on implementation)

Clone Repository
```bash
git clone https://github.com/Nishamare/RentMyStyle-FullStack.git


frontend setup
cd rentmystyle-frontend
npm install
npm start
***********
Runs On
http://localhost:3000

Backeend setup
cd ClothRent
mvn clean install
mvn spring-boot:run
****************
Runs on
http://localhost:8080


