const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

const generateToken = (id) => {
  return jwt.sign({ id }, config.secret, {
    expiresIn: config.expiresIn,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.secret);
};

module.exports = { generateToken, verifyToken };
