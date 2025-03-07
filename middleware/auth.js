import jwt from '../utilities/jwt.js';

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token
    // console.log('header', req.header('Authorization'));
    // console.log(token);

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Access Denied. No token provided' });
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY); // Verify token
    req.user = decoded; // Set user in request

    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return Response.unauthorized(res, 'Access denied. Admins only.');
  }
  next();
};
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access Denied. No Token Provided.' });
  }

  try {
    const decoded = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET
    );
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
export default {
  authMiddleware,
  authenticateUser,
  isAdmin,
};
