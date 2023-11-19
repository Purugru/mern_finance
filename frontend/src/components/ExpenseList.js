import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete, MdEdit, MdClose } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const fetchExpenseData = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.get('/expense', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200 && Array.isArray(response.data)) {
        setExpenses(response.data);
      } else {
        console.log("Error: Expected array but received:", response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (expense) => {
    const expenseToEdit = { ...expense };

    const date = new Date(expenseToEdit.date);
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();

    day = day < 10 ? `0${day}` : day;
    month = month < 10 ? `0${month}` : month;

    const formattedDate = `${year}-${month}-${day}`;
    expenseToEdit.date = formattedDate;
    setEditingExpense(expenseToEdit);
  };

  const handleInputChange = (e, expenseSetter) => {
    const { name, value } = e.target;
    expenseSetter((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    const authToken = localStorage.getItem('authToken');
    try {
      await axios.delete(`/expense/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e, expense, setter) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken');
    try {
      setIsUpdating(true);

      if (expense._id) {
        await axios.put(`/expense/${expense._id}`, expense, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      } else {
        await axios.post('/expense', expense, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      }

      fetchExpenseData();
      setter({
        category: '',
        amount: '',
        date: new Date().toLocaleDateString('en-GB').split('/').join('.'),
        currency: '',
        description: '',
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      setEditingExpense(null);
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  return (
    <div className="w-2/3 mx-auto mb-24 h-fit">
      <div className='flex flex-col'>
        <h2 className="text-4xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-l  from-[#E23A3A] to-[#E58A00] mt-24">My Expense</h2>
        <button
          type="button"
          className="btn bg-e76e50 text-black w-fit mt-2"
          style={{ "border": "2px solid rgb(230, 230, 230, 0.8)" }}
          onClick={() => setEditingExpense({})}
        >
          Add Expense
        </button>
      </div>

      <div className='mt-4 flex flex-wrap justify-center'>
        {Array.isArray(expenses) &&
          expenses.map((expense) => (
            <div key={expense._id} className="my-4 w-[250px] h-[180px] border rounded-lg px-4 py-2 m-4">
              <div className='flex py-1 justify-between '>
                <div className='flex space-x-2'>
                  <div className='w-[12px] h-[12px] bg-red-400 rounded-full hover:bg-red-600 cursor-pointer'></div>
                  <div className='w-[12px] h-[12px] bg-yellow-300 rounded-full hover:bg-yellow-600 cursor-pointer'></div>
                  <div className='w-[12px] h-[12px] bg-green-500 rounded-full hover:bg-green-600 cursor-pointer'></div>
                </div>

                <div className='flex space-x-2'>
                  <div className="border bg-gray-200 hover:bg-gray-400 p-1 rounded-lg cursor-pointer" onClick={() => handleDelete(expense._id)}>
                    <MdDelete size={22} />
                  </div>
                  <div className="border bg-gray-200 hover:bg-gray-400 p-1 rounded-lg cursor-pointer" onClick={() => handleEdit(expense)}>
                    <MdEdit size={20} />
                  </div>
                </div>
              </div>

              <div className="font-bold text-center text-[18px] mt-3">{expense.category}</div>
              <div className="mt-4 flex justify-between">
                <div>
                  <span className="text-[12px]">{expense.currency}</span>
                  {expense.amount}
                </div>
                <div>{new Date(expense.date).toLocaleDateString('en-GB')}</div>
              </div>
              <div className="mt-2">{expense.description}</div>
            </div>
          ))}
      </div>

      <div className="">
        {editingExpense && (
          <div className="w-[250px] h-fit border rounded-lg px-4 py-2">
            <form>

              <div className='flex py-1 justify-between'>
                <div className='flex space-x-2'>
                  <div className='w-[12px] h-[12px] bg-red-400 rounded-full hover:bg-red-600 cursor-pointer'></div>
                  <div className='w-[12px] h-[12px] bg-yellow-300 rounded-full hover:bg-yellow-600 cursor-pointer'></div>
                  <div className='w-[12px] h-[12px] bg-green-500 rounded-full hover:bg-green-600 cursor-pointer'></div>
                </div>

                <div className='flex space-x-2'>
                  <div className="border bg-gray-200 hover:bg-gray-400 p-1 rounded-lg cursor-pointer" onClick={() => setEditingExpense(null)}>
                    <MdClose size={20} />
                  </div>
                  <div className="border bg-gray-200 hover:bg-gray-400 p-1 rounded-lg cursor-pointer" onClick={(e) => handleSubmit(e, editingExpense, setEditingExpense)}>
                    <FaSave size={20} />
                  </div>

                </div>
              </div>

              <div className="font-bold text-center text-[18px] mt-3">{editingExpense._id ? 'Edit Expense' : 'Add New Expense'}</div>
              <div className="mt-4">
                <div className='text-left mt-2 w-full text-gray-400 select-none text-xs font-semibold uppercase truncate mb-1 ml-0.5'>
                  Category
                </div>
                <input
                  type="text"
                  className="form-input w-full  border p-2 rounded-lg"
                  name="category"
                  placeholder='Category Name'
                  required
                  value={editingExpense.category || ''}
                  onChange={(e) => handleInputChange(e, setEditingExpense)}
                />
              </div>
              <div className="mt-4">
                <div className='text-left mt-2 w-full text-gray-400 select-none text-xs font-semibold uppercase truncate mb-1 ml-0.5'>
                  Amount
                </div>
                <input
                  type="number"
                  className="form-input w-full  border p-2 rounded-lg"
                  name="amount"
                  placeholder='Amount'
                  required
                  value={editingExpense.amount || ''}
                  onChange={(e) => handleInputChange(e, setEditingExpense)}
                />
              </div>
              <div className="mt-4">
                <div className='text-left mt-2 w-full text-gray-400 select-none text-xs font-semibold uppercase truncate mb-1 ml-0.5'>
                  Date
                </div>
                <input
                  type="date"
                  className="form-input w-full border p-2 rounded-lg"
                  name="date"
                  required
                  value={editingExpense.date || ''}
                  onChange={(e) => handleInputChange(e, setEditingExpense)}
                />
              </div>

              <div className="mt-4">
                <div className='text-left mt-2 w-full text-gray-400 select-none text-xs font-semibold uppercase truncate mb-1 ml-0.5'>
                  Description
                </div>
                <textarea
                  className="form-textarea w-full border-2 rounded-lg"
                  name="description"
                  value={editingExpense.description || ''}
                  onChange={(e) => handleInputChange(e, setEditingExpense)}
                ></textarea>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="btn bg-e76e50 text-white mr-2"
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Submit'}
                </button>

                <button
                  onClick={() => setEditingExpense(null)}
                  className="btn btn-secondary"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseList;
