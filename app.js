const path = require('path');
const express = require('express');
const AppError = require('./utils/appError');
const globleErrorHandling = require('./utils/globleErrorHandling')
const userRouter = require('./router/userRouter')
const productRouter = require('./router/productRouter')
const vendorRouter = require('./router/vendorRouter')
const storeRouter = require('./router/storeRouter')
const cartRouter = require('./router/cartRouter')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

app.use(express.json ({limit: '10kb'}))

dotenv.config({ path: './config.env'})
const db = process.env.DATABASE_LOCAL
mongoose.connect(db, ) 
    .then(() => console.log('db connected'))
    .catch(() => console.log('db not connected'))

    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/product', productRouter);
    app.use('/api/v1/vendor', vendorRouter);
    app.use('/api/v1/store', storeRouter)
    app.use('/api/v1/cart', cartRouter)
     app.use(globleErrorHandling);

    app.all('*', (req, res, next) => {
        return next(new AppError(`can't fin d ${req.originalUrl} on this server`))
    })
app.listen(2002, () => {
    console.log('server is running on port no.2002');
})