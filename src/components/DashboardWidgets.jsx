import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({ title, value, icon: Icon, trend, color = '#3366FF' }) => {
    return (
        <div className="card flex flex-col justify-between h-[150px] group transition-all hover:translate-y-[-2px]">
            <div className="flex justify-between items-start">
                <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: color, boxShadow: `${color}20 0 10px 20px` }}
                >
                    <Icon size={22} />
                </div>
                {trend !== undefined && (
                    <div className={`flex items-center gap-1 text-[11px] font-bold ${trend >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>

            <div className="mt-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1 uppercase tracking-tight">{value}</h3>
            </div>
        </div>
    );
};

export const ChartCard = ({ title, subtitle, children }) => (
    <div className="card h-full flex flex-col">
        <div className="mb-4">
            <h3 className="text-sm font-black text-slate-900 tracking-widest uppercase">{title}</h3>
            {subtitle && <p className="text-xs font-semibold text-slate-400 mt-1 uppercase opacity-70">{subtitle}</p>}
        </div>
        <div className="flex-1 w-full min-h-[300px]">
            {children}
        </div>
    </div>
);
