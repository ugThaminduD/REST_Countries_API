import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from '@mui/material'; // Add this for consistent baseline styles
import { logout, getSession } from './utils/session';
import { jwtDecode } from 'jwt-decode';


// Import your components here
import Header from './components/common/Header';
import HomePage from './components/pages/HomePage';
import CountryPage from './components/pages/CountryPage';
import CountryFlags from './components/pages/CountryFlags';
import ProfilePage from './components/pages/ProfilePage';
import Footer from './components/common/Footer';



function App() {
  useEffect(() => {
    const session = getSession();
    if (!session) {
      console.log('No session found. Redirecting to login.');
      alert('Please log in to access this page.');
      logout();
      window.location.href = '/'; 
    } else {
      console.log('Session found:', session);
      const decoded = jwtDecode(session.token);
      const isExpired = decoded.exp * 1000 < Date.now();
      console.log('Token expired:', isExpired);
      if (isExpired) {
        alert('Session expired. Please log in again.');
        logout();
         window.location.href = '/'; 
      }
    }
  }, []);


  return (
    <Router>
      <CssBaseline />
      <Header />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:countryName" element={<CountryPage />} />
          <Route path="/flags" element={<CountryFlags />} />
          <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
