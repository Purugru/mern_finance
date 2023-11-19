import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Navbar from "./components/Navbar";
import Dashboard from './components/Dashboard';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import IncomeList from './components/IncomeList';
import ExpenseList from './components/ExpenseList';
import Balance from './components/Balance';
import Category from './components/Category';
import Footer from "./components/Footer"


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Registration + Login Routes */}
        <Route path="/auth/signup" element={<IsAnon><SignUpPage /></IsAnon>} />
        <Route path="/auth/login" element={<IsAnon><LoginPage /></IsAnon>} />

        {/* Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<IsPrivate><Dashboard /></IsPrivate>} />

        {/* Features */}
        <Route path="/income" element={<IsPrivate><IncomeList /></IsPrivate>} />
        <Route path="/expense" element={<IsPrivate><ExpenseList /></IsPrivate>} />
        <Route path="/balance" element={<IsPrivate><Balance /></IsPrivate>} />
        <Route path="/category" element={<IsPrivate><Category /></IsPrivate>} />
      </Routes>
      <Footer />
    </div >

  );
}

export default App;