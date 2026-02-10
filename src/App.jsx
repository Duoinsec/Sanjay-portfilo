import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NeuralBackground from './components/NeuralBackground';
import CopyProtection from './components/CopyProtection';
import PerformanceOptimizer from './components/PerformanceOptimizer';
import { Canvas } from '@react-three/fiber';

function App() {
  return (
    <div className="bg-dark min-h-screen text-white relative font-sans antialiased">
      <CopyProtection />
      {/* <PerformanceOptimizer /> */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <NeuralBackground />
        </Canvas>
      </div>
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Work />
        <Resume />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}


export default App;

