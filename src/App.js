import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LifeInsurancePage from './pages/LifeInsurancePage';
import HealthInsurancePage from './pages/HealthInsurancePage';
import EducationCalculatorPage from './pages/EducationCalculatorPage';
import VisualizationPage from './pages/VisualizationPage';
import RecommendationsPage from './pages/RecommendationsPage';
import MedicalCalculatorPage from './pages/MedicalCalculatorPage';
import LegalPage from './pages/LegalPage';

import './App.css';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      delay: 0,
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/life-insurance" element={<LifeInsurancePage />} />
            <Route path="/health-insurance" element={<HealthInsurancePage />} />
            <Route path="/education-calculator" element={<EducationCalculatorPage />} />
            <Route path="/medical-calculator" element={<MedicalCalculatorPage />} />
            <Route path="/insights" element={<VisualizationPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/legal" element={<LegalPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
