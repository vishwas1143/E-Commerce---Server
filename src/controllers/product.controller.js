import Product from "../models/product.model.js";

// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// ADD product (for testing / admin)
export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, image } = req.body;

    const product = await Product.create({
      name,
      price,
      stock,
      image,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
