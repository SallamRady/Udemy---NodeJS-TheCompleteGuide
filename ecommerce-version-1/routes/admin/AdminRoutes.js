const express = require('express');
const router = express.Router();
const AdminController = require('../../controllers/admin/AdminController');

router.get('/',AdminController.dashboard);

router.get('/add-product',AdminController.AddProduct);

router.post('/save-product',AdminController.SaveProduct);

router.get('/product',AdminController.SingleProduct);

router.get('/products',AdminController.AllProducts);

module.exports = router;