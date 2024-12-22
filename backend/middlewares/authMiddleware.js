const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model to validate user existence

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode", decoded);

    // Find the user in the database
    const user = await User.findOne({email : decoded.email});

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: error.message});
  }
};

module.exports = authMiddleware;
