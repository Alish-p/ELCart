const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/ErrorHandler');

const app = express();
dotenv.config();
connectDB();

app.get('/', (req, res) => {
  res.send('Api running...');
});

// All Routes
app.use('/api/products', require('./routes/product'));

// middlewares
app.use(notFound);

// error handler
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${port}`);
});
