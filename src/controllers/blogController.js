const { connectDB } = require('../config/db');

async function getBlogsCollection() {
  const db = await connectDB();
  return db.collection(process.env.BLOG_COLLECTION);
}

exports.getAllBlogs = async (req, res) => {
  try {
    const Blogs = await getBlogsCollection();
    const blogs = await Blogs.find({}).toArray();
    res.send(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};
