const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const AdminRoutes = require('./routes/admin/AdminRoutes');
const ShopRoutes = require('./routes/shop/ShopRoutes');
const rootPath = require('./utils/rootPath');

// create&configrate server
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(rootPath,'public')));
app.set('view engine','ejs');
app.set('views','views');

// middlewares...
app.use(ShopRoutes);
app.use('/admin',AdminRoutes);

// 404|page not found
app.use((req,res,next)=>{
    res.status(404).send('<h1>404 | Page not found</h1>');
});

//-----> Event-Loop <-----//
app.listen(3000);
