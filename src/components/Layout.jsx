import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <>
      <Sidebar />
      <header className="fixed top-0 left-64 right-0 z-50 bg-stone-950/60 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-8 flex-1">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input 
              type="text" 
              placeholder="Search products, SKUs, or barcodes..." 
              className="w-full bg-surface-container-low border-none rounded-xl pl-10 pr-4 py-2 text-sm text-on-surface focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/50 outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 ml-4">
          <button className="p-2 text-stone-400 hover:bg-white/5 rounded-lg transition-colors active:scale-95 duration-200 relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-stone-950"></span>
          </button>
          <button className="p-2 text-stone-400 hover:bg-white/5 rounded-lg transition-colors active:scale-95 duration-200">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      <main className="ml-64 mt-16 flex h-[calc(100vh-64px)] relative z-10">
        <Outlet />
      </main>
    </>
  );
}
