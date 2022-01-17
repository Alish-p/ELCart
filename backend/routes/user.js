const { Router } = require('express');
const {
  getUser,
  loginUser,
  registerUser,
} = require('../controllers/userController');

const { private } = require('../middlewares/Auth');
const router = Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/profile', private, getUser);

module.exports = router;
