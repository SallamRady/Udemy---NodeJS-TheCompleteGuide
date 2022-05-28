const path = require('path');
const fs = require('fs');
const rootPath = require('../utils/rootPath');


const getProductsFromFile = (callback) => {
    let dataFilePath = path.join(rootPath,'data','products.json');
        let products = [];
        fs.readFile(dataFilePath,
            (err,filecontent)=>{
                if(!err){
                    products = JSON.parse(filecontent);
                    return callback(products);
                }else{
                    return callback([]);
                }
            }
        )
}
module.exports = class Product {
    constructor(id,name,price,description){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }

    // save Product.
    save(){
        let dataFilePath = path.join(rootPath,'data','products.json');
        let products = [];

        fs.readFile(dataFilePath,
            (err,filecontent)=>{
                if(!err){
                    products = JSON.parse(filecontent);
                }
                if(this.id){
                    const index = products.findIndex(p => p.id === this.id);
                    //console.log('editttttttttt',index);
                    if(index != -1){
                        const existProduct = products[index];
                        let updateProduct = {...this};
                        products[index] = {...updateProduct};
                        fs.writeFile(dataFilePath,JSON.stringify(products),
                        (err)=>{console.log(err)});
                    }
                }else{
                    this.id = (Math.random()*199999999).toString();
                    products.push(this);
                    fs.writeFile(dataFilePath,JSON.stringify(products),
                    (err)=>{console.log(err)});
                }
            }
        )
    }


    static delete(id){
        let dataFilePath = path.join(rootPath,'data','products.json');
        let products = [];

        fs.readFile(dataFilePath,
            (err,filecontent)=>{
                if(!err){
                    products = JSON.parse(filecontent);
                }
                const index = products.findIndex(p => p.id === id);
                
                if(index != -1){
                    products.splice(index,1);
                    fs.writeFile(dataFilePath,JSON.stringify(products),
                    (err)=>{console.log(err)});
                }
            }
        )
    }
    static getAll(callback){
        getProductsFromFile(callback);
    }

    static getSingleProduct(id,callback){
        getProductsFromFile(
            products=>{
                const product = products.find(p=>p.id === id);
                callback(product);
            }
        )
    }

}