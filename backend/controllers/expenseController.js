const mongoose = require("mongoose");
const Expense = require("../models/Expense");

const formatValidationError = (error) => {
  if (error.name === "ValidationError") {
    return Object.values(error.errors)
      .map((item) => item.message)
      .join(" ");
  }

  return error.message || "Something went wrong.";
};

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1, createdAt: -1 });
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

    res.status(200).json({
      expenses,
      totalAmount
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses.", error: formatValidationError(error) });
  }
};

const createExpense = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;

    const newExpense = await Expense.create({
      description,
      amount,
      category,
      date
    });

    res.status(201).json({
      message: "Expense added successfully.",
      expense: newExpense
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to add expense.", error: formatValidationError(error) });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid expense ID." });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found." });
    }

    res.status(200).json({
      message: "Expense updated successfully.",
      expense: updatedExpense
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to update expense.", error: formatValidationError(error) });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid expense ID." });
    }

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found." });
    }

    res.status(200).json({ message: "Expense deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete expense.", error: formatValidationError(error) });
  }
};

module.exports = {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense
};
