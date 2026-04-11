import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import TeacherDashboard from './views/TeacherDashboard';
import StudentDashboard from './views/StudentDashboard';
import StudentList from './views/StudentList';
import AcademicDetails from './views/AcademicDetails';
import Login from './views/Login';
import Reports from './views/Reports';
import Settings from './views/Settings';
import Guidelines from './views/Guidelines';
import Privacy from './views/Privacy';
import { AnimatePresence, motion } from 'framer-motion';
import { mockStudents as initialStudents } from './data/mockData';
import { studentService } from './services/api';
import { X, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ text, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const icons = {
        success: <CheckCircle size={18} className="text-emerald-500" />,
        info: <Info size={18} className="text-blue-500" />,
        error: <AlertTriangle size={18} className="text-rose-500" />
    };

    const colors = {
        success: 'border-emerald-100 bg-white/95 shadow-emerald-500/10',
        info: 'border-blue-100 bg-white/95 shadow-blue-500/10',
        error: 'border-rose-100 bg-white/95 shadow-rose-500/10'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            className={`fixed bottom-24 right-8 z-[100] flex items-center gap-4 px-6 py-4 rounded-[1.5rem] border backdrop-blur-xl shadow-2xl min-w-[320px] max-w-md ${colors[type]}`}
        >
            <div className="shrink-0">{icons[type]}</div>
            <p className="flex-1 text-[11px] font-black uppercase tracking-widest text-slate-900 leading-relaxed">{text}</p>
            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
                <X size={14} />
            </button>
        </motion.div>
    );
};

const App = () => {
    // Core Application States
    const [role, setRole] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(false);
    const [sessionUser, setSessionUser] = useState(null);
    const [isAppLoaded, setIsAppLoaded] = useState(false);
    const [students, setStudents] = useState(initialStudents);
    const [toasts, setToasts] = useState([]);
    const [publicTab, setPublicTab] = useState(null);

    // Fetch students from backend
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await studentService.getAll();
                if (data && data.length > 0) {
                    setStudents(data);
                }
            } catch (error) {
                console.warn('Could not fetch from backend, using mock data:', error);
            }
        };
        fetchStudents();
    }, []);

    const showToast = useCallback((text, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, text, type }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    // Initial Session Recovery
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setSessionUser(parsedUser);
                const roleType = parsedUser.role.toLowerCase().includes('admin') || parsedUser.role.toLowerCase().includes('staff') ? 'teacher' : 'student';
                setRole(roleType);
            } catch (e) {
                // session recovery failed silently
                localStorage.removeItem('user');
            }
        }
        setIsAppLoaded(true);
    }, []);

    const handleLogin = (selectedRole, userData) => {
        setSessionUser(userData);
        setRole(selectedRole);
        localStorage.setItem('user', JSON.stringify(userData));
        setActiveTab('dashboard');
        showToast(`Welcome back, ${userData.name}`, 'success');
    };

    const handleLogout = () => {
        setRole(null);
        setSessionUser(null);
        localStorage.removeItem('user');
        setActiveTab('dashboard');
        showToast('Successfully signed out of portal', 'info');
    };

    const handleUpdateUser = (updatedProfile) => {
        setSessionUser(prev => ({ ...prev, ...updatedProfile }));
        const updated = { ...sessionUser, ...updatedProfile };
        localStorage.setItem('user', JSON.stringify(updated));
    };

    const handleNavigateToSettings = () => {
        setActiveTab('settings');
    };

    const handleAddStudent = async (student) => {
        try {
            const savedStudent = await studentService.create(student);
            setStudents(prev => [savedStudent, ...prev]);
            showToast(`Student ${student.name} enrolled successfully`, 'success');
        } catch (error) {
            console.error('Error adding student:', error);
            // Fallback to local state if backend is down but maybe show a warning
            setStudents(prev => [student, ...prev]);
            showToast(`Student enrolled locally (Backend offline)`, 'info');
        }
    };

    // Early return while checking session
    if (!isAppLoaded) return null;

    // Show Login if no role is active
    if (!role) {
        return (
            <>
                <AnimatePresence mode="wait">
                    {publicTab === 'guidelines' ? (
                        <motion.div key="guidelines" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Guidelines onBack={() => setPublicTab(null)} />
                        </motion.div>
                    ) : publicTab === 'privacy' ? (
                        <motion.div key="privacy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Privacy onBack={() => setPublicTab(null)} />
                        </motion.div>
                    ) : (
                        <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Login
                                onLogin={handleLogin}
                                onOpenPublic={(tab) => setPublicTab(tab)}
                                showToast={showToast}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {toasts.map(toast => (
                        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
                    ))}
                </AnimatePresence>
            </>
        );
    }

    const user = {
        name: sessionUser?.name || '',
        role: sessionUser?.role || '',
        avatar: sessionUser?.avatar,
        id: sessionUser?.id || '',
        email: sessionUser?.email || ''
    };

    return (
        <div className="flex min-h-screen bg-[#F4F7FB]">
            {/* Staff/Student Banner Indicator */}
            <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full z-50 shadow-2xl border flex items-center gap-3 backdrop-blur-xl transition-all duration-500 hover:scale-105 select-none ${role === 'teacher'
                ? 'bg-slate-900 border-slate-700 text-white'
                : 'bg-[#3366FF] border-blue-400/30 text-white'
                }`}>
                <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${role === 'teacher' ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Authorized Access: {role === 'teacher' ? 'Staff Portal Active' : 'Student Portal Active'}</span>
            </div>

            {/* Sidebar Navigation */}
            <Sidebar
                role={role}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                onLogout={handleLogout}
            />

            {/* Main Application Body */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Navbar
                    user={user}
                    onLogout={handleLogout}
                    onSettings={handleNavigateToSettings}
                    showToast={showToast}
                />

                <main className="flex-1 p-8 lg:p-12 overflow-y-auto bg-[#F4F7FB] relative custom-scrollbar">
                    <div className="max-w-[1400px] mx-auto pb-24">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${role}-${activeTab}`}
                                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                                transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
                            >
                                {/* Dashboard View (Overview) */}
                                {activeTab === 'dashboard' && (
                                    role === 'teacher' ? <TeacherDashboard showToast={showToast} user={sessionUser} students={students} setActiveTab={setActiveTab} /> : <StudentDashboard showToast={showToast} student={sessionUser} />
                                )}

                                {/* Students Directory (Teacher Only) */}
                                {activeTab === 'students' && <StudentList showToast={showToast} students={students} onAddStudent={handleAddStudent} />}

                                {/* Academic Records (Student Only) */}
                                {activeTab === 'subjects' && <AcademicDetails showToast={showToast} student={sessionUser} />}

                                {/* Academic Reports & Analytics View */}
                                {activeTab === 'reports' && (
                                    <Reports role={role} showToast={showToast} />
                                )}

                                {/* Settings View */}
                                {activeTab === 'settings' && (
                                    <Settings user={user} showToast={showToast} onUpdateUser={handleUpdateUser} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>

            <AnimatePresence>
                {toasts.map(toast => (
                    <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default App;
