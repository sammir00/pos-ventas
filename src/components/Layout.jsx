import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 pb-[80px] md:pb-12 shadow-inner relative">
        <div className="absolute top-0 left-0 right-0 h-64 bg-indigo-600/5 pointer-events-none" />
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
