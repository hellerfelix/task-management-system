import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './pages/Signup.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Home from "./pages/Home.jsx";
import App from './App.jsx'
import './index.css'
import AddTask from './pages/AddTask.jsx';
import EditTask from './pages/EditTask.jsx';
import TaskDetails from './pages/TaskDetails.jsx';

import Dashboard from "./pages/Dashboard";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
       
        <Route path="/home" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);