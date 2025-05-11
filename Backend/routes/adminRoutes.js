import express from 'express';
import {
  getAllUsers,
  deleteUser,
  getAllOrders,
  updateOrderStatus
} from '../controllers/adminController.js';


const router = express.Router();

router.get('/users', getAllUsers);
router.delete('/user/:id', deleteUser);
router.get('/orders', getAllOrders);
router.put('/orders/:orderId/status', updateOrderStatus);

export default router;
