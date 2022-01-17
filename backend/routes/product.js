const { Router } = require('express');
const {
  fetchProduct,
  fetchProducts,
} = require('../controllers/productController');
const router = Router();

router.get('/', fetchProducts);
router.get('/:id', fetchProduct);

module.exports = router;
