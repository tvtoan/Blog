import AboutMe from "../models/Aboutme.js";

// GET /api/about
export const getAboutMe = async (req, res) => {
  try {
    const about = await AboutMe.findOne({ slug: "about" });
    if (!about) {
      return res.status(404).json({ message: "About Me not found" });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// PUT /api/about
export const updateAboutMe = async (req, res) => {
  try {
    const { title, excerpt, image, sections } = req.body;

    const updated = await AboutMe.findOneAndUpdate(
      { slug: "about" },
      {
        title,
        excerpt,
        image,
        sections,
        slug: "about", // luôn gán lại slug
      },
      {
        new: true,
        upsert: true, // nếu chưa có thì tạo mới
      }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
