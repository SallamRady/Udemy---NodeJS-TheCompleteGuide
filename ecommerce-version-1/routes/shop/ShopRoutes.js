const express = require('express');
const router = express.Router();
const shopController = require('../../controllers/shop/ShopController');

router.get('/',shopController.homePage);

router.get('/about',shopController.aboutPage);

router.get('/products',shopController.products);

router.get('/orders',shopController.orders);

router.get('/cart',shopController.checkout);

router.post('/cart',shopController.AddToCart);

router.post('/increaseItem',shopController.InctraseCartItem);

router.post('/deleteFromCart',shopController.deleteFromCart);

router.get('/product/:id',shopController.productDetails);

module.exports = router;