import { useState, useEffect } from 'react';
import { getProducts, searchProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { getCategories } from '../services/categoryService';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', stock: '', category: '', barcode: '', image_url: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const cats = await getCategories();
      setCategories(cats.filter(c => c !== 'Todos'));
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  }

  async function handleSearch(e) {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      loadProducts();
      return;
    }
    try {
      const data = await searchProducts(query);
      setProducts(data);
    } catch (err) {
      console.error('Error searching:', err);
    }
  }

  function openNewProduct() {
    setEditingProduct(null);
    setFormData({ name: '', price: '', stock: '', category: categories[0] || '', barcode: '', image_url: '' });
    setShowModal(true);
  }

  function openEditProduct(product) {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      barcode: product.barcode || '',
      image_url: product.image_url || '',
    });
    setShowModal(true);
  }

  async function handleSave() {
    if (!formData.name || !formData.price) return;
    setSaving(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, {
          name: formData.name,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock) || 0,
          category: formData.category,
          barcode: formData.barcode || null,
          image_url: formData.image_url || null,
        });
      } else {
        await createProduct({
          name: formData.name,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock) || 0,
          category: formData.category,
          barcode: formData.barcode || null,
          image_url: formData.image_url || null,
        });
      }
      setShowModal(false);
      loadProducts();
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  }

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
        <button 
          onClick={openNewProduct}
          className="bg-gradient-to-br from-red-500 to-rose-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-sm">add</span> New Product
        </button>
      </div>

      <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex justify-between items-center">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-xl w-64 text-sm text-on-surface focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/50 outline-none" 
            />
          </div>
          <span className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">{products.length} products</span>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 animate-pulse">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-surface-container-high rounded w-1/3"></div>
                    <div className="h-3 bg-surface-container-high rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                    <td className="py-3 px-6 font-bold text-on-surface text-sm flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container overflow-hidden shrink-0">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
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
                        <button onClick={() => openEditProduct(product)} className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal para crear/editar producto */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="glass-panel rounded-2xl border border-white/10 w-full max-w-lg p-6 space-y-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-black text-on-surface uppercase tracking-tight">
                {editingProduct ? 'Edit Product' : 'New Product'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Product Name *</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" 
                  placeholder="Ej: Coca Cola 2L"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Price *</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" 
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Stock</label>
                  <input 
                    type="number" 
                    value={formData.stock} 
                    onChange={e => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" 
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Category</label>
                  <select 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Barcode</label>
                  <input 
                    type="text" 
                    value={formData.barcode} 
                    onChange={e => setFormData({...formData, barcode: e.target.value})}
                    className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" 
                    placeholder="770200100"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Image URL</label>
                <input 
                  type="url" 
                  value={formData.image_url} 
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/50 outline-none" 
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-on-surface-variant text-xs font-bold uppercase tracking-widest hover:bg-white/10 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={saving || !formData.name || !formData.price}
                className="bg-gradient-to-br from-red-500 to-rose-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] active:scale-[0.98] disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                    Saving...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">save</span>
                    {editingProduct ? 'Update' : 'Create'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
