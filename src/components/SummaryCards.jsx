import { Wallet, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';

export default function SummaryCards({ summary }) {
  const { income, expense, balance, todayIncome, todayExpense } = summary;

  const format = (n) => n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Card icon={<Wallet className="h-4 w-4" />} label="Balance" value={format(balance)} tone="neutral" />
      <Card icon={<ArrowUpRight className="h-4 w-4" />} label="Income" value={format(income)} tone="success" />
      <Card icon={<ArrowDownRight className="h-4 w-4" />} label="Expense" value={format(expense)} tone="danger" />
      <Card icon={<Calendar className="h-4 w-4" />} label="Today" value={`${format(todayIncome)} / ${format(todayExpense)}`} tone="info" />
    </div>
  );
}

function Card({ icon, label, value, tone = 'neutral' }) {
  const toneStyles = {
    neutral: 'bg-white/5 border-white/10',
    success: 'bg-emerald-500/10 border-emerald-500/20',
    danger: 'bg-rose-500/10 border-rose-500/20',
    info: 'bg-sky-500/10 border-sky-500/20',
  };

  return (
    <div className={`flex flex-col rounded-xl border p-3 sm:p-4 ${toneStyles[tone]}`}>
      <div className="flex items-center gap-2 text-xs text-white/70">
        {icon}
        <span>{label}</span>
      </div>
      <div className="mt-2 text-lg font-semibold sm:text-xl">{value}</div>
    </div>
  );
}
