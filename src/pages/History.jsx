import { historyData } from '../data/mockData';

export default function History() {
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
            <input type="text" placeholder="Search tickets..." className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-xl w-64 text-sm text-on-surface focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/50 outline-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
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
              {historyData.map(tx => (
                <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-6 font-mono text-primary font-bold text-sm">{tx.id}</td>
                  <td className="py-4 px-6 text-on-surface-variant text-xs">{new Date(tx.date).toLocaleString('es-ES')}</td>
                  <td className="py-4 px-6 text-on-surface text-xs font-medium">{tx.customer}</td>
                  <td className="py-4 px-6 text-on-surface-variant text-xs">
                    {tx.items.length} prod. (qty: {tx.items.reduce((s, i) => s + i.quantity, 0)})
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tx.method === 'Efectivo' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                      {tx.method}
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
        </div>
      </div>
    </div>
  );
}

