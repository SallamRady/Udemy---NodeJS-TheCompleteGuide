const express = require('express');
const router = express.Router();
const AdminController = require('../../controllers/admin/AdminController');

router.get('/',AdminController.dashboard);

router.get('/add-product',AdminController.AddProduct);

router.post('/save-product',AdminController.SaveProduct);

router.post('/save-edit-product',AdminController.SaveEdittedProduct);

router.post('/product-delete',AdminController.DeleteProduct);

router.get('/product',AdminController.SingleProduct);

router.get('/product/:id',AdminController.productDetails);

router.get('/product-edit/:id',AdminController.productEdit);

router.get('/products',AdminController.AllProducts);

router.post('/cart',AdminController.addToCart);

module.exports = router;