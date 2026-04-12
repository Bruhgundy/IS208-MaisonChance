import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Calendar, TrendingUp } from 'lucide-react';
import { fetchProgram, type Program } from '../api/dataService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgramDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProgram(Number(id)).then(p => { setProgram(p || null); setLoading(false); });
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>;
  if (!program) return <div className="text-center py-20 text-on-surface-variant">Không tìm thấy chương trình</div>;

  const progress = Math.round((program.raised_amount / program.goal_amount) * 100);
  const chartData = [
    { name: 'Mục tiêu', amount: program.goal_amount },
    { name: 'Đã đạt', amount: program.raised_amount },
  ];

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/programs')} className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-medium">
        <ArrowLeft className="w-5 h-5" /> Quay lại danh sách
      </button>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary-container/20 relative">
          <div className="absolute bottom-6 left-8">
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/80 backdrop-blur-sm border border-white/30">
              {program.category}
            </span>
          </div>
        </div>
        <div className="p-8">
          <h1 className="text-3xl font-extrabold text-on-background">{program.title}</h1>
          <p className="text-on-surface-variant mt-4 leading-relaxed">{program.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600"><Target className="w-6 h-6" /></div>
              <div>
                <p className="text-sm text-on-surface-variant">Mục tiêu</p>
                <p className="text-lg font-extrabold text-on-background">{program.goal_amount.toLocaleString()}đ</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><TrendingUp className="w-6 h-6" /></div>
              <div>
                <p className="text-sm text-on-surface-variant">Đã gây quỹ</p>
                <p className="text-lg font-extrabold text-green-600">{program.raised_amount.toLocaleString()}đ</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600"><Calendar className="w-6 h-6" /></div>
              <div>
                <p className="text-sm text-on-surface-variant">Thời gian</p>
                <p className="text-lg font-extrabold text-on-background">{program.start_date || '—'} đến {program.end_date || '—'}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-on-background">Tiến độ gây quỹ</span>
              <span className="font-bold text-primary">{progress}%</span>
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mt-8 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                <YAxis tickFormatter={v => (v / 1000000).toFixed(0) + 'M'} />
                <Tooltip formatter={(v: number) => v.toLocaleString() + 'đ'} />
                <Bar dataKey="amount" fill="#0050cb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
