import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin, Instagram, Rocket, Sparkles, CheckCircle, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { supabase } from '../supabaseClient';

const Contact = () => {
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const cardRef = useRef(null);

    // 🧊 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    // Dynamic Shadow based on tilt
    const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [20, -20]);
    const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        // Get form data
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const contact = formData.get('contact');
        const description = formData.get('description');

        try {
            // 1. Try sending to Supabase
            const { error } = await supabase.from('contacts').insert([
                { name, email, contact, description }
            ]);

            if (error) throw error;

            setIsSent(true);
            e.target.reset();
        } catch (error) {
            console.error('Error sending message to Supabase:', error);
            
            // 2. Fallback to Mailto if Supabase fails (or is not configured)
            const subject = `Portfolio Contact from ${name}`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AContact: ${contact}%0D%0A%0D%0AMessage:%0D%0A${description}`;
            window.location.href = `mailto:g.sanjayofficial4@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            // Still show "Sent" as we triggered the fallback
            setIsSent(true);
        } finally {
            setIsSending(false);
            setTimeout(() => setIsSent(false), 5000);
        }
    };

    const contactInfo = [
        {
            icon: <Mail size={24} />,
            label: "Email",
            value: "g.sanjayofficial4@gmail.com",
            color: "text-neon-blue",
            link: "mailto:g.sanjayofficial4@gmail.com"
        },
        {
            icon: <Phone size={24} />,
            label: "Phone",
            value: "+91 73970 29212",
            color: "text-neon-purple",
            link: "tel:+917397029212"
        },
        {
            icon: <MapPin size={24} />,
            label: "Location",
            value: "Rasipuram, Namakkal",
            color: "text-white",
            link: "#"
        }
    ];

    const socialLinks = [
        { icon: <Github size={20} />, href: "https://github.com", label: "GitHub" },
        { icon: <Linkedin size={20} />, href: "https://linkedin.com", label: "LinkedIn" },
        { icon: <Instagram size={20} />, href: "https://www.instagram.com/itz_me_sanzz_x?igsh=MXZ4MTA4ejhhbmI1dw%3D%3D&utm_source=qr", label: "Instagram" }
    ];

    return (
        <section id="contact" className="py-24 bg-dark relative overflow-hidden min-h-screen flex items-center">
            {/* Background elements */}
            <div className="absolute -left-20 top-40 w-96 h-96 bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute -right-20 bottom-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                {/* 1. Hero Section */}
                <div className="text-center mb-20 md:mb-28">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border border-white/10 text-neon-blue text-xs font-mono uppercase tracking-[0.3em] mb-8"
                    >
                        <Sparkles size={14} />
                        Get In Touch
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter"
                    >
                        Contact <span className="text-gradient">Me</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Let's build something amazing together.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* LEFT Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold text-white tracking-tight">Reach Out Direct</h3>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                                Have a groundbreaking idea or a complex problem to solve? I'm just a signal away.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {contactInfo.map((item, idx) => (
                                <motion.a
                                    key={idx}
                                    href={item.link}
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-6 group"
                                >
                                    <div className={`p-5 glass rounded-[1.5rem] ${item.color} group-hover:bg-white/10 transition-all duration-300 border border-white/5`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-1">{item.label}</p>
                                        <p className="text-white text-xl font-medium group-hover:text-neon-blue transition-colors leading-none">{item.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        <div className="pt-8">
                            <p className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-6">Social Connect</p>
                            <div className="flex items-center gap-6">
                                {socialLinks.map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.href}
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        className="p-4 glass rounded-2xl text-gray-400 hover:text-neon-blue border border-white/5 hover:border-neon-blue/20 transition-all"
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT Side: Simplified Form Card */}
                    <div className="relative group/card-container">
                        <motion.div
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            initial={{ opacity: 0, y: 100, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            style={{
                                rotateX, rotateY,
                                transformStyle: "preserve-3d",
                                boxShadow: useTransform(
                                    [shadowX, shadowY],
                                    ([sx, sy]) => `${sx}px ${sy}px 60px rgba(0, 242, 255, 0.2)`
                                )
                            }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative glass p-8 md:p-12 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl"
                        >
                            <div className="relative z-10 space-y-8">
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    {/* Name Field */}
                                    <InputField
                                        id="name"
                                        name="name"
                                        label="Name"
                                        placeholder="Enter your name"
                                    />

                                    {/* Email Field */}
                                    <InputField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        placeholder="your@email.com"
                                    />

                                    {/* Contact Field */}
                                    <InputField
                                        id="contact"
                                        name="contact"
                                        label="Contact"
                                        type="tel"
                                        placeholder="+91 XXXXX XXXXX"
                                    />

                                    {/* Description Field */}
                                    <InputField
                                        id="description"
                                        name="description"
                                        label="Description"
                                        isTextArea
                                        placeholder="Share your message..."
                                    />

                                    <div className="pt-4">
                                        <AnimatePresence mode="wait">
                                            {!isSent ? (
                                                <motion.button
                                                    key="send-btn"
                                                    disabled={isSending}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`w-full relative py-5 rounded-2xl font-black text-lg uppercase tracking-wider overflow-hidden transition-all duration-500 ${isSending ? 'bg-slate-800' : 'bg-white text-dark'}`}
                                                >
                                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                                        {isSending ? (
                                                            <div className="flex items-center gap-2">
                                                                <span>Sending...</span>
                                                                <div className="flex gap-1">
                                                                    {[0, 1, 2].map((i) => (
                                                                        <motion.div
                                                                            key={i}
                                                                            animate={{ y: [0, -5, 0] }}
                                                                            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                                                                            className="w-1.5 h-1.5 bg-neon-blue rounded-full"
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                Send Message
                                                                <motion.div
                                                                    animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                                                                    transition={{ repeat: Infinity, duration: 2 }}
                                                                >
                                                                    <Rocket size={22} />
                                                                </motion.div>
                                                            </>
                                                        )}
                                                    </span>
                                                </motion.button>
                                            ) : (
                                                <motion.div
                                                    key="success"
                                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    className="w-full py-5 glass border border-neon-blue/50 rounded-2xl flex items-center justify-center gap-3 text-neon-blue font-bold text-lg"
                                                >
                                                    Message Sent Successfully <CheckCircle size={24} />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-gray-600 uppercase tracking-[0.4em]">
                    <span>Secure Connection Established</span>
                    <span>© 2026 SANJAY G - AI Portfolio System</span>
                </div>
            </div>
        </section>
    );
};

const InputField = ({ id, name, label, type = "text", placeholder, isTextArea = false }) => {
    return (
        <div className="space-y-2 relative">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-400 uppercase tracking-wider"
            >
                {label}
            </label>

            {isTextArea ? (
                <textarea
                    id={id}
                    name={name || id}
                    rows="5"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none resize-none transition-all duration-300 focus:border-neon-blue/50 focus:bg-white/10"
                    placeholder={placeholder}
                    required
                />
            ) : (
                <input
                    id={id}
                    name={name || id}
                    type={type}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none transition-all duration-300 focus:border-neon-blue/50 focus:bg-white/10"
                    placeholder={placeholder}
                    required
                />
            )}
        </div>
    );
};

export default Contact;
