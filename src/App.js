import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './App.css';

function App() {
  return (
  <Router>
    <Routes>
      <Route exact path='/' element={<LoginForm />}/>
      <Route path='/register' element={<RegisterForm />}/>
    </Routes>
  </Router>
)}

export default App;
