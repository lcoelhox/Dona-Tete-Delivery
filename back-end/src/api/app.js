const express = require('express');
const cors = require('cors');
require('express-async-errors');
const {
   loginRouter,
   registerRouter,
   salesRouter,
   customerRouter,
   adminRouter,
} = require('./routes');

const { errorMidleware } = require('./middlewares');

const app = express();
app.use('/images', express.static(`${__dirname}/../images`));
app.use(express.json());
app.use(cors());
app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/customer', customerRouter);
app.use('/admin', adminRouter);
app.use('/sales', salesRouter);
app.use(errorMidleware);
module.exports = app;
