import React from 'react';
import {
    FileText,
    Download,
    Filter,
    Search,
    ShieldCheck,
    Clock,
    Printer,
    Share2,
    Database,
    FileCheck,
    TrendingUp,
    PieChart as PieChartIcon,
    Table
} from 'lucide-react';
import { StatCard, ChartCard } from '../components/DashboardWidgets';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { classStats } from '../data/mockData';

const Reports = ({ role, showToast }) => {
    const reportData = [
        { id: '1', name: 'SEMESTER ACADEMIC EXAM SUMMARY', date: 'FEB 2026', type: 'PDF', status: 'VERIFIED', size: '2.4 MB', ref: 'AC-2026-001' },
        { id: '2', name: 'STUDENT PROGRESS BATCH SHEET', date: 'JAN 2026', type: 'XLS', status: 'VERIFIED', size: '1.2 MB', ref: 'AC-2026-002' },
        { id: '3', name: 'COURSE COMPLETION DIRECTORY', date: 'DEC 2025', type: 'DOC', status: 'ARCHIVED', size: '890 KB', ref: 'AC-2025-089' },
        { id: '4', name: 'BACKLOG CLEARANCE REGISTER', date: 'NOV 2025', type: 'PDF', status: 'VERIFIED', size: '3.1 MB', ref: 'AC-2025-074' },
    ];

    const handleDownload = (name) => {
        showToast?.(`Downloading: ${name}`, 'info');
        setTimeout(() => {
            showToast?.(`${name} finished downloading`, 'success');
        }, 1500);
    };

    const handlePrint = () => {
        showToast?.("Opening print menu...", 'info');
    };

    const handleExportBatch = () => {
        showToast?.("Packing reports (ZIP)...", 'info');
        setTimeout(() => {
            showToast?.("Archive is ready", 'success');
        }, 2500);
    };

    const handleShare = (name) => {
        showToast?.(`Creating link for: ${name}`, 'info');
        setTimeout(() => {
            showToast?.("Link copied to clipboard", 'success');
        }, 800);
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-200 pb-10">
                <div>
                    <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter uppercase">Academic reports</h1>
                    <p className="text-slate-500 font-bold uppercase text-[11px] tracking-[0.25em] mt-3">Education Hub • {role === 'teacher' ? 'Student Info & Analytics' : 'My Records'}</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-[11px] font-black text-slate-700 hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/50 uppercase tracking-widest active:scale-95"
                    >
                        <Printer size={16} strokeWidth={2.5} /> Print Summary
                    </button>
                    <button
                        onClick={handleExportBatch}
                        className="btn-primary uppercase tracking-widest text-[11px] px-8 py-4 shadow-xl shadow-blue-500/30"
                    >
                        <Download size={18} strokeWidth={3} className="mr-3" /> Export Archive
                    </button>
                </div>
            </div>

            {role === 'teacher' && (
                <div className="space-y-12">
                    {/* Analytics Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <ChartCard title="SUBJECT PERFORMANCE AVERAGE" subtitle="Current semester scoring across core modules">
                            <div className="h-[350px] w-full mt-8">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={classStats.subjectAverages}>
                                        <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#E2E8F0" />
                                        <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 13, fontWeight: 800 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 13, fontWeight: 800 }} domain={[0, 10]} />
                                        <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                                        <Bar dataKey="average" radius={[8, 8, 0, 0]} barSize={40}>
                                            {classStats.subjectAverages.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3366FF' : '#00E096'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </ChartCard>

                        <ChartCard title="GENDER COMPOSITION" subtitle="Student demographic distribution">
                            <div className="h-[350px] w-full mt-8 flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={classStats.genderDistribution}
                                            innerRadius={80}
                                            outerRadius={120}
                                            paddingAngle={8}
                                            dataKey="value"
                                        >
                                            <Cell fill="#3366FF" />
                                            <Cell fill="#F4F7FB" />
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-3xl font-black text-slate-900">100%</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Male Hub</span>
                                </div>
                            </div>
                        </ChartCard>
                    </div>

                    {/* Quick Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard title="TOTAL ACADEMIC DOCS" value="84" icon={Database} color="#3366FF" />
                        <StatCard title="ACADEMIC STANDING" value="A++" icon={ShieldCheck} color="#00E096" />
                        <StatCard title="VERIFICATION STATUS" value="CERTIFIED" icon={FileCheck} color="#FFAD0D" />
                    </div>
                </div>
            )}

            {/* Documents Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Table size={20} className="text-[#3366FF]" />
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Official Records</h2>
                </div>

                <div className="card shadow-premium p-0 overflow-hidden border-none bg-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-slate-50/50 border-b border-slate-100 gap-6">
                        <div className="relative flex-1 max-lg">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} strokeWidth={2.5} />
                            <input
                                type="text"
                                placeholder="SEARCH BY REFERENCE KEY OR FILENAME..."
                                className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] text-[11px] font-black text-slate-900 tracking-widest focus:outline-none focus:border-[#3366FF] transition-all shadow-sm uppercase placeholder:text-slate-300"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => showToast?.("Filtering...", 'info')}
                                className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:bg-slate-50 transition-all"
                            >
                                <Filter size={14} strokeWidth={3} /> Filter Records
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white">
                                    <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">File Name</th>
                                    <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Reference ID</th>
                                    <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">File Size</th>
                                    <th className="px-10 py-6"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {reportData.map((report) => (
                                    <tr key={report.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 bg-slate-50 border-2 border-slate-100 rounded-[1.25rem] flex items-center justify-center text-slate-400 group-hover:bg-[#3366FF] group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-inner">
                                                    <FileText size={28} strokeWidth={2.5} />
                                                </div>
                                                <div>
                                                    <p className="text-md font-black text-slate-900 group-hover:text-[#3366FF] transition-colors leading-none mb-2 tracking-tight uppercase">{report.name}</p>
                                                    <div className="flex items-center gap-2">
                                                        <FileCheck size={12} className="text-emerald-500" />
                                                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.15em]">{report.type} FORMAT • {report.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-xs font-black text-slate-700 font-mono tracking-widest bg-slate-100 px-3 py-1 rounded-lg border border-slate-200/50 uppercase">{report.ref}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border-2 shadow-sm ${report.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50' :
                                                report.status === 'DRAFT' ? 'bg-amber-50 text-amber-600 border-amber-100/50' :
                                                    'bg-slate-50 text-slate-500 border-slate-100/50'
                                                }`}>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest">{report.size}</td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center justify-end gap-3">
                                                <button
                                                    onClick={() => handleShare(report.name)}
                                                    className="p-3 text-slate-300 hover:text-[#3366FF] hover:bg-white border-2 border-transparent hover:border-slate-100 rounded-2xl transition-all active:scale-90"
                                                >
                                                    <Share2 size={20} strokeWidth={2.5} />
                                                </button>
                                                <button
                                                    onClick={() => handleDownload(report.name)}
                                                    className="p-3 bg-white border-2 border-slate-100 rounded-2xl text-slate-400 hover:text-[#3366FF] hover:border-[#3366FF]/30 hover:shadow-xl hover:shadow-slate-200 transition-all active:scale-90"
                                                >
                                                    <Download size={20} strokeWidth={3} />
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
        </div>
    );
};

export default Reports;
