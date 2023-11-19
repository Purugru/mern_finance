const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');
const Category = require("../models/Category.model");

const { getAllCategory, createCategory, getCategory, updateCategory, deleteCategory } = require("../controller/category");

router.get('/', isAuthenticated, getAllCategory);

router.post('/', isAuthenticated, createCategory);

router.get('/:id', isAuthenticated, getCategory);

router.put('/:id', isAuthenticated, updateCategory);

router.delete('/:id', isAuthenticated, deleteCategory);

module.exports = router;
