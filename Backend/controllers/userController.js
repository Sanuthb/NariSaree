import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const user = await User.findById(req.user.id);
  const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

  if (itemIndex >= 0) {
    user.cart[itemIndex].quantity += quantity;
  } else {
    user.cart.push({ productId, quantity });
  }

  await user.save();
  res.json(user.cart);
};

export const getCart = async (req, res) => {
  const user = await User.findById(req.user.id).populate('cart.productId');
  res.json(user.cart);
};

export const placeOrder = async (req, res) => {
  const user = await User.findById(req.user.id).populate('cart.productId');

  const order = new Order({
    userId: user._id,
    products: user.cart.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity
    })),
    total: user.cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0)
  });

  await order.save();
  user.cart = [];
  await user.save();

  res.status(201).json(order);
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).populate('products.productId');
  res.json(orders);
};
