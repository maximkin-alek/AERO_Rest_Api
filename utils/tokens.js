const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const { secretKey } = require('../config/secret-key');

module.exports.createAccessToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
      type: 'access'
    },
    secretKey.key,
    { expiresIn: 60 * 10 }
  );
}
module.exports.createRefreshToken = (userId) => {
  return jwt.sign(
    {
      id: uuid.v4(),
      type: 'refresh',
      userId: userId
    },
    secretKey.key,
    { expiresIn: 60 * 60 * 10 }
  );
}