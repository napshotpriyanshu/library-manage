import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import './App.css'
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Books from "./components/Books";
import Customers from "./components/Customers";
import Transactions from "./components/Transactions";
import AddBook from "./components/AddBook";
import AddCustomer from "./components/AddCustomer";
import IssueBook from "./components/IssueBook";
import ReturnBook from "./components/ReturnBook";

function App() {
  return (
    <div className="App">
      <div className="container mt-3">
        <Navbar/>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/books" element={<Books />} />
          <Route exact path="/customers" element={<Customers />} />
          <Route exact path="/transactions" element={<Transactions />} />
          <Route exact path="/addbook" element={<AddBook />} />
          
          <Route exact path="/addcustomer" element={<AddCustomer />} />
          <Route exact path="/issuebook" element={<IssueBook />} />
          <Route exact path="/returnbook" element={<ReturnBook />} />
        
        </Routes>

      </div>

    </div>
  )
}

export default App
