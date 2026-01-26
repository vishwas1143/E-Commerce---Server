import express from "express";
import {
  getProducts,
  createProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct); // for testing

export default router;
