const Product = require('../../models/Product');
const Cart = require('../../models/Cart');

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
    const {id} = req.params;

    Product.getSingleProduct(id,
        product=>res.render('shop/product-details.ejs',{pro:product,pageTitle:'Product Details',path:''})
    );
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
    Cart.getAll(
        cartInfo=>{
            console.log(cartInfo)
            res.render('shop/checkout',{products:cartInfo.cartProducts,totalAmount:cartInfo.totalAmount,totalPrice:cartInfo.totalPrice,pageTitle:'Check Out',path:'cart'});
        }
    )
    
}

module.exports.AddToCart = (req,res,next)=>{
    const {id} = req.body;
    const {price} = req.body;
    
    Product.getSingleProduct(id,
        product=>{
            Cart.addProduct(id,price);
        }
    );
    res.redirect('/');
    
}

module.exports.InctraseCartItem = (req,res,next)=>{
    const {id} = req.body;
    const {price} = req.body;
    
    Product.getSingleProduct(id,
        product=>{
            Cart.addProduct(id,price);
        }
    );
    res.redirect('/cart');
}

module.exports.deleteFromCart = (req,res,next)=>{
    const {id} = req.body;
    const {price} = req.body;
    Cart.deleteProduct(id,price);
    res.redirect('/cart');
    
}