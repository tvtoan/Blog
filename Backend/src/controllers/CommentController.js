import Comment from "../models/Comment.js";

export const getComments = async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId }).populate(
    "user",
    "name"
  );
  res.json(comments);
};

export const createComment = async (req, res) => {
  const { content, postId, parentId } = req.body;
  const comment = new Comment({
    user: req.user._id,
    content,
    postId,
    parentId,
  });
  await comment.save();
  res.status(201).json(comment);
};

export const likeComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  if (!comment.likes.includes(req.user._id)) {
    comment.likes.push(req.user._id); // Sử dụng mảng likes
    await comment.save();
  }
  res.json(comment);
};
export const unLikeComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  const index = comment.likes.indexOf(req.user._id);
  if (index > -1) {
    comment.likes.splice(index, 1);
    await comment.save();
  }
  res.json(comment);
};
