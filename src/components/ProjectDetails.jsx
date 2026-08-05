import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Github, Sparkles } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { supabase } from '../supabaseClient';
import { staticProjects } from '../data/projectsData';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);
            
            // 1. Check static projects first
            const deletedStatic = JSON.parse(localStorage.getItem('deletedStaticProjects') || '[]');
            const foundStatic = !deletedStatic.includes(id) ? staticProjects.find(p => p.id === id) : null;
            
            if (foundStatic) {
                setProject(foundStatic);
                setLoading(false);
                return;
            }

            // 2. If not static, check Supabase
            try {
                // We assume id is a valid UUID if it's from Supabase
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', id)
                    .single();
                
                if (error || !data) {
                    throw new Error('Project not found');
                }

                // Format Supabase data to match our component structure
                setProject({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    detailedExplanation: data.detailed_explanation || data.description, // Use detailed_explanation if available
                    image: data.image_url,
                    tags: data.tags || [],
                    links: { demo: data.demo_url, github: data.github_url }
                });
            } catch (err) {
                console.error(err);
                setError('Project not found');
                setTimeout(() => navigate('/#work'), 2000);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
        window.scrollTo(0, 0);
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-neon-blue/30 border-t-neon-blue rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center text-white font-mono">
                {error || 'Project not found. Redirecting...'}
            </div>
        );
    }

    return (
        <div className="bg-dark min-h-screen text-white relative font-sans antialiased flex flex-col">
            <Navbar />
            
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-purple/10 blur-[150px] rounded-full pointer-events-none"></div>

            <main className="flex-grow pt-32 pb-24 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Back Button */}
                    <Link 
                        to="/#work" 
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors mb-8 group font-mono text-sm uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-3xl overflow-hidden border border-white/10"
                    >
                        {/* Hero Image */}
                        <div className="relative h-[40vh] md:h-[50vh] min-h-[300px] w-full overflow-hidden bg-dark">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
                            
                            {/* Tech Stack Overlay */}
                            <div className="absolute bottom-6 left-6 flex flex-wrap gap-2 pr-6">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/20">
                                        <Sparkles size={12} className="text-neon-blue" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-8 md:p-12">
                            <div className="mb-8 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                                    {project.title}
                                </h1>
                                
                                <div className="flex items-center gap-3 shrink-0">
                                    {project.links?.demo && project.links.demo !== '#' && (
                                        <a 
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-6 py-3 bg-neon-blue text-dark font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all hover:-translate-y-0.5 text-sm"
                                        >
                                            <Globe size={16} />
                                            Live Demo
                                        </a>
                                    )}
                                    {project.links?.github && project.links.github !== '#' && (
                                        <a 
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white transition-all hover:-translate-y-0.5 hover:text-neon-purple hover:border-white/40"
                                            aria-label="View Source Code"
                                        >
                                            <Github size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="prose prose-invert prose-lg max-w-none">
                                <h3 className="text-xl font-bold text-white mb-4">Overview</h3>
                                <p className="text-gray-300 leading-relaxed mb-8">
                                    {project.description}
                                </p>

                                {project.detailedExplanation && project.detailedExplanation !== project.description && (
                                    <>
                                        <h3 className="text-xl font-bold text-white mb-4">Technical Details</h3>
                                        <p className="text-gray-400 leading-relaxed text-base border-l-2 border-neon-purple/50 pl-6 py-2 bg-white/[0.02] rounded-r-xl">
                                            {project.detailedExplanation}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default ProjectDetails;
