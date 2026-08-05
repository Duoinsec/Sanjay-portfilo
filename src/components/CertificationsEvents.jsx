import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { achievementsData as staticAchievements } from '../data/achievementsData';
import { supabase } from '../supabaseClient';

const CertificationsEvents = ({ asSection = false }) => {
    const [activeTab, setActiveTab] = useState('certifications');
    const [supabaseAchievements, setSupabaseAchievements] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            const { data, error } = await supabase
                .from('achievements')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (data && !error) {
                const formatted = data.map(a => ({
                    id: a.id,
                    category: a.category,
                    title: a.title,
                    date: a.date,
                    description: a.description,
                    detailedExplanation: a.detailed_explanation || '',
                    skills: a.skills || [],
                    image: a.image,
                    link: "#"
                }));
                setSupabaseAchievements(formatted);
            }
        };

        fetchAchievements();
    }, []);

    // Combine static and dynamic achievements, removing duplicates based on title if necessary
    const deletedStatic = JSON.parse(localStorage.getItem('deletedStaticAchievements') || '[]');
    const visibleStatic = staticAchievements.filter(sa => !deletedStatic.includes(sa.id));

    const achievementsData = supabaseAchievements.length > 0 
        ? [...supabaseAchievements, ...visibleStatic.filter(sa => !supabaseAchievements.find(da => da.title === sa.title))]
        : visibleStatic;

    // Filter data based on active tab
    const activeData = achievementsData.filter(item => item.category === activeTab);

    return (
        <div id="achievements" className={asSection ? "bg-dark text-white relative font-sans antialiased flex flex-col py-24" : "bg-dark min-h-screen text-white relative font-sans antialiased flex flex-col"}>
            {!asSection && <Navbar />}
            
            {/* Ambient Background */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-neon-blue/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-purple/10 blur-[120px] rounded-full pointer-events-none"></div>

            <main className={`flex-grow relative z-10 ${asSection ? '' : 'pt-32 pb-24'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Page Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 mb-4"
                        >
                            <div className="w-12 h-[1px] bg-neon-purple"></div>
                            <span className="text-neon-purple font-mono text-xs uppercase tracking-[0.5em]">Gallery</span>
                            <div className="w-12 h-[1px] bg-neon-purple"></div>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6"
                        >
                            My <span className="text-gradient">Achievements</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 max-w-2xl mx-auto text-lg"
                        >
                            A visual showcase of my certifications, event participation, and speaking engagements.
                        </motion.p>
                    </div>

                    {/* Custom Tabs */}
                    <div className="flex justify-center mb-12">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex glass rounded-full p-1 border border-white/10 flex-wrap justify-center gap-1 sm:gap-0"
                        >
                            {['certifications', 'events', 'speaker'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                                        activeTab === tab 
                                        ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-dark shadow-[0_0_20px_rgba(0,242,255,0.3)]' 
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    {/* Image Gallery Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        <AnimatePresence mode="popLayout">
                            {activeData.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Link 
                                        to={`/achievements/${item.id}`}
                                        className="group block relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-lg hover:shadow-[0_0_30px_rgba(0,242,255,0.15)] hover:border-neon-blue/50 transition-all duration-500 cursor-pointer"
                                    >
                                        {/* Image */}
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                                        
                                        {/* Content container */}
                                        <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <span className="text-[10px] font-mono text-neon-blue mb-2 uppercase tracking-widest bg-dark/50 w-fit px-2 py-1 rounded backdrop-blur-sm border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                {item.date}
                                            </span>
                                            <h3 className="text-xl font-bold text-white leading-tight">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        
                        {activeData.length === 0 && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-20 text-gray-500 font-mono"
                            >
                                No items found in this category.
                            </motion.div>
                        )}
                    </div>

                </div>
            </main>
            
            {!asSection && <Footer />}
        </div>
    );
};

export default CertificationsEvents;
