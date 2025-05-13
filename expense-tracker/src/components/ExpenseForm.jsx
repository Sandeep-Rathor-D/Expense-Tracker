// src/components/ExpenseForm.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/expenses", form);
      onAdd(res.data);
      setForm({ title: "", amount: "", category: "", date: "" });
      toast.success("Expense added successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding expense");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Add New Expense
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter expense title"
            value={form.title}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={form.amount}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            placeholder="Enter category"
            value={form.category}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
      >
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;
