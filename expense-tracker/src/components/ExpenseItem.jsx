import { useState } from "react";
import axios from "axios";

function ExpenseItem({ expense, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...expense });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const userId = localStorage.getItem("userId");
  console.log(userId);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/expenses/${expense._id}`,
        form
      );
      onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      alert(err.response?.data?.message || "Error updating expense");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${expense._id}`);
      onDelete(expense._id);
      setShowDeleteModal(false);
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting expense");
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        {isEditing ? (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3 w-full">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="date"
              value={form.date?.slice(0, 10)}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3 text-gray-700 w-full">
            <div className="font-medium">{expense.title}</div>
            <div className="text-green-700 font-semibold">
              ₹{expense.amount}
            </div>
            <div className="capitalize">{expense.category}</div>
            <div className="text-sm text-gray-500">
              {new Date(expense.date).toLocaleDateString()}
            </div>
          </div>
        )}
        <div className="ml-0 md:ml-4 space-x-2 flex-shrink-0">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow-sm transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 shadow-sm transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 shadow-sm transition"
              >
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow-sm transition"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 transition-all">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-5">
                <svg
                  className="h-10 w-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Delete Expense
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-medium">"{expense.title}"</span>? This
                action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                  Delete Expense
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExpenseItem;
