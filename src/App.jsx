import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import NeuralBackground from './components/NeuralBackground';
import CopyProtection from './components/CopyProtection';
import PerformanceOptimizer from './components/PerformanceOptimizer';
import { Canvas } from '@react-three/fiber';

// Lazy load non-critical sections
const Work = lazy(() => import('./components/Work'));
const Resume = lazy(() => import('./components/Resume'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <div className="bg-dark min-h-screen text-white relative font-sans antialiased">
      <CopyProtection />
      <PerformanceOptimizer />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <NeuralBackground />
        </Canvas>
      </div>
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Suspense fallback={<div className="h-96" />}>
          <Work />
          <Resume />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}


export default App;

