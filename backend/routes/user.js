const { Router } = require('express');
const {
  getUser,
  loginUser,
  registerUser,
  updateUser,
  fetchUsers,
  deleteUser,
  getUserByID,
  updateUserByID,
} = require('../controllers/userController');

const { private, admin } = require('../middlewares/Auth');
const router = Router();

router.post('/', registerUser);
router.get('/', private, admin, fetchUsers);
router.put('/', private, updateUser);
router.post('/login', loginUser);
router.get('/profile', private, getUser);
router.delete('/:id', private, admin, deleteUser);
router.get('/:id', private, admin, getUserByID);
router.put('/:id', private, admin, updateUserByID);

module.exports = router;
