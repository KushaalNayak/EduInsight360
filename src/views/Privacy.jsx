import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, Cloud, FileText, ArrowLeft } from 'lucide-react';

const Privacy = ({ onBack }) => {
    const policies = [
        {
            title: "Data Collection",
            desc: "The system collects grades, attendance, and faculty feedback to help you track your progress.",
            icon: FileText
        },
        {
            title: "Access Controls",
            desc: "Your data is safe. Teachers can see student info, but students can only see their own profile and reports.",
            icon: Lock
        },
        {
            title: "Data Security",
            desc: "We use high-level security to keep your information safe. All files and grades are protected.",
            icon: Cloud
        },
        {
            title: "Usage Transparency",
            desc: "Data is used only for school improvement and helping students. We don't share your details with anyone outside the school.",
            icon: Eye
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
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Privacy Policy</h1>
                    </div>
                </div>

                <div className="space-y-6">
                    {policies.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col md:flex-row gap-6 items-start md:items-center hover:bg-slate-50/50 transition-colors"
                        >
                            <div className="w-14 h-14 bg-blue-50 text-[#3366FF] rounded-2xl flex items-center justify-center shrink-0">
                                <item.icon size={24} strokeWidth={2.5} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-black text-slate-900 mb-1 uppercase tracking-widest">{item.title}</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center border-t border-slate-200 pt-12">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-loose">
                        Your privacy is our priority. <br />
                        For questions, contact the school office.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
