import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Heart } from 'lucide-react';
import Modal from '../components/Modal';
import { fetchPrograms, addProgram, updateProgram, type Program } from '../api/dataService';
import { useAuth } from '../contexts/AuthContext';

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700 border-green-200',
  completed: 'bg-blue-100 text-blue-700 border-blue-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};
const statusLabels: Record<string, string> = { active: 'Đang hoạt động', completed: 'Đã hoàn thành', cancelled: 'Đã hủy' };

const categoryFilters = ['Nhà ở', 'Giáo dục', 'Đào tạo', 'Y tế', 'Sự kiện', 'Cơ sở hạ tầng', 'Văn hóa'];

export default function Programs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Program | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ title: '', category: '', description: '', goal_amount: 0, start_date: '', end_date: '' });

  const load = () => {
    setLoading(true);
    fetchPrograms(statusFilter || undefined, filter || undefined).then(d => { setData(d); setLoading(false); });
  };
  useEffect(() => { load(); }, [filter, statusFilter]);

  const openAdd = () => { setEditing(null); setForm({ title: '', category: '', description: '', goal_amount: 0, start_date: '', end_date: '' }); setModalOpen(true); };
  const openEdit = (p: Program) => { setEditing(p); setForm(p); setModalOpen(true); };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    setSaving(true);
    try {
      if (editing) { await updateProgram(editing.id, form as any); setToast('Cập nhật chương trình thành công'); }
      else { await addProgram(form as any); setToast('Thêm chương trình mới thành công'); }
      setModalOpen(false); load();
    } finally { setSaving(false); }
    setTimeout(() => setToast(''), 3000);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>;

  const categories = categoryFilters;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-on-background">Chương trình từ thiện</h1>
          <p className="text-on-surface-variant mt-1">Quản lý các chương trình gây quỹ</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'editor') && (
          <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <Plus className="w-5 h-5" /> Thêm chương trình
          </button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {['', 'active', 'completed', 'cancelled'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${statusFilter === s ? 'bg-primary text-white border-primary shadow-md' : 'bg-white/50 text-on-surface-variant border-white/30 hover:bg-white/80'}`}>
            {s ? statusLabels[s] : 'Tất cả'}
          </button>
        ))}
        <div className="w-px bg-white/30 mx-1" />
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(filter === c ? '' : c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${filter === c ? 'bg-primary/10 text-primary border-primary/20' : 'bg-white/30 text-on-surface-variant border-white/20 hover:bg-white/60'}`}>
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.map((p, i) => (
            <div key={p.id} className="glass-card rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => navigate(`/programs/${p.id}`)}>
              <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary-container/20 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">
                  <Heart className="w-16 h-16 text-primary" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border bg-white/80 backdrop-blur-sm ${statusColors[p.status] || ''}`}>
                    {statusLabels[p.status] || p.status}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <span className="text-xs text-primary font-semibold">{p.category}</span>
                  <h3 className="font-bold text-on-background group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3>
                </div>
                <p className="text-sm text-on-surface-variant line-clamp-2">{p.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Đã gây quỹ</span>
                    <span className="font-bold text-on-background">{p.raised_amount.toLocaleString()}đ</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${Math.min(100, (p.raised_amount / p.goal_amount) * 100)}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>Mục tiêu: {p.goal_amount.toLocaleString()}đ</span>
                    <span>{Math.round((p.raised_amount / p.goal_amount) * 100)}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-on-surface-variant">{p.donor_count || 0} nhà tài trợ</span>
                  {(user?.role === 'admin' || user?.role === 'editor') && (
                    <button onClick={e => { e.stopPropagation(); openEdit(p); }} className="text-xs text-primary font-semibold hover:underline">
                      Sửa
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Sửa chương trình' : 'Thêm chương trình'} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-on-surface-variant">Tên chương trình *</label>
              <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Danh mục</label>
              <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Mục tiêu (VNĐ)</label>
              <input type="number" className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.goal_amount} onChange={e => setForm(f => ({ ...f, goal_amount: Number(e.target.value) }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Ngày bắt đầu</label>
              <input type="date" className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Ngày kết thúc</label>
              <input type="date" className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.end_date} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Mô tả</label>
            <textarea className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-white/30 hover:bg-white/50 font-medium">Hủy</button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-70">
              {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {editing ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </Modal>

      {toast && <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl">{toast}</div>}
    </div>
  );
}

