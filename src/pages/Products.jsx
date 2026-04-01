import { productsData } from '../data/mockData';

export default function Products() {
  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-on-surface tracking-tight mb-1 flex items-center gap-3 uppercase">
            <span className="material-symbols-outlined text-primary">inventory_2</span>
            Inventory
          </h1>
          <p className="text-sm text-on-surface-variant">Manage products, pricing, and stock levels</p>
        </div>
        <button className="bg-gradient-to-br from-red-500 to-rose-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] active:scale-[0.98]">
          <span className="material-symbols-outlined text-sm">add</span> New Product
        </button>
      </div>

      <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex justify-between items-center">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input type="text" placeholder="Search products..." className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-xl w-64 text-sm text-on-surface focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/50 outline-none" />
          </div>
          <span className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">{productsData.length} products</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-on-surface-variant text-[10px] uppercase tracking-widest border-b border-white/5">
                <th className="py-4 px-6 font-medium">Product</th>
                <th className="py-4 px-6 font-medium">Category</th>
                <th className="py-4 px-6 font-medium">SKU</th>
                <th className="py-4 px-6 font-medium">Price</th>
                <th className="py-4 px-6 font-medium text-center">Stock</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {productsData.map(product => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-3 px-6 font-bold text-on-surface text-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container overflow-hidden shrink-0">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-surface-container-high">
                          <span className="material-symbols-outlined text-on-surface-variant text-sm">shopping_bag</span>
                        </div>
                      )}
                    </div>
                    {product.name}
                  </td>
                  <td className="py-3 px-6 text-on-surface-variant text-xs">{product.category}</td>
                  <td className="py-3 px-6 text-on-surface-variant text-xs font-mono">{product.barcode}</td>
                  <td className="py-3 px-6 font-bold text-primary text-sm">${product.price.toFixed(2)}</td>
                  <td className="py-3 px-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.stock > 20 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
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

