import express from 'express';
import {
  addToCart,
  getCart,
  placeOrder,
  getUserOrders,
} from '../controllers/userController.js';


const router = express.Router();

router.post('/cart', addToCart);
router.get('/cart', getCart);
router.post('/order', placeOrder);
router.get('/orders', getUserOrders);

export default router;
