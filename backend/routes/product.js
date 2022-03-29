const { Router } = require('express');
const {
  fetchProduct,
  fetchProducts,
  deleteProduct,
  updateProduct,
  addProduct,
} = require('../controllers/productController');
const { admin, private } = require('../middlewares/Auth');
const router = Router();

router.get('/', fetchProducts);
router.get('/:id', fetchProduct);
router.delete('/:id', private, admin, deleteProduct);
router.put('/:id', private, admin, updateProduct);
router.post('/', private, admin, addProduct);

module.exports = router;
