import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";

export const placeOrder = async (req, res) => {
  try {
    // 1️⃣ Get single cart with products
    const cart = await Cart.findOne().populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Calculate totals
    let subtotal = 0;

    const orderItems = cart.items.map((item) => {
      subtotal += item.price * item.quantity;

      return {
        product: item.product._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      };
    });

    const tax = +(subtotal * 0.05).toFixed(2);
    const totalAmount = subtotal + tax;

    // 3️⃣ Save order
    const order = await Order.create({
      items: orderItems,
      subtotal,
      tax,
      totalAmount,
    });

    // 4️⃣ Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({ message: "Order failed" });
  }
};
