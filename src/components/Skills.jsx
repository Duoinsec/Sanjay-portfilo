import { motion } from 'framer-motion';
import { Cpu, Code2, Globe, Brain, Database, Layers, Smartphone, Sparkles } from 'lucide-react';

const Skills = () => {
    const skillCategories = [
        {
            title: "AI & Data Science",
            icon: <Brain className="text-neon-blue" size={24} />,
            skills: ["Machine Learning", "Neural Networks", "NLP", "Computer Vision", "TensorFlow", "PyTorch"]
        },
        {
            title: "Frontend Development",
            icon: <Globe className="text-neon-purple" size={24} />,
            skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion", "GSAP"]
        },
        {
            title: "Backend & Cloud",
            icon: <Database className="text-neon-cyan" size={24} />,
            skills: ["Node.js / Express", "Python / FastAPI", "PostgreSQL", "MongoDB", "AWS / Vercel", "Docker"]
        },
        {
            title: "Design & UX",
            icon: <Layers className="text-white" size={24} />,
            skills: ["Figma", "UI Design", "Visual Identity", "3D Modeling", "Prototyping", "Design Systems"]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="skills" className="py-24 relative bg-dark overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-neon-blue/5 rounded-full blur-[100px] -translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 text-neon-blue text-xs font-mono uppercase tracking-widest mb-4"
                    >
                        <Cpu size={14} />
                        Tech Stack
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Frameworks & <span className="text-gradient">Abilities</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        Blending cutting-edge technologies with human-centered design to create impactful digital products.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="glass p-8 rounded-3xl border border-white/5 hover:border-neon-blue/30 transition-all duration-500 group relative overflow-hidden"
                        >
                            {/* Card Background Glow */}
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-neon-blue/10 transition-colors duration-500"></div>

                            <div className="mb-6 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                                {category.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                {category.title}
                            </h3>
                            <ul className="space-y-3">
                                {category.skills.map((skill, sIdx) => (
                                    <li key={sIdx} className="text-gray-400 text-sm flex items-center gap-2 group/item">
                                        <Sparkles size={12} className="text-neon-blue opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                        <span className="group-hover/item:text-white transition-colors">{skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
