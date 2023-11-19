const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');
const User = require("../models/User.model");
const Income = require("../models/Income.model");

const { getAllIncome, createIncome, getIncome, updateIncome, deleteIncome} = require("../controller/income");

// GET /income: Get all income entries for the logged-in user
router.get('/', isAuthenticated, getAllIncome);

// POST /income: Create a new income entry
router.post('/', isAuthenticated, createIncome);

// GET /income/:id: Get a specific income entry
router.get('/:id', isAuthenticated, getIncome);

// PUT /income/:id: Update a specific income entry
router.put('/:id', isAuthenticated, updateIncome);

// DELETE /income/:id: Delete a specific income entry
router.delete('/:id', isAuthenticated, deleteIncome);

module.exports = router;
