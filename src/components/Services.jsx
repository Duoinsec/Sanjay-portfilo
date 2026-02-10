import { motion } from 'framer-motion';
import { Code, Database, Layout, Smartphone, Terminal } from 'lucide-react';

const Services = () => {
    const services = [
        {
            title: 'AI Development',
            description: 'Building custom neural networks and integrating large language models into existing workflows.',
            icon: <Terminal size={24} className="text-neon-blue" />,
            gradient: "from-neon-blue/20 to-transparent"
        },
        {
            title: 'UI/UX Design',
            description: 'Crafting immersive, high-conversion interfaces with a focus on modern aesthetic and accessibility.',
            icon: <Layout size={24} className="text-neon-purple" />,
            gradient: "from-neon-purple/20 to-transparent"
        },
        {
            title: 'Fullstack Apps',
            description: 'Scalable web and mobile applications engineered for performance and reliability.',
            icon: <Code size={24} className="text-white" />,
            gradient: "from-white/10 to-transparent"
        },
        {
            title: 'Data Solutions',
            description: 'Architecting robust data pipelines and cloud infrastructures to power intelligence.',
            icon: <Database size={24} className="text-neon-cyan" />,
            gradient: "from-neon-cyan/20 to-transparent"
        }
    ];

    return (
        <section id="services" className="py-24 bg-dark relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        Core <span className="text-gradient">Specializations</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        Delivering end-to-end digital excellence by combining technical mastery with creative vision.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-8 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                            <div className="relative z-10">
                                <div className="mb-6 w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-blue transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

