import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const placeOrder = async (req, res) => {
  try {
    // 1. Fetch cart items
    const cartItems = await Cart.find().populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2. Calculate totals
    let subtotal = 0;

    const orderItems = cartItems.map((item) => {
      subtotal += item.product.price * item.quantity;

      return {
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      };
    });

    const tax = +(subtotal * 0.05).toFixed(2);
    const totalAmount = subtotal + tax;

    // 3. Save order
    const order = await Order.create({
      items: orderItems,
      subtotal,
      tax,
      totalAmount,
    });

    // 4. Reduce product stock
    for (const item of cartItems) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    // 5. Clear cart
    await Cart.deleteMany();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order failed" });
  }
};
