import { productsData } from '../data/mockData';
import { Package, Plus, Edit2, Trash2, Search } from 'lucide-react';

export default function Products() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2 flex items-center gap-3">
            <Package className="w-8 h-8 text-indigo-500" />
            Catálogo de Productos
          </h1>
          <p className="text-slate-500">Administra el inventario y precios de los productos del minimarket</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20">
          <Plus className="w-5 h-5" /> Nuevo Producto
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input type="text" placeholder="Buscar productos..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
          </div>
          <span className="text-sm text-slate-500 font-medium">Total: {productsData.length} productos</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-sm border-b border-slate-100">
                <th className="py-4 px-6 font-medium">Producto</th>
                <th className="py-4 px-6 font-medium">Categoría</th>
                <th className="py-4 px-6 font-medium">Código</th>
                <th className="py-4 px-6 font-medium">Precio</th>
                <th className="py-4 px-6 font-medium text-center">Stock</th>
                <th className="py-4 px-6 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {productsData.map(product => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-3 px-6 font-medium text-slate-900 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                      {product.image && <img src={product.image} alt={product.name} className="w-full h-full object-cover" />}
                    </div>
                    {product.name}
                  </td>
                  <td className="py-3 px-6 text-slate-500">{product.category}</td>
                  <td className="py-3 px-6 text-slate-400 text-sm font-mono">{product.barcode}</td>
                  <td className="py-3 px-6 font-bold text-slate-900">${product.price.toFixed(2)}</td>
                  <td className="py-3 px-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 20 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {product.stock} un.
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
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
