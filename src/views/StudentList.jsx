import React, { useState } from 'react';
import { Search, GraduationCap, ChevronRight, Plus, Download, X, BookOpen, Clock, Award, Star, TrendingUp, AlertCircle, User, FileBarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentModal = ({ student, onClose }) => {
    if (!student) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex border border-slate-200"
                onClick={(e) => e.stopPropagation()}
                style={{ height: '580px' }} // Fixed height to prevent scrolling
            >
                {/* Left: Compact Profile */}
                <div className="w-[280px] bg-slate-50 border-r border-slate-100 p-6 flex flex-col items-center shrink-0">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-md mb-4 shrink-0">
                        <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-lg font-black text-slate-900 text-center uppercase tracking-tight leading-tight">{student.name}</h2>
                    <p className="text-[#3366FF] text-[9px] font-black uppercase tracking-widest mt-1.5">{student.id}</p>

                    <div className="w-full space-y-3 mt-6">
                        <div className="p-3.5 bg-white rounded-xl border border-slate-100 flex flex-col gap-0.5">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Email</span>
                            <span className="text-[11px] font-bold text-slate-700 truncate">{student.email}</span>
                        </div>
                        <div className="p-3.5 bg-white rounded-xl border border-slate-100 flex flex-col gap-0.5">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Grade</span>
                            <span className="text-[11px] font-bold text-slate-700 uppercase">{student.grade}</span>
                        </div>
                    </div>

                    <div className="mt-auto w-full">
                        <button
                            onClick={onClose}
                            className="w-full py-3 border border-slate-200 text-[#3366FF] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95"
                        >
                            Back To List
                        </button>
                    </div>
                </div>

                {/* Right: Academic Grid */}
                <div className="flex-1 p-8 flex flex-col bg-white">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none">Academic Summary</h3>
                            <p className="text-slate-400 text-[10px] font-bold tracking-wide mt-1 uppercase">Session 2025-26</p>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
                            <div className="text-right">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Overall CGPA</p>
                                <span className="text-2xl font-black text-slate-900 leading-none">{student.overallScore.toFixed(2)}</span>
                            </div>
                            <div className="w-10 h-10 bg-[#3366FF] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/10">
                                <Award size={20} />
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock size={14} className="text-amber-500" />
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Attendance</span>
                            </div>
                            <p className="text-lg font-black text-slate-900 leading-none">{student.attendance}%</p>
                        </div>
                        <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp size={14} className="text-emerald-500" />
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Performance</span>
                            </div>
                            <p className="text-lg font-black text-slate-900 leading-none">{student.overallScore >= 9 ? 'Tier 1' : 'Tier 2'}</p>
                        </div>
                        <div className={`p-4 rounded-2xl border ${student.status ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-100'}`}>
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle size={14} className={student.status ? "text-rose-500" : "text-[#3366FF]"} />
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Backlogs</span>
                            </div>
                            <p className={`text-lg font-black leading-none ${student.status ? 'text-rose-600' : 'text-emerald-600'}`}>{student.status ? student.status.split(' ')[0] : 'None'}</p>
                        </div>
                    </div>

                    {/* Compact Subjects Table */}
                    <div className="flex-1 overflow-hidden">
                        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <BookOpen size={12} className="text-[#3366FF]" />
                            Course Evaluations
                        </h4>
                        <div className="space-y-2">
                            {student.subjects.slice(0, 5).map((sub, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50/30 rounded-xl border border-slate-100 hover:bg-white hover:shadow-sm transition-all group">
                                    <span className="text-xs font-bold text-slate-700 uppercase tracking-tight group-hover:text-[#3366FF]">{sub.name}</span>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden hidden sm:block">
                                            <div
                                                className={`h-full ${sub.score >= 80 ? 'bg-blue-500' : 'bg-emerald-500'}`}
                                                style={{ width: `${sub.score}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-black text-slate-900 min-w-[35px] text-right">{sub.score}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Compact Insight */}
                    <div className="mt-8 p-5 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-center gap-5 shadow-sm">
                        <Star size={20} className="text-[#3366FF] shrink-0" fill="currentColor" />
                        <p className="text-[11px] font-bold text-slate-600 leading-snug italic line-clamp-2">
                            "{student.recommendations[0] || 'Maintaining steady academic progression.'}"
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const StudentList = ({ showToast, students, onAddStudent }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddStudent = () => {
        const id = `24000${Math.floor(800000 + Math.random() * 100000)}`;
        const names = ['Jordan Smith', 'Cassidy Reed', 'Morgan Bell', 'Taylor Vance', 'Skyler Ross'];
        const randomName = names[Math.floor(Math.random() * names.length)];

        const newStudent = {
            id,
            name: randomName,
            email: `${randomName.toLowerCase().replace(' ', '.')}@eduinsight360.com`,
            grade: 'B Tech - 2nd year',
            overallScore: 8.5,
            attendance: 90,
            subjects: [
                { name: 'Designs and Analysis of Algorithms', score: 85, trend: 'up' },
                { name: 'Data Structures', score: 80, trend: 'stable' },
                { name: 'Computer Networks', score: 75, trend: 'stable' },
            ],
            recentActivity: [],
            improvementTrends: [],
            strengths: ['New Enrollment'],
            weaknesses: [],
            recommendations: ['Maintain current academic consistency.']
        };

        onAddStudent(newStudent);
    };

    const handleDownloadRegistry = () => {
        showToast?.("Downloading Registry...", 'info');
        setTimeout(() => showToast?.("Registry saved to local drive", 'success'), 1000);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <AnimatePresence>
                {selectedStudent && (
                    <StudentModal
                        student={selectedStudent}
                        onClose={() => setSelectedStudent(null)}
                    />
                )}
            </AnimatePresence>

            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Students</h1>
                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest pl-0.5 mt-1">Staff Access Active</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={handleDownloadRegistry} className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest">
                        Export
                    </button>
                    <button onClick={handleAddStudent} className="btn-primary px-6 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">
                        Enroll Student
                    </button>
                </div>
            </div>

            <div className="card shadow-premium p-0 border-none bg-white overflow-hidden rounded-2xl">
                <div className="p-5 bg-slate-50/50 border-b border-slate-50 flex items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} strokeWidth={3} />
                        <input
                            type="text"
                            placeholder="SEARCH BY ID OR NAME..."
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-900 tracking-widest focus:outline-none focus:border-[#3366FF] transition-all uppercase"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] font-black text-slate-900">{filteredStudents.length} Students Listed</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/30">
                                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Student Information</th>
                                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">CGPA Index</th>
                                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Attendance</th>
                                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredStudents.map((student) => (
                                <tr
                                    key={student.id + student.name}
                                    className="group hover:bg-slate-50/80 transition-all duration-200 cursor-pointer"
                                    onClick={() => setSelectedStudent(student)}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white rounded-xl overflow-hidden border border-slate-100 group-hover:border-[#3366FF]/40 shadow-sm transition-all relative shrink-0">
                                                <img src={student.avatar} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-black text-slate-900 group-hover:text-[#3366FF] transition-colors uppercase leading-none mb-1.5">{student.name}</p>
                                                <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{student.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-[13px] font-black text-slate-900">{student.overallScore.toFixed(2)}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`text-[11px] font-black px-2 py-1 rounded-lg ${student.attendance >= 75 ? 'text-emerald-600 bg-emerald-50' : 'text-rose-500 bg-rose-50'}`}>
                                            {student.attendance}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {student.status ? (
                                            <span className="px-2 py-1 bg-rose-50 text-rose-600 text-[9px] font-black rounded-lg border border-rose-100 uppercase tracking-widest">{student.status}</span>
                                        ) : (
                                            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-lg border border-emerald-100 uppercase tracking-widest">Verified</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="w-8 h-8 bg-white border border-slate-100 text-slate-200 group-hover:text-[#3366FF] group-hover:border-[#3366FF]/25 rounded-lg flex items-center justify-center transition-all">
                                            <ChevronRight size={16} strokeWidth={3} />
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

export default StudentList;
