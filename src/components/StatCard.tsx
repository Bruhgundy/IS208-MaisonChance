import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}

export default function StatCard({ icon, label, value, sub, color = 'bg-primary/10 text-primary' }: Props) {
  return (
    <div className="glass-card p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-on-surface-variant font-medium">{label}</p>
          <p className="text-2xl font-extrabold text-on-background">{typeof value === 'number' ? value.toLocaleString() : value}</p>
          {sub && <p className="text-xs text-on-surface-variant mt-1">{sub}</p>}
        </div>
      </div>
    </div>
  );
}
