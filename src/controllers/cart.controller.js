import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Get Cart
export const getCart = async (req, res) => {
  let cart = await Cart.findOne();
  if (!cart) {
    cart = await Cart.create({ items: [] });
  }
  res.status(200).json(cart.items);
};

// Add to Cart
export const addToCart = async (req, res) => {
  const { productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (product.stock <= 0)
    return res.status(400).json({ message: "Out of stock" });

  let cart = await Cart.findOne();
  if (!cart) cart = await Cart.create({ items: [] });

  const item = cart.items.find((i) => i.product.toString() === productId);

  if (item) {
    item.quantity += 1;
  } else {
    cart.items.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  product.stock -= 1;

  await product.save();
  await cart.save();

  res.status(200).json(cart.items);
};

// Increase Qty
export const increaseQty = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne();
  const product = await Product.findById(productId);

  const item = cart.items.find((i) => i.product.toString() === productId);

  if (!item) return res.status(404).json({ message: "Item not found" });
  if (product.stock <= 0) return res.status(400).json({ message: "No stock" });

  item.quantity += 1;
  product.stock -= 1;

  await product.save();
  await cart.save();

  res.status(200).json(cart.items);
};

// Decrease Qty
export const decreaseQty = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne();
  const product = await Product.findById(productId);

  const itemIndex = cart.items.findIndex(
    (i) => i.product.toString() === productId,
  );

  if (itemIndex === -1)
    return res.status(404).json({ message: "Item not found" });

  cart.items[itemIndex].quantity -= 1;
  product.stock += 1;

  if (cart.items[itemIndex].quantity === 0) {
    cart.items.splice(itemIndex, 1);
  }

  await product.save();
  await cart.save();

  res.status(200).json(cart.items);
};

// Clear Cart
export const clearCart = async (req, res) => {
  const cart = await Cart.findOne();
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  res.status(200).json([]);
};
