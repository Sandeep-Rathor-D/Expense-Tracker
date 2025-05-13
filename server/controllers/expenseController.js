import Expense from "../models/expenseModel.js";
import { validationResult } from "express-validator";

export const addExpense = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, amount, category, date } = req.body;
  try {
    const expense = new Expense({ title, amount, category, date });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, date } = req.body;
  try {
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.date = date || expense.date;
    await expense.save();
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
