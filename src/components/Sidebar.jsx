import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Clock, Users, Settings, ShoppingCart } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'POS', path: '/', icon: <ShoppingCart className="w-6 h-6" /> },
    { name: 'Prod.', path: '/products', icon: <Package className="w-6 h-6" /> },
    { name: 'Hist.', path: '/history', icon: <Clock className="w-6 h-6" /> },
    { name: 'Client.', path: '/customers', icon: <Users className="w-6 h-6" /> },
    { name: 'Conf.', path: '/settings', icon: <Settings className="w-6 h-6" /> },
  ];

  const fullNavItems = [
    { name: 'POS', path: '/', icon: <ShoppingCart className="w-5 h-5" /> },
    { name: 'Productos', path: '/products', icon: <Package className="w-5 h-5" /> },
    { name: 'Historial', path: '/history', icon: <Clock className="w-5 h-5" /> },
    { name: 'Clientes', path: '/customers', icon: <Users className="w-5 h-5" /> },
    { name: 'Configuración', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
      <aside className="hidden md:flex w-64 bg-slate-900 text-slate-300 flex-col min-h-screen transition-all select-none border-r border-slate-800/80 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 shrink-0">
        <div className="p-6 flex items-center space-x-3 text-white border-b border-slate-800/80">
          <div className="bg-indigo-500 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">MiniMarket <span className="text-indigo-400 font-black">POS</span></span>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2.5">
          {fullNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${isActive 
                    ? 'bg-indigo-500/10 text-indigo-400 font-medium' 
                    : 'hover:bg-slate-800/50 hover:text-white'
                  }`}
              >
                <div className={`${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'} transition-colors duration-300`}>
                  {item.icon}
                </div>
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-6 border-t border-slate-800/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-bold shadow-sm">
              AD
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Admin Usuario</span>
              <span className="text-xs text-slate-500">Cajero Principal</span>
            </div>
          </div>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 text-slate-400 flex justify-around items-center h-[72px] pb-safe z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all
                ${isActive ? 'text-indigo-400 font-semibold mb-1' : 'hover:text-slate-300'}
              `}
            >
              <div className={`${isActive ? '-translate-y-1 scale-110 drop-shadow-md' : ''} transition-all duration-300`}>
                {item.icon}
              </div>
              <span className="text-[10px] sm:text-xs">{item.name}</span>
              {isActive && <div className="absolute bottom-1.5 w-1 h-1 bg-indigo-500 rounded-full" />}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
