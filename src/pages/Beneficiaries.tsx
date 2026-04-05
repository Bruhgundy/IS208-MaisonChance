import { useState, useEffect, type FormEvent } from 'react';
import { Plus, UserCheck, UserX, GraduationCap, Activity } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { fetchBeneficiaries, addBeneficiary, updateBeneficiary, type Beneficiary } from '../api/dataService';
import { useAuth } from '../contexts/AuthContext';

const statusColors: Record<string, string> = {
  active: 'bg-blue-100 text-blue-700 border-blue-200',
  supported: 'bg-green-100 text-green-700 border-green-200',
  graduated: 'bg-purple-100 text-purple-700 border-purple-200',
  inactive: 'bg-gray-100 text-gray-700 border-gray-200',
};
const statusLabels: Record<string, string> = {
  active: 'Đang theo dõi', supported: 'Đang hỗ trợ', graduated: 'Đã tốt nghiệp', inactive: 'Không hoạt động',
};

export default function Beneficiaries() {
  const { user } = useAuth();
  const [data, setData] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Beneficiary | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ full_name: '', dob: '', gender: 'Nam', phone: '', email: '', address: '', health_notes: '', support_type: '', notes: '' });

  const load = () => { setLoading(true); fetchBeneficiaries(filter || undefined).then(d => { setData(d); setLoading(false); }); };
  useEffect(() => { load(); }, [filter]);

  const openAdd = () => { setEditing(null); setForm({ full_name: '', dob: '', gender: 'Nam', phone: '', email: '', address: '', health_notes: '', support_type: '', notes: '' }); setModalOpen(true); };
  const openEdit = (b: Beneficiary) => { setEditing(b); setForm(b); setModalOpen(true); };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.full_name) return;
    setSaving(true);
    try {
      if (editing) {
        await updateBeneficiary(editing.id, form as any);
        setToast('Cập nhật hồ sơ thành công');
      } else {
        await addBeneficiary(form as any);
        setToast('Thêm hồ sơ mới thành công');
      }
      setModalOpen(false);
      load();
    } finally { setSaving(false); }
    setTimeout(() => setToast(''), 3000);
  };

  const handleStatusChange = async (b: Beneficiary, newStatus: string) => {
    await updateBeneficiary(b.id, { status: newStatus } as any);
    setToast('Cập nhật trạng thái thành công');
    load();
    setTimeout(() => setToast(''), 3000);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>;

  const columns = [
    { key: 'code', header: 'Mã số' },
    { key: 'full_name', header: 'Họ và tên' },
    { key: 'gender', header: 'Giới tính' },
    { key: 'phone', header: 'Số điện thoại' },
    {
      key: 'status', header: 'Trạng thái',
      render: (b: Beneficiary) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[b.status] || ''}`}>
          {statusLabels[b.status] || b.status}
        </span>
      ),
    },
    { key: 'support_type', header: 'Loại hỗ trợ' },
    {
      key: 'created_at', header: 'Ngày tạo',
      render: (b: Beneficiary) => (
        <div className="flex items-center gap-2">
          <span>{b.created_at}</span>
          {(user?.role === 'admin' || user?.role === 'editor') && (
            <div className="flex gap-1 ml-2">
              {['active', 'supported', 'graduated', 'inactive'].filter(s => s !== b.status).map(s => (
                <button key={s} onClick={e => { e.stopPropagation(); handleStatusChange(b, s); }}
                  className="p-1 rounded hover:bg-white/50 text-on-surface-variant hover:text-primary" title={statusLabels[s]}>
                  {s === 'active' ? <Activity className="w-3.5 h-3.5" /> : s === 'supported' ? <UserCheck className="w-3.5 h-3.5" /> : s === 'graduated' ? <GraduationCap className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-on-background">Hồ sơ người thụ hưởng</h1>
          <p className="text-on-surface-variant mt-1">Quản lý thông tin đối tượng hưởng lợi</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'editor') && (
          <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <Plus className="w-5 h-5" /> Thêm hồ sơ
          </button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {['', 'active', 'supported', 'graduated', 'inactive'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${filter === s ? 'bg-primary text-white border-primary shadow-md' : 'bg-white/50 text-on-surface-variant border-white/30 hover:bg-white/80'}`}>
            {s ? statusLabels[s] : 'Tất cả'}
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={data} onRowClick={user?.role !== 'viewer' ? openEdit : undefined} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Sửa hồ sơ' : 'Thêm hồ sơ mới'} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Họ và tên *</label>
              <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Ngày sinh</label>
              <input type="date" className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.dob} onChange={e => setForm(f => ({ ...f, dob: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Giới tính</label>
              <select className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}>
                <option>Nam</option><option>Nữ</option><option>Khác</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Số điện thoại</label>
              <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Email</label>
              <input type="email" className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Loại hỗ trợ</label>
              <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.support_type} onChange={e => setForm(f => ({ ...f, support_type: e.target.value }))} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Địa chỉ</label>
            <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Ghi chú y tế</label>
            <textarea className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" rows={2} value={form.health_notes} onChange={e => setForm(f => ({ ...f, health_notes: e.target.value }))} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Ghi chú</label>
            <textarea className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" rows={2} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
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

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl animate-in slide-in-from-bottom">
          {toast}
        </div>
      )}
    </div>
  );
}
