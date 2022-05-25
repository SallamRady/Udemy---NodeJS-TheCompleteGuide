const Product = require('../../models/Product');

module.exports.homePage = (req,res,next)=>{
    let products = Product.getAll(
        (products)=>{
            res.render('shop/home',{products:products,pageTitle : 'Demo E-commerce',path:'/'});
        }
    )
}

module.exports.aboutPage = (req,res,next)=>{
    const context = {
        pageTitle :'About|Demo E-commerce',
        path:'about'
    }
    res.render('shop/about',context);
}

module.exports.productDetails = (req,res,next)=>{
    res.send('<h1>Product Details</h1>');
}

module.exports.products = (req,res,next)=>{
    let products = Product.getAll(
        products=>{
            res.render('shop/products',{products:products,pageTitle :'Products|Demo E-commerce',path:'products'})
        }
    )
}

module.exports.orders = (req,res,next)=>{
    res.render('shop/orders',{pageTitle:'Orders!',path:'orders'});
}

module.exports.checkout = (req,res,next)=>{
    res.render('shop/checkout',{pageTitle:'Check Out',path:'cart'});
}