import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import {
    LogOut, Search, User, CheckCircle, Clock, Calendar, MapPin, 
    Mail, Phone, Instagram, Facebook, Twitter, ShieldAlert,
    BookOpen, Award, Check, ChevronRight, Plus, X, Trash2, Edit2, Save
} from 'lucide-react';
import profileImg from './profile-new.jpg'; // Fixed import
import { staticProjects } from '../data/projectsData';
import { achievementsData as staticAchievements } from '../data/achievementsData';
// ─── Project Form Modal ───
const ProjectFormModal = ({ project, onClose, onSave }) => {
    const [form, setForm] = useState({
        title: project?.title || '',
        description: project?.description || '',
        detailed_explanation: project?.detailed_explanation || project?.detailedExplanation || '',
        image_url: project?.image_url || '',
        tags: project?.tags?.join(', ') || '',
        demo_url: project?.demo_url || '',
        github_url: project?.github_url || '',
        display_order: project?.display_order || 0,
    });
    const [imageFile, setImageFile] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        let imageUrl = form.image_url;

        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const { data, error } = await supabase.storage
                .from('portfolio-images')
                .upload(`projects/${fileName}`, imageFile);
            
            if (data) {
                const { data: publicUrlData } = supabase.storage
                    .from('portfolio-images')
                    .getPublicUrl(`projects/${fileName}`);
                imageUrl = publicUrlData.publicUrl;
            } else {
                console.error("Upload error:", error);
                alert("Failed to upload image. Please check Supabase storage configuration.");
                setSaving(false);
                return; // Stop saving if upload failed
            }
        }

        const payload = {
            title: form.title,
            description: form.description,
            image_url: imageUrl,
            demo_url: form.demo_url,
            github_url: form.github_url,
            tags: typeof form.tags === 'string' ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : form.tags,
            display_order: parseInt(form.display_order) || 0,
        };
        await onSave(payload, project?.id);
        setSaving(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                        {project ? 'Edit Project' : 'New Project'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: 'Title', key: 'title', required: true },
                        { label: 'Demo URL', key: 'demo_url' },
                        { label: 'GitHub URL', key: 'github_url' },
                        { label: 'Tags (comma separated)', key: 'tags' },
                        { label: 'Display Order', key: 'display_order', type: 'number' },
                    ].map(({ label, key, type, required }) => (
                        <div key={key}>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
                            <input
                                type={type || 'text'}
                                value={form[key]}
                                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                required={required}
                                className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                        </div>
                    ))}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Image Upload (or leave blank to keep existing)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                        {form.image_url && !imageFile && (
                            <p className="text-xs text-gray-400 mt-1 truncate">Current: {form.image_url}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Overview (Short Description)</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            rows={3}
                            className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Technical Details (Optional)</label>
                        <textarea
                            value={form.detailed_explanation}
                            onChange={(e) => setForm({ ...form, detailed_explanation: e.target.value })}
                            rows={4}
                            className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                            <Save size={16} /> {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

// ─── Achievement Form Modal ───
const AchievementFormModal = ({ achievement, onClose, onSave }) => {
    const [form, setForm] = useState({
        title: achievement?.title || '',
        category: achievement?.category || 'certifications',
        date: achievement?.date || '',
        image: achievement?.image || '',
        description: achievement?.description || '',
        detailed_explanation: achievement?.detailed_explanation || achievement?.detailedExplanation || '',
        skills: achievement?.skills?.join(', ') || '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        let imageUrl = form.image;

        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const { data, error } = await supabase.storage
                .from('portfolio-images')
                .upload(`achievements/${fileName}`, imageFile);
            
            if (data) {
                const { data: publicUrlData } = supabase.storage
                    .from('portfolio-images')
                    .getPublicUrl(`achievements/${fileName}`);
                imageUrl = publicUrlData.publicUrl;
            } else {
                console.error("Upload error:", error);
                alert("Failed to upload image. Please check Supabase storage configuration.");
                setSaving(false);
                return; // Stop saving if upload failed
            }
        }

        const payload = {
            ...form,
            image: imageUrl,
            skills: typeof form.skills === 'string' ? form.skills.split(',').map(s => s.trim()).filter(Boolean) : form.skills
        };
        await onSave(payload, achievement?.id);
        setSaving(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                        {achievement ? 'Edit Achievement' : 'New Achievement'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Title</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                            className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Category</label>
                        <select
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        >
                            <option value="certifications">Certifications</option>
                            <option value="events">Events</option>
                            <option value="speaker">Speaker</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Date</label>
                        <input
                            type="text"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                            className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Image Upload (or leave blank to keep existing)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                        {form.image && !imageFile && (
                            <p className="text-xs text-gray-400 mt-1 truncate">Current: {form.image}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Short Description</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            rows={2}
                            className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Detailed Explanation (Optional)</label>
                        <textarea
                            value={form.detailed_explanation}
                            onChange={(e) => setForm({ ...form, detailed_explanation: e.target.value })}
                            rows={4}
                            placeholder="Full details shown on the achievement's individual page..."
                            className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Skills Acquired (comma separated)</label>
                        <input
                            type="text"
                            value={form.skills}
                            onChange={(e) => setForm({ ...form, skills: e.target.value })}
                            placeholder="e.g. Deep Learning, TensorFlow, Python"
                            className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                            <Save size={16} /> {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

const Admin = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'messages'
    const [messages, setMessages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [showAchievementForm, setShowAchievementForm] = useState(false);
    const [editingAchievement, setEditingAchievement] = useState(null);

    useEffect(() => {
        if (sessionStorage.getItem('isAdmin') !== 'true') {
            navigate('/login');
            return;
        }
        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        setLoading(true);
        const [msgRes, projRes, achRes] = await Promise.all([
            supabase.from('contacts').select('*').order('created_at', { ascending: false }),
            supabase.from('projects').select('*').order('display_order', { ascending: true }),
            supabase.from('achievements').select('*').order('created_at', { ascending: false })
        ]);
        if (msgRes.data) setMessages(msgRes.data);
        
        // Map static projects to match DB schema and filter deleted ones
        const deletedProjIds = JSON.parse(localStorage.getItem('deletedStaticProjects') || '[]');
        const mappedStaticProjects = staticProjects
            .filter(sp => !deletedProjIds.includes(sp.id))
            .map(sp => ({
                ...sp,
                image_url: sp.image,
                demo_url: sp.links?.demo || '',
                github_url: sp.links?.github || '',
                detailed_explanation: sp.detailedExplanation || '',
                display_order: 0,
            }));
        let dbProjects = projRes.data || [];
        const combinedProjects = dbProjects.length > 0 
            ? [...dbProjects, ...mappedStaticProjects.filter(sp => !dbProjects.find(dp => dp.title === sp.title))]
            : mappedStaticProjects;
        setProjects(combinedProjects);

        // Map static achievements to match DB schema and filter deleted ones
        const deletedAchIds = JSON.parse(localStorage.getItem('deletedStaticAchievements') || '[]');
        const mappedStaticAchievements = staticAchievements
            .filter(sa => !deletedAchIds.includes(sa.id))
            .map(sa => ({
                ...sa,
                detailed_explanation: sa.detailedExplanation || '',
                skills: sa.skills || [],
            }));
        let dbAchievements = achRes.data || [];
        const combinedAchievements = dbAchievements.length > 0
            ? [...dbAchievements, ...mappedStaticAchievements.filter(sa => !dbAchievements.find(da => da.title === sa.title))]
            : mappedStaticAchievements;
        setAchievements(combinedAchievements);

        setLoading(false);
    };

    const deleteMessage = async (id) => {
        setDeleting(id);
        await supabase.from('contacts').delete().eq('id', id);
        setMessages((prev) => prev.filter((m) => m.id !== id));
        setDeleting(null);
    };

    const deleteProject = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        setDeleting(id);
        if (id && !id.includes('-') || id === 'billing-software' || id === 'academic-nexus' || id === 'holographic-ui' || id === 'duoinsecgroups') {
            const deleted = JSON.parse(localStorage.getItem('deletedStaticProjects') || '[]');
            deleted.push(id);
            localStorage.setItem('deletedStaticProjects', JSON.stringify(deleted));
        }
        await supabase.from('projects').delete().eq('id', id);
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setDeleting(null);
    };

    const saveProject = async (data, id) => {
        if (id && id.includes('-') && id.length > 20) {
            const { data: updated } = await supabase.from('projects').update(data).eq('id', id).select().single();
            if (updated) setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
        } else {
            const { data: created } = await supabase.from('projects').insert([data]).select().single();
            if (created) {
                setProjects((prev) => {
                    const filtered = id ? prev.filter(p => p.id !== id) : prev;
                    return [...filtered, created];
                });
                if (id) {
                    const deleted = JSON.parse(localStorage.getItem('deletedStaticProjects') || '[]');
                    if (!deleted.includes(id)) deleted.push(id);
                    localStorage.setItem('deletedStaticProjects', JSON.stringify(deleted));
                }
            }
        }
        setShowProjectForm(false);
        setEditingProject(null);
    };

    const deleteAchievement = async (id) => {
        if (!window.confirm("Are you sure you want to delete this achievement?")) return;
        setDeleting(id);
        if (id && !id.includes('-') || typeof id === 'number' || id.length < 10) {
            const deleted = JSON.parse(localStorage.getItem('deletedStaticAchievements') || '[]');
            deleted.push(id);
            localStorage.setItem('deletedStaticAchievements', JSON.stringify(deleted));
        }
        await supabase.from('achievements').delete().eq('id', id);
        setAchievements((prev) => prev.filter((a) => a.id !== id));
        setDeleting(null);
    };

    const saveAchievement = async (data, id) => {
        if (id && id.includes('-') && id.length > 20) {
            const { data: updated } = await supabase.from('achievements').update(data).eq('id', id).select().single();
            if (updated) setAchievements((prev) => prev.map((a) => (a.id === id ? updated : a)));
        } else {
            const { data: created } = await supabase.from('achievements').insert([data]).select().single();
            if (created) {
                setAchievements((prev) => {
                    const filtered = id ? prev.filter(a => a.id !== id) : prev;
                    return [...filtered, created];
                });
                if (id) {
                    const deleted = JSON.parse(localStorage.getItem('deletedStaticAchievements') || '[]');
                    if (!deleted.includes(id)) deleted.push(id);
                    localStorage.setItem('deletedStaticAchievements', JSON.stringify(deleted));
                }
            }
        }
        setShowAchievementForm(false);
        setEditingAchievement(null);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAdmin');
        navigate('/');
    };

    // UI Helpers
    const navItems = [
        { id: 'projects', label: 'My Projects', icon: <BookOpen size={18} />, count: projects.length },
        { id: 'messages', label: 'Messages', icon: <Mail size={18} />, count: messages.length },
        { id: 'completed', label: 'Completed', icon: <CheckCircle size={18} />, count: 0 },
        { id: 'achievements', label: 'Achievements', icon: <Award size={18} />, count: achievements.length },
    ];

    return (
        <div className="min-h-screen bg-[#f3f6f9] flex font-sans text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-[#5b5899] text-white rounded-r-[40px] flex flex-col py-8 shadow-xl z-20 shrink-0">
                <div className="px-8 mb-12">
                    <h1 className="text-2xl font-bold tracking-wider">SUCCESS</h1>
                </div>
                
                <nav className="flex-1 px-4 space-y-2">
                    <div className="px-4 py-3 mb-2 flex items-center gap-3 bg-white text-[#5b5899] rounded-2xl font-semibold shadow-sm">
                        <User size={18} /> Profile
                    </div>
                    
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full px-4 py-3 flex items-center gap-3 rounded-2xl transition-all ${
                                activeTab === item.id 
                                ? 'bg-white/10 font-medium' 
                                : 'text-indigo-200 hover:bg-white/5'
                            }`}
                        >
                            {item.icon}
                            <span className="text-sm">{item.label}</span>
                            {item.count > 0 && (
                                <span className="ml-auto text-[10px] font-bold bg-indigo-800/50 px-2 py-0.5 rounded-full">
                                    {item.count}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="px-8 mt-auto flex justify-center">
                    {/* Placeholder for the colorful bird illustration */}
                    <div className="w-32 h-32 bg-indigo-800/30 rounded-full flex items-center justify-center text-indigo-300 shadow-inner">
                        <ShieldAlert size={40} />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-24 px-10 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Профиль (Profile)</h2>
                    
                    <div className="flex items-center gap-6">
                        <button onClick={handleLogout} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-500 hover:text-red-500 shadow-sm transition-colors">
                            <LogOut size={18} />
                        </button>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="flex-1 overflow-y-auto px-10 pb-10">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="w-8 h-8 border-4 border-indigo-200 border-t-[#5b5899] rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-6">
                            
                            {/* Left Column (Main) */}
                            <div className="flex-1 space-y-6">
                                
                                {/* Profile Card */}
                                <div className="bg-white rounded-[32px] p-8 shadow-sm flex flex-col md:flex-row gap-8 relative">
                                    <button className="absolute top-6 right-6 text-indigo-400 hover:text-indigo-600">
                                        <Edit2 size={18} />
                                    </button>
                                    
                                    <div className="w-32 h-32 rounded-full bg-[#5b5899] shrink-0 overflow-hidden border-4 border-indigo-50 shadow-lg">
                                        <img src={profileImg} alt="Admin" className="w-full h-full object-cover" />
                                    </div>
                                    
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Sanjay. G</h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-indigo-400" />
                                                <span>Registered: <strong className="text-gray-700 font-medium">24 November 2022</strong></span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} className="text-indigo-400" />
                                                <span>Location: <strong className="text-gray-700 font-medium">India</strong></span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail size={14} className="text-indigo-400" />
                                                <span>E-mail: <strong className="text-gray-700 font-medium">sanjay2006@gmail.com</strong></span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone size={14} className="text-indigo-400" />
                                                <span>Phone: <strong className="text-gray-700 font-medium">+91 12345 67890</strong></span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-6">
                                            {[Instagram, Facebook, Twitter, ShieldAlert, Mail].map((Icon, i) => (
                                                <button key={i} className="w-8 h-8 rounded-full bg-[#5b5899] text-white flex items-center justify-center hover:bg-indigo-700 transition-colors">
                                                    <Icon size={14} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Card (Projects or Messages) */}
                                <div className="bg-white rounded-[32px] p-8 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-gray-800">
                                            {activeTab === 'projects' ? 'My Projects' : activeTab === 'messages' ? 'Recent Messages' : 'Achievements'}
                                        </h3>
                                        {activeTab === 'projects' && (
                                            <button 
                                                onClick={() => { setEditingProject(null); setShowProjectForm(true); }}
                                                className="flex items-center gap-1 bg-[#5b5899] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
                                            >
                                                <Plus size={16} /> Add Project
                                            </button>
                                        )}
                                        {activeTab === 'achievements' && (
                                            <button 
                                                onClick={() => { setEditingAchievement(null); setShowAchievementForm(true); }}
                                                className="flex items-center gap-1 bg-[#5b5899] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
                                            >
                                                <Plus size={16} /> Add Achievement
                                            </button>
                                        )}
                                    </div>

                                    <div className="relative pl-6 space-y-6">
                                        {/* Vertical Timeline Line */}
                                        <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-[#5b5899]"></div>

                                        {activeTab === 'projects' && projects.length === 0 && (
                                            <p className="text-sm text-gray-500 pl-4">No database projects found.</p>
                                        )}
                                        {activeTab === 'projects' && projects.map((proj, i) => (
                                            <div key={proj.id} className="relative">
                                                {/* Timeline Dot */}
                                                <div className="absolute -left-6 top-6 w-4 h-4 rounded-full border-2 border-white bg-[#5b5899] shadow-sm"></div>
                                                
                                                <div className="bg-[#f8f9fc] hover:bg-[#f0f4f8] transition-colors rounded-2xl p-5 flex items-center justify-between group">
                                                    <div>
                                                        <h4 className="font-bold text-gray-800 flex items-center gap-3">
                                                            {proj.title}
                                                            <span className="text-[10px] font-bold px-2 py-1 bg-green-500 text-white rounded-md tracking-wider uppercase">Completed</span>
                                                        </h4>
                                                        <p className="text-sm text-gray-500 mt-1 line-clamp-1 max-w-md">{proj.description}</p>
                                                        <p className="text-xs text-gray-400 mt-2">{proj.tags?.join(' • ')}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => { setEditingProject(proj); setShowProjectForm(true); }} className="w-8 h-8 rounded-full bg-indigo-100 text-[#5b5899] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Edit2 size={14} />
                                                        </button>
                                                        <button onClick={() => deleteProject(proj.id)} className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Trash2 size={14} />
                                                        </button>
                                                        <button onClick={() => { setEditingProject(proj); setShowProjectForm(true); }} className="w-8 h-8 rounded-full bg-[#a39dfa] text-white flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                                            <ChevronRight size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {activeTab === 'achievements' && achievements.length === 0 && (
                                            <p className="text-sm text-gray-500 pl-4">No database achievements found.</p>
                                        )}
                                        {activeTab === 'achievements' && achievements.map((ach, i) => (
                                            <div key={ach.id} className="relative">
                                                <div className="absolute -left-6 top-6 w-4 h-4 rounded-full border-2 border-white bg-[#5b5899] shadow-sm"></div>
                                                
                                                <div className="bg-[#f0fdf4] hover:bg-[#dcfce7] transition-colors rounded-2xl p-5 flex items-center justify-between group">
                                                    <div>
                                                        <h4 className="font-bold text-gray-800 flex items-center gap-3">
                                                            {ach.title}
                                                            <span className="text-[10px] font-bold px-2 py-1 bg-green-600 text-white rounded-md tracking-wider uppercase">
                                                                {ach.category}
                                                            </span>
                                                        </h4>
                                                        <p className="text-sm text-gray-600 mt-1 line-clamp-1 max-w-md">{ach.description}</p>
                                                        <p className="text-xs text-gray-500 mt-2">{ach.date}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => { setEditingAchievement(ach); setShowAchievementForm(true); }} className="w-8 h-8 rounded-full bg-indigo-100 text-[#5b5899] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Edit2 size={14} />
                                                        </button>
                                                        <button onClick={() => deleteAchievement(ach.id)} className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {activeTab === 'messages' && messages.length === 0 && (
                                            <p className="text-sm text-gray-500 pl-4">No messages found.</p>
                                        )}
                                        {activeTab === 'messages' && messages.map((msg, i) => (
                                            <div key={msg.id} className="relative">
                                                <div className="absolute -left-6 top-6 w-4 h-4 rounded-full border-2 border-white bg-[#5b5899] shadow-sm"></div>
                                                
                                                <div className="bg-[#fff0f5] hover:bg-[#ffe4ee] transition-colors rounded-2xl p-5 flex items-center justify-between group">
                                                    <div>
                                                        <h4 className="font-bold text-gray-800 flex items-center gap-3">
                                                            {msg.name}
                                                            <span className="text-[10px] font-bold px-2 py-1 bg-[#5b5899] text-white rounded-md tracking-wider uppercase">
                                                                {new Date(msg.created_at).toLocaleDateString()}
                                                            </span>
                                                        </h4>
                                                        <p className="text-sm text-gray-600 mt-1">{msg.description}</p>
                                                        <p className="text-xs text-gray-500 mt-2">{msg.email} • {msg.contact}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => deleteMessage(msg.id)} className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Trash2 size={14} />
                                                        </button>
                                                        <a href={`mailto:${msg.email}`} className="w-8 h-8 rounded-full bg-[#ff9dbf] text-white flex items-center justify-center">
                                                            <ChevronRight size={16} />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (Side) - Hidden per user request */}
                        </div>
                    )}
                </div>
            </main>

            {/* Project Form Modal */}
            <AnimatePresence>
                {showProjectForm && (
                    <ProjectFormModal
                        project={editingProject}
                        onClose={() => setShowProjectForm(false)}
                        onSave={saveProject}
                    />
                )}
                {showAchievementForm && (
                    <AchievementFormModal
                        achievement={editingAchievement}
                        onClose={() => setShowAchievementForm(false)}
                        onSave={saveAchievement}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Admin;
