const Expense = require("../models/Expense");

const getAllExpense = (req, res, next) => {
    Expense.find({ user: req.payload._id })
      .then(expenses => res.status(200).json(expenses))
      .catch(err => res.status(500).json({ message: "Internal Server Error" }));
};

const createExpense = (req, res, next) => {
    const { category, amount, date, currency, description } = req.body;
    const user = req.payload._id;
  
    Expense.create({ category, amount, date, currency, description, user })
      .then(expense => res.status(201).json(expense))
      .catch(err => res.status(500).json({ message: "Internal Server Error" }));
};

const getExpense = (req, res, next) => {
    Expense.findOne({ _id: req.params.id, user: req.payload._id })
      .then(expense => {
        if (!expense) {
          res.status(404).json({ message: "Expense not found" });
        } else {
          res.status(200).json(expense);
        }
      })
      .catch(err => res.status(500).json({ message: "Internal Server Error" }));
};

const updateExpense = (req, res, next) => {
    const { category, amount, date, currency, description } = req.body;
  
    Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.payload._id },
      { category, amount, date, currency, description },
      { new: true }
    )
      .then(expense => {
        if (!expense) {
          res.status(404).json({ message: "Expense not found" });
        } else {
          res.status(200).json(expense);
        }
      })
      .catch(err => res.status(500).json({ message: "Internal Server Error" }));
};

const deleteExpense = (req, res, next) => {
    Expense.findOneAndDelete({ _id: req.params.id, user: req.payload._id })
      .then(expense => {
        if (!expense) {
          res.status(404).json({ message: "Expense not found" });
        } else {
          res.status(204).json();
        }
      })
      .catch(err => res.status(500).json({ message: "Internal Server Error" }));
};

module.exports = { getAllExpense, createExpense, getExpense, updateExpense, deleteExpense};