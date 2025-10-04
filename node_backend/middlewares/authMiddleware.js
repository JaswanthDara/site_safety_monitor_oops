const jwt = require("jsonwebtoken");


exports.authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // If no Authorization header 
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      req.user = null; 
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded payload to request
    req.user = decoded;

    next(); 
  } catch (error) {
    console.error("JWT Error:", error.message);

    // Handle expired token
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired" });
    }

    // Any other invalid
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
