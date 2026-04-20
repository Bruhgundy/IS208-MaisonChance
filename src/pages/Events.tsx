import { useState, useEffect, type FormEvent } from 'react';
import { CalendarPlus, MapPin, Users, Plus } from 'lucide-react';
import Modal from '../components/Modal';
import { fetchEvents, addEvent, updateEvent, registerEvent, type EventItem } from '../api/dataService';
import { useAuth } from '../contexts/AuthContext';

const statusColors: Record<string, string> = {
  open: 'bg-green-100 text-green-700 border-green-200',
  closed: 'bg-amber-100 text-amber-700 border-amber-200',
  completed: 'bg-blue-100 text-blue-700 border-blue-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};
const statusLabels: Record<string, string> = { open: 'Đang mở', closed: 'Đã đóng', completed: 'Đã hoàn thành', cancelled: 'Đã hủy' };

export default function Events() {
  const { user } = useAuth();
  const [data, setData] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [regModal, setRegModal] = useState<EventItem | null>(null);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '', max_volunteers: 30 });
  const [regForm, setRegForm] = useState({ name: '', email: '', phone: '' });

  const load = () => { setLoading(true); fetchEvents().then(d => { setData(d); setLoading(false); }); };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm({ title: '', description: '', date: '', location: '', max_volunteers: 30 }); setModalOpen(true); };
  const openEdit = (e: EventItem) => { setEditing(e); setForm(e); setModalOpen(true); };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date) return;
    setSaving(true);
    try {
      if (editing) { await updateEvent(editing.id, form as any); setToast('Cập nhật sự kiện thành công'); }
      else { await addEvent(form as any); setToast('Thêm sự kiện thành công'); }
      setModalOpen(false); load();
    } finally { setSaving(false); }
    setTimeout(() => setToast(''), 3000);
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (!regModal || !regForm.name) return;
    setSaving(true);
    try {
      await registerEvent(regModal.id, regForm.name, regForm.email, regForm.phone);
      setToast('Đăng ký tham gia sự kiện thành công');
      setRegModal(null);
      setRegForm({ name: '', email: '', phone: '' });
      load();
    } catch (err: any) {
      setToast(err.message || 'Đăng ký thất bại');
    } finally { setSaving(false); }
    setTimeout(() => setToast(''), 3000);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-on-background">Sự kiện</h1>
          <p className="text-on-surface-variant mt-1">Quản lý sự kiện và đăng ký tình nguyện viên</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'editor') && (
          <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <Plus className="w-5 h-5" /> Thêm sự kiện
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map(event => (
          <div key={event.id} className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[event.status] || ''}`}>
                    {statusLabels[event.status] || event.status}
                  </span>
                </div>
                {(user?.role === 'admin' || user?.role === 'editor') && (
                  <button onClick={() => openEdit(event)} className="text-xs text-primary font-semibold hover:underline">Sửa</button>
                )}
              </div>
              <h3 className="font-bold text-lg text-on-background">{event.title}</h3>
              <p className="text-sm text-on-surface-variant line-clamp-2">{event.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <CalendarPlus className="w-4 h-4 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{event.location || 'Chưa xác định'}</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{event.registered} / {event.max_volunteers} TNV</span>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${(event.registered / event.max_volunteers) * 100}%` }} />
              </div>
              {event.status === 'open' && (
                <button onClick={() => { setRegModal(event); setRegForm({ name: '', email: '', phone: '' }); }}
                  className="w-full py-2.5 bg-primary/10 text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all">
                  Đăng ký tham gia
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Sửa sự kiện' : 'Thêm sự kiện'} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-on-surface-variant">Tên sự kiện *</label>
              <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Ngày *</label>
              <input type="date" className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Địa điểm</label>
              <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Số TNV tối đa</label>
              <input type="number" className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" value={form.max_volunteers} onChange={e => setForm(f => ({ ...f, max_volunteers: Number(e.target.value) }))} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Mô tả</label>
            <textarea className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          {editing && (
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Trạng thái</label>
              <select className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" value={form.status || ''} onChange={e => {
                const newStatus = e.target.value; setForm(f => ({ ...f, status: newStatus }));
                // update event status immediately
                if (editing) { updateEvent(editing.id, { status: newStatus } as any).then(load); setToast('Cập nhật trạng thái thành công'); setTimeout(() => setToast(''), 3000); setModalOpen(false); }
              }}>
                <option value="open">Đang mở</option>
                <option value="closed">Đã đóng</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-white/30 hover:bg-white/50 font-medium">Hủy</button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-70">
              {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {editing ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!regModal} onClose={() => setRegModal(null)} title={`Đăng ký: ${regModal?.title}`}>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Họ và tên *</label>
            <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" value={regForm.name} onChange={e => setRegForm(f => ({ ...f, name: e.target.value }))} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Email</label>
              <input type="email" className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" value={regForm.email} onChange={e => setRegForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Số điện thoại</label>
              <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" value={regForm.phone} onChange={e => setRegForm(f => ({ ...f, phone: e.target.value }))} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setRegModal(null)} className="px-5 py-2.5 rounded-xl border border-white/30 hover:bg-white/50 font-medium">Hủy</button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-70">
              {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Đăng ký
            </button>
          </div>
        </form>
      </Modal>

      {toast && <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl">{toast}</div>}
    </div>
  );
}
