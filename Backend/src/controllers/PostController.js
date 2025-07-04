import Post from "../models/Post.js";

function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export const getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("owner", "name")
    .sort({ createdAt: -1 }); // Sắp xếp mới nhất lên đầu
  res.json(posts);
};

export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("owner", "name");
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
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

export const createPost = async (req, res) => {
  const { title, excerpt, image, categories, sections, readingTime } = req.body;

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admins can create posts" });
  }

  const post = new Post({
    title,
    excerpt,
    image,
    categories: Array.isArray(categories) ? categories : [],
    sections: Array.isArray(sections) ? sections : [],
    readingTime,
    owner: req.user._id,
  });

  await post.save();
  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, excerpt, image, categories, sections, readingTime } =
    req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        content,
        excerpt,
        image,
        categories: Array.isArray(categories) ? categories : [],
        sections: Array.isArray(sections) ? sections : [],
        readingTime,
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getPostByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    if (!title) {
      return res.status(400).json({ message: "Title parameter is required." });
    }

    const posts = await Post.find();
    const keyword = removeVietnameseTones(title).toLowerCase();

    const filtered = posts.filter((post) =>
      removeVietnameseTones(post.title).toLowerCase().includes(keyword)
    );

    res.status(200).json(filtered);
  } catch (err) {
    console.error("Error fetching posts by title:", err);
    res
      .status(500)
      .json({ message: "Error fetching posts", error: err.message });
  }
};
