const jwt = require('jsonwebtoken'),
  { JWT_SECRET } = process.env;

exports.isAuthenticated = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ message: 'Failed to authenticate token' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({ message: 'No token provided. ' });
  }
};
