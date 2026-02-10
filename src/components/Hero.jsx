import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, Twitter, ExternalLink, Bot, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import FadeContent from './FadeContent';
import SplashCursor from './SplashCursor';


const Hero = () => {
    const roles = ["AI Developer", "UI/UX Designer", "App Creator", "Digital Innovator"];
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const socialLinks = [
        { icon: <Instagram size={20} />, href: "https://instagram.com", label: "Instagram" },
        { icon: <Github size={20} />, href: "https://github.com", label: "GitHub" },
        { icon: <Linkedin size={20} />, href: "https://linkedin.com", label: "LinkedIn" },
        { icon: <Twitter size={20} />, href: "https://twitter.com", label: "Twitter" },
    ];

    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-28 pb-20 relative overflow-hidden bg-dark">
            {/* AI Visual Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[140px] animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[120px] animate-pulse-slow"></div>

                {/* Cyberpunk Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                {/* Restricted Splash Cursor */}
                <SplashCursor />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center">
                    {/* Intro Tag */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="px-4 py-1.5 glass rounded-full flex items-center gap-2 mb-8 border border-white/10"
                    >
                        <Sparkles size={14} className="text-neon-blue" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400">Available for new opportunities</span>
                    </motion.div>

                    {/* Main Heading */}
                    <div className="relative mb-6">
                        <motion.h3
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 text-xl md:text-2xl font-medium mb-2"
                        >
                            Hi, I’m
                        </motion.h3>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-6xl md:text-9xl font-bold text-white tracking-tighter"
                        >
                            SANJAY G
                        </motion.h1>
                    </div>

                    {/* Roles Typing Animation */}
                    <div className="h-10 md:h-14 flex items-center mb-8">
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={roles[roleIndex]}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="text-xl md:text-4xl lg:text-5xl font-mono font-bold text-gradient uppercase tracking-[0.15em]"
                            >
                                {roles[roleIndex]}
                            </motion.h2>
                        </AnimatePresence>
                    </div>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
                    >
                        Building <span className="text-white italic">intelligent</span> digital experiences with <span className="text-white">design</span> and technology.
                    </motion.p>

                    {/* Primary CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="flex flex-wrap items-center justify-center gap-6 mb-16"
                    >
                        <FadeContent blur={true} duration={1000} ease="power2.out" initialOpacity={0}>
                            <a
                                href="#work"
                                className="px-10 py-4 bg-transparent text-white font-bold rounded-2xl flex items-center justify-center border-2 border-neon-blue shadow-[0_0_15px_rgba(0,242,255,0.3)] hover:shadow-[0_0_30px_rgba(0,242,255,0.6)] hover:bg-neon-blue/10 transition-all duration-300 transform hover:-translate-y-1 group tracking-wider"
                            >
                                View Projects
                            </a>
                        </FadeContent>
                    </motion.div>




                    {/* Social Media Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="flex items-center gap-8"
                    >
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-neon-blue transition-all duration-300 hover:scale-125 transform"
                                aria-label={social.label}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Floating Element (Optional) */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block opacity-20 pointer-events-none"
            >
                <Bot size={300} strokeWidth={0.5} className="text-neon-blue" />
            </motion.div>
        </section>
    );
};

export default Hero;

