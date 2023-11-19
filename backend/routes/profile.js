const express = require("express");
const User = require("../models/User.model");
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

const router = express.Router();

const { getAllProfile, updateProfile } = require("../controller/profile");

// GET  /auth/profile  -  Get user profile
router.get('/', isAuthenticated, getAllProfile);

// PUT  /profile  -  Update user profile
router.put('/', isAuthenticated, updateProfile);

module.exports = router;
