const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user || user.role !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: Insufficient permissions',
        });
      }

      next(); 
    } catch (err) {
      next(err); 
    }
  };
};

module.exports = roleMiddleware;
