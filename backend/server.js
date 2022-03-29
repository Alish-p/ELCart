const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/ErrorHandler');
const path = require('path');

const app = express();
dotenv.config();
connectDB();

app.get('/', (req, res) => {
  res.send('Api running...');
});

// middlewares
app.use(express.json());

// All Routes
app.use('/api/products', require('./routes/product'));
app.use('/api/users', require('./routes/user'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/upload', require('./routes/upload'));

app.get('/api/paypal/config', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// middlewares
app.use(notFound);

// error handler
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${port}`);
});
