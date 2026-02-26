import React from 'react';
import { StatCard, ChartCard } from '../components/DashboardWidgets';
import {
    Target,
    Award,
    Clock,
    CheckCircle2,
    Zap,
    Activity,
    BookOpen,
    ChevronRight,
    Download,
    Star
} from 'lucide-react';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockStudents } from '../data/mockData';

const StudentDashboard = ({ showToast, student }) => {
    if (!student) return null;

    const handleDownloadReport = () => {
        showToast?.("Making your report (PDF)...", 'info');
        setTimeout(() => {
            showToast?.("Report is ready to download", 'success');
        }, 1500);
    };

    const handleStrengthClick = (strength) => {
        showToast?.(`Mastery details for ${strength} retrieved`, 'success');
    };

    const handleAcademicSync = () => {
        showToast?.("Connecting to university...", 'info');
        setTimeout(() => {
            showToast?.("Data updated successfully", 'success');
        }, 1200);
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Student Branding Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-200 pb-10">
                <div>
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                            <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <div className="bg-[#3366FF] w-1.5 h-6 rounded-full"></div>
                                <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter uppercase">Student Portal</h1>
                            </div>
                            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] ml-4">Student: <span className="text-[#3366FF] font-black">{student.name}</span></p>
                        </div>
                    </div>
                </div>
                <div
                    onClick={handleAcademicSync}
                    className="flex items-center gap-5 bg-white px-6 py-4 rounded-[2rem] border border-slate-200 shadow-sm transition-all hover:shadow-md cursor-pointer group"
                >
                    <div className="flex items-center gap-3 pr-6 border-r border-slate-100">
                        <Clock size={18} className="text-[#3366FF]" />
                        <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Update Data</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">University verified</span>
                    </div>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <StatCard title="CURRENT CGPA" value={`${student.overallScore.toFixed(2)}/10.0`} icon={Award} color="#3366FF" trend={4.2} />
                <StatCard title="OVERALL GRADE" value="EXCELLENT" icon={Target} color="#00E096" />
                <StatCard title="COURSE ATTENDANCE" value={`${student.attendance}%`} icon={CheckCircle2} color="#FFAD0D" />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                    <ChartCard title="YOUR GROWTH" subtitle="Performance over the last 6 cycles">
                        <div className="h-[400px] w-full mt-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={student.improvementTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                        </div>
                    </ChartCard>
                </div>

                <div className="space-y-8">
                    <div className="card bg-white p-8">
                        <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-50">
                            <div className="flex items-center gap-3">
                                <Star size={20} className="text-amber-500" />
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Core Strengths</h3>
                            </div>
                            <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-[#3366FF]">
                                <Activity size={20} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="space-y-5">
                            {student.strengths.map((str, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleStrengthClick(str)}
                                    className="flex items-center justify-between px-6 py-5 rounded-[1.5rem] bg-slate-50 border border-slate-200/50 group hover:border-[#3366FF]/40 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] group-hover:scale-125 transition-transform"></div>
                                        <span className="text-sm font-black text-slate-800 tracking-tight uppercase tracking-widest">{str}</span>
                                    </div>
                                    <ChevronRight size={16} strokeWidth={3} className="text-slate-300 group-hover:text-[#3366FF] transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card bg-[#3366FF] border-none shadow-premium p-8 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                                    <BookOpen size={24} className="text-white" strokeWidth={2.5} />
                                </div>
                                <h3 className="font-black text-xl tracking-tighter uppercase tracking-widest leading-none">Academic Report</h3>
                            </div>
                            <p className="text-blue-100/80 text-xs font-bold mb-10 leading-relaxed uppercase tracking-[0.15em]">Your performance report for this semester is ready to download.</p>
                            <button
                                onClick={handleDownloadReport}
                                className="w-full py-4 bg-white text-[#3366FF] rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-blue-900/40 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                            >
                                <Download size={16} strokeWidth={3} /> Download Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
