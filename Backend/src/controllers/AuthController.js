import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  if (req.user) return res.json(req.user);
  res.status(401).json({ message: "Not authenticated" });
};

export const wordpressCallback = (req, res) => {
  const token = jwt.sign(
    { id: req.user._id, name: req.user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
};

export const googleCallback = (req, res) => {
  const token = jwt.sign(
    { id: req.user._id, name: req.user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
};

export const githubCallback = (req, res) => {
  const token = jwt.sign(
    { id: req.user._id, name: req.user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
};

export const facebookCallback = (req, res) => {
  const token = jwt.sign(
    { id: req.user._id, name: req.user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
};
