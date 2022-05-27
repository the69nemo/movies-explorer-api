const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMe, updateUser } = require('../controllers/user')

router.get('/me', getMe);

router.patch('/me', updateUser);

module.exports = router;
