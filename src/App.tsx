import React, { useState } from 'react';
// 1. Import the logo from your source folder
import medeLogo from './assets/logo.png';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  Activity, Users, Clock, AlertTriangle, ShieldCheck, HeartPulse, 
  LayoutDashboard, ClipboardList, Settings, LogOut, ChevronRight, TrendingDown
} from 'lucide-react';

// --- MOCK DATA FOR CLINICAL OUTCOMES ---
const readmitData = [
  { month: 'Oct', rate: 13.8 }, { month: 'Nov', rate: 13.2 }, { month: 'Dec', rate: 12.4 }
];

const diagnosisData = [
  { name: 'Heart Failure', value: 45 }, { name: 'Pneumonia', value: 32 },
  { name: 'COPD', value: 28 }, { name: 'Sepsis', value: 22 }
];

// --- MOCK DATA FOR CHRONIC CARE ---
const chronicCareData = [
  { name: 'Controlled', value: 68, color: '#10b981' },
  { name: 'At Risk', value: 22, color: '#f59e0b' },
  { name: 'Critical', value: 10, color: '#ef4444' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'ops' | 'quality'>('ops');

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-slate-900">
      {/* SIDEBAR NAVIGATION */}
{/*}        <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">*/}
        <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
            {/* If you have the image file in your /public folder */}
            <img 
              src={medeLogo}
              alt="MedeAnalytics Logo" 
              className="h-10 w-auto object-contain"
            />
            {/*<span className="font-bold text-lg tracking-tight">MedeAnalytics</span>*/}
          </div>        
          <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          {/*<div className="bg-emerald-500 p-2 rounded-lg text-white">
            <HeartPulse size={24} />
          </div>*/}
          <span className="font-bold text-xl tracking-tight">Choose a Report</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button 
            onClick={() => setActiveTab('ops')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'ops' ? 'bg-emerald-600 shadow-lg' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            <LayoutDashboard size={20} /> 1. Clinical Operations
          </button>
          <button 
            onClick={() => setActiveTab('quality')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'quality' ? 'bg-emerald-600 shadow-lg' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            <ShieldCheck size={20} /> 2. Quality & Chronic Conditions
          </button>
          
          <div className="pt-6 pb-2 px-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Support</div>
          <button className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all"><Users size={20}/> Staffing</button>
          <button className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all"><Settings size={20}/> Settings</button>
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-all"><LogOut size={20}/> Sign Out</button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-10">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {activeTab === 'ops' ? 'Clinical Operations Dashboard' : 'Quality & Chronic Care Analysis'}
            </h1>
            <p className="text-slate-500 mt-1">Hospital Systems Monitor • January 2026</p>
          </div>
          <div className="bg-white border p-1 rounded-lg shadow-sm flex gap-1">
            <button className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50">Monthly</button>
            <button className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-md">Quarterly</button>
          </div>
        </header>

        {activeTab === 'ops' ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* OPS KPI ROW */}
            <div className="grid grid-cols-4 gap-6">
              <KPIBadge title="30-Day Readmit" value="12.4%" trend="-1.2%" status="good" icon={<Activity size={20}/>}/>
              <KPIBadge title="Avg. LOS" value="4.2 Days" trend="+0.3" status="warning" icon={<Clock size={20}/>}/>
              <KPIBadge title="Mortality (O/E)" value="0.88" trend="-0.02" status="good" icon={<TrendingDown size={20}/>}/>
              <KPIBadge title="ED-to-Bed" value="92 Min" trend="-4 Min" status="good" icon={<Users size={20}/>}/>
            </div>

            {/* CHART ROW */}
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <h3 className="font-bold text-lg mb-6">Readmission Trend</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={readmitData}>
                      <defs>
                        <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <h3 className="font-bold text-lg mb-6">Readmissions by Diagnosis</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={diagnosisData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} width={100} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{fill: '#f8fafc'}} />
                      <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* QUALITY & CHRONIC VIEW */
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-3 gap-8">
              {/* CHRONIC DISEASE CARD */}
              <div className="bg-white p-8 rounded-2xl border shadow-sm col-span-1">
                <h3 className="font-bold text-lg mb-2 text-center">HbA1c Population Control</h3>
                <div className="h-64 flex flex-col items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chronicCareData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {chronicCareData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="w-full space-y-2 mt-4">
                     {chronicCareData.map((d) => (
                       <div key={d.name} className="flex justify-between text-sm">
                         <span className="text-slate-500 flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}}/> {d.name}
                         </span>
                         <span className="font-bold">{d.value}%</span>
                       </div>
                     ))}
                  </div>
                </div>
              </div>

              {/* SAFETY GAUGES */}
              <div className="col-span-2 grid grid-cols-2 gap-6">
                <SafetyProgressCard title="Sepsis Protocol Compliance" percent={92} color="emerald" />
                <SafetyProgressCard title="BCMA Scan Compliance" percent={98} color="blue" />
                <SafetyProgressCard title="VTE Prophylaxis" percent={84} color="amber" />
                <SafetyProgressCard title="Hand Hygiene" percent={95} color="emerald" />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// --- REUSABLE COMPONENTS ---

function KPIBadge({ title, value, trend, status, icon }: any) {
  const isGood = status === 'good';
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-50 rounded-lg text-slate-600">{icon}</div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${isGood ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
          {trend}
        </span>
      </div>
      <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-black mt-1">{value}</p>
    </div>
  );
}

function SafetyProgressCard({ title, percent, color }: any) {
  const colors: any = { emerald: 'bg-emerald-500', blue: 'bg-blue-500', amber: 'bg-amber-500' };
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <div className="flex justify-between items-end mb-4">
        <h4 className="text-sm font-bold text-slate-600">{title}</h4>
        <span className="text-2xl font-black">{percent}%</span>
      </div>
      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
        <div className={`${colors[color]} h-full transition-all duration-1000`} style={{width: `${percent}%`}} />
      </div>
    </div>
  );
}