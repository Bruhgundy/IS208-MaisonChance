import { useState, useEffect, type FormEvent } from 'react';
import { Plus, FileText } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { fetchDonations, addDonation, fetchPrograms, type Donation, type Program } from '../api/dataService';
import { useAuth } from '../contexts/AuthContext';

export default function Donations() {
  const { user } = useAuth();
  const [data, setData] = useState<Donation[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ donor_name: '', donor_email: '', donor_phone: '', amount: 0, payment_method: 'Tiền mặt', program_id: '', notes: '' });

  const load = () => {
    setLoading(true);
    Promise.all([fetchDonations(), fetchPrograms()]).then(([d, p]) => { setData(d); setPrograms(p); setLoading(false); });
  };
  useEffect(() => { load(); }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.donor_name || !form.amount) return;
    setSaving(true);
    try {
      await addDonation({ ...form, program_id: form.program_id ? Number(form.program_id) : null } as any);
      setToast('Ghi nhận quyên góp thành công');
      setModalOpen(false);
      load();
    } finally { setSaving(false); }
    setTimeout(() => setToast(''), 3000);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>;

  const columns = [
    { key: 'receipt_number', header: 'Số biên lai' },
    { key: 'donor_name', header: 'Nhà tài trợ' },
    {
      key: 'program_name', header: 'Chương trình',
      render: (d: Donation) => d.program_name || 'Quyên góp chung',
    },
    {
      key: 'amount', header: 'Số tiền',
      render: (d: Donation) => <span className="font-semibold text-green-600">{d.amount.toLocaleString()}đ</span>,
    },
    { key: 'payment_method', header: 'Phương thức' },
    {
      key: 'transaction_date', header: 'Ngày giao dịch',
      render: (d: Donation) => d.transaction_date || d.created_at,
    },
    {
      key: 'id', header: '',
      render: (d: Donation) => (
        <button onClick={e => { e.stopPropagation(); setToast(`Đang tải biên lai ${d.receipt_number}...`); setTimeout(() => setToast(''), 2000); }}
          className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline">
          <FileText className="w-3.5 h-3.5" /> Biên lai
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-on-background">Quản lý quyên góp</h1>
          <p className="text-on-surface-variant mt-1">Theo dõi và ghi nhận các khoản đóng góp</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'editor') && (
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <Plus className="w-5 h-5" /> Ghi nhận quyên góp
          </button>
        )}
      </div>

      <DataTable columns={columns} data={data} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Ghi nhận quyên góp" size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Tên nhà tài trợ *</label>
              <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.donor_name} onChange={e => setForm(f => ({ ...f, donor_name: e.target.value }))} required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Email</label>
              <input type="email" className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.donor_email} onChange={e => setForm(f => ({ ...f, donor_email: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Số điện thoại</label>
              <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.donor_phone} onChange={e => setForm(f => ({ ...f, donor_phone: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Chương trình</label>
              <select className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.program_id} onChange={e => setForm(f => ({ ...f, program_id: e.target.value }))}>
                <option value="">Quyên góp chung</option>
                {programs.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Số tiền *</label>
              <input type="number" className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))} required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Phương thức</label>
              <select className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" value={form.payment_method} onChange={e => setForm(f => ({ ...f, payment_method: e.target.value }))}>
                <option>Tiền mặt</option><option>Chuyển khoản</option><option>Khác</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Ghi chú</label>
            <textarea className="w-full p-3 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 outline-none" rows={2} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-white/30 hover:bg-white/50 font-medium">Hủy</button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-70">
              {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Lưu & xuất biên lai
            </button>
          </div>
        </form>
      </Modal>

      {toast && <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl">{toast}</div>}
    </div>
  );
}
