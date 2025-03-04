import express from 'express';
const routes = express.Router();
import multer from 'multer';
import Product from '../model/product.js';
import productController from '../controller/products.js';
import authmiddleware from '../middleware/auth.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

routes.post('/upload', upload.single('csvFile'), productController.newProduct);
routes.get('/', productController.getAllProduct);
routes.get('/:productId', productController.getByID);
routes.patch('/:productId', productController.productUpdate);
routes.delete('/:productId', productController.productDelete);

routes.get('/user-products/:userId', productController.getUserProducts);
routes.get(
  '/userproducts/:userId',
  authmiddleware.authenticateUser,
  productController.getUserProducts
);

export default routes;
