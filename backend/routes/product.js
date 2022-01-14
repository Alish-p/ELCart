const { Router } = require('express');
const ProductModel = require('../models/Product');
const asyncHandler = require('express-async-handler');
const router = Router();

// GET ALL PRODUCTS
// GET      api/products
// public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.status(200).json(products);
  })
);

// GET ONE PRODUCT BY ID
// GET      api/products/:id
// public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  })
);

module.exports = router;
