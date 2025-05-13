

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import ExpenseList from "./ExpenseList";

import ExpenseForm from "./ExpenseForm";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenses");
      setExpenses(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Error fetching expenses");
    }
  };

  const handleAdd = (expense) => setExpenses([expense, ...expenses]);

  const handleDelete = (id) =>
    setExpenses(expenses.filter((exp) => exp._id !== id));

  const handleUpdate = (updated) => {
    setExpenses(
      expenses.map((exp) => (exp._id === updated._id ? updated : exp))
    );
  };

  const handleLogout = () => {
    // Optionally clear auth-related data here (like localStorage)
    navigate("/login"); // Navigate to login page
  };

  return (
    <div className="p-6 relative min-h-screen">
      <ExpenseForm onAdd={handleAdd} />
      <ExpenseList
        expenses={expenses}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      <button
        onClick={handleLogout}
        className="fixed bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
