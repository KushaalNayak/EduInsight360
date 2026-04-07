import React from 'react';
import { BookOpen, Download, ChevronRight, Activity, Calendar, Award, CheckCircle } from 'lucide-react';
import { mockStudents } from '../data/mockData';

const AcademicDetails = ({ showToast, student }) => {
    if (!student) return null;

    const handleDownloadMarksheet = () => {
        showToast?.("Requesting certified marksheet from central registry...", 'info');
        setTimeout(() => {
            showToast?.("Digital Certified Marksheet generated and ready for extraction", 'success');
        }, 1800);
    };

    const handleSubjectDetails = (subject) => {
        showToast?.(`Opening comprehensive technical breakdown for: ${subject}`, 'info');
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-200 pb-10">
                <div>
                    <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter uppercase">Academic Registry</h1>
                    <p className="text-slate-500 font-bold uppercase text-[11px] tracking-[0.25em] mt-3">Detailed Performance Audit • Verified Digital Ledger</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleDownloadMarksheet}
                        className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-2xl text-[11px] font-black text-slate-700 hover:bg-[#3366FF] hover:text-white hover:border-[#3366FF] transition-all shadow-xl shadow-slate-200 uppercase tracking-widest active:scale-95 group"
                    >
                        <Download size={16} className="group-hover:translate-y-0.5 transition-transform" /> Download Certified Marksheet
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {student.subjects.map((subj) => (
                    <div
                        key={subj.name}
                        onClick={() => handleSubjectDetails(subj.name)}
                        className="card group hover:scale-[1.03] hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-[#3366FF]/20"
                    >
                        <div className="flex justify-between items-start mb-10">
                            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-400 group-hover:bg-[#3366FF] group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-inner">
                                <BookOpen size={28} strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className={`text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-[0.15em] border-2 ${subj.score >= 90
                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50'
                                    : 'bg-blue-50 text-blue-600 border-blue-100/50'
                                    }`}>
                                    {subj.score >= 90 ? 'Grade A+' : 'Grade A'}
                                </span>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-black tracking-widest uppercase border border-slate-200/50">
                                    <CheckCircle size={10} strokeWidth={3} /> Verified
                                </div>
                            </div>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tighter group-hover:text-[#3366FF] transition-colors uppercase">{subj.name}</h3>
                        <p className="text-[11px] text-slate-400 font-extrabold uppercase tracking-[0.25em] mb-10 flex items-center gap-3">
                            <Calendar size={12} strokeWidth={2.5} /> Semester 02 • 4 Credits
                        </p>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-[11px] font-black">
                                <span className="text-slate-400 uppercase tracking-[0.15em]">Internal Assessment</span>
                                <span className="text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200/50">{subj.score - 5}/100</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-black">
                                <span className="text-slate-400 uppercase tracking-[0.15em]">External Examination</span>
                                <span className="text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200/50">{subj.score + 2}/100</span>
                            </div>
                            <div className="pt-6 border-t border-slate-100 mt-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Mastery Level</span>
                                    <span className="text-lg font-black text-[#3366FF]">{subj.score}%</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner p-0.5">
                                    <div
                                        className="h-full bg-[#3366FF] rounded-full transition-all duration-1000 ease-out shadow-lg"
                                        style={{ width: `${subj.score}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card p-0 overflow-hidden shadow-2xl border-none">
                <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="bg-[#3366FF] p-4 rounded-2xl text-white shadow-lg shadow-blue-500/30">
                            <Activity size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Attendance Integrity Logs</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Live Tracking Verified by Registrar Office</p>
                        </div>
                    </div>
                    <button
                        onClick={() => showToast?.("Correction request protocol initiated...", 'info')}
                        className="text-[10px] font-black text-[#3366FF] border-2 border-[#3366FF]/20 px-6 py-3 rounded-xl uppercase tracking-widest hover:bg-[#3366FF] hover:text-white transition-all active:scale-95"
                    >
                        Request Corrections
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    {['Mathematics II', 'Physics Lab', 'Data Structures'].map(s => (
                        <div key={s} className="flex items-center justify-between p-7 rounded-[2rem] hover:bg-slate-50 transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-slate-200/50">
                            <div className="flex items-center gap-8">
                                <div className="relative">
                                    <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.6)] group-hover:scale-125 transition-transform"></div>
                                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
                                </div>
                                <div>
                                    <p className="text-lg font-black text-slate-800 tracking-tighter uppercase">{s}</p>
                                    <div className="flex items-center gap-2 mt-1 px-3 py-1 bg-slate-100 rounded-lg w-fit border border-slate-200/50">
                                        <Award size={10} className="text-[#3366FF]" />
                                        <p className="text-[10px] text-slate-500 font-extrabold uppercase mt-0.5 tracking-widest">Theory Course Verified</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-16">
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2 leading-none">Attendance</p>
                                    <p className="text-2xl font-black text-slate-900 tracking-tighter leading-none">92%</p>
                                </div>
                                <div className="text-right hidden lg:block">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2 leading-none">Health Status</p>
                                    <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-xl border-2 border-emerald-100 uppercase tracking-[0.15em] shadow-sm">OPTIMAL ENTRY</span>
                                </div>
                                <div className="p-3 bg-white border border-slate-100 rounded-xl text-slate-300 group-hover:text-[#3366FF] group-hover:border-[#3366FF]/20 group-hover:shadow-md transition-all group-hover:translate-x-1">
                                    <ChevronRight size={22} strokeWidth={3} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AcademicDetails;
