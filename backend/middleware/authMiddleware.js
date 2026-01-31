const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check for header presence and format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  // 2. Extra safety: ensure token actually exists after the split
  if (!token) {
    return res.status(401).json({ error: "Malformed authorization header." });
  }

  try {
    // 3. Explicitly verify with the expected algorithm
    const secret = process.env.JWT_KEY;
    if (!secret) {
        console.error("CRITICAL: JWT_KEY is not defined in environment variables.");
        return res.status(500).json({ error: "Internal server error" });
    }

    const decoded = jwt.verify(token, secret, {
      algorithms: ["HS256"], // Force HS256 to prevent algorithm confusion
    });

    // 4. Validate the payload structure before attaching to req
    if (!decoded.id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    // Distinguish between expired and malformed if needed
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;