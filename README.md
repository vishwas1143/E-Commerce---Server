🛒 BACKEND README.md (Node + Express)

🧠 E-Commerce Backend (Node.js & Express)

This repository contains the backend of an E-Commerce application.
It handles product management, cart operations, order processing, and database interactions.

🚀 Tech Stack

Node.js

Express.js

MongoDB

Mongoose

CORS

dotenv

⚙️ Installation & Setup
npm install
npm run dev


Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string


Backend runs on:

http://localhost:5000

📁 Project Structure
server/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── seedDB.js
│   ├── controllers/
│   │   ├── product.controller.js
│   │   ├── cart.controller.js
│   │   └── order.controller.js
│   ├── models/
│   │   ├── product.model.js
│   │   ├── cart.model.js
│   │   └── order.model.js
│   ├── routes/
│   │   ├── product.routes.js
│   │   ├── cart.routes.js
│   │   └── order.routes.js
│   └── data/
│       └── seedProducts.js
├── server.js
└── package.json

🔗 API Endpoints
Product APIs

GET /api/products → Fetch all products

Cart APIs

GET /api/cart → Fetch cart items

POST /api/cart → Add product to cart

PUT /api/cart/increase/:productId

PUT /api/cart/decrease/:productId

DELETE /api/cart → Clear cart

Order APIs

POST /api/orders → Place order

Automatically:

Calculates subtotal & tax

Reduces product stock

Clears cart after order

✨ Functionalities
Product Management

Stores product name, price, stock, and image.

Prevents negative stock values.

Products are fetched dynamically by frontend.

Cart Management

Adds products to cart.

Prevents adding beyond available stock.

Supports quantity increase & decrease.

Maintains cart state in database.

Order Processing

Converts cart items into an order.

Calculates:

Subtotal

5% tax

Total amount

Reduces product stock after successful order.

Clears cart automatically.

🔮 Future Scope

JWT-based authentication

User-specific carts & orders

Order history per user

Admin product CRUD APIs

Payment gateway integration

Invoice generation

👨‍💻 Author

Vishwas Burra
MERN Stack Developer
