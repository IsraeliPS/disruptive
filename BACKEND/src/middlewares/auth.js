const jwt = require('../lib/jwt');

const auth = (req, res, next) => {
  const token = req.header('x-token');
  try {
    const tokenDecode = jwt.verifyToken(token);
    const { userId, username, role } = tokenDecode;
    req.user = { userId, username, role };
    next();
  } catch (error) {
    console.log('error', error);
    res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
};

module.exports = auth;
