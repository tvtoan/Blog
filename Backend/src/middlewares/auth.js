import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Lấy token từ header, hỗ trợ cả "authorization" và "Authorization"
  const authHeader = req.headers.authorization || req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Invalid user data in token" });
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
