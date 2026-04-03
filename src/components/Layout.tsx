import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ErrorBoundary from './ErrorBoundary';
import {
  LayoutDashboard, Users, Heart, DollarSign, Package,
  CalendarPlus, BarChart3, LogOut, Menu, X, UserCog,
  ChevronDown, Shield,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Tổng quan' },
  { to: '/beneficiaries', icon: Users, label: 'Hồ sơ thụ hưởng' },
  { to: '/programs', icon: Heart, label: 'Chương trình' },
  { to: '/donations', icon: DollarSign, label: 'Quyên góp' },
  { to: '/inventory', icon: Package, label: 'Kho vật tư' },
  { to: '/events', icon: CalendarPlus, label: 'Sự kiện' },
  { to: '/reports', icon: BarChart3, label: 'Báo cáo' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleBadge = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'bg-purple-100 text-purple-700 border-purple-200',
      editor: 'bg-blue-100 text-blue-700 border-blue-200',
      viewer: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    const labels: Record<string, string> = { admin: 'Admin', editor: 'Editor', viewer: 'Viewer' };
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colors[role] || ''}`}>
        {labels[role] || role}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/80 backdrop-blur-xl border-r border-white/30 shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 px-6 h-20 border-b border-white/20">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-extrabold text-lg">MC</div>
          <div>
            <p className="font-extrabold text-on-background">Maison Chance</p>
            <p className="text-xs text-on-surface-variant">Hệ thống quản lý</p>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:bg-white/60 hover:text-on-surface'
                }`
              }>
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
          {user?.role === 'admin' && (
            <NavLink to="/users" onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:bg-white/60 hover:text-on-surface'
                }`
              }>
              <Shield className="w-5 h-5" />
              Người dùng
            </NavLink>
          )}
        </nav>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-white/30">
          <div className="flex items-center justify-between px-4 md:px-8 h-20">
            <button className="lg:hidden p-2 rounded-xl hover:bg-white/60" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:block" />
            <div className="relative">
              <button className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/60 transition-colors" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  {user?.full_name?.charAt(0) || 'A'}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-semibold text-on-background">{user?.full_name || 'Admin'}</p>
                  <p className="text-xs text-on-surface-variant">{user?.email || ''}</p>
                </div>
                {roleBadge(user?.role || 'viewer')}
                <ChevronDown className="w-4 h-4 text-on-surface-variant" />
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 glass-card !bg-white/90 rounded-xl shadow-xl border border-white/30 overflow-hidden z-20">
                    <div className="p-4 border-b border-white/20">
                      <p className="font-semibold text-on-background">{user?.full_name}</p>
                      <p className="text-xs text-on-surface-variant">{user?.email}</p>
                    </div>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors" onClick={handleLogout}>
                      <LogOut className="w-4 h-4" /> Đăng xuất
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>

        <footer className="px-8 py-6 border-t border-white/20 text-center text-xs text-on-surface-variant">
          &copy; {new Date().getFullYear()} Maison Chance. Hệ thống quản lý nội bộ.
        </footer>
      </div>
    </div>
  );
}
