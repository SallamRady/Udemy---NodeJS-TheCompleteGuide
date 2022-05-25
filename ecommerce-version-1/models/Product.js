const path = require('path');
const fs = require('fs');
const rootPath = require('../utils/rootPath');

module.exports = class Product {
    constructor(name,price,description){
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
                products.push(this);
                fs.writeFile(dataFilePath,JSON.stringify(products),
                (err)=>{console.log(err)});
            }
        )
    }

    static getAll(callback){
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

}