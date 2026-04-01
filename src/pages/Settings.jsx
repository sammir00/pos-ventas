import { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../services/settingsService';

export default function Settings() {
  const [settings, setSettings] = useState({
    store_name: '', tax_id: '', address: '', tax_rate: '12', currency: 'USD'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSettings();
        setSettings(prev => ({ ...prev, ...data }));
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await updateSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) { alert('Error: ' + err.message); }
    finally { setSaving(false); }
  }

  const update = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));

  if (loading) {
    return (
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-surface-container-high rounded w-1/4" />
          <div className="glass-panel rounded-xl border border-white/5 p-6 space-y-6">
            {[1,2,3,4].map(i => <div key={i} className="h-10 bg-surface-container-high rounded" />)}
          </div>
        </div>
      </div>
    );
  }

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
                <input type="text" value={settings.store_name} onChange={e => update('store_name', e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Tax ID / RUC</label>
                <input type="text" value={settings.tax_id} onChange={e => update('tax_id', e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Main Address</label>
                <input type="text" value={settings.address} onChange={e => update('address', e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" />
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
                <input type="number" value={settings.tax_rate} onChange={e => update('tax_rate', e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Default Currency</label>
                <select value={settings.currency} onChange={e => update('currency', e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 outline-none">
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="MXN">Mexican Peso (MXN)</option>
                </select>
              </div>
            </div>
          </section>

          <div className="pt-6 border-t border-white/5 flex justify-end items-center gap-4">
            {saved && (
              <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 animate-pulse">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Saved successfully
              </span>
            )}
            <button onClick={handleSave} disabled={saving} className="bg-gradient-to-br from-red-500 to-rose-600 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] active:scale-[0.98] disabled:opacity-50">
              {saving ? (
                <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> Saving...</>
              ) : (
                <><span className="material-symbols-outlined text-sm">save</span> Save Changes</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
