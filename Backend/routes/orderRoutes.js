import express from 'express';
import { placeOrder, getUserOrders, getAllOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', placeOrder); // Place order
router.get('/user/:userId', getUserOrders); // Orders by user
router.get('/', getAllOrders); // Admin: All orders

export default router;
