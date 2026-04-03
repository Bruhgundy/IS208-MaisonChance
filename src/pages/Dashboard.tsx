import { useState, useEffect } from 'react';
import { Users, Heart, DollarSign, CalendarPlus, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../components/StatCard';
import { getDashboardStats } from '../api/dataService';

const COLORS = ['#0050cb', '#0066ff', '#6ecffd', '#005774', '#424656'];

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then(s => { setStats(s); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const pieData = stats.programStats.map((p: any) => ({ name: p.name.length > 20 ? p.name.slice(0, 20) + '...' : p.name, value: p.raised }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-extrabold text-on-background">Tổng quan</h1>
        <p className="text-on-surface-variant mt-1">Bảng điều khiển hệ thống Maison Chance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Users className="w-5 h-5" />} label="Người thụ hưởng" value={stats.totalBeneficiaries} sub="Đang hoạt động" color="bg-blue-100 text-blue-600" />
        <StatCard icon={<Heart className="w-5 h-5" />} label="Chương trình" value={stats.activePrograms} sub="Đang hoạt động" color="bg-pink-100 text-pink-600" />
        <StatCard icon={<DollarSign className="w-5 h-5" />} label="Tổng quyên góp" value={stats.totalDonations.toLocaleString() + 'đ'} sub="Lũy kế" color="bg-green-100 text-green-600" />
        <StatCard icon={<CalendarPlus className="w-5 h-5" />} label="Tình nguyện viên" value={stats.totalVolunteers} sub="Đã đăng ký" color="bg-purple-100 text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-on-background">Doanh thu quyên góp theo tháng</h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={v => (v / 1000000).toFixed(0) + 'M'} />
                <Tooltip
                  formatter={(v: number) => [v.toLocaleString() + 'đ', 'Doanh thu']}
                  contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
                />
                <Bar dataKey="amount" fill="#0050cb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-on-background">Quỹ theo chương trình</h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" paddingAngle={3}>
                  {pieData.map((_: any, i: number) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => v.toLocaleString() + 'đ'} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {pieData.map((d: any, i: number) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-on-surface-variant truncate">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-bold text-on-background mb-4">Quyên góp gần đây</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/20 text-left">
                <th className="px-4 py-3 font-semibold text-on-surface-variant">Nhà tài trợ</th>
                <th className="px-4 py-3 font-semibold text-on-surface-variant">Chương trình</th>
                <th className="px-4 py-3 font-semibold text-on-surface-variant">Số tiền</th>
                <th className="px-4 py-3 font-semibold text-on-surface-variant">Ngày</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentDonations.map((d: any, i: number) => (
                <tr key={i} className="border-b border-white/10 hover:bg-white/20">
                  <td className="px-4 py-3 font-medium">{d.donor_name}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{d.program_name}</td>
                  <td className="px-4 py-3 font-semibold text-green-600">{d.amount.toLocaleString()}đ</td>
                  <td className="px-4 py-3 text-on-surface-variant">{d.transaction_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
