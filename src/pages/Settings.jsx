export default function Settings() {
  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-on-surface tracking-tight mb-1 flex items-center gap-3 uppercase">
          <span className="material-symbols-outlined text-primary">settings</span>
          Settings
        </h1>
        <p className="text-sm text-on-surface-variant">System preferences and store configuration</p>
      </div>

      <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
        <div className="p-6 space-y-8">
          
          <section>
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-widest mb-4 pb-2 border-b border-white/5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">storefront</span>
              Store Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Store Name</label>
                <input type="text" defaultValue="MiniMarket La Esquina" className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 transition-all outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Tax ID / RUC</label>
                <input type="text" defaultValue="123456789001" className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 transition-all outline-none" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Main Address</label>
                <input type="text" defaultValue="Av. Principal 123 y Calle Secundaria" className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 transition-all outline-none" />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-widest mb-4 pb-2 border-b border-white/5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">payments</span>
              Payment Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Tax Rate (%)</label>
                <input type="number" defaultValue="12" className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 transition-all outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Default Currency</label>
                <select className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 transition-all outline-none">
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="MXN">Mexican Peso (MXN)</option>
                </select>
              </div>
            </div>
          </section>

          <div className="pt-6 border-t border-white/5 flex justify-end">
            <button className="bg-gradient-to-br from-red-500 to-rose-600 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] active:scale-[0.98]">
              <span className="material-symbols-outlined text-sm">save</span> Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

