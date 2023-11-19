const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const router = express.Router();

const { createProfileSignUp, createProfileLogin, getProfileVerify } = require("../controller/auth");

router.post('/signup', createProfileSignUp);

router.post('/login', createProfileLogin);

router.get('/verify', getProfileVerify);

module.exports = router;
