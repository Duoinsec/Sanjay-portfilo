import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Globe, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { staticProjects } from '../data/projectsData';

const ProjectCard = ({ project, index }) => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px", amount: 0.3 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="group relative h-full flex flex-col"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/20 to-neon-purple/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 rounded-3xl -z-10"></div>

            {/* Main Card */}
            <div className="flex flex-col h-full bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-4 transition-all duration-500 group-hover:border-white/20 group-hover:-translate-y-2 group-hover:bg-[#0f0f15]/90 shadow-2xl">
                
                {/* Inset Image */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-500"></div>
                    
                    {/* Floating Tech Badges (First 2 tags over image) */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        {project.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase bg-black/60 backdrop-blur-md text-white border border-white/10 rounded-lg">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow px-2">
                    <h3 className="text-2xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neon-blue group-hover:to-neon-purple transition-all duration-300">
                        {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                        {project.description}
                    </p>

                    {/* All Tags (Below Description) */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag, i) => (
                            <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-xs font-mono text-gray-300 group-hover:border-white/10 transition-colors">
                                <Sparkles size={10} className="text-neon-blue opacity-70" />
                                {tag}
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
                        <a
                            href={project.links.demo}
                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-dark rounded-xl text-sm font-bold transition-all hover:bg-neon-blue hover:shadow-[0_0_20px_rgba(0,242,255,0.4)]"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Globe size={16} />
                            View Site
                        </a>
                        <Link
                            to={`/project/${project.id}`}
                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm font-bold transition-all hover:border-white/30 hover:text-neon-purple"
                        >
                            Details
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Work = () => {
    const [supabaseProjects, setSupabaseProjects] = useState([]);
    
    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('display_order', { ascending: true });
            
            if (data && !error) {
                // Map Supabase data to the format used in the card
                const formatted = data.map(p => ({
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    image: p.image_url,
                    tags: p.tags || [],
                    links: { demo: p.demo_url, github: p.github_url }
                }));
                setSupabaseProjects(formatted);
            }
        };

        fetchProjects();
    }, []);

    // Using staticProjects imported from data file

    // Combine static and dynamic projects, removing duplicates based on title if necessary
    const deletedStatic = JSON.parse(localStorage.getItem('deletedStaticProjects') || '[]');
    const visibleStatic = staticProjects.filter(sp => !deletedStatic.includes(sp.id));
    
    const projects = supabaseProjects.length > 0 
        ? [...supabaseProjects, ...visibleStatic.filter(sp => !supabaseProjects.find(dp => dp.title === sp.title))]
        : visibleStatic;

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
