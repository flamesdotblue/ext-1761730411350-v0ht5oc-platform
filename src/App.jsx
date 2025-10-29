import { useEffect, useMemo, useState } from 'react';
import HeroCover from './components/HeroCover';
import SummaryCards from './components/SummaryCards';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionsList from './components/TransactionsList';

function App() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const raw = localStorage.getItem('fintrack:transactions');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('fintrack:transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd = (tx) => {
    setTransactions((prev) => [{ ...tx, id: crypto.randomUUID() }, ...prev]);
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const summary = useMemo(() => {
    let income = 0;
    let expense = 0;
    let todayIncome = 0;
    let todayExpense = 0;

    for (const t of transactions) {
      if (t.type === 'income') income += t.amount;
      if (t.type === 'expense') expense += t.amount;
      if (t.date === today) {
        if (t.type === 'income') todayIncome += t.amount;
        if (t.type === 'expense') todayExpense += t.amount;
      }
    }

    const balance = income - expense;

    return { income, expense, balance, todayIncome, todayExpense };
  }, [transactions, today]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <HeroCover />

      <main className="mx-auto -mt-16 w-full max-w-3xl px-4 pb-24">
        <div className="rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur shadow-xl">
          <div className="p-4 sm:p-6">
            <SummaryCards summary={summary} />
          </div>
          <div className="border-t border-white/10" />
          <div className="p-4 sm:p-6">
            <AddTransactionForm onAdd={handleAdd} />
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur shadow-xl">
          <div className="p-4 sm:p-6">
            <TransactionsList items={transactions} onDelete={handleDelete} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
