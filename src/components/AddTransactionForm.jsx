import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';

export default function AddTransactionForm({ onAdd }) {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'General',
    date: today,
  });

  const categories = [
    'General',
    'Food & Drinks',
    'Transport',
    'Shopping',
    'Bills',
    'Salary',
    'Investments',
    'Health',
    'Entertainment',
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    const rawAmount = Number.parseFloat(form.amount);
    if (!form.description.trim() || Number.isNaN(rawAmount) || rawAmount <= 0) return;

    const tx = {
      description: form.description.trim(),
      amount: Math.round(rawAmount * 100) / 100,
      type: form.type,
      category: form.category,
      date: form.date,
      createdAt: Date.now(),
    };

    onAdd(tx);
    setForm((f) => ({ ...f, description: '', amount: '' }));
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-12">
      <div className="sm:col-span-5">
        <label className="mb-1 block text-xs text-white/70">Description</label>
        <input
          type="text"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/40 focus:border-white/20"
          placeholder="e.g., Coffee at Blue Bottle"
          required
        />
      </div>
      <div className="sm:col-span-3">
        <label className="mb-1 block text-xs text-white/70">Amount</label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          inputMode="decimal"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/40 focus:border-white/20"
          placeholder="0.00"
          required
        />
      </div>
      <div className="sm:col-span-4 grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs text-white/70">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs text-white/70">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="sm:col-span-3">
        <label className="mb-1 block text-xs text-white/70">Date</label>
        <input
          type="date"
          value={form.date}
          max={today}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20"
        />
      </div>
      <div className="sm:col-span-12">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 font-medium text-black transition hover:bg-white/90 active:scale-[0.99]"
        >
          <Plus className="h-4 w-4" />
          Add Transaction
        </button>
      </div>
    </form>
  );
}
