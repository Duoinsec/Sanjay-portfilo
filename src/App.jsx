import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import NeuralBackground from './components/NeuralBackground';
import CopyProtection from './components/CopyProtection';
import PerformanceOptimizer from './components/PerformanceOptimizer';

// Lazy load non-critical sections
const Skills = lazy(() => import('./components/Skills'));
const Work = lazy(() => import('./components/Work'));
const Resume = lazy(() => import('./components/Resume'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const Login = lazy(() => import('./components/Login'));
const Admin = lazy(() => import('./components/Admin'));
const CertificationsEvents = lazy(() => import('./components/CertificationsEvents'));
const AchievementDetails = lazy(() => import('./components/AchievementDetails'));
const ProjectDetails = lazy(() => import('./components/ProjectDetails'));

function Portfolio() {
  return (
    <div className="bg-dark min-h-screen text-white relative font-sans antialiased">
      <CopyProtection />
      <PerformanceOptimizer />

      {/* Neural background - pure Canvas2D, no WebGL conflict */}
      <NeuralBackground />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Suspense fallback={<div className="h-96" />}>
          <Skills />
          <Work />
          <Resume />
          <CertificationsEvents asSection={true} />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen bg-dark" />}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/achievements" element={<CertificationsEvents />} />
          <Route path="/achievements/:id" element={<AchievementDetails />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
