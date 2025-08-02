const Blog = require("./blog.model");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.send(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};
