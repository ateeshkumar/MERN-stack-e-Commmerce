import express from 'express';
import { adminAccess, requestSignIn } from '../middleware/authMiddleware.js';
import cerateProductController, { deleteProductController, getAllProductsController, getProductPhotoController, getSingleProductController, updateProductController } from '../controllers/productController.js';
import ExpressFormidable from 'express-formidable';
import route from './categoryRoute.js';
const router = express.Router();

router.post('/create-product',
requestSignIn,
adminAccess,
ExpressFormidable(),
cerateProductController);
router.post('/update-product/:id',
requestSignIn,
adminAccess,
ExpressFormidable(),
updateProductController);
router.get('/all-product',getAllProductsController);
router.get('/all-product/:slug',getSingleProductController);
router.get('/product-photo/:pid',getProductPhotoController);
router.delete('/delete-product/:id',deleteProductController);

export default router;