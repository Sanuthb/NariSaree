import User from '../models/User.js';
import Order from '../models/Order.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: 'User deleted' });
};



export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('products.productId')   // Populate product details
      .populate('userId', 'email address _id'); // Populate user email, address, _id

    const ordersWithUserDetails = orders.map(order => ({
      ...order.toObject(),
      user: {
        id: order.userId._id,
        email: order.userId.email,
        address: order.userId.address
      }
    }));

    res.json(ordersWithUserDetails);
  } catch (err) {
    console.error("Failed to fetch all orders:", err);
    res.status(500).json({ error: "Failed to fetch all orders" });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (err) {
    console.error("Failed to update order status:", err);
    res.status(500).json({ error: "Failed to update order status" });
  }
};