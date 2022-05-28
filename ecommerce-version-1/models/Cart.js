const fs = require('fs');
const path = require('path');
const rootPath = require('../utils/rootPath');
const cartFilePath = path.join(rootPath,'data','cart.json');
const Product = require('./Product');

const getCartInfo = (callback) => {
    let cart = { products:[],totalPrice:0 ,totalAmount:0};
    fs.readFile(cartFilePath,
        (err,filecontent)=>{
            if(!err){
                cart = JSON.parse(filecontent);
                const products = Product.getAll(
                    products=>{
                        const cartProducts = [];
                        for( pro in products){
                            //console.log("lll",cart.products[products[pro].id],pro);
                            if(cart.products[products[pro].id]){
                                cartProducts.push({...products[pro],Amount:cart.products[products[pro].id].quantity});
                            }
                        }
                        const context = {
                            cartProducts:cartProducts,
                            totalAmount:cart.totalAmount,
                            totalPrice:cart.totalPrice
                        }
                        return callback(context);
                    }
                )
                
            }else{
                return callback([]);
            }
        }
    )
}

module.exports = class Cart {

    static addProduct(id,price){
        // Fetch previous data'cart'
        fs.readFile(cartFilePath,(err,fileContent)=>{
            let cart = { products:[],totalPrice:0 ,totalAmount:0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            
            //analyse cart->find product if exist.
            //const existProductIndex = cart.products.findIndex(p=>p.id === id);
            const index = Object.keys(cart.products).find(key => cart.products[key].id === id);
            if(index){
                const existProduct = cart.products[index];
                let updateProduct = {...existProduct};
                updateProduct.quantity = updateProduct.quantity + 1;
                cart.products[index] = {...updateProduct};
            }else{
                let updateProduct = {id:id,quantity:1};
                id = id.trim();
                cart.products[id] = {...updateProduct};
            }
            cart.totalAmount = parseInt(cart.totalAmount) + 1;
            cart.totalPrice = parseFloat(cart.totalPrice) +parseFloat(price);
            cart.products = {...cart.products};
            //write in file new data[save]
            fs.writeFile(cartFilePath,JSON.stringify(cart),
                err=>{console.log(err)});
        });
    }

    static deleteProduct(id,price){
        // Fetch previous data'cart'
        fs.readFile(cartFilePath,(err,fileContent)=>{
            if(err){
                return;
            }
            const cart = { ...JSON.parse(fileContent)};
            //analyse cart->find product if exist.
            //const index = Object.keys(cart.products).find(key => cart.products[key].id === id);
            console.log(cart,cart.products[id]);
            if(cart.products[id]){
                const quantity = cart.products[id].quantity;
                cart.totalAmount = parseInt(cart.totalAmount) - parseInt(quantity);
                cart.totalPrice = parseFloat(cart.totalPrice) - (parseFloat(price)*parseFloat(quantity));
                //console.log(parseFloat(cart.totalPrice),parseFloat(price),parseFloat(quantity));
                delete cart.products[id];
                cart.products = {...cart.products};
                console.log('delete:',cart.products);
                //write in file new data[save]
                fs.writeFile(cartFilePath,JSON.stringify(cart),
                    err=>{console.log(err)});
            }
        });
    }

    static getAll(callback){
        getCartInfo(callback);
    }
}