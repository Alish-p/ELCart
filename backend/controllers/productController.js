const ProductModel = require('../models/Product');
const asyncHandler = require('express-async-handler');

// desc     fetch ALL PRODUCTS
// route    GET -api/products
// public
module.exports.fetchProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json(products);
});

// desc     fetch One PRODUCT
// route    GET -api/products/:id
// public
module.exports.fetchProduct = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product Not Found' });
  }
});
