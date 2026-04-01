import { useState, useEffect } from 'react';
import { getTransactions } from '../services/transactionService';

export default function History() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    setLoading(true);
    try {
      const data = await getTransactions();
      setTransactions(data);
      setFiltered(data);
    } catch (err) {
      console.error('Error loading transactions:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    setSearchQuery(e.target.value);
    if (query.trim() === '') {
      setFiltered(transactions);
      return;
    }
    setFiltered(transactions.filter(tx =>
      tx.ticket_number.toLowerCase().includes(query) ||
      tx.customer_name.toLowerCase().includes(query) ||
      tx.payment_method.toLowerCase().includes(query)
    ));
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-on-surface tracking-tight mb-1 flex items-center gap-3 uppercase">
          <span className="material-symbols-outlined text-primary">analytics</span>
          Reports
        </h1>
        <p className="text-sm text-on-surface-variant">Detailed transaction logs and ticket history</p>
      </div>

      <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex justify-between items-center">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input 
              type="text" 
              placeholder="Search tickets..." 
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-xl w-64 text-sm text-on-surface focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/50 outline-none" 
            />
          </div>
          <span className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">
            {filtered.length} transactions
          </span>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-6 animate-pulse">
                  <div className="h-4 bg-surface-container-high rounded w-20"></div>
                  <div className="h-4 bg-surface-container-high rounded w-32"></div>
                  <div className="h-4 bg-surface-container-high rounded w-24"></div>
                  <div className="h-4 bg-surface-container-high rounded w-16"></div>
                  <div className="h-4 bg-surface-container-high rounded w-16"></div>
                  <div className="h-4 bg-surface-container-high rounded w-16 ml-auto"></div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl mb-4 opacity-30">receipt_long</span>
              <p className="text-sm font-medium">No transactions found</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-on-surface-variant text-[10px] uppercase tracking-widest border-b border-white/5">
                  <th className="py-4 px-6 font-medium">Ticket No.</th>
                  <th className="py-4 px-6 font-medium">Date & Time</th>
                  <th className="py-4 px-6 font-medium">Customer</th>
                  <th className="py-4 px-6 font-medium">Items</th>
                  <th className="py-4 px-6 font-medium">Method</th>
                  <th className="py-4 px-6 font-medium text-right">Total</th>
                  <th className="py-4 px-6 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(tx => (
                  <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-6 font-mono text-primary font-bold text-sm">{tx.ticket_number}</td>
                    <td className="py-4 px-6 text-on-surface-variant text-xs">{new Date(tx.date).toLocaleString('es-ES')}</td>
                    <td className="py-4 px-6 text-on-surface text-xs font-medium">{tx.customer_name}</td>
                    <td className="py-4 px-6 text-on-surface-variant text-xs">
                      {tx.transaction_items?.length || 0} prod. (qty: {tx.transaction_items?.reduce((s, i) => s + i.quantity, 0) || 0})
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tx.payment_method === 'Efectivo' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                        {tx.payment_method}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-primary text-sm text-right">${tx.total.toFixed(2)}</td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10" title="View Ticket">
                        <span className="material-symbols-outlined text-sm">receipt_long</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
