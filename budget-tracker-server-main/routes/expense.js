const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');
const Expense = require("../models/Expense.model");

const { getAllExpense, createExpense, getExpense, updateExpense, deleteExpense } = require("../controller/expense");

router.get('/', isAuthenticated, getAllExpense);

router.post('/', isAuthenticated, createExpense);

router.get('/:id', isAuthenticated, getExpense);

router.put('/:id', isAuthenticated, updateExpense);

router.delete('/:id', isAuthenticated, deleteExpense);

module.exports = router;
