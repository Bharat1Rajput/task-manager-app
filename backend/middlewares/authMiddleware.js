const jwt = require('jsonwebtoken');
const User = require('../models/user');

const checkAuth  = async (req, res, next) => {
  const token = req.header('Authorization');
  // console.log("Received Token:", token);
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};


const checkRole = (role) => {
  return (req, res, next) => {
    console.log("my role is ",req.user.role);
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Access Denied' });}
     next();
    }}

module.exports = {checkAuth,checkRole};