import React from 'react';
import { motion } from 'framer-motion';
import { Book, Shield, CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react';

const Guidelines = ({ onBack }) => {
    const guidelines = [
        {
            title: "Academic Integrity",
            desc: "All automated reports and academic analytics must be used ethically. Plagiarism or manipulation of system-generated data is strictly prohibited.",
            icon: Book
        },
        {
            title: "Authorized System Access",
            desc: "The EduInsight 360 portal is for authorized faculty and students only. Sharing institutional credentials with third parties is a violation of security protocol.",
            icon: Shield
        },
        {
            title: "Data Attribution",
            desc: "Any data extracted for institutional research must credit the EduInsight 360 platform as the primary source of academic intelligence.",
            icon: CheckCircle
        },
        {
            title: "Digital Conduct",
            desc: "Users must maintain professional conduct within the system. Interaction with the 'Academic Command' console should follow institutional IT ethics.",
            icon: ExternalLink
        }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8 lg:p-16">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-500 font-black uppercase text-[10px] tracking-widest hover:text-[#3366FF] transition-colors mb-12"
                >
                    <ArrowLeft size={16} />
                    Return to Portal
                </button>

                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#3366FF] w-2 h-8 rounded-full"></div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Digital Guidelines</h1>
                    </div>
                    <p className="text-slate-500 font-bold uppercase text-xs tracking-[0.2em] ml-5">Institutional Operations Manual v2.4</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {guidelines.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
                        >
                            <div className="w-12 h-12 bg-slate-50 text-[#3366FF] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#3366FF] group-hover:text-white transition-colors">
                                <item.icon size={24} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-lg font-black text-slate-900 mb-3 uppercase tracking-tight">{item.title}</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 p-8 bg-slate-900 rounded-[2rem] text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4">Compliance Notice</h4>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-2xl">
                            By accessing the EduInsight 360 system, you agree to abide by these guidelines. Failure to comply may result in temporary suspension of portal privileges or institutional disciplinary action.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guidelines;
