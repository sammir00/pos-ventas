import { customersData } from '../data/mockData';

export default function Customers() {
  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-on-surface tracking-tight mb-1 flex items-center gap-3 uppercase">
            <span className="material-symbols-outlined text-primary">group</span>
            Customers
          </h1>
          <p className="text-sm text-on-surface-variant">Customer directory and loyalty points tracker</p>
        </div>
        <button className="bg-gradient-to-br from-red-500 to-rose-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] active:scale-[0.98]">
          <span className="material-symbols-outlined text-sm">person_add</span> New Customer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customersData.map(customer => (
          <div key={customer.id} className="glass-panel p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-all group cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-lg group-hover:bg-primary/20 transition-colors">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors text-sm">{customer.name}</h3>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full mt-1 inline-block uppercase tracking-wider">{customer.points} pts</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3 text-on-surface-variant text-xs">
                <span className="material-symbols-outlined text-sm text-on-surface-variant/50">mail</span>
                {customer.email}
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant text-xs">
                <span className="material-symbols-outlined text-sm text-on-surface-variant/50">call</span>
                {customer.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

