import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from '@mui/material'; // Add this for consistent baseline styles

// Import your components here
import Header from './components/common/Header';
import HomePage from './components/pages/HomePage';
import CountryPage from './components/pages/CountryPage';
import CountryFlags from './components/pages/CountryFlags';
import ProfilePage from './components/pages/ProfilePage';
import Footer from './components/common/Footer';



function App() {
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
