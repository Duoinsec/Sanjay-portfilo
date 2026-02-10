import { motion, useReducedMotion } from 'framer-motion';
import { Github, Globe, Code2, Sparkles } from 'lucide-react';
import nammaSewaImg from './nammasewa.png';

const ProjectCard = ({ project, index }) => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px", amount: 0.3 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="group relative z-10"
        >
            {/* Ambient Card Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 rounded-[2rem]"></div>

            <div className="relative h-full glass border border-white/10 rounded-[2rem] transition-all duration-500 group-hover:border-white/20 group-hover:translate-y-[-8px] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-slate-900/60 flex flex-col">
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-neon-blue transition-colors">
                            {project.title}
                        </h3>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                        {project.description}
                    </p>

                    <div className="mt-auto space-y-6">
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, i) => (
                                <div key={i} className="flex items-center gap-1.5 px-3 py-1 glass rounded-lg border border-white/5 text-[10px] font-mono text-gray-300">
                                    <Sparkles size={8} className="text-neon-blue opacity-50" />
                                    {tag}
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-6 mt-4 border-t border-white/10">
                            <motion.a
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                href={project.links.demo}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-neon-blue text-dark rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:shadow-[0_0_35px_rgba(0,242,255,0.5)]"
                            >
                                <Globe size={16} />
                                Demo
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                href={project.links.github}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-xs font-black uppercase tracking-wider text-white transition-all shadow-xl"
                            >
                                <Code2 size={16} />
                                Code
                            </motion.a>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Work = () => {
    const projects = [
        {
            title: 'NammaSewa',
            description: 'Career Guidance & Admission Support Portal - An online platform that provides guidance and support for students seeking admission in medical and engineering courses. Offers information about courses, admission processes, and counseling services to help students make informed academic decisions.',
            image: nammaSewaImg,
            tags: ['React', 'Node.js', 'Education'],
            links: { demo: 'https://nammasewa.com/', github: '#' }
        },
        {
            title: 'Billing Software',
            description: 'A web-based billing software developed to generate invoices, manage customers, and store billing records efficiently. The system automates billing processes and improves accuracy and productivity.',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
            tags: ['React', 'Node.js', 'MySQL', 'Bootstrap'],
            links: { demo: 'https://vkinfotech-billing-du1k.vercel.app/billing', github: '#' }
        },
        {
            title: 'Academic Nexus',
            description: 'Research & Knowledge Sharing Platform - A web-based platform designed to share academic research and knowledge resources. It helps users access educational content and information through a structured digital interface.',
            image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
            tags: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
            links: { demo: 'https://academic-nexus-delta.vercel.app', github: '#' }
        },
        {
            title: 'DuoinsecGroups',
            description: 'Cybersecurity & Enterprise Solutions Platform - A professional website designed to showcase security services, training programs, and technical solutions. Highlights offerings such as security consulting, penetration testing, and cybersecurity training for businesses and learners.',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
            tags: ['React', 'Node.js', 'Tailwind CSS', 'Vercel'],
            links: { demo: 'https://duoinsecgroups.com/', github: '#' }
        },
        {
            title: 'Holographic UI System',
            description: 'A comprehensive design system and component library focused on delivering cinematic user interfaces with real-time WebGL effects.',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
            tags: ['WebGL', 'GLSL', 'TypeScript'],
            links: { demo: '#', github: '#' }
        }
    ];

    return (
        <section id="work" className="py-24 bg-dark relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="max-w-3xl mb-16 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 mb-4 justify-center"
                    >
                        <div className="w-8 h-[1px] bg-neon-blue"></div>
                        <span className="text-neon-blue font-mono text-xs uppercase tracking-widest text-shadow-glow">Selected Projects</span>
                        <div className="w-8 h-[1px] bg-neon-blue"></div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tighter"
                    >
                        My <span className="text-gradient">Projects</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg leading-relaxed"
                    >
                        A collection of technical solutions and creative experiments,
                        ranging from artificial intelligence models to immersive digital experiences.
                    </motion.p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

                {/* Footer CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <p className="text-gray-500 font-medium italic text-center md:text-left">
                        Check out my GitHub for more open-source contributions and experiments.
                    </p>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 glass border border-white/10 rounded-2xl text-white font-bold hover:bg-white/5 transition-all hover:border-neon-blue group"
                    >
                        <Github size={20} className="group-hover:rotate-12 transition-transform" />
                        Explore GitHub
                    </a>
                </motion.div>
            </div>

            {/* Background Ambience */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none"></div>
        </section>
    );
};

export default Work;
