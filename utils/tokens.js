const jwt = require('jsonwebtoken');
const uuid = require('uuid');

module.exports.createAccessToken = (userId) => {
    return jwt.sign(
        {
            id: userId,
            type: 'access'
        },
        'secret-key',
        { expiresIn: 60 }
    );
}
module.exports.createRefreshToken = (userId) => {
    return jwt.sign(
        {
            id: uuid.v4(),
            type: 'refresh',
            userId: userId
        },
        'secret-key',
        { expiresIn: 1000 }
    );
}