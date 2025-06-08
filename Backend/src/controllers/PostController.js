import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("owner", "name");
  res.json(posts);
};

export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("owner", "name");
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

export const createPost = async (req, res) => {
  const { title, content, excerpt, image } = req.body;
  const post = new Post({
    title,
    content,
    excerpt,
    image,
    owner: req.user._id,
  });
  await post.save();
  res.status(201).json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!post)
    return res.status(404).json({ message: "Post not found or unauthorized" });
  res.json({ message: "Post deleted" });
};

export const updatePost = async (req, res) => {
  const { title, content, excerpt, image } = req.body;
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    { title, content, excerpt, image },
    { new: true }
  );
  if (!post)
    return res.status(404).json({ message: "Post not found or unauthorized" });
  res.json(post);
};
