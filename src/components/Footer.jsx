import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-dark border-t border-white/5 py-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-2xl font-bold text-white tracking-widest font-mono mb-2"
                        >
                            SANJAY<span className="text-neon-blue">.</span>G
                        </motion.div>
                        <p className="text-gray-500 text-sm max-w-xs">
                            © {new Date().getFullYear()} Building the future of digital experiences with AI.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="flex gap-6">
                            {[
                                { icon: <Github size={20} />, href: "#" },
                                { icon: <Twitter size={20} />, href: "#" },
                                { icon: <Linkedin size={20} />, href: "#" },
                                { icon: <Instagram size={20} />, href: "#" }
                            ].map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    whileHover={{ y: -5, color: "#00f2ff" }}
                                    className="text-gray-400 transition-colors"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                        <p className="text-gray-500 text-xs flex items-center gap-1.5">
                            Made with <Heart size={12} className="text-red-500 fill-red-500" /> in India
                        </p>
                    </div>

                    <div className="hidden md:block">
                        <a href="#home" className="text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                            Back to top ↑
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

