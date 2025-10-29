import { Trash2 } from 'lucide-react';

export default function TransactionsList({ items, onDelete }) {
  const sorted = [...items].sort((a, b) => b.createdAt - a.createdAt);

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/15 p-8 text-center">
        <p className="text-white/70">No transactions yet</p>
        <p className="text-xs text-white/50">Add your first expense or income above.</p>
      </div>
    );
  }

  const format = (n) => n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

  return (
    <ul className="divide-y divide-white/10">
      {sorted.map((t) => (
        <li key={t.id} className="flex items-center gap-3 py-3">
          <div className={`h-10 w-10 flex-shrink-0 rounded-lg ${t.type === 'income' ? 'bg-emerald-500/15' : 'bg-rose-500/15'} flex items-center justify-center text-sm font-medium`}> 
            {t.category?.[0] ?? 'T'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="truncate font-medium">{t.description}</p>
              <p className={`${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'} font-semibold`}>
                {t.type === 'income' ? '+' : '-'}{format(t.amount)}
              </p>
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-white/50">
              <span>{t.category}</span>
              <span>•</span>
              <span>{t.date}</span>
            </div>
          </div>
          <button
            onClick={() => onDelete(t.id)}
            aria-label="Delete transaction"
            className="ml-2 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}
