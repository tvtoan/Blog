import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  console.log("getUser req.user:", req.user); // Debug
  if (req.user) return res.json(req.user);
  res.status(401).json({ message: "Not authenticated" });
};

export const googleCallback = (req, res) => {
  console.log("Google callback user:", req.user); // Debug
  if (!req.user) {
    return res.status(401).json({ message: "No user data" });
  }
  const token = jwt.sign(
    { id: req.user._id, name: req.user.name, role: req.user.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
  res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
};

export const githubCallback = (req, res) => {
  console.log("GitHub callback user:", req.user); // Debug
  if (!req.user) {
    return res.status(401).json({ message: "No user data" });
  }
  const token = jwt.sign(
    { id: req.user._id, name: req.user.name, role: req.user.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
  res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
};

export const facebookCallback = (req, res) => {
  console.log("Facebook callback user:", req.user); // Debug
  if (!req.user) {
    return res.status(401).json({ message: "No user data" });
  }
  const token = jwt.sign(
    { id: req.user._id, name: req.user.name, role: req.user.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
  res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
};
