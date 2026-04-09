import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { fetchUsers, updateUserRole, type User, type UserRole } from '../api/dataService';

const roleColors: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-700 border-purple-200',
  editor: 'bg-blue-100 text-blue-700 border-blue-200',
  viewer: 'bg-gray-100 text-gray-700 border-gray-200',
};
const roleLabels: Record<string, string> = { admin: 'Quản trị viên', editor: 'Biên tập viên', viewer: 'Người xem' };

export default function Users() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  useEffect(() => { fetchUsers().then(d => { setData(d); setLoading(false); }); }, []);

  const handleRoleChange = async (user: User, role: UserRole) => {
    await updateUserRole(user.id, role);
    setData(prev => prev.map(u => u.id === user.id ? { ...u, role } : u));
    setToast(`Đã cập nhật quyền cho ${user.full_name}`);
    setTimeout(() => setToast(''), 3000);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-on-background">Quản lý người dùng</h1>
        <p className="text-on-surface-variant mt-1">Phân quyền truy cập hệ thống</p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/20 bg-white/30">
                <th className="text-left px-6 py-3.5 font-semibold text-on-surface-variant">Người dùng</th>
                <th className="text-left px-6 py-3.5 font-semibold text-on-surface-variant">Tên đăng nhập</th>
                <th className="text-left px-6 py-3.5 font-semibold text-on-surface-variant">Email</th>
                <th className="text-left px-6 py-3.5 font-semibold text-on-surface-variant">Vai trò</th>
                <th className="text-left px-6 py-3.5 font-semibold text-on-surface-variant">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {data.map(user => (
                <tr key={user.id} className="border-b border-white/10 hover:bg-white/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {user.full_name.charAt(0)}
                      </div>
                      <span className="font-semibold text-on-background">{user.full_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{user.username}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${roleColors[user.role] || ''}`}>
                      {roleLabels[user.role] || user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={e => handleRoleChange(user, e.target.value as UserRole)}
                      className="px-3 py-1.5 rounded-lg border border-white/30 bg-white/50 text-sm outline-none focus:border-primary/30 cursor-pointer"
                    >
                      <option value="admin">Quản trị viên</option>
                      <option value="editor">Biên tập viên</option>
                      <option value="viewer">Người xem</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-on-background">Vai trò hệ thống</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { role: 'Admin', label: 'Quản trị viên', desc: 'Toàn quyền truy cập và quản lý hệ thống', color: 'bg-purple-100 text-purple-700' },
            { role: 'Editor', label: 'Biên tập viên', desc: 'Thêm, sửa, xóa dữ liệu', color: 'bg-blue-100 text-blue-700' },
            { role: 'Viewer', label: 'Người xem', desc: 'Chỉ xem dữ liệu, không được thao tác', color: 'bg-gray-100 text-gray-700' },
          ].map(r => (
            <div key={r.role} className="p-4 rounded-xl bg-white/50 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${r.color}`}>{r.role}</span>
                <span className="font-semibold text-sm">{r.label}</span>
              </div>
              <p className="text-xs text-on-surface-variant">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {toast && <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl">{toast}</div>}
    </div>
  );
}
