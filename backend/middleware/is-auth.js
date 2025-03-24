const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  User.findById(req.userId)
      .then(user => {
        if (!user) {
          const error = new Error('User not found or automatic logout due to timeout');
          error.statusCode = 404;
          throw error;
        }

        if(user.auth == 0) {
          const error = new Error('Login is required');
          error.statusCode = 404;
          throw error;
        }

      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });

  next();
};
