import React from 'react';
import Home from './components/Home';
import EmployeeList from './components/EmployeeList';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeDetail from './components/EmployeeDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;