const handleError = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка сервера' : err.message });
  next();
};

module.exports = handleError;
