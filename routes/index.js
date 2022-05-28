const router = require('express').Router();

const {
  validationUserInfo,
  validationLogin,
} = require('../middlewares/requestValidation');

const { createNewUser, login } = require('../controllers/user');
const auth = require('../middlewares/auth');
const { NotFoundErr } = require('../errors');

router.post('/signup', validationUserInfo, createNewUser);
router.post('/signin', validationLogin, login);

router.use(auth);

router.use('/users', require('./user'));
router.use('/movies', require('./movie'));

router.use((req, res, next) => {
  next(new NotFoundErr('Запрашиемый ресур не найден'));
});

module.exports = router;
