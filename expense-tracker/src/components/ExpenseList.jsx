// src/components/ExpenseList.jsx

import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, onDelete, onUpdate }) {
  console.log(expenses);

  return (
    <div className="space-y-2">
      {expenses?.map((expense) => (
        <ExpenseItem
          key={expense._id}
          expense={expense}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default ExpenseList;
