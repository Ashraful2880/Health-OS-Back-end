const express = require('express');
const router = express.Router();
const productCategoryController = require('./productCategory.controller');

router.get('/', productCategoryController.getAllProductCategories);
router.post('/', productCategoryController.createProductCategory);

module.exports = router;
