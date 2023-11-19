import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import { PiShareNetwork } from "react-icons/pi"
import { GiGiftOfKnowledge } from "react-icons/gi"
import { HiOutlineInformationCircle } from "react-icons/hi"
import img from "./main_page_bg.png"

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchIncomeAndExpense = async () => {
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
        setIncomes(incomeResponse.data);
        setExpenses(expenseResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIncomeAndExpense();
  }, [user]);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    if (Array.isArray(incomes) && incomes.length > 0) {
      totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
    }

    if (Array.isArray(expenses) && expenses.length > 0) {
      totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    const balance = totalIncome - totalExpense;

    setTotalIncome(totalIncome);
    setTotalExpense(totalExpense);
    setBalance(balance);
  }, [incomes, expenses]);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex flex-col  items-center bg-clip-text'>
      <div className='mt-32 bg-gradient-to-r text-[24px]  font-extrabold uppercase leading-[24.2px] tracking-widest md:text-[26px] md:leading-[30px] lg:leading-[36px] bg-clip-text text-transparent from-[#3DBFF5] to-[#6F42C1] lg:text-[32px]'>
        CHECK RETURNS
      </div>
      <h1 className='text-gray-900 dark:text-dark-gray-900 text-[28px] font-extrabold leading-[34px] tracking-tight md:text-[40px] md:leading-[48px] lg:text-5xl lg:leading-[55px] w-full max-w-[740px] !whitespace-pre-line text-center mt-8'>
        Maximizing <span className='bg-gradient-to-r bg-clip-text text-transparent from-[#8A63D2] to-[#E23A3A]'>Returns,</span> <div>Minimizing <span className='bg-gradient-to-r bg-clip-text text-transparent from-[#8A63D2] to-[#E23A3A] '>Efforts</span></div>
      </h1>


      <div className='text-gray-800 dark:text-dark-gray-800 max-w-[740px] text-[16px] leading-[22px] md:text-[19px] md:leading-[26px] lg:text-[24px] lg:leading-[36px] md:font-medium text-center mt-4 px-8'>
        Maximizing financial returns with minimal input, our investment calculator streamlines the process, helping you make informed investment decisions effortlessly
      </div>

      <div className='mt-24 px-8'>
        <img src={img} height={680} width={525} alt='Main_BG' />
      </div>

      <div className='mt-16'>
        <div className='mb-4 px-4 text-center text-[28px] font-extrabold leading-8 text-gray-900 dark:text-dark-gray-900 md:text-[40px] md:leading-[48px]'>Save / Share your <span className='bg-gradient-to-r bg-clip-text text-transparent from-[#E23A3A] to-[#E58A00]'>Results</span></div>
        <div className='mx-auto max-w-2xl px-4 text-center text-[16px] leading-6 text-gray-900 dark:text-dark-gray-800 md:text-[20px] md:leading-8 '>Save or share your calculated results for informed financial decisions</div>

        <div className='flex justify-center mt-10'>
          <div className='flex flex-wrap justify-center sm:justify-around lg:w-10/12 xl:w-11/12'>
            <div className='relative border-2 z-10 flex transform-gpu cursor-pointer flex-col rounded-2xl bg-white p-4 shadow-lg gradient-border-2 hover:border-gradient-tl-light-blue-white lg:max-w-[325px] m-5 sm:w-[280px] lg:w-[300px] xl:w-[320px]'>
              <div className='h-[150px] w-full rounded object-cover flex justify-center items-center text-[#E23A3A]'>
                <PiShareNetwork size={80} />
              </div>
              <div className="tracking-tight my-3 font-inter text-lg font-semibold leading-6 text-gray-800">Share Your Financial Success</div>
              <div className='blue-link mb-5 text-base font-normal leading-[22px] text-gray-500'>We believe in celebrating your financial milestones. Share your calculated results with your friends and family to showcase your wise investment decisions.</div>
            </div>
            <div className='relative border-2 z-10 flex transform-gpu cursor-pointer flex-col rounded-2xl bg-white p-4 shadow-lg gradient-border-2 hover:border-gradient-tl-light-blue-white lg:max-w-[325px] m-5 sm:w-[280px] lg:w-[300px] xl:w-[320px]'>
              <div className='h-[150px] w-full rounded object-cover flex justify-center items-center text-[#e2d278]'>
                <GiGiftOfKnowledge size={80} />
              </div>
              <div className="tracking-tight my-3 font-inter text-lg font-semibold leading-6 text-gray-800">Spread the Knowledge</div>
              <div className='blue-link mb-5 text-base font-normal leading-[22px] text-gray-500'>Sharing your calculated results can inspire others to take control of their financial future. Educate and empower your network with the insights gained from our calculators.</div>
            </div>
            <div className='relative border-2 z-10 flex transform-gpu cursor-pointer flex-col rounded-2xl bg-white p-4 shadow-lg gradient-border-2 hover:border-gradient-tl-light-blue-white lg:max-w-[325px] m-5 sm:w-[280px] lg:w-[300px] xl:w-[320px]'>
              <div className='h-[150px] w-full rounded object-cover flex justify-center items-center text-[#E58A00]'>
                <HiOutlineInformationCircle size={80} />
              </div>
              <div className="tracking-tight my-3 font-inter text-lg font-semibold leading-6 text-gray-800">Stay Informed Together</div>
              <div className='blue-link mb-5 text-base font-normal leading-[22px] text-gray-500'>By sharing your financial achievements, you join a community of informed investors. Together, we can navigate the complexities of finance.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
