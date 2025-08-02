const express = require('express');
const router = express.Router();
const blogController = require('./blog.controller');

router.get('/', blogController.getAllBlogs);

module.exports = router;
