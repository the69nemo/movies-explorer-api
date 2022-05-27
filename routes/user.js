const router = require('express').Router();

const {
  validationIdUser,
  validationUpdateUserInfo,
} = require('../middlewares/requestValidation');

const { getMe, updateUser } = require('../controllers/user');

router.get('/me', validationIdUser, getMe);

router.patch('/me', validationUpdateUserInfo, updateUser);

module.exports = router;
