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

const TeacherDashboard = ({ showToast, user, students = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Dynamic Metrics
    const totalStudents = students.length;
    const avgCGPA = students.length > 0 
        ? (students.reduce((acc, s) => acc + s.overallScore, 0) / students.length).toFixed(2)
        : '0.00';
    const atRiskCount = students.filter(s => s.overallScore < 7 || (s.status && s.status.includes('BACKLOG'))).length;

    const performanceData = [
        { month: 'SEM 1', score: 7.2 },
        { month: 'SEM 2', score: 7.8 },
        { month: 'SEM 3', score: 8.4 },
        { month: 'SEM 4', score: 8.1 },
        { month: 'SEM 5', score: 8.9 },
        { month: 'SEM 6', score: 9.4 },
    ];

    const distributionData = [
        { grade: 'O', count: students.filter(s => s.overallScore >= 9).length, color: '#3366FF' },
        { grade: 'A+', count: students.filter(s => s.overallScore >= 8 && s.overallScore < 9).length, color: '#4E7DFF' },
        { grade: 'A', count: students.filter(s => s.overallScore >= 7 && s.overallScore < 8).length, color: '#6B92FF' },
        { grade: 'B+', count: students.filter(s => s.overallScore >= 6 && s.overallScore < 7).length, color: '#88A7FF' },
        { grade: 'B', count: students.filter(s => s.overallScore < 6).length, color: '#A5BCFF' },
    ];

    const handleQuickAction = (action) => {
        showToast?.(`Starting: ${action}`, 'success');
    };

    const filteredStudents = students.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.id.includes(searchQuery)
    ).slice(0, 5); // Just show top 5 in dash

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
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Live Sync: Active</span>
                    </div>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard title="ENROLLED STUDENTS" value={totalStudents.toString()} icon={Users} trend={12.5} color="#3366FF" />
                <StatCard title="CLASS AVERAGE" value={avgCGPA} icon={GraduationCap} trend={4.2} color="#00E096" />
                <StatCard title="PASS PERCENTAGE" value="98.2%" icon={TrendingUp} color="#FFAD0D" />
                <StatCard title="AT-RISK ENTRIES" value={atRiskCount.toString()} icon={AlertCircle} trend={-2.1} color="#FF3B3B" />
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

            {/* Actionable Student Overview Table */}
            <div className="card p-8 md:p-10 border border-slate-200/60 mt-10 animate-in slide-in-from-bottom-8 duration-1000">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Student Overview</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Manage Marks & Attendance</p>
                    </div>
                    <div className="relative w-full sm:w-64">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                         <input 
                            type="text" 
                            placeholder="SEARCH STUDENTS..." 
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black tracking-widest uppercase focus:outline-none focus:border-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                         />
                    </div>
                </div>
                
                <div className="overflow-x-auto custom-scrollbar pb-4">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="border-b-2 border-slate-100">
                                <th className="pb-4 text-[10px] font-black tracking-widest text-slate-400 uppercase w-1/4">Student Name</th>
                                <th className="pb-4 text-[10px] font-black tracking-widest text-slate-400 uppercase w-1/5">ID No.</th>
                                <th className="pb-4 text-[10px] font-black tracking-widest text-slate-400 uppercase w-1/6">Attendance</th>
                                <th className="pb-4 text-[10px] font-black tracking-widest text-slate-400 uppercase w-1/6">Latest CGPA</th>
                                <th className="pb-4 text-[10px] font-black tracking-widest text-slate-400 uppercase text-right">Quick Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {filteredStudents.map((student, idx) => (
                                <tr key={idx} className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors group">
                                    <td className="py-5 font-bold text-slate-900 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden border border-slate-200">
                                            <img src={student.avatar} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        {student.name}
                                    </td>
                                    <td className="py-5 font-bold text-slate-500">{student.id}</td>
                                    <td className="py-5">
                                        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                            student.attendance < 75 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                                        }`}>
                                            {student.attendance}%
                                        </span>
                                    </td>
                                    <td className="py-5 font-black text-slate-900">{student.overallScore.toFixed(2)}</td>
                                    <td className="py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => showToast?.(`Updating attendance for ${student.name}`, 'info')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[10px] font-black uppercase tracking-widest transition-colors">
                                                Attendance
                                            </button>
                                            <button onClick={() => showToast?.(`Editing marks for ${student.name}`, 'info')} className="px-3 py-1.5 bg-blue-50 border border-blue-100 hover:bg-blue-100 text-[#3366FF] rounded-md text-[10px] font-black uppercase tracking-widest transition-colors">
                                                Edit Marks
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
