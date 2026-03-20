import { customersData } from '../data/mockData';
import { Users, Search, Mail, Phone, Plus } from 'lucide-react';

export default function Customers() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-indigo-500" />
            Base de Clientes
          </h1>
          <p className="text-slate-500">Directorio de clientes frecuentes y sistema de puntos</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20">
          <Plus className="w-5 h-5" /> Nuevo Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customersData.map(customer => (
          <div key={customer.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer hover:border-indigo-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl group-hover:bg-indigo-100 transition-colors">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{customer.name}</h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1 inline-block">{customer.points} ptos. acumulados</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <Mail className="w-4 h-4 text-slate-400" />
                {customer.email}
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <Phone className="w-4 h-4 text-slate-400" />
                {customer.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
