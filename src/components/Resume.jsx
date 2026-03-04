import { motion } from 'framer-motion';
import {
    Briefcase,
    GraduationCap,
    Download,
    Calendar,
    ExternalLink,
    Eye,
    Globe,
    Github,
    User,
    Cpu,
    Palette,
    Code2,
    Award,
    Rocket,
    CheckCircle2
} from 'lucide-react';
import DownloadButton from './DownloadButton';
import newProfileImage from './profile-new.jpg';

const Resume = () => {
    // Shared Animation Variants
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
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const experience = [
        {
            role: "AI Developer",
            company: "TechNova Solutions",
            period: "2026 - Present",
            description: "Leading the development of generative AI models and large-scale data processing pipelines for enterprise clients.",
            icon: <Rocket size={20} className="text-neon-blue" />
        },
        {
            role: "Full stack developer",
            company: "DataStream Systems",
            period: "2026 - Present",
            description: "Architected and implemented high-performance web applications using React and distributed backend services.",
            icon: <Briefcase size={20} className="text-neon-purple" />
        }
    ];

    const education = [
        {
            degree: "B.TECH (AI&DS)",
            institution: "Sengunthar Engineering College, Tiruchengode",
            period: "2023 - 2027",
            description: "Specializing in Artificial Intelligence and Data Science with a focus on neural networks and modern computing."
        }
    ];

    const projects_summary = [
        {
            name: "NeuralVision AI",
            description: "Advanced computer vision system powered by custom GAN architectures.",
            link: "#"
        },
        {
            name: "CyberFlow Dashboard",
            description: "Real-time data visualization platform with high-fidelity analytics.",
            link: "#"
        }
    ];

    const certifications = [
        {
            name: "Advanced Machine Learning Specialization",
            provider: "Coursera / Stanford",
            year: "2025"
        },
        {
            name: "Full Stack Development Professional",
            provider: "Meta",
            year: "2025"
        }
    ];

    const skillGroups = [
        {
            title: "Core AI & DS",
            icon: <Cpu size={18} />,
            skills: ["PyTorch", "TensorFlow", "NLP", "Computer Vision", "Scikit-Learn"]
        },
        {
            title: "Development",
            icon: <Code2 size={18} />,
            skills: ["React", "Node.js", "Python", "TypeScript", "FastAPI"]
        },
        {
            title: "Design",
            icon: <Palette size={18} />,
            skills: ["UI/UX", "Figma", "Three.js", "Framer Motion", "Tailwind"]
        }
    ];

    const handleDownload = () => {
        // Download the resume certificate
        const link = document.createElement('a');
        link.href = '/resume.png';
        link.download = 'Sanjay_G_Certificate.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewResume = () => {
        // Open resume in new tab for viewing
        window.open('/resume.png', '_blank');
    };

    return (
        <section id="resume" className="py-24 bg-dark relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-neon-blue/5 rounded-full blur-[160px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* 1. Hero Section */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter">
                            My <span className="text-gradient">Resume</span>
                        </h1>
                        <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                            My skills, experience, and journey in one place.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleViewResume}
                                className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold transition-all group"
                            >
                                <Eye size={20} className="text-neon-purple group-hover:rotate-12 transition-transform" />
                                View Resume
                            </motion.button>

                            <DownloadButton onDownload={handleDownload} />
                        </div>
                    </motion.div>
                </div>

                {/* 2. Structured Layout */}
                <div id="resume-content" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT COLUMN: Profile Summary (4/12) */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-4 space-y-8 sticky lg:top-32"
                    >
                        <motion.div variants={itemVariants} className="glass p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 blur-3xl -mr-10 -mt-10 group-hover:bg-neon-blue/20 transition-all duration-700"></div>

                            <div className="relative z-10">
                                <div className="w-24 h-24 mb-8 relative group/img">
                                    <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-neon-purple rounded-2xl blur-lg opacity-50 group-hover/img:opacity-100 transition-opacity duration-500"></div>
                                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl transform group-hover:rotate-3 transition-transform duration-500">
                                        <img
                                            src={newProfileImage}
                                            alt="Sanjay G"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">SANJAY G</h2>
                                <p className="text-neon-blue font-mono text-sm uppercase tracking-widest mb-6">AI Developer & Designer</p>
                                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                    Passionate about building the next generation of intelligent systems that are as beautiful as they are brainy.
                                </p>

                                <div className="space-y-6">
                                    <h3 className="text-white font-bold flex items-center gap-2">
                                        <Award size={18} className="text-neon-purple" />
                                        Key Expertise
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {["Artificial Intelligence", "UI Engineering", "Data Science", "App Architecture"].map((skill, idx) => (
                                            <span key={idx} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-gray-300 font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Detailed Skill Groups */}
                        {skillGroups.map((group, gIdx) => (
                            <motion.div key={gIdx} variants={itemVariants} className="glass p-8 rounded-[2rem] border border-white/10 group hover:border-white/20 transition-all">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-white/5 rounded-xl text-neon-blue group-hover:scale-110 group-hover:bg-neon-blue group-hover:text-dark transition-all duration-500">
                                        {group.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{group.title}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {group.skills.map((skill, sIdx) => (
                                        <span key={sIdx} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* RIGHT COLUMN: Details (8/12) */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* EXPERIENCE SECTION */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-neon-blue">
                                    <Briefcase size={24} />
                                </div>
                                <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Professional <span className="text-gradient">Experience</span></h2>
                            </div>

                            <div className="space-y-8 border-l-2 border-dashed border-white/10 pl-8 ml-6">
                                {experience.map((item, index) => (
                                    <motion.div key={index} variants={itemVariants} className="relative group">
                                        {/* Timeline anchor */}
                                        <div className="absolute -left-[45px] top-6 w-8 h-8 rounded-full glass border-2 border-neon-blue flex items-center justify-center group-hover:bg-neon-blue transition-all duration-500 shadow-[0_0_15px_rgba(0,242,255,0.3)]">
                                            {item.icon}
                                        </div>

                                        <div className="glass p-8 rounded-3xl border border-white/5 group-hover:border-white/20 group-hover:translate-x-2 transition-all duration-500 bg-gradient-to-br from-white/[0.02] to-transparent">
                                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white mb-1">{item.role}</h3>
                                                    <p className="text-neon-purple font-mono text-sm">{item.company}</p>
                                                </div>
                                                <span className="px-4 py-1 bg-white/5 rounded-full text-xs font-mono text-gray-500 flex items-center gap-2 border border-white/5">
                                                    <Calendar size={12} />
                                                    {item.period}
                                                </span>
                                            </div>
                                            <p className="text-gray-400 text-lg leading-relaxed">{item.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* EDUCATION SECTION */}
                        <div className="grid grid-cols-1 gap-8">

                            {/* EDUCATION */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-neon-purple">
                                        <GraduationCap size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Education</h3>
                                </div>
                                {education.map((item, idx) => (
                                    <motion.div key={idx} variants={itemVariants} className="glass p-8 rounded-[2rem] border border-white/5 hover:border-neon-purple/20 transition-all duration-500 h-full">
                                        <div className="mb-4">
                                            <h4 className="text-xl font-bold text-white mb-1">{item.degree}</h4>
                                            <p className="text-neon-purple text-sm font-medium">{item.institution}</p>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-4 font-mono">{item.period}</p>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                    </motion.div>
                                ))}
                            </motion.div>

                        </div>

                        {/* CERTIFICATIONS SECTION */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-yellow-500">
                                    <Award size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Certifications</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {certifications.map((cert, idx) => (
                                    <motion.div key={idx} variants={itemVariants} className="glass p-6 rounded-2xl border border-white/5 flex items-start gap-4 group hover:border-yellow-500/20 transition-all">
                                        <div className="mt-1">
                                            <CheckCircle2 size={18} className="text-yellow-500/50 group-hover:text-yellow-500 transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1 leading-tight">{cert.name}</h4>
                                            <p className="text-xs text-gray-500 mb-2">{cert.provider}</p>
                                            <span className="text-[10px] uppercase tracking-widest font-mono text-gray-600">{cert.year}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resume;
