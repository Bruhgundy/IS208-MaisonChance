import { useState, useEffect, type FormEvent } from 'react';
import { Package, Plus, ArrowDownToLine, ArrowUpFromLine, AlertTriangle, Search } from 'lucide-react';
import Modal from '../components/Modal';
import { fetchInventoryItems, addInventoryItem, importInventory, exportInventory, type InventoryItem } from '../api/dataService';
import { useAuth } from '../contexts/AuthContext';

export default function Inventory() {
  const { user } = useAuth();
  const [data, setData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [lowOnly, setLowOnly] = useState(false);
  const [itemModal, setItemModal] = useState(false);
  const [importModal, setImportModal] = useState<InventoryItem | null>(null);
  const [exportModal, setExportModal] = useState<InventoryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [qty, setQty] = useState(0);
  const [ref, setRef] = useState('');
  const [recipient, setRecipient] = useState('');
  const [itemForm, setItemForm] = useState({ name: '', category: '', unit: '', min_quantity: 0 });

  const load = () => { setLoading(true); fetchInventoryItems(lowOnly || undefined).then(d => { setData(d); setLoading(false); }); };
  useEffect(() => { load(); }, [lowOnly]);

  const handleAddItem = async (e: FormEvent) => {
    e.preventDefault();
    if (!itemForm.name || !itemForm.unit) return;
    setSaving(true);
    try {
      await addInventoryItem({ ...itemForm, quantity: 0 } as any);
      setToast('Thêm vật tư thành công');
      setItemModal(false);
      setItemForm({ name: '', category: '', unit: '', min_quantity: 0 });
      load();
    } finally { setSaving(false); }
    setTimeout(() => setToast(''), 3000);
  };

  const handleImport = async (e: FormEvent) => {
    e.preventDefault();
    if (!importModal || !qty) return;
    setSaving(true);
    try {
      await importInventory(importModal.id, qty, ref);
      setToast('Nhập kho thành công');
      setImportModal(null);
      setQty(0); setRef('');
      load();
    } finally { setSaving(false); }
    setTimeout(() => setToast(''), 3000);
  };

  const handleExport = async (e: FormEvent) => {
    e.preventDefault();
    if (!exportModal || !qty || !recipient) return;
    setSaving(true);
    try {
      await exportInventory(exportModal.id, qty, recipient);
      setToast('Xuất kho thành công');
      setExportModal(null);
      setQty(0); setRecipient('');
      load();
    } finally { setSaving(false); }
    setTimeout(() => setToast(''), 3000);
  };

  const filtered = data.filter(i => !search || i.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-on-background">Kho vật tư</h1>
          <p className="text-on-surface-variant mt-1">Quản lý nhập xuất tồn kho</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'editor') && (
          <button onClick={() => setItemModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <Plus className="w-5 h-5" /> Thêm vật tư
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
          <input className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none text-sm" placeholder="Tìm kiếm vật tư..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button onClick={() => setLowOnly(!lowOnly)} className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border flex items-center gap-2 ${lowOnly ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-white/50 text-on-surface-variant border-white/30 hover:bg-white/80'}`}>
          <AlertTriangle className="w-4 h-4" /> Tồn thấp
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(item => {
          const low = item.quantity <= item.min_quantity;
          return (
            <div key={item.id} className={`glass-card rounded-2xl p-5 transition-all hover:shadow-lg ${low ? 'border-amber-200 bg-amber-50/30' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${low ? 'bg-amber-100 text-amber-600' : 'bg-primary/10 text-primary'}`}>
                  <Package className="w-5 h-5" />
                </div>
                {low && <AlertTriangle className="w-5 h-5 text-amber-500" />}
              </div>
              <h3 className="font-bold text-on-background">{item.name}</h3>
              <p className="text-xs text-on-surface-variant mb-3">{item.category} · {item.unit}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className={`text-2xl font-extrabold ${low ? 'text-amber-600' : 'text-on-background'}`}>{item.quantity}</p>
                  <p className="text-xs text-on-surface-variant">Tồn kho ({item.unit})</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-on-surface-variant">Tồn tối thiểu</p>
                  <p className="font-semibold">{item.min_quantity}</p>
                </div>
              </div>
              {(user?.role === 'admin' || user?.role === 'editor') && (
                <div className="flex gap-2 mt-4 pt-3 border-t border-white/20">
                  <button onClick={() => { setImportModal(item); setQty(0); setRef(''); }} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors">
                    <ArrowDownToLine className="w-4 h-4" /> Nhập
                  </button>
                  <button onClick={() => { setExportModal(item); setQty(0); setRecipient(''); }} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-orange-50 text-orange-700 text-xs font-semibold hover:bg-orange-100 transition-colors">
                    <ArrowUpFromLine className="w-4 h-4" /> Xuất
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Modal open={itemModal} onClose={() => setItemModal(false)} title="Thêm vật tư mới">
        <form onSubmit={handleAddItem} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2">
              <label className="text-sm font-semibold text-on-surface-variant">Tên vật tư *</label>
              <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" value={itemForm.name} onChange={e => setItemForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Danh mục</label>
              <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" value={itemForm.category} onChange={e => setItemForm(f => ({ ...f, category: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Đơn vị tính *</label>
              <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" value={itemForm.unit} onChange={e => setItemForm(f => ({ ...f, unit: e.target.value }))} required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Tồn tối thiểu</label>
              <input type="number" className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" value={itemForm.min_quantity} onChange={e => setItemForm(f => ({ ...f, min_quantity: Number(e.target.value) }))} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setItemModal(false)} className="px-5 py-2.5 rounded-xl border border-white/30 hover:bg-white/50 font-medium">Hủy</button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-70">
              {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Thêm
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!importModal} onClose={() => setImportModal(null)} title={`Nhập kho: ${importModal?.name}`}>
        <form onSubmit={handleImport} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Số lượng *</label>
            <input type="number" className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" value={qty} onChange={e => setQty(Number(e.target.value))} required min={1} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Số tham chiếu (hóa đơn, phiếu giao)</label>
            <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" value={ref} onChange={e => setRef(e.target.value)} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setImportModal(null)} className="px-5 py-2.5 rounded-xl border border-white/30 hover:bg-white/50 font-medium">Hủy</button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-70">
              {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Nhập kho
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!exportModal} onClose={() => setExportModal(null)} title={`Xuất kho: ${exportModal?.name}`}>
        <form onSubmit={handleExport} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Số lượng *</label>
            <input type="number" className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" value={qty} onChange={e => setQty(Number(e.target.value))} required min={1} max={exportModal?.quantity} />
            <p className="text-xs text-on-surface-variant">Tồn kho hiện tại: {exportModal?.quantity} {exportModal?.unit}</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Cơ sở nhận *</label>
            <input className="w-full p-3 rounded-xl bg-white/70 border border-white/40 outline-none" value={recipient} onChange={e => setRecipient(e.target.value)} required placeholder="Tên cơ sở / người nhận" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setExportModal(null)} className="px-5 py-2.5 rounded-xl border border-white/30 hover:bg-white/50 font-medium">Hủy</button>
            <button type="submit" disabled={saving || qty > (exportModal?.quantity || 0)} className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-70">
              {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Xuất kho
            </button>
          </div>
        </form>
      </Modal>

      {toast && <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl">{toast}</div>}
    </div>
  );
}
