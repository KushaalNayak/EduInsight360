import React, { useState } from 'react';
import { UserCircle, ShieldCheck, Loader2, GraduationCap, ArrowRight, Lock, Mail, Phone, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { authService } from '../services/api';

const Register = ({ onBack, showToast }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.register(username, password, phoneNumber);
            showToast?.('Registration successful! Please login.', 'success');
            onBack(); // Go back to login
        } catch (err) {
            setError(err.response?.data || 'Registration failed');
            showToast?.('Registration failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                <div className="auth-left-content">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-white flex items-center justify-center rounded-[1.5rem] text-[#3366FF] shadow-2xl">
                                <GraduationCap size={36} strokeWidth={2.5} />
                            </div>
                            <h1 className="text-5xl font-black text-white tracking-[-0.05em]">Join EduInsight</h1>
                        </div>
                        <h2 className="text-4xl font-black text-white mb-8 leading-tight tracking-tighter uppercase text-center">
                            Start Your <br />
                            Academic Journey <br />
                            <span className="text-[#3366FF]">With Us.</span>
                        </h2>
                    </motion.div>
                </div>
            </div>

            <div className="auth-right">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="auth-card"
                >
                    <div className="auth-form-container border-slate-200/60 bg-white shadow-premium">
                        <div className="mb-10 text-center md:text-left">
                            <button 
                                onClick={onBack}
                                className="flex items-center gap-2 text-slate-500 hover:text-[#3366FF] transition-colors mb-4 group"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Back to Login</span>
                            </button>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Student Signup</h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">ID Number / Username</label>
                                <div className="relative group">
                                    <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3366FF]" size={20} />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:border-[#3366FF] focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
                                        placeholder="E.G. 2400033108"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">Mobile Number</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3366FF]" size={20} />
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:border-[#3366FF] focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
                                        placeholder="+91XXXXXXXXXX"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3366FF]" size={20} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:border-[#3366FF] focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4.5 bg-[#3366FF] hover:bg-[#2952CC] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight size={18} strokeWidth={3} />
                                    </>
                                )}
                            </button>

                            {error && (
                                <p className="text-[#FF3B3B] text-[10px] text-center font-black uppercase tracking-widest">{error}</p>
                            )}
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
