import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ExternalLink, Award, Users } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { achievementsData as staticAchievements } from '../data/achievementsData';
import { supabase } from '../supabaseClient';

const AchievementDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [achievement, setAchievement] = useState(null);

    useEffect(() => {
        const fetchAchievement = async () => {
            // 1. Check static achievements first
            const deletedStatic = JSON.parse(localStorage.getItem('deletedStaticAchievements') || '[]');
            const foundStatic = !deletedStatic.includes(id) ? staticAchievements.find(a => a.id === id) : null;
            if (foundStatic) {
                setAchievement(foundStatic);
                window.scrollTo(0, 0);
                return;
            }

            // If not found in static, check Supabase
            const { data, error } = await supabase
                .from('achievements')
                .select('*')
                .eq('id', id)
                .single();

            if (data && !error) {
                setAchievement({
                    id: data.id,
                    category: data.category,
                    title: data.title,
                    date: data.date,
                    description: data.description,
                    detailedExplanation: data.detailed_explanation || '',
                    image: data.image,
                    link: "#",
                    issuer: data.category, // fallback for UI
                });
            } else {
                navigate('/achievements');
            }
            window.scrollTo(0, 0);
        };
        fetchAchievement();
    }, [id, navigate]);

    if (!achievement) return null;

    const getIcon = () => {
        if (achievement.category === 'certifications') return <Award className="text-neon-blue" size={20} />;
        if (achievement.category === 'events') return <Calendar className="text-neon-purple" size={20} />;
        return <Users className="text-neon-cyan" size={20} />;
    };

    const getCategoryName = () => {
        if (achievement.category === 'certifications') return 'Certification';
        if (achievement.category === 'events') return 'Event';
        return 'Speaking Engagement';
    };

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
                        to="/achievements" 
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors mb-8 group font-mono text-sm uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Achievements
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-3xl overflow-hidden border border-white/10"
                    >
                        {/* Hero Image */}
                        <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden bg-dark">
                            <img 
                                src={achievement.image} 
                                alt={achievement.title} 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
                            
                            {/* Tags overlay */}
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <span className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/20">
                                    {getIcon()}
                                    {getCategoryName()}
                                </span>
                                <span className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest bg-white/10 backdrop-blur-md text-gray-300 px-3 py-1.5 rounded-full border border-white/10">
                                    <Calendar size={14} />
                                    {achievement.date}
                                </span>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-8 md:p-12">
                            <div className="mb-8 border-b border-white/10 pb-8">
                                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4 leading-tight">
                                    {achievement.title}
                                </h1>
                                <p className="text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple font-medium">
                                    {achievement.issuer || achievement.role}
                                </p>
                            </div>

                            <div className="prose prose-invert prose-lg max-w-none mb-8">
                                <p className="text-gray-300 leading-relaxed text-xl mb-6">
                                    {achievement.description}
                                </p>
                                {achievement.detailedExplanation && (
                                    <p className="text-gray-400 leading-relaxed text-base border-l-2 border-neon-purple/50 pl-6 py-2 bg-white/[0.02] rounded-r-xl">
                                        {achievement.detailedExplanation}
                                    </p>
                                )}
                            </div>

                            {achievement.skills && achievement.skills.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-sm font-mono text-white mb-4 uppercase tracking-widest">Key Skills Acquired</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {achievement.skills.map((skill, index) => (
                                            <span 
                                                key={index}
                                                className="text-xs font-mono text-neon-blue bg-neon-blue/10 px-3 py-1.5 rounded-full border border-neon-blue/20"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {achievement.link && achievement.link !== '#' && (
                                <div className="mt-12 pt-8 border-t border-white/10">
                                    <a 
                                        href={achievement.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-neon text-dark text-sm font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        View Original Credential
                                        <ExternalLink size={18} />
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>

                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default AchievementDetails;
