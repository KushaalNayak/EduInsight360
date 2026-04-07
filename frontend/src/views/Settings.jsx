import React, { useState } from 'react';
import { User, Shield, ChevronRight, Save, RefreshCw } from 'lucide-react';

const Settings = ({ user, showToast, onUpdateUser }) => {
    const [activeSection, setActiveSection] = useState('Account');
    const [formData, setFormData] = useState({
        name: user.name,
        role: user.role,
        email: user.email || user.name.toLowerCase().replace(' ', '.') + '@institutional.edu'
    });

    const sections = [
        {
            id: 'Account',
            title: 'Identity & Access',
            icon: User,
            items: [
                { label: 'Full Legal Name', value: formData.name, key: 'name', type: 'text' },
                { label: 'Designation Role', value: formData.role, key: 'role', type: 'readonly' },
                { label: 'Primary Email', value: formData.email, key: 'email', type: 'email' }
            ]
        },
        {
            id: 'Security',
            title: 'Security Protocol',
            icon: Shield,
            items: [
                { label: 'Two-Factor Authentication', value: 'ACTIVE (SMS + EMAIL)', type: 'status' },
                { label: 'Last Password Audit', value: 'JAN 15, 2026', type: 'date' },
                { label: 'Current Login Sessions', value: '3 ACTIVE DEVICES', type: 'session' }
            ]
        }
    ];

    const handleFieldUpdate = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        showToast?.("Saving changes...", 'info');
        setTimeout(() => {
            onUpdateUser({ name: formData.name });
            showToast?.("Profile updated successfully", 'success');
        }, 1500);
    };

    const handleReset = () => {
        setFormData({
            name: user.name,
            role: user.role,
            email: user.email || user.name.toLowerCase().replace(' ', '.') + '@institutional.edu'
        });
        showToast?.("Reverting form to institutional defaults...", 'info');
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Settings</h1>
                    <p className="text-slate-500 text-[11px] font-extrabold tracking-[0.2em] mt-2 uppercase">Manage your profile and account settings</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest active:scale-95"
                    >
                        <RefreshCw size={14} /> Reset
                    </button>
                    <button
                        onClick={handleSave}
                        className="btn-primary uppercase tracking-widest text-[11px] px-8"
                    >
                        <Save size={16} className="mr-2" /> Save Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Navigation Menu */}
                <div className="lg:col-span-1 space-y-3">
                    {['Account', 'Security'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveSection(item)}
                            className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 group ${activeSection === item
                                ? 'bg-slate-900 text-white shadow-xl shadow-slate-300'
                                : 'text-slate-400 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200'
                                }`}
                        >
                            {item}
                            <ChevronRight size={14} className={`transition-transform duration-300 ${activeSection === item ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    {sections.filter(s => activeSection === 'Account' ? s.id === 'Account' : activeSection === 'Security' ? s.id === 'Security' : true).map((section) => (
                        <div key={section.title} className="card shadow-premium overflow-hidden transition-all duration-500">
                            <div className="flex items-center gap-4 mb-10 pb-5 border-b border-slate-100">
                                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-[#3366FF] shadow-sm">
                                    <section.icon size={22} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">{section.title}</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Account Section</p>
                                </div>
                            </div>

                            <div className="space-y-0">
                                {section.items.map((item) => (
                                    <div key={item.label} className="grid grid-cols-1 md:grid-cols-3 py-6 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 -mx-6 px-10 transition-all group">
                                        <div className="flex items-center gap-2">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                                        </div>
                                        <div className="md:col-span-2 flex items-center justify-between">
                                            {item.type === 'text' || item.type === 'email' ? (
                                                <input
                                                    type={item.type}
                                                    value={item.value}
                                                    onChange={(e) => handleFieldUpdate(item.key, e.target.value)}
                                                    className="w-full bg-transparent border-none focus:ring-0 text-sm font-black text-slate-800 tracking-tight"
                                                />
                                            ) : (
                                                <p className="text-sm font-black text-slate-800 tracking-tight">{item.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Settings;
