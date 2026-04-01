import { useState, useEffect } from 'react';
import { getCustomers, createCustomer, deleteCustomer } from '../services/customerService';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadCustomers(); }, []);

  async function loadCustomers() {
    setLoading(true);
    try { setCustomers(await getCustomers()); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  async function handleSave() {
    if (!formData.name) return;
    setSaving(true);
    try {
      await createCustomer(formData);
      setShowModal(false);
      setFormData({ name: '', email: '', phone: '' });
      loadCustomers();
    } catch (err) { alert('Error: ' + err.message); }
    finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar este cliente?')) return;
    try { await deleteCustomer(id); loadCustomers(); }
    catch (err) { alert('Error: ' + err.message); }
  }

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
        <button onClick={() => setShowModal(true)} className="bg-gradient-to-br from-red-500 to-rose-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] active:scale-[0.98]">
          <span className="material-symbols-outlined text-sm">person_add</span> New Customer
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="glass-panel p-5 rounded-xl border border-white/5 animate-pulse space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-high" />
                <div className="space-y-2 flex-1"><div className="h-4 bg-surface-container-high rounded w-3/4" /><div className="h-3 bg-surface-container-high rounded w-1/2" /></div>
              </div>
            </div>
          ))}
        </div>
      ) : customers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl mb-4 opacity-30">group</span>
          <p className="text-sm font-medium">No customers yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map(c => (
            <div key={c.id} className="glass-panel p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-all group cursor-pointer relative">
              <button onClick={() => handleDelete(c.id)} className="absolute top-3 right-3 p-1.5 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-lg group-hover:bg-primary/20 transition-colors">{c.name.charAt(0)}</div>
                <div>
                  <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors text-sm">{c.name}</h3>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full mt-1 inline-block uppercase tracking-wider">{c.points} pts</span>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-on-surface-variant text-xs"><span className="material-symbols-outlined text-sm text-on-surface-variant/50">mail</span>{c.email || '—'}</div>
                <div className="flex items-center gap-3 text-on-surface-variant text-xs"><span className="material-symbols-outlined text-sm text-on-surface-variant/50">call</span>{c.phone || '—'}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="glass-panel rounded-2xl border border-white/10 w-full max-w-md p-6 space-y-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-black text-on-surface uppercase tracking-tight">New Customer</h2>
            <div className="space-y-4">
              <div className="space-y-2"><label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Name *</label><input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 outline-none border-none" placeholder="Juan Pérez" /></div>
              <div className="space-y-2"><label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Email</label><input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 outline-none border-none" /></div>
              <div className="space-y-2"><label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Phone</label><input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 outline-none border-none" /></div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 text-on-surface-variant text-xs font-bold uppercase tracking-widest hover:bg-white/10 rounded-xl">Cancel</button>
              <button onClick={handleSave} disabled={saving || !formData.name} className="bg-gradient-to-br from-red-500 to-rose-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest disabled:opacity-50">
                {saving ? 'Saving...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
