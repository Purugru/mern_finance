import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

function Balance() {
  ChartJS.register(ArcElement, Tooltip, Legend);


  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchIncomeAndExpenseData = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const incomeResponse = await axios.get('/income', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const expenseResponse = await axios.get('/expense', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const incomeTotal = incomeResponse.data.reduce(
          (total, income) => total + income.amount,
          0
        );
        const expenseTotal = expenseResponse.data.reduce(
          (total, expense) => total + expense.amount,
          0
        );

        setTotalIncome(incomeTotal);
        setTotalExpense(expenseTotal);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIncomeAndExpenseData();
  }, []);

  const balance = totalIncome - totalExpense;

  const chartData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className="container mx-auto h-fit">
      <div className='flex justify-center pt-24 flex-col h-fit w-full items-center'>
        <div className="my-4 w-[250px] h-[260px] border rounded-lg px-4 py-2">
          <div className='flex py-1 justify-between '>
            <div className='flex space-x-2'>
              <div className='w-[12px] h-[12px] bg-red-400 rounded-full hover:bg-red-600 cursor-pointer'></div>
              <div className='w-[12px] h-[12px] bg-yellow-300 rounded-full hover:bg-yellow-600 cursor-pointer'></div>
              <div className='w-[12px] h-[12px] bg-green-500 rounded-full hover:bg-green-600 cursor-pointer'></div>
            </div>
          </div>

          <div className='mb-2'>
            <div className='text-left mt-2 w-full text-gray-400 select-none text-xs font-semibold uppercase truncate mb-1 ml-0.5'>
              Income
            </div>
            <div className="font-bold text-[18px] mt-1  w-full  border px-2 py-1 rounded-lg">{totalIncome}</div>
          </div>

          <div>
            <div className='text-left mt-2 w-full text-gray-400 select-none text-xs font-semibold uppercase truncate mb-1 ml-0.5'>
              Expense
            </div>
            <div className="font-bold text-[18px] mt-1  w-full  border p-2 rounded-lg">{totalExpense}</div>
          </div>
          <div>
            <div className='text-left mt-2 w-full text-gray-400 select-none text-xs font-semibold uppercase truncate mb-1 ml-0.5'>
              Balance
            </div>
            <div className="font-bold text-[18px] mt-1  w-full  border p-2 rounded-lg">{balance}</div>
          </div>
        </div>

        <div className="flex mt-4 mb-8">
          <div className="w-full md:w-1/2">
            <div className="chart-container" style={{ height: '300px', width: "300px" }}>
              <Doughnut data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Balance;
