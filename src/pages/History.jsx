import { historyData } from '../data/mockData';
import { Clock, Search, Receipt } from 'lucide-react';

export default function History() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2 flex items-center gap-3">
          <Clock className="w-8 h-8 text-indigo-500" />
          Historial de Ventas
        </h1>
        <p className="text-slate-500">Registro detallado de transacciones y tickets emitidos</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input type="text" placeholder="Buscar ticket..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-sm border-b border-slate-100">
                <th className="py-4 px-6 font-medium">No. Ticket</th>
                <th className="py-4 px-6 font-medium">Fecha y Hora</th>
                <th className="py-4 px-6 font-medium">Cliente</th>
                <th className="py-4 px-6 font-medium">Artículos</th>
                <th className="py-4 px-6 font-medium">Método</th>
                <th className="py-4 px-6 font-medium text-right">Total</th>
                <th className="py-4 px-6 font-medium text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historyData.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6 font-mono text-indigo-600 font-medium">{tx.id}</td>
                  <td className="py-4 px-6 text-slate-600">{new Date(tx.date).toLocaleString('es-ES')}</td>
                  <td className="py-4 px-6 text-slate-600">{tx.customer}</td>
                  <td className="py-4 px-6 text-slate-500 text-sm">
                    {tx.items.length} prod. (cant: {tx.items.reduce((s, i) => s + i.quantity, 0)})
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tx.method === 'Efectivo' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                      {tx.method}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900 text-right">${tx.total.toFixed(2)}</td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors tooltip" title="Ver Ticket">
                      <Receipt className="w-5 h-5 mx-auto" />
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
