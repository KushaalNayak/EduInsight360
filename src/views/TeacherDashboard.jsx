import React, { useState } from 'react';
import { StatCard, ChartCard } from '../components/DashboardWidgets';
import {
    Users,
    GraduationCap,
    TrendingUp,
    AlertCircle,
    LayoutDashboard,
    Zap,
    Clock,
    Search,
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const TeacherDashboard = ({ showToast, user }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const performanceData = [
        { month: 'SEM 1', score: 7.2 },
        { month: 'SEM 2', score: 7.8 },
        { month: 'SEM 3', score: 8.4 },
        { month: 'SEM 4', score: 8.1 },
        { month: 'SEM 5', score: 8.9 },
        { month: 'SEM 6', score: 9.4 },
    ];

    const distributionData = [
        { grade: 'O', count: 12, color: '#3366FF' },
        { grade: 'A+', count: 25, color: '#4E7DFF' },
        { grade: 'A', count: 40, color: '#6B92FF' },
        { grade: 'B+', count: 18, color: '#88A7FF' },
        { grade: 'B', count: 5, color: '#A5BCFF' },
    ];

    const handleQuickAction = (action) => {
        showToast?.(`Starting: ${action}`, 'success');
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Page Branding Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-200 pb-10">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="bg-[#3366FF] w-1.5 h-6 rounded-full"></div>
                        <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter uppercase">Faculty Control</h1>
                    </div>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] ml-4">Faculty Member: <span className="text-[#3366FF] font-black">{user?.name || 'FACULTY'}</span></p>
                </div>
                <div className="flex items-center gap-4 bg-white px-6 py-3.5 rounded-[1.5rem] border border-slate-200 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-[#3366FF]" />
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Backup: Active</span>
                    </div>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard title="TOTAL STUDENTS" value="1,248" icon={Users} trend={12.5} color="#3366FF" />
                <StatCard title="ACADEMIC CGPA" value="8.42" icon={GraduationCap} trend={4.2} color="#00E096" />
                <StatCard title="PASS PERCENTAGE" value="98.2%" icon={TrendingUp} color="#FFAD0D" />
                <StatCard title="AT-RISK ENTRIES" value="14" icon={AlertCircle} trend={-2.1} color="#FF3B3B" />
            </div>

            {/* Main Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                    <ChartCard title="STUDENT SUCCESS RATE" subtitle="Grades from all semesters">
                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3366FF" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#3366FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#E2E8F0" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748B', fontSize: 13, fontWeight: 800 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748B', fontSize: 13, fontWeight: 800 }}
                                    domain={[0, 10]}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '24px',
                                        border: 'none',
                                        boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
                                        padding: '16px 24px'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#3366FF"
                                    fillOpacity={1}
                                    fill="url(#colorScore)"
                                    strokeWidth={5}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                <div className="space-y-10">
                    <div className="card p-8 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                        <div className="relative z-10">
                            <h3 className="text-white text-lg font-black mb-6 uppercase tracking-widest">Quick Tools</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Export Results', action: 'Export' },
                                    { label: 'Add New Student', action: 'Enrollment' },
                                    { label: 'Make Report', action: 'Report' }
                                ].map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleQuickAction(item.action)}
                                        className="w-full flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group/btn"
                                    >
                                        <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                                        <ArrowUpRight size={16} className="text-blue-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="card p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-black text-slate-900 tracking-widest uppercase">Grade Spread</h3>
                            <LayoutDashboard size={18} className="text-[#3366FF]" />
                        </div>
                        <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={distributionData}>
                                <Bar dataKey="count" radius={[10, 10, 10, 10]} barSize={35}>
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                                <XAxis
                                    dataKey="grade"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94A3B8', fontSize: 13, fontWeight: 900 }}
                                />
                                <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
