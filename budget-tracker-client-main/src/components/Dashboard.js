import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "./dashboard.css"
import { AuthContext } from '../context/auth.context';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, ArcElement } from 'chart.js';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faShoppingCart, faWallet } from '@fortawesome/free-solid-svg-icons';


function Dashboard() {
  const { user } = useContext(AuthContext);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  Chart.register(ArcElement);

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
  }, [incomes, expenses]); //, totalIncome, totalExpense]);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }





  // Prepare data for the chart
  const chartData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: [
          'rgba(200, 230, 203, 0.6)', // Income color
          'rgba(255, 99, 132, 0.6)', // Expense color
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',

        ],
        borderWidth: 1,
        formatter: (value, ctx) => {
          let sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          if (sum === 0) return '0%';
          const percentage = ((value / sum) * 100).toFixed(2);
          return `${percentage}%`;
        },
        color: 'black',
      },


    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 20,
      },
    },
  };


  return (
    <div className="container">

      <div className='container my-5'>
        <div className='gradient-text'>
          Check Returns
        </div>

        <h1 className='header my-4'>
          <div className='flex items-center justify-center'>
            Maximizing
            <span className='wavy-text mx-2'>
              Returns
            </span>
          </div>
          <div className='flex items-center justify-center'>
            Minimizing
            <span className='wavy-text mx-2'>
              Efforts
            </span>
          </div>
        </h1>

        <div className='description mx-auto'>
          Maximizing financial returns with minimal input, our investment calculator streamlines the process, helping you make informed investment decisions effortlessly
        </div>
      </div>


      {/* <div className="row justify-content-center">
        <div className="col-lg-4">
          <Card className="mb-3" style={{ backgroundColor: "#c3e6cb" }}>
            <Card.Body>
              <Card.Title><FontAwesomeIcon icon={faMoneyBillWave} /> Total Income</Card.Title>
              <Card.Text>{totalIncome}</Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-4">
          <Card className="mb-3" style={{ backgroundColor: "#f5c6cb" }}>
            <Card.Body>
              <Card.Title><FontAwesomeIcon icon={faShoppingCart} /> Total Expense</Card.Title>
              <Card.Text>{totalExpense}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div> */}

      {/* <div className="row justify-content-center">
        <div className="col-md-6">
          <Card className="mb-3" style={{ backgroundColor: "#ffeeba" }}>
            <Card.Body>
              <Card.Title><FontAwesomeIcon icon={faWallet} /> Balance</Card.Title>
              <Card.Text>{balance}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div> */}

      {/* <div className="row justify-content-center mt-3">
        <div className="col-lg-10">
          <div className="chart-container" style={{ height: '300px' }}>
            <Pie data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Dashboard;
