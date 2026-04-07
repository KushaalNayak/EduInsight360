import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Mail, User, LogOut, ChevronDown, SearchCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ user, onLogout, onSettings, showToast }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchClick = () => {
        showToast?.("Searching...", 'info');
    };

    const handleNotificationClick = (type) => {
        showToast?.(`Opening ${type}...`, 'info');
    };

    return (
        <header className="h-24 flex items-center justify-between px-12 glass-navbar border-b border-slate-200/50 shadow-sm">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3366FF] transition-all duration-300" size={20} />
                    <input
                        type="text"
                        placeholder="SEARCH HERE..."
                        className="w-full bg-slate-100/40 border border-slate-200/40 rounded-[1.25rem] py-3.5 pl-14 pr-16 text-[11px] font-black tracking-widest text-slate-900 focus:outline-none focus:border-[#3366FF] focus:bg-white focus:ring-8 focus:ring-blue-500/5 transition-all outline-none uppercase"
                    />
                    <button
                        onClick={handleSearchClick}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#3366FF] text-white p-2 rounded-xl shadow-lg shadow-blue-500/30 hover:bg-[#2952CC] transition-all active:scale-90"
                    >
                        <SearchCheck size={16} />
                    </button>
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6 lg:gap-8">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleNotificationClick('Alerts Hub')}
                        className="p-3 rounded-2xl text-slate-500 hover:bg-white hover:text-[#3366FF] hover:shadow-md relative transition-all active:scale-90 group"
                    >
                        <Bell size={22} strokeWidth={2.5} />
                        <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-4 ring-white shadow-sm animate-pulse"></span>
                    </button>
                    <button
                        onClick={() => handleNotificationClick('Internal Messaging')}
                        className="p-3 rounded-2xl text-slate-500 hover:bg-white hover:text-[#3366FF] hover:shadow-md transition-all active:scale-90 group"
                    >
                        <Mail size={22} strokeWidth={2.5} />
                    </button>
                </div>

                <div className="h-10 w-px bg-slate-200/60 mx-2"></div>

                {/* Profile Section with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`flex items-center gap-5 p-2 pr-5 rounded-[1.5rem] transition-all duration-300 group ${isProfileOpen ? 'bg-white border-slate-200 shadow-xl' : 'border-transparent hover:bg-white hover:shadow-md'
                            }`}
                    >
                        <div className="w-11 h-11 rounded-[1.1rem] overflow-hidden shadow-inner border-2 border-slate-100 bg-slate-50 flex items-center justify-center transition-all group-hover:scale-105 group-hover:border-[#3366FF]/30">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <User size={24} className="text-slate-400" />
                            )}
                        </div>
                        <div className="text-left hidden lg:block">
                            <p className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1.5 uppercase">{user.name}</p>
                            <p className="text-[10px] font-black text-[#3366FF] uppercase tracking-[0.15em]">{user.role}</p>
                        </div>
                        <ChevronDown size={18} strokeWidth={3} className={`text-slate-300 transition-all duration-500 ${isProfileOpen ? 'rotate-180 text-[#3366FF]' : 'group-hover:text-slate-500'}`} />
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(5px)' }}
                                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(5px)' }}
                                className="absolute right-0 mt-4 w-72 bg-white border border-slate-200 rounded-[2rem] shadow-2xl p-3 z-[100] overflow-hidden origin-top-right shadow-slate-300/40"
                            >
                                <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 mb-2 rounded-[1.5rem]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm animate-pulse"></div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Profile Active</p>
                                    </div>
                                    <p className="text-sm font-black text-slate-900 truncate uppercase">{user.name}</p>
                                    <p className="text-[11px] font-bold text-slate-400 truncate tracking-tight uppercase">{user.id}</p>
                                </div>
                                <div className="space-y-1">
                                    <button
                                        onClick={() => { setIsProfileOpen(false); onSettings?.(); }}
                                        className="w-full flex items-center gap-4 px-5 py-3.5 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-[#3366FF] rounded-2xl transition-all group"
                                    >
                                        <User size={18} strokeWidth={2.5} className="text-slate-400 group-hover:text-[#3366FF]" />
                                        Profile
                                    </button>
                                </div>
                                <div className="my-3 border-t border-slate-100 mx-3"></div>
                                <button
                                    onClick={() => { setIsProfileOpen(false); onLogout?.(); }}
                                    className="w-full flex items-center gap-4 px-5 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-rose-500 hover:bg-rose-50 rounded-2xl transition-all group"
                                >
                                    <div className="p-1.5 bg-rose-100/50 rounded-lg group-hover:bg-rose-500 group-hover:text-white transition-all">
                                        <LogOut size={16} strokeWidth={3} />
                                    </div>
                                    Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
