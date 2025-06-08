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
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  res.json(comment);
};
