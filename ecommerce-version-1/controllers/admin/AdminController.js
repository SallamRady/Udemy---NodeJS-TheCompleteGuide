const Product = require('../../models/Product');
const Cart = require('../../models/Cart');


module.exports.dashboard = (req,res,next)=>{
    let products = Product.getAll(
        products=>{
            res.render('admin/home',{products:products,pageTitle:'Dashboard', path:'/'});
        }
    )
}

module.exports.AddProduct = (req,res,next)=>{
    const context = {
        pageTitle:'Add Product',
        path:'addProduct'
    }
    res.render('admin/product/addProduct',context)
}

module.exports.SaveProduct = (req,res,next)=>{
    const {name} = req.body;
    const {price} = req.body;
    const {description} = req.body;
    const pro = new Product(null,name,price,description);
    pro.save();
    res.redirect('/admin');
}

module.exports.SaveEdittedProduct = (req,res,next)=>{
    const {id} = req.body;
    const {name} = req.body;
    const {price} = req.body;
    const {description} = req.body;
    const pro = new Product(id,name,price,description);
    pro.save();
    res.redirect('/admin');
}

module.exports.DeleteProduct = (req,res,next)=>{
    const {id} = req.body;
    const {price} = req.body;
    Cart.deleteProduct(id,price);
    Product.delete(id);
    res.redirect('/admin');
}

module.exports.SingleProduct = (req,res,next)=>{
    res.send('<h1>Single Product Page</h1>');
}

module.exports.AllProducts = (req,res,next)=>{
    let products = Product.getAll(
        products =>{
            res.render('admin/product/products',{products:products,pageTitle:'Products',path:'products'})
        }
    )
}

module.exports.productDetails = (req,res,next)=>{
    const {id} = req.params;
    Product.getAll(
        products=>{
            const pro = products.find(p => p.id === id);
            res.render('admin/product/details-product.ejs',{pro:pro,pageTitle:'Product Details',path:''})
        }
    )
    //res.send('<h2>Product Details</h2>');
}

module.exports.productEdit = (req,res,next)=>{
    const {id} = req.params;
    if(!id)
        res.redirect('/admin');

    Product.getAll(
        products=>{
            const pro = products.find(p => p.id === id);
            res.render('admin/product/edit-product.ejs',{pro:pro,pageTitle:'Edit Product',path:''})
        }
    )
    //res.send('<h2>Product Details</h2>');
}

module.exports.addToCart = (req,res,next)=>{
    const {id} = req.body;
    const {price} = req.body;
    
    Product.getSingleProduct(id,
        product=>{
            Cart.addProduct(id,price);
        }
    );
    res.redirect('/admin');
}