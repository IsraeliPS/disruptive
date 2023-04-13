const jsonwebtoken = require('jsonwebtoken');
const config = require('./config');

const sign = (payload) => {
  const secret = config.jwt.secret;
  return jsonwebtoken.sign(payload, secret);
};

const verifyToken = (token) => {
  try {
    const secret = config.jwt.secret;
    return jsonwebtoken.verify(token, secret);
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { sign, verifyToken };
