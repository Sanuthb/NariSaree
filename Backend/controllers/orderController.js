import Order from '../models/Order.js';
export const placeOrder = async (req, res) => {
  try {
    const { userId, products, total, address } = req.body;

    const newOrder = new Order({
      userId,
      products,
      total,
      address, // Save the address
    });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Order placement failed:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ error: "UserId is required." });
    }

    // Fetch the user's orders from the database
    const orders = await Order.find({ userId }).populate("products.productId");

    // Return the user's orders
    res.json(orders);
  } catch (err) {
    console.error("Failed to fetch user orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('products.productId')   // Populate product details
      .populate('userId', 'name address'); // Populate user details (name and address)

    res.json(orders);
  } catch (err) {
    console.error("Failed to fetch all orders:", err);
    res.status(500).json({ error: "Failed to fetch all orders" });
  }
};