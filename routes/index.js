const router = require('express').Router();

const NotAuthRoutes = require('./notAuthRoutes');
const auth = require('../middlewares/auth');
const Users = require('./user');
const Movies = require('./movie');

const { NotFoundErr } = require('../errors');

router.use(NotAuthRoutes);

router.use(auth);

router.use(Users);
router.use(Movies);

router.use((req, res, next) => {
  next(new NotFoundErr('Запрашиемый ресур не найден'));
});

module.exports = router;
