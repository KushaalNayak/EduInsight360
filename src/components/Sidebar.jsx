import React from 'react';
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BarChart3,
    FileText,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ role, activeTab, setActiveTab, collapsed, setCollapsed, onLogout }) => {
    const links = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
        ...(role === 'teacher'
            ? [
                { id: 'students', icon: Users, label: 'Students' },
                { id: 'reports', icon: BarChart3, label: 'Reports' }
            ]
            : [
                { id: 'subjects', icon: TrendingUp, label: 'Studies' },
                { id: 'reports', icon: FileText, label: 'Reports' }
            ]
        ),
        { id: 'settings', icon: Settings, label: 'Profile' },
    ];

    const handleTabClick = (id) => {
        setActiveTab(id);
    };

    return (
        <aside
            className={`flex flex-col h-screen sticky top-0 transition-all duration-500 ease-in-out z-50 glass-sidebar ${collapsed ? 'w-20' : 'w-64'}`}
        >
            {/* Logo Section */}
            <div className={`flex items-center gap-3 p-7 mb-4 ${collapsed ? 'justify-center' : ''}`}>
                <div className="bg-[#3366FF] p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/30">
                    <GraduationCap size={22} strokeWidth={2.5} />
                </div>
                {!collapsed && (
                    <span className="font-extrabold text-slate-900 tracking-tight text-lg uppercase">EduInsight</span>
                )}
            </div>

            {/* Navigation links */}
            <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                <p className={`text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3 ${collapsed ? 'text-center' : 'ml-3'}`}>
                    {collapsed ? '•' : 'Main Menu'}
                </p>
                {links.map((link) => {
                    const isActive = activeTab === link.id;
                    return (
                        <button
                            key={link.id}
                            onClick={() => handleTabClick(link.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group ${isActive
                                ? 'bg-[#3366FF] text-white shadow-lg shadow-blue-500/25'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <link.icon size={20} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
                            {!collapsed && <span className="text-sm font-semibold tracking-tight">{link.label}</span>}
                            {isActive && !collapsed && (
                                <motion.div
                                    layoutId="sidebar-active-indicator"
                                    className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full"
                                />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Footer Section */}
            <div className="p-4 border-t border-slate-100 space-y-2">
                <button
                    onClick={() => onLogout?.()}
                    className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-rose-500 hover:bg-rose-50 transition-all duration-300"
                >
                    <LogOut size={20} />
                    {!collapsed && <span className="tracking-tight">Sign Out</span>}
                </button>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-center p-2 mt-4 text-slate-300 hover:text-slate-500 transition-colors"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
