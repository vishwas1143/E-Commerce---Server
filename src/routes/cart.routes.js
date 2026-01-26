import express from "express";
import {
  getCart,
  addToCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

// Fetch cart items
router.get("/", getCart);

// Add product to cart
router.post("/", addToCart);

// Increase quantity
router.put("/increase/:productId", increaseQty);

// Decrease quantity
router.put("/decrease/:productId", decreaseQty);

// Clear cart
router.delete("/", clearCart);

export default router;
