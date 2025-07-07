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

    if (!title?.vi || !excerpt?.vi) {
      return res
        .status(400)
        .json({ message: "Tiêu đề và mô tả tiếng Việt là bắt buộc." });
    }

    if (!Array.isArray(sections)) {
      return res.status(400).json({ message: "Sections phải là một mảng." });
    }

    for (const section of sections) {
      if (!section.subtitle?.vi || !section.content?.vi) {
        return res
          .status(400)
          .json({
            message:
              "Subtitle và Content tiếng Việt là bắt buộc cho mỗi section.",
          });
      }
    }

    const updated = await AboutMe.findOneAndUpdate(
      { slug: "about" },
      {
        title,
        excerpt,
        image,
        sections,
        slug: "about",
      },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
