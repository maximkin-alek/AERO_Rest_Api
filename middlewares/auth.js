const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/secret-key');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Invalid token' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, secretKey.key);
  } catch (err) {
    return res
      .status(401)
      .send({ message: "Необходимо выполнить авторизацию" });
  }
  req.user = payload;
  return next();
};