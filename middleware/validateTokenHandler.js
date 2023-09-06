const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded.user; // Store the decoded token in the request object
      console.log(decoded);
      next(); // Call next to proceed with the next middleware or route handler.
    } catch (err) {
      res.status(401);
      throw new Error('User is not authorized');
    }
  } else {
    res.status(401);
    throw new Error('Authorization header is missing or invalid');
  }
});

module.exports = validateToken;
