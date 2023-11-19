const Income = require("../models/Income");
const User = require("../models/User");

const getAllIncome = (req, res, next) => {
    Income.find({ user: req.payload._id })
      .then(incomes => {
        res.status(200).json(incomes);
      })
      .catch(err => res.status(500).json({ message: "Internal Server Error" }));
};

const createIncome = (req, res, next) => {
    const { category, amount, date, currency, description } = req.body;
    const user = req.payload._id;
    Income.create({ category, amount, date, currency, description, user })
      .then(income => res.status(201).json(income))
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" })
      });
};

const getIncome = (req, res, next) => {
    Income.findOne({ _id: req.params.id, user: req.payload._id })
      .then(income => {
        if (!income) {
          res.status(404).json({ message: "Income not found" });
        } else {
          res.status(200).json(income);
        }
      })
      .catch(err => res.status(500).json({ message: "Internal Server Error" }));
};

const updateIncome = (req, res, next) => {
    const { category, amount, date, currency, description } = req.body;
  
    Income.findOneAndUpdate(
      { _id: req.params.id, user: req.payload._id },
      { category, amount, date, currency, description },
      { new: true } 
    )
      .then(income => {
        if (!income) {
          res.status(404).json({ message: "Income not found" });
        } else {
          res.status(200).json(income);
        }
      })
      .catch(err => res.status(500).json({ message: "Internal Server Error" }));
};

const deleteIncome = (req, res, next) => {
    Income.findOneAndDelete({ _id: req.params.id, user: req.payload._id })
      .then(income => {
        if (!income) {
          res.status(404).json({ message: "Income not found" });
        } else {
          res.status(204).json(); 
        }
      })
      .catch(err => res.status(500).json({ message: "Internal Server Error" }));
};

module.exports = { getAllIncome, createIncome, getIncome, updateIncome, deleteIncome };