import express from 'express';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  addKuchu,
  getKuchu,
  deleteKuchu
} from '../controllers/productController.js';


const router = express.Router();

router.get('/', getProducts);
router.get('/kuchu', getKuchu);
router.get('/:id', getProductById);
router.post('/', addProduct);
router.post('/kuchu', addKuchu);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.delete('/kuchu/:id', deleteKuchu);

export default router;
