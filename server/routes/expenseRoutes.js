import express from "express";
import { body } from "express-validator";
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("amount").isNumeric().withMessage("Amount must be a number"),
    body("category").notEmpty().withMessage("Category is required"),
  ],
  addExpense
);

router.get("/", getExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
