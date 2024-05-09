import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import { createRoot } from "react-dom/client";
import Employees from './employees';
import { useState } from "react";
import AddEmployee from './addemployee';
import "./style.css";
import "tailwindcss/tailwind.css";
import EditEmployee from './editemployee';
import { UserProvider } from './usercontext';

const App = () => {

  const [employee, setEmployee] = useState([]);

  const addEmployee = (employee) => {
    setEmployee((prevEmployee) => {
      const updatedEmployee = [...prevEmployee, employee];
      return updatedEmployee;
    });
    console.log("updateEmployee", addEmployee);
  };

  const navigateToFinance = () => {
    window.location.href = "/employees"; 
  };

return (
  <UserProvider>
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
          path="/employees"
          element={
            <Employees employee={employee} setEmployee={setEmployee} />
          }
        />
        <Route
          path="/add-employee"
          element={
            <AddEmployee
              navigateToFinance={navigateToFinance}
              addEmployee={addEmployee}
            />
          }
        />
        <Route
  path="/edit-employee/:index"
  element={<EditEmployee employee={employee} setEmployee={setEmployee} />}
/>
      </Routes>
    </Router>
    </UserProvider>
  );
};

createRoot(document.getElementById("root")).render(<App />);