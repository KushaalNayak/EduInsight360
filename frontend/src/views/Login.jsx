import React, { useState } from 'react';
import { UserCircle, ShieldCheck, Loader2, GraduationCap, ArrowRight, HelpCircle, Lock, BookOpen, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import { authService } from '../services/api';
import { mockStudents } from '../data/mockData';


const Login = ({ onLogin, onOpenPublic, showToast }) => {
    const [role, setRole] = useState('student');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isRecovering, setIsRecovering] = useState(false);
    const [recoveryStep, setRecoveryStep] = useState('username');
    const [recoveryUsername, setRecoveryUsername] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSupportAction = (type) => {
        if (type === 'forgotPassword') {
            setIsRecovering(true);
            setRecoveryStep('username');
        } else {
            showToast?.('Support request sent! We will help you soon.', 'success');
        }
    };

    const handleRecovery = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (recoveryStep === 'username') {
                await authService.forgotPassword(recoveryUsername);
                setRecoveryStep('otp');
                showToast?.('OTP sent to your registered phone number', 'success');
            } else if (recoveryStep === 'otp') {
                // We'll just move to the password step after entering the code
                setRecoveryStep('password');
            } else {
                await authService.resetPassword(recoveryUsername, otp, newPassword);
                setIsRecovering(false);
                setUserId(recoveryUsername);
                showToast?.('Password reset successfully!', 'success');
            }
        } catch (err) {
            setError(err.response?.data || 'Operation failed');
            showToast?.('Action failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await authService.login(userId, password);
            if (data.token) {
                // Determine role based on selected role in UI or from backend if available
                // For now, the UI role selector is the source of truth for the portal view
                if (role === 'teacher') {
                    onLogin('teacher', {
                        name: userId === 'kushaal' ? 'R B KUSHAAL NAYAK' : userId,
                        role: 'Lead Faculty / Lead Staff',
                        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
                        id: userId,
                        email: `${userId}@kluniversity.in`
                    });
                } else {
                    // Try to find student in mock data or just use generic
                    const student = mockStudents.find(s => s.id === userId);
                    if (student) {
                        onLogin('student', student);
                    } else {
                        onLogin('student', {
                            name: userId,
                            id: userId,
                            email: `${userId}@kluniversity.in`,
                            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
                            overallScore: 0,
                            attendance: 0,
                            subjects: []
                        });
                    }
                }
                showToast?.('Signed in successfully', 'success');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data || 'Login failed: Service unreachable');
            showToast?.('Authentication failed', 'error');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="auth-container">
            {/* Left Side: Illustration & Branding */}
            <div className="auth-left">
                <div className="auth-left-content">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-white flex items-center justify-center rounded-[1.5rem] text-[#3366FF] shadow-2xl">
                                <GraduationCap size={36} strokeWidth={2.5} />
                            </div>
                            <h1 className="text-5xl font-black text-white tracking-[-0.05em]">EduInsight <span className="text-[#3366FF]">360</span></h1>
                        </div>
                        <h2 className="text-6xl font-black text-white mb-8 leading-[0.95] tracking-tighter uppercase">
                            Academic <br />
                            Intelligence <br />
                            <span className="text-[#3366FF]">System.</span>
                        </h2>
                        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md">
                            <Fingerprint size={18} className="text-[#3366FF]" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">SAFE LOGIN PORTAL</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="auth-right">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="auth-card"
                >
                    <div className="auth-form-container border-slate-200/60 bg-white shadow-premium">
                        <div className="mb-12 text-center lg:hidden">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">EduInsight 360</h1>
                        </div>

                        <div className="mb-10 text-center md:text-left">
                            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                                <div className="bg-[#3366FF] w-1 h-5 rounded-full"></div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
                                    {isRecovering ? 'ID Recovery' : 'Sign In'}
                                </h3>
                            </div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest ml-3">
                                {isRecovering ? 'Get your ID back' : 'Verify your identity'}
                            </p>
                        </div>

                        {!isRecovering ? (
                            <>
                                <div className="role-selector bg-slate-100/80 p-1 rounded-2xl mb-10">
                                    <button
                                        onClick={() => {
                                            setRole('student');
                                            setUserId('');
                                        }}
                                        className={`role-btn flex items-center justify-center gap-2 py-3.5 ${role === 'student' ? 'active bg-white text-[#3366FF] shadow-sm' : 'text-slate-500'}`}
                                    >
                                        <BookOpen size={14} strokeWidth={2.5} />
                                        <span className="font-black text-[11px] uppercase tracking-widest">Student</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setRole('teacher');
                                            setUserId('');
                                        }}
                                        className={`role-btn flex items-center justify-center gap-2 py-3.5 ${role === 'teacher' ? 'active bg-white text-[#3366FF] shadow-sm' : 'text-slate-500'}`}
                                    >
                                        <ShieldCheck size={14} strokeWidth={2.5} />
                                        <span className="font-black text-[11px] uppercase tracking-widest">Faculty</span>
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">ID Number</label>
                                        <div className="relative group">
                                            <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3366FF] transition-colors" size={20} />
                                            <input
                                                type="text"
                                                value={userId}
                                                onChange={(e) => setUserId(e.target.value)}
                                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 transition-all focus:outline-none focus:border-[#3366FF] focus:bg-white focus:ring-4 focus:ring-blue-500/5 placeholder:text-slate-400"
                                                placeholder="ENTER YOUR ID"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">Password</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3366FF] transition-colors" size={20} />
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 transition-all focus:outline-none focus:border-[#3366FF] focus:bg-white focus:ring-4 focus:ring-blue-500/5 placeholder:text-slate-400"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between px-1">
                                        <label className="flex items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest cursor-pointer hover:text-slate-900 transition-colors">
                                            <input type="checkbox" className="mr-3 rounded border-slate-300 w-4 h-4 cursor-pointer text-[#3366FF]" />
                                            Save Password
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => handleSupportAction('forgotPassword')}
                                            className="text-[10px] text-[#3366FF] font-black uppercase tracking-widest hover:underline"
                                        >
                                            Forgot Password?
                                        </button>
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
                                                Login Now
                                                <ArrowRight size={18} strokeWidth={3} />
                                            </>
                                        )}
                                    </button>

                                    {error && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-[#FF3B3B] text-[10px] text-center font-black uppercase tracking-widest mt-6"
                                        >
                                            {error}
                                        </motion.p>
                                    )}
                                </form>
                            </>
                        ) : (
                            <form onSubmit={handleRecovery} className="space-y-6">
                                {recoveryStep === 'username' ? (
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">Your ID Number</label>
                                        <div className="relative group">
                                            <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3366FF] transition-colors" size={20} />
                                            <input
                                                type="text"
                                                value={recoveryUsername}
                                                onChange={(e) => setRecoveryUsername(e.target.value)}
                                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 transition-all focus:outline-none focus:border-[#3366FF] focus:bg-white focus:ring-4 focus:ring-blue-500/5 placeholder:text-slate-400"
                                                placeholder="ENTER YOUR ID"
                                                required
                                            />
                                        </div>
                                    </div>
                                ) : recoveryStep === 'otp' ? (
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">Enter 6-Digit OTP</label>
                                        <div className="relative group">
                                            <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3366FF] transition-colors" size={20} />
                                            <input
                                                type="text"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 transition-all focus:outline-none focus:border-[#3366FF] focus:bg-white focus:ring-4 focus:ring-blue-500/5 placeholder:text-slate-400"
                                                placeholder="000000"
                                                required
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">New Password</label>
                                            <div className="relative group">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3366FF] transition-colors" size={20} />
                                                <input
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 transition-all focus:outline-none focus:border-[#3366FF] focus:bg-white focus:ring-4 focus:ring-blue-500/5 placeholder:text-slate-400"
                                                    placeholder="••••••••"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4.5 bg-[#3366FF] hover:bg-[#2952CC] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>
                                            {recoveryStep === 'username' ? 'Send OTP' : recoveryStep === 'otp' ? 'Verify OTP' : 'Update Password'}
                                            <ArrowRight size={18} strokeWidth={3} />
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsRecovering(false)}
                                    className="w-full text-[10px] text-slate-500 font-black uppercase tracking-widest hover:text-[#3366FF]"
                                >
                                    Back to Login
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="bg-[#F8FAFC] border border-slate-200/60 rounded-2xl p-6 text-center shadow-sm">
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                            <HelpCircle size={14} className="text-[#3366FF]" />
                            Having trouble? <button onClick={() => handleSupportAction('support')} className="text-[#3366FF] font-black hover:underline" type="button">Contact Support</button>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Academic Footer - Cleaned Up */}
            <div className="absolute bottom-8 w-full hidden lg:block">
                <div className="flex justify-center gap-12 text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
                    <span
                        onClick={() => onOpenPublic?.('guidelines')}
                        className="hover:text-[#3366FF] cursor-pointer transition-colors"
                    >
                        Digital Guidelines
                    </span>
                    <span
                        onClick={() => onOpenPublic?.('privacy')}
                        className="hover:text-[#3366FF] cursor-pointer transition-colors"
                    >
                        Student Privacy
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;

