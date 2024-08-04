import express from 'express';
import ProductController from '../controllers/productController.js';
import { validateProduct, validateProductUpdate, validateCategory, validateSection } from './../middlewares/productMiddleware.js'

const router = express.Router();

router.get('/products', ProductController.getAllProducts);
router.post('/products', validateProduct, ProductController.createProduct);
router.get('/products/:id', ProductController.getProductById);
router.put('/products/:id', validateProductUpdate, ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);
router.get('/category/:category', validateCategory, ProductController.getProductByCategory)
router.get('/section/:section', validateSection, ProductController.getProductBySection)

export default router;