import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Eye, EyeOff, Heart } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setError('Vui lòng nhập đầy đủ thông tin'); return; }
    setLoading(true);
    setError('');
    try {
      await login(username, password);
      navigate('/dashboard', { replace: true });
    } catch {
      setError('Sai tên đăng nhập hoặc mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl" />

      <div className="glass-card !bg-white/80 w-full max-w-md rounded-3xl p-8 md:p-10 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-on-background">Maison Chance</h1>
          <p className="text-on-surface-variant mt-1">Đăng nhập hệ thống quản lý</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Tên đăng nhập</label>
            <input
              className="w-full p-3.5 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                className="w-full p-3.5 rounded-xl bg-white/70 border border-white/40 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all pr-12"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface" onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><LogIn className="w-5 h-5" /> Đăng nhập</>
            )}
          </button>
        </form>

        <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-xs font-semibold text-on-surface-variant mb-2">Tài khoản demo:</p>
          <div className="space-y-1 text-xs text-on-surface-variant font-mono">
            <p><span className="text-primary font-bold">admin</span> — mật khẩu bất kỳ (Admin)</p>
            <p><span className="text-primary font-bold">editor</span> — mật khẩu bất kỳ (Editor)</p>
            <p><span className="text-primary font-bold">viewer</span> — mật khẩu bất kỳ (Viewer)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
