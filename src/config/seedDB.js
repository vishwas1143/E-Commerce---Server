// src/config/seedDB.js
import Product from "../models/product.model.js";
import products from "../seed/product.seed.js";

const seedDB = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Database seeded successfully");
  } catch (err) {
    console.error(err);
  }
};

export default seedDB;
