import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Show navbar only when near the top of the page
            setIsVisible(window.scrollY < 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#work' },
        { name: 'Resume', href: '#resume' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed w-full z-50 bg-transparent py-8 pointer-events-auto"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-14">
                            {/* Logo */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex-shrink-0"
                            >
                                <a href="#home" className="text-2xl font-bold text-white tracking-widest font-mono group">
                                    SANJAY<span className="text-neon-blue group-hover:animate-pulse">.</span>G
                                </a>
                            </motion.div>

                            {/* Centered Navigation */}
                            <div className="hidden md:flex flex-1 justify-center">
                                <div className="flex items-center space-x-8">
                                    {navLinks.map((link, index) => (
                                        <motion.a
                                            key={link.name}
                                            href={link.href}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="relative text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-300 group"
                                        >
                                            {link.name}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-blue transition-all duration-300 group-hover:w-full"></span>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Right CTA */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="hidden md:block"
                            >
                                <a
                                    href="#contact"
                                    className="px-6 py-2 bg-gradient-neon text-white text-sm font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all duration-300 transform hover:scale-105 inline-block"
                                >
                                    Hire Me
                                </a>
                            </motion.div>

                            {/* Mobile menu button */}
                            <div className="flex md:hidden">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="p-2 rounded-md text-gray-400 hover:text-white transition-colors"
                                >
                                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden glass-nav overflow-hidden mt-4"
                            >
                                <div className="px-4 pt-6 pb-6 space-y-2">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="text-gray-300 hover:text-neon-blue block px-3 py-4 rounded-md text-base font-medium border-b border-white/5 transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </a>
                                    ))}
                                    <div className="pt-4">
                                        <a
                                            href="#contact"
                                            className="w-full block text-center px-6 py-4 bg-gradient-neon text-white font-bold rounded-xl active:scale-95 transition-transform"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Contact Me
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.nav>
            )}
        </AnimatePresence>

    );
};

export default Navbar;

