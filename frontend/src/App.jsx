import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import './App.css'
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <div className="container mt-3">

        <Routes>
          <Route exact path="/" element={<Home />} />
          
        </Routes>

      </div>

    </div>
  )
}

export default App
