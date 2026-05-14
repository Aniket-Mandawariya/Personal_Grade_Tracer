const express = require("express");
const {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense
} = require("../controllers/expenseController");

const router = express.Router();

router.get("/", getAllExpenses);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
