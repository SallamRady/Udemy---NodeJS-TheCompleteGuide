const Product = require('../../models/Product');


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
    const pro = new Product(name,price,description);
    pro.save();
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