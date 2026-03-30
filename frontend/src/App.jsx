import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import History from './pages/History';
import Profile from './pages/Profile';
import Help from './pages/Help';
import AddFunds from './pages/AddFunds'; // NAYA: Ye import karna zaroori tha
import BottomNav from './components/BottomNav';

const MainLayout = () => {
  const location = useLocation();
  
  // Auth routes jahan Bottom Nav nahi chahiye
  const authRoutes = ['/', '/login', '/register', '/forgot-password'];
  const hideBottomNav = authRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Agar bottom nav dikh raha hai toh niche padding (pb-24) do taaki content na chhupe */}
      <div className={!hideBottomNav ? "pb-24" : ""}>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />
          <Route path="/add-funds" element={<AddFunds />} />
        </Routes>
      </div>

      {/* Bottom Nav render condition */}
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;