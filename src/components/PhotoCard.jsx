import { motion } from 'framer-motion';
import profileImage from './profile.jpg';

const PhotoCard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative group perspective-1000"
        >
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>

            {/* Photo card container */}
            <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                className="relative glass rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Photo */}
                <div className="relative aspect-[3/4] w-full max-w-sm mx-auto">
                    <img
                        src={profileImage}
                        alt="Sanjay G - AI Developer"
                        className="w-full h-full object-cover"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>

                    {/* Name tag at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                        <motion.h3
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-bold text-white mb-1"
                        >
                            Sanjay G
                        </motion.h3>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-neon-blue text-sm font-mono uppercase tracking-wider"
                        >
                            AI Developer
                        </motion.p>
                    </div>
                </div>

                {/* Decorative corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-neon-blue/50"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-neon-blue/50"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-neon-purple/50"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-neon-purple/50"></div>
            </motion.div>
        </motion.div>
    );
};

export default PhotoCard;
