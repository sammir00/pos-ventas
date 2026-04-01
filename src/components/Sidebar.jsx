import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard', disabled: true },
    { name: 'Register', path: '/', icon: 'point_of_sale' },
    { name: 'Inventory', path: '/products', icon: 'inventory_2' },
    { name: 'Reports', path: '/history', icon: 'analytics' },
    { name: 'Customers', path: '/customers', icon: 'group' },
    { name: 'Settings', path: '/settings', icon: 'settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-40 bg-stone-900/40 backdrop-blur-2xl shadow-2xl flex flex-col p-4 pt-6 space-y-2 border-r border-white/5">
      <div className="px-4 mb-8">
        <h1 className="text-xl font-black text-primary tracking-tighter uppercase italic">Crimson</h1>
        <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">point_of_sale</span>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-on-surface-variant">Station 01</p>
            <p className="text-xs font-bold text-on-surface">Main Terminal</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          if (isActive) {
            return (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-[0.98]"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {item.icon}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest">{item.name}</span>
              </Link>
            );
          }
          return (
            <Link
              key={item.name}
              to={item.disabled ? '#' : item.path}
              className={`flex items-center gap-3 px-4 py-3 text-stone-400 hover:text-white hover:bg-white/10 rounded-xl transition-all active:scale-[0.98] ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-[10px] font-medium uppercase tracking-widest">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="pt-4 mt-4 border-t border-white/5 space-y-1">
        <div className="px-4 py-3 flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden flex items-center justify-center text-xs font-bold text-white">
            AR
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-on-surface truncate">Admin Usuario</p>
            <p className="text-[9px] uppercase tracking-tighter text-on-surface-variant">Manager</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-stone-400 hover:text-error transition-all active:scale-[0.98]">
          <span className="material-symbols-outlined">logout</span>
          <span className="text-[10px] font-medium uppercase tracking-widest">Logout</span>
        </button>
      </div>
    </aside>
  );
}
