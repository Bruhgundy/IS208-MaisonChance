import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  searchable?: boolean;
  placeholder?: string;
  pageSize?: number;
}

export default function DataTable<T extends Record<string, any>>({ columns, data, onRowClick, searchable = true, placeholder = 'Tìm kiếm...', pageSize = 10 }: Props<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);

  const filtered = data.filter(row =>
    !search || columns.some(col =>
      String(row[col.key] ?? '').toLowerCase().includes(search.toLowerCase())
    )
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const av = a[sortKey], bv = b[sortKey];
    if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
    return sortDir === 'asc'
      ? String(av ?? '').localeCompare(String(bv ?? ''))
      : String(bv ?? '').localeCompare(String(av ?? ''));
  });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {searchable && (
        <div className="p-4 border-b border-white/20">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
            <input className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none text-sm" placeholder={placeholder} value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} />
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/20 bg-white/30">
              {columns.map(col => (
                <th key={col.key} className={`text-left px-4 py-3.5 font-semibold text-on-surface-variant ${col.sortable !== false ? 'cursor-pointer hover:text-primary select-none' : ''}`} onClick={() => col.sortable !== false && toggleSort(col.key)}>
                  {col.header}
                  {sortKey === col.key && <span className="ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((row, i) => (
              <tr key={i} className={`border-b border-white/10 transition-colors ${onRowClick ? 'cursor-pointer hover:bg-primary/5' : 'hover:bg-white/20'}`} onClick={() => onRowClick?.(row)}>
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3.5 text-on-surface">
                    {col.render ? col.render(row) : (row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
            {paged.length === 0 && (
              <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-on-surface-variant">Không có dữ liệu</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/20 bg-white/20">
          <span className="text-sm text-on-surface-variant">{sorted.length} kết quả</span>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg hover:bg-white/40 disabled:opacity-30" disabled={page === 0} onClick={() => setPage(p => p - 1)}><ChevronLeft className="w-5 h-5" /></button>
            <span className="text-sm font-medium px-3">{page + 1} / {totalPages}</span>
            <button className="p-1.5 rounded-lg hover:bg-white/40 disabled:opacity-30" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      )}
    </div>
  );
}
