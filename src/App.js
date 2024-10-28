import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProgramControl from './components/ProgramControl';
import CountryOperatorManagement from './components/CountryOperatorManagement';
import Login from './components/Login';
import { useAuth } from './contexts/AuthContext'; // Ensure correct path

const App = () => {
  const { user, setUser } = useAuth(); // Get user and setUser from AuthContext

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/program-control" element={user ? <ProgramControl /> : <Navigate to="/login" />} />
        <Route path="/country-operator-management" element={user ? <CountryOperatorManagement /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
