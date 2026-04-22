import { useState, useEffect } from 'react';
import { BarChart3, PieChart, TrendingUp, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPie, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['#0050cb', '#0066ff', '#6ecffd', '#005774', '#424656', '#7c3aed', '#db2777'];

const monthlyData = [
  { month: 'T1', donations: 85000000, beneficiaries: 12, programs: 5 },
  { month: 'T2', donations: 120000000, beneficiaries: 15, programs: 6 },
  { month: 'T3', donations: 95000000, beneficiaries: 14, programs: 6 },
  { month: 'T4', donations: 140000000, beneficiaries: 18, programs: 7 },
  { month: 'T5', donations: 110000000, beneficiaries: 16, programs: 7 },
  { month: 'T6', donations: 75000000, beneficiaries: 13, programs: 5 },
];

const categoryData = [
  { name: 'Nhà ở', value: 375000000 },
  { name: 'Giáo dục', value: 185000000 },
  { name: 'Đào tạo', value: 320000000 },
  { name: 'Y tế', value: 870000000 },
  { name: 'Sự kiện', value: 200000000 },
  { name: 'Khác', value: 150000000 },
];

const statusData = [
  { name: 'Đang hoạt động', active: 12, completed: 8 },
  { name: 'Đã hoàn thành', active: 5, completed: 12 },
];

export default function Reports() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>;

  const totalDonations = monthlyData.reduce((s, m) => s + m.donations, 0);
  const avgMonthly = Math.round(totalDonations / monthlyData.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-on-background">Báo cáo & Thống kê</h1>
          <p className="text-on-surface-variant mt-1">Tổng hợp dữ liệu hoạt động Maison Chance</p>
        </div>
        <button onClick={() => { const w = window.open('', '_blank'); w?.document.write('<html><body><h1>Báo cáo Maison Chance 2026</h1><p>Báo cáo đang được tạo...</p></body></html>'); w?.print(); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
          <Download className="w-5 h-5" /> Xuất báo cáo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Tổng quyên góp (6 tháng)', value: totalDonations.toLocaleString() + 'đ', icon: TrendingUp, color: 'bg-green-100 text-green-600' },
          { label: 'Trung bình tháng', value: avgMonthly.toLocaleString() + 'đ', icon: BarChart3, color: 'bg-blue-100 text-blue-600' },
          { label: 'Người thụ hưởng mới (T6)', value: '18', icon: PieChart, color: 'bg-purple-100 text-purple-600' },
          { label: 'Chương trình đang mở', value: '7', icon: BarChart3, color: 'bg-pink-100 text-pink-600' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-on-surface-variant">{s.label}</p>
                <p className="text-xl font-extrabold text-on-background">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold text-on-background mb-6">Quyên góp theo tháng</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={v => (v / 1000000).toFixed(0) + 'M'} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => v.toLocaleString() + 'đ'} contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }} />
                <Bar dataKey="donations" fill="#0050cb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold text-on-background mb-6">Phân bổ quỹ theo danh mục</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RPie>
                <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => v.toLocaleString() + 'đ'} />
              </RPie>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold text-on-background mb-6">Xu hướng quyên góp</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={v => (v / 1000000).toFixed(0) + 'M'} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => v.toLocaleString() + 'đ'} contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }} />
                <Line type="monotone" dataKey="donations" stroke="#0050cb" strokeWidth={3} dot={{ fill: '#0050cb', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold text-on-background mb-6">Người thụ hưởng mới theo tháng</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }} />
                <Bar dataKey="beneficiaries" fill="#6ecffd" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-bold text-on-background mb-4">Tổng quan dữ liệu 6 tháng đầu năm 2026</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/20 text-left">
                <th className="px-4 py-3 font-semibold text-on-surface-variant">Tháng</th>
                <th className="px-4 py-3 font-semibold text-on-surface-variant">Quyên góp</th>
                <th className="px-4 py-3 font-semibold text-on-surface-variant">Người thụ hưởng mới</th>
                <th className="px-4 py-3 font-semibold text-on-surface-variant">Chương trình</th>
                <th className="px-4 py-3 font-semibold text-on-surface-variant">Tăng trưởng</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((m, i) => {
                const growth = i > 0 ? ((m.donations - monthlyData[i - 1].donations) / monthlyData[i - 1].donations * 100).toFixed(0) : '—';
                return (
                  <tr key={i} className="border-b border-white/10 hover:bg-white/20">
                    <td className="px-4 py-3 font-semibold">{m.month}</td>
                    <td className="px-4 py-3">{m.donations.toLocaleString()}đ</td>
                    <td className="px-4 py-3">{m.beneficiaries}</td>
                    <td className="px-4 py-3">{m.programs}</td>
                    <td className="px-4 py-3">
                      {growth !== '—' ? (
                        <span className={`font-semibold ${Number(growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {Number(growth) >= 0 ? '+' : ''}{growth}%
                        </span>
                      ) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
