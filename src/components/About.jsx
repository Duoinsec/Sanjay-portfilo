import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import PhotoCard from './PhotoCard';

const About = () => {

    return (
        <section id="about" className="py-24 bg-dark relative overflow-hidden min-h-[800px] flex items-center">


            {/* Ambient Decorations */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-neon-blue/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-purple/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Centered Section Header */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 mb-4"
                    >
                        <div className="w-12 h-[1px] bg-neon-blue"></div>
                        <span className="text-neon-blue font-mono text-xs uppercase tracking-[0.5em]">Identity</span>
                        <div className="w-12 h-[1px] bg-neon-blue"></div>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase"
                    >
                        About <span className="text-gradient">Me</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Photo Card */}
                    <div className="flex justify-center items-center w-full relative">
                        <PhotoCard />
                    </div>

                    {/* Right Side: Introduction Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="mb-8">
                                <h4 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2">
                                    SANJAY <span className="text-gradient">G</span>
                                </h4>
                                <h3 className="text-lg md:text-2xl text-gray-300 font-medium flex items-center gap-3">
                                    <Code2 size={24} className="text-neon-purple" />
                                    AI Developer & UI/UX Designer
                                </h3>
                            </div>

                            <div className="space-y-6 text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl">
                                <p>
                                    I am <span className="text-white font-medium">SANJAY G</span>, a results-oriented developer currently pursuing <span className="text-white font-medium">B.TECH (AI&DS)</span> at <span className="text-white font-medium">Sengunthar Engineering College, Tiruchengode</span>.
                                </p>
                                <p>
                                    My goal is to transform complex data into intuitive, high-performance digital experiences. With a foundation in Machine Learning and Modern Frontend architectures, I build applications that are not only intelligent but also visually stunning.
                                </p>
                            </div>

                            {/* Bio Stats/Quick Info */}
                            <div className="grid grid-cols-2 gap-8 pt-8">
                                <div className="space-y-1">
                                    <p className="text-3xl md:text-4xl font-bold text-white">5+</p>
                                    <p className="text-sm text-gray-500 uppercase tracking-widest">Major Projects</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl md:text-4xl font-bold text-white">AI/DS</p>
                                    <p className="text-sm text-gray-500 uppercase tracking-widest">Core Domain</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* CTA Linked to Contact */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 text-white group"
                            >
                                <span className="w-12 h-[1px] bg-white/20 group-hover:w-20 group-hover:bg-neon-blue transition-all duration-500"></span>
                                <span className="font-mono text-sm tracking-widest uppercase group-hover:text-neon-blue transition-colors">Start a project with me</span>
                            </a>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
