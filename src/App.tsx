import React from 'react';
import Home from './components/Home';
import EmployeeList from './components/EmployeeList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;