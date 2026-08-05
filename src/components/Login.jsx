import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../supabaseClient';
import loginBg from './login-bg.png';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            sessionStorage.setItem('isAdmin', 'true');
            navigate('/admin');
        } catch (err) {
            setError(err.message || 'Invalid credentials. Please try again.');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Full-screen background image */}
            <img
                src={loginBg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Subtle dark overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Glassmorphism Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-[90%] max-w-[400px] mx-auto"
            >
                <div
                    className="rounded-[24px] p-8 md:p-10 border border-white/30 shadow-[0_8px_60px_rgba(0,0,0,0.3)]"
                    style={{
                        background: 'rgba(255, 255, 255, 0.12)',
                        backdropFilter: 'blur(20px) saturate(1.4)',
                        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
                    }}
                >
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                            Login
                        </h1>
                        <p className="text-white/70 text-sm">
                            Welcome back please login to your account
                        </p>
                    </motion.div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* User Name Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="User Name"
                                    required
                                    className="w-full rounded-xl py-3.5 pl-5 pr-12 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.12)',
                                        border: '1px solid rgba(255, 255, 255, 0.25)',
                                    }}
                                />
                                <User size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50" />
                            </div>
                        </motion.div>

                        {/* Password Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                    className="w-full rounded-xl py-3.5 pl-5 pr-12 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.12)',
                                        border: '1px solid rgba(255, 255, 255, 0.25)',
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors cursor-pointer"
                                >
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>
                            </div>
                        </motion.div>

                        {/* Remember Me */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-3"
                        >
                            <button
                                type="button"
                                onClick={() => setRememberMe(!rememberMe)}
                                className="w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer shrink-0"
                                style={{
                                    background: rememberMe
                                        ? 'linear-gradient(135deg, #00f2ff, #bc13fe)'
                                        : 'rgba(255, 255, 255, 0.12)',
                                    border: rememberMe
                                        ? 'none'
                                        : '1px solid rgba(255, 255, 255, 0.3)',
                                }}
                            >
                                {rememberMe && (
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                            <span className="text-white/80 text-sm">Remember me</span>
                        </motion.div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-red-300 text-sm px-4 py-3 rounded-xl"
                                style={{
                                    background: 'rgba(239, 68, 68, 0.15)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                }}
                            >
                                <Lock size={14} />
                                {error}
                            </motion.div>
                        )}

                        {/* Login Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 rounded-xl text-white font-bold text-base tracking-wide transition-all hover:shadow-lg hover:shadow-neon-blue/20 disabled:opacity-50 cursor-pointer relative overflow-hidden"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(0, 242, 255, 0.5), rgba(188, 19, 254, 0.4))',
                                    border: '1px solid rgba(255, 255, 255, 0.25)',
                                }}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Logging in...
                                    </span>
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </motion.div>
                    </form>

                    {/* Bottom text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-center text-white/60 text-sm mt-6"
                    >
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/')}
                            className="text-white font-semibold hover:text-neon-blue transition-colors cursor-pointer underline underline-offset-2"
                        >
                            Portfolio
                        </button>
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
